import React from 'react';
import { GraduationCap, BookOpen, Bot, Sparkles, User, Flame, Award } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: 'catalog' | 'viewer' | 'tutor' | 'generator' | 'dashboard';
  setActiveTab: (tab: 'catalog' | 'viewer' | 'tutor' | 'generator' | 'dashboard') => void;
  user: UserProfile;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, user }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('catalog')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
              LearnVerse
            </span>
            <span className="block text-xs font-medium text-indigo-400 tracking-wider uppercase">
              AI Academy
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800/80 shadow-inner">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'catalog' || activeTab === 'viewer'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses</span>
          </button>

          <button
            onClick={() => setActiveTab('tutor')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'tutor'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Bot className="w-4 h-4 text-purple-400" />
            <span>AI Tutor</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'generator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>AI Course Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        </nav>

        {/* User Stats (Streak & XP) */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
            <span className="text-xs font-bold text-amber-300">{user.streak} Day Streak</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300">{user.xp} XP</span>
          </div>

          <div 
            onClick={() => setActiveTab('dashboard')}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500/50 cursor-pointer hover:scale-105 transition-transform"
          >
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden flex items-center justify-around bg-slate-950 border-t border-slate-800 py-3 px-2">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`flex flex-col items-center space-y-1 text-xs ${
            activeTab === 'catalog' || activeTab === 'viewer' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Courses</span>
        </button>
        <button
          onClick={() => setActiveTab('tutor')}
          className={`flex flex-col items-center space-y-1 text-xs ${
            activeTab === 'tutor' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Bot className="w-5 h-5" />
          <span>AI Tutor</span>
        </button>
        <button
          onClick={() => setActiveTab('generator')}
          className={`flex flex-col items-center space-y-1 text-xs ${
            activeTab === 'generator' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Studio</span>
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center space-y-1 text-xs ${
            activeTab === 'dashboard' ? 'text-indigo-400 font-bold' : 'text-slate-400'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </div>
    </header>
  );
};
