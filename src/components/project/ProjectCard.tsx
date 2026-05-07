import React from 'react';
import { Project } from '../../types';
import { cn, formatDate } from '../../lib/utils';
import { BookOpen, Users, Clock, MoreVertical, Globe, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link 
      to={`/editor/${project.id}`}
      className="group bg-white border border-brand-200 rounded-3xl p-6 hover:shadow-xl hover:shadow-brand-900/5 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-16 bg-brand-50 rounded-lg flex items-center justify-center border border-brand-100 group-hover:bg-brand-900 transition-colors overflow-hidden">
          {project.coverURL ? (
            <img src={project.coverURL} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <BookOpen className="text-brand-300 group-hover:text-white transition-colors" size={24} />
          )}
        </div>
        <div className="flex items-center gap-2">
          {project.visibility === 'public' ? (
            <Globe size={14} className="text-brand-400" />
          ) : (
            <Lock size={14} className="text-brand-400" />
          )}
          <button className="p-1 hover:bg-brand-100 rounded-md transition-colors">
            <MoreVertical size={16} className="text-brand-400" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-display font-bold text-lg text-brand-900 group-hover:text-brand-600 transition-colors truncate">
            {project.title}
          </h3>
          <p className="text-sm text-brand-500 line-clamp-2 mt-1 min-h-[40px]">
            {project.description || 'No description provided.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-brand-50 text-[10px] font-bold text-brand-500 uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-brand-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] text-brand-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock size={12} />
              <span>{formatDate(project.updatedAt)}</span>
            </div>
            {project.collaborators.length > 1 && (
              <div className="flex items-center gap-1.5">
                <Users size={12} />
                <span>{project.collaborators.length} collaborators</span>
              </div>
            )}
          </div>
          <div className="px-2 py-1 bg-brand-50 rounded-lg text-[10px] font-bold text-brand-600 uppercase tracking-tight">
            {project.status}
          </div>
        </div>
      </div>
    </Link>
  );
};
