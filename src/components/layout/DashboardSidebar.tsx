import React from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  FolderOpen
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem = ({ icon: Icon, label, href, active, collapsed }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 group",
        active 
          ? "bg-brand-900 text-white shadow-lg shadow-brand-900/20" 
          : "text-brand-500 hover:bg-brand-100 hover:text-brand-900"
      )}
    >
      <Icon className={cn("w-5 h-5 shrink-0", active ? "text-white" : "group-hover:scale-110 transition-transform")} />
      {!collapsed && (
        <span className="font-medium text-sm overflow-hidden whitespace-nowrap">
          {label}
        </span>
      )}
    </Link>
  );
};

export const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'My Projects', href: '/projects' },
    { icon: Users, label: 'Collaboration', href: '/collaboration' },
    { icon: FolderOpen, label: 'Archive', href: '/archive' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="h-screen bg-brand-50 border-r border-brand-200 flex flex-col transition-all duration-300 relative z-40 sticky top-0"
    >
      <div className="p-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {collapsed ? (
            <span className="font-display font-bold text-xl tracking-tight text-brand-900 w-8 h-8 flex items-center justify-center bg-brand-100 rounded-lg">L</span>
          ) : (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display font-bold text-xl tracking-tight text-brand-900"
            >
              Lumina
            </motion.span>
          )}
        </Link>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-brand-200 rounded-lg transition-colors text-brand-500"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {!collapsed && (
          <div className="px-3 mb-6">
            <button className="w-full bg-white border border-brand-200 text-brand-900 px-4 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-95">
              <PlusCircle size={18} className="text-brand-900" />
              New Project
            </button>
          </div>
        )}
        
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={location.pathname === item.href}
            collapsed={collapsed}
          />
        ))}

        <div className="pt-8">
          {!collapsed && (
            <span className="px-3 text-[10px] font-bold text-brand-400 uppercase tracking-widest mb-3 block">
              Resources
            </span>
          )}
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/settings" 
            active={location.pathname === '/settings'}
            collapsed={collapsed} 
          />
        </div>
      </div>

      <div className="p-4 border-t border-brand-200 space-y-3">
        <div className={cn("flex items-center gap-3 px-3 py-2", collapsed ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-brand-200 border border-brand-300 shrink-0 overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-brand-500 text-xs font-bold">
                {user?.displayName?.[0] || 'A'}
              </div>
            )}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-900 truncate">{user?.displayName || 'Guest Author'}</p>
              <p className="text-[11px] text-brand-500 truncate">{user?.email || 'Login to sync content'}</p>
            </div>
          )}
        </div>
        <button 
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors",
            collapsed ? "justify-center" : ""
          )}
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm font-medium">Log out</span>}
        </button>
      </div>
    </motion.aside>
  );
};
