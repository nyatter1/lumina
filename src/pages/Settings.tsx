import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button } from '../components/ui/Button';
import { User, Bell, Shield, Palette, Globe, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl space-y-12">
        <div>
          <h1 className="text-3xl font-display font-bold text-brand-900">Settings</h1>
          <p className="text-brand-500 mt-1">Manage your workspace and account preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            {[
              { label: 'Profile', icon: User, active: true },
              { label: 'Notifications', icon: Bell },
              { label: 'Security', icon: Shield },
              { label: 'Appearance', icon: Palette },
              { label: 'Billing', icon: Globe }
            ].map((item) => (
              <button 
                key={item.label}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  item.active ? "bg-brand-900 text-white shadow-lg" : "text-brand-500 hover:bg-brand-50 hover:text-brand-900"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="md:col-span-3 space-y-8">
            <section className="bg-white border border-brand-200 rounded-[2rem] p-8 space-y-6">
              <h2 className="text-xl font-display font-bold text-brand-900">Public Profile</h2>
              <div className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="w-24 h-24 rounded-[2rem] bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 overflow-hidden group relative">
                  {user?.photoURL ? <img src={user.photoURL} alt="" /> : <User size={40} className="text-brand-200" />}
                  <div className="absolute inset-0 bg-brand-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Change</span>
                  </div>
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-brand-400 uppercase tracking-widest ml-1">Display Name</label>
                       <input type="text" defaultValue={user?.displayName} className="w-full h-11 px-4 bg-brand-50 border border-brand-100 rounded-xl outline-none focus:border-brand-900 transition-colors text-sm" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-brand-400 uppercase tracking-widest ml-1">Email</label>
                       <input type="text" defaultValue={user?.email} disabled className="w-full h-11 px-4 bg-brand-50 border border-brand-100 rounded-xl opacity-60 text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-brand-400 uppercase tracking-widest ml-1">Bio</label>
                    <textarea 
                      placeholder="Tell the world about your writing journey..." 
                      className="w-full h-32 p-4 bg-brand-50 border border-brand-100 rounded-xl outline-none focus:border-brand-900 transition-colors text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-brand-100 flex justify-end">
                <Button className="px-8 shadow-indigo-100 shadow-xl">Save Changes</Button>
              </div>
            </section>

             <section className="bg-red-50 border border-red-100 rounded-[2rem] p-8 space-y-4">
              <h2 className="text-xl font-display font-bold text-red-900">Danger Zone</h2>
              <p className="text-sm text-red-600">Deleting your account is permanent and will remove all your projects and data.</p>
              <Button variant="danger" className="bg-red-600 hover:bg-red-700">Delete Account</Button>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Utility function to merge classes if not imported correctly
import { cn } from '../lib/utils';
