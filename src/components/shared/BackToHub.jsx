import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Home } from 'lucide-react';

export default function BackToHub({ currentGameTitle = '' }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Back Link & Logo */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-300 border border-slate-800 hover:border-indigo-500/40 transition-all duration-200 text-sm font-semibold cursor-pointer"
            title="Return to Game Hub"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Hub</span>
          </Link>

          <div className="hidden sm:flex items-center space-x-2 text-slate-500 text-sm">
            <span>/</span>
            <Link to="/" className="flex items-center gap-1.5 font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              <Gamepad2 className="w-4 h-4 text-indigo-400" />
              GameHub
            </Link>
            {currentGameTitle && (
              <>
                <span>/</span>
                <span className="text-slate-200 font-bold">{currentGameTitle}</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Quick Homepage Nav */}
        <Link
          to="/"
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-indigo-300 transition-colors font-medium"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Main Arcade</span>
        </Link>
      </div>
    </header>
  );
}
