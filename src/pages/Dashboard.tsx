import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProjectCard } from '../components/project/ProjectCard';
import { Button } from '../components/ui/Button';
import { 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  PenTool, 
  Award,
  Zap,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { projectService } from '../services/firestoreService';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await projectService.getProjects();
        if (data) setProjects(data);
      } catch (error) {
        toast.error('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [user]);

  const handleCreateProject = async () => {
    if (!user) return;
    try {
      const newProject = await projectService.createProject({
        title: 'Untitled Masterpiece',
        description: 'Every epic journey begins with a single word.',
        ownerId: user.id,
        collaborators: [{ userId: user.id, role: 'owner' }],
        status: 'draft',
        visibility: 'private',
        tags: ['New'],
        metadata: { genre: 'Uncategorized' }
      });
      if (newProject) {
        setProjects([newProject as Project, ...projects]);
        toast.success('Project created!');
      }
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-display font-bold text-brand-900"
            >
              Welcome back, {user?.displayName?.split(' ')[0] || 'Author'}
            </motion.h1>
            <p className="text-brand-500 mt-1">You've written {user?.stats.totalWordCount.toLocaleString() || '0'} words so far. Keep it up!</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400 w-4 h-4 group-focus-within:text-brand-900 transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2 bg-brand-50 border border-brand-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-900/10 focus:border-brand-900 w-full md:w-64 transition-all"
              />
            </div>
            <Button onClick={handleCreateProject} className="h-11 px-6 shadow-indigo-100 shadow-xl">
              <Plus size={18} />
              New Project
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Words Today', value: '1,240', icon: PenTool, trend: '+12%', color: 'bg-indigo-50 text-indigo-600' },
            { label: 'Writing Streak', value: '12 Days', icon: Zap, trend: '🔥', color: 'bg-amber-50 text-amber-600' },
            { label: 'Total Books', value: '4', icon: TrendingUp, trend: '2 finished', color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Achievements', value: '18', icon: Award, trend: 'Bronze', color: 'bg-brand-50 text-brand-600' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-brand-200 p-6 rounded-3xl flex items-center gap-4 hover:shadow-lg transition-all"
            >
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-display font-bold text-brand-900">{stat.value}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-500">{stat.trend}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projects Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-brand-900">Recent Projects</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                <Filter size={14} />
                Filter
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
            
            {/* Empty State / Create New Placeholder */}
            <motion.button
              onClick={handleCreateProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border-2 border-dashed border-brand-200 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 text-brand-400 hover:border-brand-900 hover:text-brand-900 hover:bg-brand-50 transition-all group min-h-[250px]"
            >
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm">Start New Project</p>
                <p className="text-xs text-brand-400 mt-1 px-4">Begin your next masterpiece from a blank page or template.</p>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
