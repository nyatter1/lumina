import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { 
  BookOpen, 
  Users, 
  Sparkles, 
  Zap, 
  Shield, 
  Download,
  PenTool,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Landing() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Write together with your editor or co-author. See live cursors and sync instantly."
    },
    {
      icon: PenTool,
      title: "Immersive Writing Studio",
      description: "A distraction-free environment with focus mode, custom themes, and rich markdown support."
    },
    {
      icon: Download,
      title: "Professional Export",
      description: "Generate print-ready PDFs, EPUBs, and DOCX files with one click. Custom templates included."
    },
    {
      icon: Shield,
      title: "Secure Cloud Storage",
      description: "Your work is automatically saved and backed up. Version history lets you undo any mistake."
    },
    {
      icon: Users,
      title: "Community & Beta Readers",
      description: "Share your manuscripts with beta readers and get structured feedback in-line."
    },
    {
      icon: Trophy,
      title: "Writing Goals & Streaks",
      description: "Stay motivated with daily word count targets, writing streaks, and gamified achievements."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-brand-900 overflow-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-brand-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl tracking-tighter text-brand-900">Lumina</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-brand-600 hover:text-brand-900 transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-brand-600 hover:text-brand-900 transition-colors">Workspace</a>
            <a href="#community" className="text-sm font-medium text-brand-600 hover:text-brand-900 transition-colors">Community</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">Get Started — Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-xs font-semibold mb-4"
          >
            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            <span>Used by 50,000+ authors worldwide</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-8xl font-display font-bold tracking-tight leading-[1.1]"
          >
            Where Masterpieces Are <span className="text-brand-400 italic">Crafted.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-brand-500 max-w-2xl mx-auto leading-relaxed"
          >
            The premium collaborative writing studio for modern authors. From first draft to professional publication, Lumina powers your entire journey.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 group">
                Start Writing Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-10">
                View Interactive Demo
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Hero Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-30">
          <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-brand-100 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-brand-200 rounded-full blur-[140px]" />
          <div className="absolute bottom-[10%] left-[30%] w-64 h-64 bg-indigo-50 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* App Preview Mockup */}
      <section className="px-6 pb-20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto bg-white rounded-3xl border border-brand-200 shadow-2xl shadow-brand-900/10 overflow-hidden aspect-[16/10] relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-50/50 to-transparent pointer-events-none" />
          <div className="bg-brand-50 border-b border-brand-200 p-3 flex items-center gap-2">
            <div className="flex gap-1.5 ml-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="mx-auto bg-white border border-brand-200 px-4 py-1 rounded-lg text-[10px] text-brand-400 font-mono">
              app.lumina.io/project/the-silent-echo
            </div>
          </div>
          <div className="flex h-full bg-white">
            <div className="w-64 border-r border-brand-100 p-6 hidden md:block">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="h-2 w-24 bg-brand-100 rounded-full" />
                  <div className="h-2 w-32 bg-brand-200 rounded-full" />
                  <div className="h-2 w-20 bg-brand-100 rounded-full" />
                </div>
                <div className="pt-6 space-y-4">
                  <div className="h-10 w-full bg-brand-900 rounded-xl" />
                  <div className="h-8 w-full bg-brand-50 rounded-lg" />
                  <div className="h-8 w-full bg-brand-50 rounded-lg" />
                  <div className="h-8 w-full bg-brand-50 rounded-lg" />
                </div>
              </div>
            </div>
            <div className="flex-1 p-12 lg:p-24 space-y-12">
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="h-12 w-3/4 bg-brand-50 rounded-xl" />
                <div className="space-y-3">
                  <div className="h-4 w-full bg-brand-50 rounded-lg" />
                  <div className="h-4 w-full bg-brand-50 rounded-lg" />
                  <div className="h-4 w-5/6 bg-brand-50 rounded-lg" />
                </div>
                <div className="pt-8 space-y-3">
                  <div className="h-4 w-full bg-brand-50 rounded-lg" />
                  <div className="h-4 w-4/5 bg-brand-50 rounded-lg" />
                  <div className="h-4 w-full bg-brand-50 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
          {/* Presence Indicators Mockup */}
          <div className="absolute top-24 right-12 flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">JD</div>
            <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">SK</div>
            <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">LM</div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-brand-50/50 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-brand-900 tracking-tight">Built for Serious Storytellers</h2>
            <p className="text-lg text-brand-500 max-w-2xl mx-auto">Everything you need to move from "First Draft" to "Bestseller."</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-brand-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5 transition-all group"
              >
                <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 text-brand-900 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-brand-900">{feature.title}</h3>
                <p className="text-brand-500 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-brand-900 rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/10 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-6xl font-display font-bold tracking-tight">Your story deserves a <br /><span className="text-brand-400 italic">premium</span> home.</h2>
            <p className="text-lg text-brand-300 max-w-xl mx-auto leading-relaxed">Join 50,000+ writers who choose Lumina for their creative workspace. Get started today for free.</p>
            <div className="pt-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-brand-900 hover:bg-brand-50 h-16 px-12 text-lg">
                  Create Your First Project
                </Button>
              </Link>
            </div>
            <p className="text-sm text-brand-400">No credit card required. Free tier forever.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-brand-100 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-brand-400">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-brand-900">Lumina</span>
            <span className="ml-4">© 2026 Lumina Studio Inc.</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-brand-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-brand-900 transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
