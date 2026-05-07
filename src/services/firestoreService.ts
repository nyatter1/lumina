import { 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Project, Chapter, Comment, Notification } from '../types';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const projectService = {
  async getProjects() {
    const path = 'projects';
    try {
      if (!auth.currentUser) return [];
      const q = query(
        collection(db, path), 
        where('ownerId', '==', auth.currentUser.uid),
        orderBy('updatedAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    const path = 'projects';
    try {
      const docRef = doc(collection(db, path));
      const newProject = {
        ...project,
        id: docRef.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      await setDoc(docRef, newProject);
      return newProject;
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  },

  subscribeToProject(projectId: string, callback: (project: Project) => void) {
    const path = `projects/${projectId}`;
    return onSnapshot(doc(db, 'projects', projectId), (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() } as Project);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    });
  }
};

export const chapterService = {
  async getChapters(projectId: string) {
    const path = `projects/${projectId}/chapters`;
    try {
      const q = query(collection(db, 'projects', projectId, 'chapters'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Chapter[];
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  },

  async updateChapter(projectId: string, chapterId: string, updates: Partial<Chapter>) {
    const path = `projects/${projectId}/chapters/${chapterId}`;
    try {
      const docRef = doc(db, 'projects', projectId, 'chapters', chapterId);
      await updateDoc(docRef, { ...updates, updatedAt: Date.now() });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  }
};
