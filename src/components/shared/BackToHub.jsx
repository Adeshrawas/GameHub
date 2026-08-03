import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Home } from 'lucide-react';

export default function BackToHub({ currentGameTitle = '' }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 border-b border-slate-200 backdrop-blur-xl shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Back Link & Logo */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white border border-slate-900 transition-all duration-200 text-sm font-bold cursor-pointer shadow-2xs"
            title="Return to Game Hub"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Hub</span>
          </Link>

          <div className="hidden sm:flex items-center space-x-2 text-slate-400 text-sm">
            <span>/</span>
            <Link to="/" className="flex items-center gap-1.5 font-black uppercase tracking-wider text-slate-900 hover:text-black">
              <Gamepad2 className="w-4 h-4 text-slate-900" />
              GameHub
            </Link>
            {currentGameTitle && (
              <>
                <span>/</span>
                <span className="text-slate-900 font-bold">{currentGameTitle}</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Quick Homepage Nav */}
        <Link
          to="/"
          className="flex items-center space-x-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors font-medium"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Main Arcade</span>
        </Link>
      </div>
    </header>
  );
}
