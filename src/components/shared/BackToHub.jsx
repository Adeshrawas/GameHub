import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Home } from 'lucide-react';

export default function BackToHub({ currentGameTitle = '' }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 border-b border-sky-100 backdrop-blur-xl shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Back Link & Logo */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="group flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 hover:text-sky-800 border border-sky-200 hover:border-sky-300 transition-all duration-200 text-sm font-bold cursor-pointer"
            title="Return to Game Hub"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Hub</span>
          </Link>

          <div className="hidden sm:flex items-center space-x-2 text-slate-400 text-sm">
            <span>/</span>
            <Link to="/" className="flex items-center gap-1.5 font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
              <Gamepad2 className="w-4 h-4 text-sky-500" />
              GameHub
            </Link>
            {currentGameTitle && (
              <>
                <span>/</span>
                <span className="text-slate-800 font-bold">{currentGameTitle}</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Quick Homepage Nav */}
        <Link
          to="/"
          className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-sky-600 transition-colors font-medium"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Main Arcade</span>
        </Link>
      </div>
    </header>
  );
}
