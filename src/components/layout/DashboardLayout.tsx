import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { motion } from 'motion/react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-white">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 lg:p-12 max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};
