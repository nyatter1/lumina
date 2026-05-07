export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  followers: string[];
  following: string[];
  stats: {
    booksPublished: number;
    totalWordCount: number;
    writingStreak: number;
  };
  createdAt: number;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  coverURL?: string;
  ownerId: string;
  collaborators: {
    userId: string;
    role: 'owner' | 'editor' | 'viewer';
  }[];
  status: 'draft' | 'writing' | 'editing' | 'published';
  visibility: 'private' | 'public';
  tags: string[];
  metadata: {
    genre?: string;
    targetAudience?: string;
    language?: string;
  };
  createdAt: number;
  updatedAt: number;
}

export interface Chapter {
  id: string;
  projectId: string;
  title: string;
  content: string;
  order: number;
  folderId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Folder {
  id: string;
  projectId: string;
  name: string;
  parentId?: string;
  order: number;
}

export interface Comment {
  id: string;
  projectId: string;
  chapterId: string;
  authorId: string;
  text: string;
  selectionRange?: {
    start: number;
    end: number;
  };
  resolved: boolean;
  createdAt: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'mention' | 'invite' | 'comment' | 'achievement';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: number;
}
