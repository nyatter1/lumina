import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';
import { Mail, Lock, User, Github, Chrome, ArrowRight, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password);
      toast.success('Account created! Welcome to Lumina.');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white text-brand-900 font-sans">
      {/* Right Column: Content (Mobile first) */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-24 relative overflow-hidden order-2 lg:order-1">
        <div className="absolute top-12 left-12">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-bold text-xl tracking-tight">Lumina</span>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold tracking-tight">Start your journey</h1>
            <p className="text-brand-500 font-medium">Join 50,000+ authors crafting their masterpieces.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
             <div className="space-y-2">
              <label className="text-sm font-semibold text-brand-700 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-300 group-focus-within:text-brand-900 transition-colors" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-brand-50 border border-brand-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-900/10 focus:border-brand-900 transition-all placeholder:text-brand-200" 
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

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
              <label className="text-sm font-semibold text-brand-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-300 group-focus-within:text-brand-900 transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-brand-50 border border-brand-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-900/10 focus:border-brand-900 transition-all placeholder:text-brand-200" 
                  placeholder="Min. 8 characters"
                  required
                />
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full h-14 text-sm font-bold uppercase tracking-widest gap-2 shadow-xl shadow-brand-900/10">
              Create Free Account
              <ArrowRight size={18} />
            </Button>
          </form>

          <p className="text-center text-xs text-brand-400 leading-relaxed">
            By creating an account, you agree to our <br />
            <a href="#" className="font-bold text-brand-900 hover:underline">Terms of Service</a> and <a href="#" className="font-bold text-brand-900 hover:underline">Privacy Policy</a>.
          </p>
          
          <p className="text-center text-sm text-brand-500">
            Already have an account? <Link to="/login" className="font-bold text-brand-900 hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>

      {/* Left Column: Dark Aesthetic (Order 1) */}
      <div className="hidden lg:flex bg-brand-900 items-center justify-center p-24 overflow-hidden relative order-1 lg:order-2">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-brand-800 to-transparent opacity-50" />
        
        <div className="relative z-10 space-y-12 max-w-md">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand-900">
              <Zap size={32} />
            </div>
            <h2 className="text-5xl font-display font-bold leading-tight text-white tracking-tight">Focus on the <span className="text-brand-400 italic">writing.</span> We'll handle the rest.</h2>
          </div>

          <div className="space-y-6">
            {[
              "Real-time backup and sync",
              "Multi-device collaborative studio",
              "Professional type-setting formats",
              "Built-in community and feedback"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 text-brand-100">
                <div className="w-5 h-5 rounded-full bg-brand-800 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                </div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
