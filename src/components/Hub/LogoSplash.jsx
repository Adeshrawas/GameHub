import React, { useState, useEffect } from 'react';
import { Gamepad2, Sparkles, Zap } from 'lucide-react';

export default function LogoSplash({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show splash screen for 1.8 seconds then fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onFinish) onFinish();
      }, 500);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      onClick={() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsVisible(false);
          if (onFinish) onFinish();
        }, 300);
      }}
      className={`
        fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-slate-100 cursor-pointer
        transition-opacity duration-500 ease-out select-none
        ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
    >
      {/* Background Animated Neon Glows */}
      <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-300" />

      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center space-y-6 text-center animate-fade-in">
        
        {/* Animated Glowing Controller Logo Icon */}
        <div className="relative group">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-80 group-hover:opacity-100 animate-pulse transition duration-500" />
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-slate-900 border-2 border-indigo-500/50 shadow-2xl flex items-center justify-center transform transition-transform hover:scale-105">
            <Gamepad2 className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-6xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 drop-shadow-md">
            GameHub
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            15-in-1 Arcade Suite
          </div>
        </div>

        {/* Animated Loading Bar */}
        <div className="w-48 h-1.5 bg-slate-900 rounded-full border border-slate-800 overflow-hidden mt-4">
          <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse rounded-full w-full transform -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>

        <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-2">
          Click anywhere to skip
        </span>
      </div>
    </div>
  );
}
