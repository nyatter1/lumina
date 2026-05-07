import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Settings, 
  ChevronLeft, 
  Maximize2, 
  Minimize2, 
  Download, 
  Users, 
  MessageSquare,
  Search,
  BookOpen,
  Hash,
  Plus,
  Save,
  Clock,
  Layout
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { projectService, chapterService } from '../services/firestoreService';
import { Project, Chapter } from '../types';
import { toast } from 'react-hot-toast';

export default function Editor() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Untitled Chapter');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const unsubscribe = projectService.subscribeToProject(projectId, (data) => {
      setProject(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [projectId]);

  const stats = {
    words: content.trim() ? content.trim().split(/\s+/).length : 0,
    characters: content.length,
    readingTime: Math.ceil((content.trim() ? content.trim().split(/\s+/).length : 0) / 225)
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden text-brand-900 selection:bg-brand-900 selection:text-white">
      {/* Top Navbar */}
      {!focusMode && (
        <header className="h-14 border-b border-brand-100 px-4 flex items-center justify-between shrink-0 bg-white z-50">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-brand-50 rounded-lg transition-colors text-brand-500">
              <ChevronLeft size={20} />
            </Link>
            <div className="h-4 w-px bg-brand-200 hidden sm:block" />
            <div className="flex items-center gap-3">
              <BookOpen size={18} className="text-brand-900" />
              <span className="font-semibold text-sm truncate max-w-[200px]">
                {loading ? 'Loading...' : project?.title || 'Untitled Project'}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-brand-400 uppercase tracking-widest pl-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Synced</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2 mr-4">
              {[1, 2].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-brand-200 flex items-center justify-center text-[10px] font-bold">
                  {i === 1 ? 'JD' : 'SK'}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-white bg-brand-900 flex items-center justify-center text-[10px] font-bold text-white">
                +3
              </div>
            </div>
            <Button variant="ghost" size="sm" className="hidden lg:flex">
              <Users size={16} />
              Collaborate
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setFocusMode(true)}>
              <Maximize2 size={18} />
            </Button>
            <div className="h-4 w-px bg-brand-200 mx-1" />
            <Button size="sm" className="bg-brand-900">
              <Download size={16} />
              Export
            </Button>
          </div>
        </header>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar: Outline */}
        <AnimatePresence>
          {sidebarOpen && !focusMode && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-r border-brand-100 flex flex-col bg-brand-50/50 shrink-0"
            >
              <div className="p-6 flex items-center justify-between">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-400">Outline</h3>
                <button className="p-1 hover:bg-brand-200 rounded-md transition-colors">
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-1">
                {[
                  'Front Matter',
                  'Chapter 1: The Descent',
                  'Chapter 2: Shadows of Eredon',
                  'Chapter 3: The Broken Seal',
                  'Chapter 4: Whispers in the Deep',
                  'Notes & Research',
                  'Characters'
                ].map((item, i) => (
                  <button 
                    key={i}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-xl text-sm transition-all group flex items-center gap-2",
                      i === 1 ? "bg-white border border-brand-200 text-brand-900 shadow-sm" : "text-brand-500 hover:bg-brand-100 hover:text-brand-900"
                    )}
                  >
                    {i === 5 || i === 6 ? <Layout size={14} /> : <Hash size={14} />}
                    <span className="truncate">{item}</span>
                  </button>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Floating Sidebar Toggle (Left) */}
        {!focusMode && (
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn(
              "absolute left-4 bottom-4 z-40 p-3 bg-white border border-brand-200 rounded-2xl shadow-xl hover:shadow-brand-900/5 transition-all",
              !sidebarOpen && "bg-brand-900 text-white border-brand-900"
            )}
          >
            <Menu size={20} />
          </button>
        )}

        {/* Main Editor Area */}
        <main className="flex-1 overflow-y-auto bg-white flex flex-col items-center relative scroll-smooth selection:bg-brand-900 selection:text-white">
          {focusMode && (
            <button 
              onClick={() => setFocusMode(false)}
              className="absolute top-8 right-8 p-3 bg-brand-50 hover:bg-brand-100 rounded-2xl text-brand-400 hover:text-brand-900 transition-all z-50"
            >
              <Minimize2 size={20} />
            </button>
          )}

          <div className={cn(
            "writing-container transition-all duration-700 w-full",
            focusMode ? "max-w-2xl py-32" : "max-w-3xl"
          )}>
            <motion.input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl lg:text-5xl font-display font-bold outline-none border-none placeholder:text-brand-200 mb-12 bg-transparent"
              placeholder="Chapter Title..."
            />
            
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[70vh] outline-none border-none resize-none bg-transparent font-sans text-xl leading-relaxed placeholder:text-brand-100"
              placeholder="Start your masterpiece..."
            />
          </div>

          {/* Editor Bottom Stats Toolbar */}
          <div className={cn(
            "fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-3 bg-white/90 backdrop-blur-xl border border-brand-100 rounded-2xl shadow-2xl shadow-brand-900/10 transition-all duration-500",
            focusMode ? "opacity-20 hover:opacity-100" : "opacity-100"
          )}>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-brand-400 uppercase tracking-widest leading-none mb-1">Words</span>
              <span className="text-sm font-semibold text-brand-900 tabular-nums">{stats.words}</span>
            </div>
            <div className="h-6 w-px bg-brand-100" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-brand-400 uppercase tracking-widest leading-none mb-1">Read Time</span>
              <span className="text-sm font-semibold text-brand-900 tabular-nums">{stats.readingTime} min</span>
            </div>
            <div className="h-6 w-px bg-brand-100" />
            <div className="flex items-center gap-4">
              <button className="p-1 text-brand-400 hover:text-brand-900 hover:bg-brand-50 rounded-lg transition-all" title="Save Snapshot">
                <Save size={18} />
              </button>
              <button className="p-1 text-brand-400 hover:text-brand-900 hover:bg-brand-50 rounded-lg transition-all" title="Version History">
                <Clock size={18} />
              </button>
              <button 
                className={cn(
                  "p-1 rounded-lg transition-all",
                  rightPanelOpen ? "text-brand-900 bg-brand-50" : "text-brand-400 hover:text-brand-900 hover:bg-brand-50"
                )}
                onClick={() => setRightPanelOpen(!rightPanelOpen)}
                title="Comments & Feedback"
              >
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Comments/Notes */}
        <AnimatePresence>
          {rightPanelOpen && !focusMode && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-brand-100 flex flex-col bg-brand-50/20 shrink-0"
            >
              <div className="p-6 border-b border-brand-100 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                <h3 className="font-display font-bold text-sm uppercase tracking-wider text-brand-900">Feedback</h3>
                <button onClick={() => setRightPanelOpen(false)} className="p-1 hover:bg-brand-100 rounded-md transition-colors text-brand-400">
                  <Minimize2 size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {[
                  { author: 'Jane Done', role: 'Editor', time: '2h ago', text: 'This introductory paragraph is very strong, but "shrouded in mist" might be a bit of a cliché. Consider something more original?' },
                  { author: 'Sam King', role: 'Author', time: '1h ago', text: 'Good catch. I will work on a more evocative description of the valley.' }
                ].map((comment, i) => (
                  <div key={i} className="bg-white border border-brand-100 p-4 rounded-2xl shadow-sm space-y-2 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold", i === 0 ? "bg-indigo-100 text-indigo-600" : "bg-emerald-100 text-emerald-600")}>
                          {comment.author[0]}
                        </div>
                        <span className="text-xs font-bold text-brand-900">{comment.author}</span>
                      </div>
                      <span className="text-[10px] text-brand-400">{comment.time}</span>
                    </div>
                    <p className="text-sm text-brand-600 leading-relaxed">{comment.text}</p>
                    <div className="pt-2 flex gap-2">
                      <button className="text-[10px] font-bold text-brand-400 hover:text-brand-900">Reply</button>
                      <button className="text-[10px] font-bold text-brand-400 hover:text-brand-900">Resolve</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
