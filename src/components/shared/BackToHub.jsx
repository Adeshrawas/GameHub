import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Home } from 'lucide-react';

export default function BackToHub({ currentGameTitle = '' }) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Back Link & Logo */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-400 border border-slate-700/60 hover:border-indigo-500/40 transition-all duration-200 text-sm font-medium"
            title="Return to Game Hub"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Hub</span>
          </Link>

          <div className="hidden sm:flex items-center space-x-2 text-slate-500 text-sm">
            <span>/</span>
            <span className="flex items-center text-indigo-400 font-semibold tracking-wide">
              <Gamepad2 className="w-4 h-4 mr-1.5" />
              GameHub
            </span>
            {currentGameTitle && (
              <>
                <span>/</span>
                <span className="text-slate-200 font-medium">{currentGameTitle}</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Quick Homepage Nav */}
        <Link
          to="/"
          className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Portal Landing</span>
        </Link>
      </div>
    </header>
  );
}
