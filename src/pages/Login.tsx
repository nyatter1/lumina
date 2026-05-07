import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';
import { Mail, Lock, Github, Chrome, ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white text-brand-900 font-sans">
      {/* Left Column: Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-24 relative overflow-hidden">
        <div className="absolute top-12 left-12">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-xl tracking-tight">Lumina</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold tracking-tight">Welcome back</h1>
            <p className="text-brand-500 font-medium">Continue your story where you left off.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-300 group-focus-within:text-brand-900 transition-colors" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-brand-50 border border-brand-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-900/10 focus:border-brand-900 transition-all placeholder:text-brand-200" 
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-semibold text-brand-700">Password</label>
                <Link to="/forgot-password" className="text-xs font-bold text-brand-400 hover:text-brand-900 transition-colors">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-300 group-focus-within:text-brand-900 transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-brand-50 border border-brand-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-900/10 focus:border-brand-900 transition-all placeholder:text-brand-200" 
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full h-14 text-sm font-bold uppercase tracking-widest gap-2 shadow-xl shadow-brand-900/10">
              Enter Studio
              <ArrowRight size={18} />
            </Button>
          </form>

          <p className="text-center text-sm text-brand-500">
            Don't have an account? <Link to="/signup" className="font-bold text-brand-900 hover:underline">Start for free</Link>
          </p>
        </motion.div>
      </div>

      {/* Right Column: Visualization */}
      <div className="hidden lg:flex bg-brand-50 items-center justify-center p-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-200/50 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-100/50 blur-[100px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-12 rounded-[3rem] border border-brand-200 shadow-2xl shadow-brand-900/5 relative z-10 space-y-8 max-w-lg"
        >
          <div className="w-16 h-16 bg-brand-900 rounded-2xl flex items-center justify-center text-white">
            <BookOpen size={32} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-bold leading-tight">Lumina was built for the next generation of storytellers.</h2>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand-900 border border-brand-800 flex items-center justify-center">
                <Sparkles size={16} className="text-brand-400" />
              </div>
              <div>
                <p className="font-bold text-brand-900">Crafting Excellence</p>
                <p className="text-xs text-brand-400 font-medium tracking-wide uppercase">Direct-to-Publish Workflow</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
