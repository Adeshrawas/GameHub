import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gamesList } from '../../data/gamesList';
import GameCard from './GameCard';
import LogoSplash from './LogoSplash';
import { Gamepad2, Search, Filter, Zap, ShieldCheck, Sparkles, Trophy } from 'lucide-react';

export default function HubGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash screen once per browser session
    try {
      const hasSeen = sessionStorage.getItem('gamehub_splash_seen');
      if (!hasSeen) {
        sessionStorage.setItem('gamehub_splash_seen', 'true');
        return true;
      }
      return false;
    } catch {
      return true;
    }
  });

  const categories = ['All', ...new Set(gamesList.map((g) => g.category))];

  const filteredGames = gamesList.filter((game) => {
    const matchesCat = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch =
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-slate-900 selection:text-white">
      
      {/* ── Animated Opening Logo Splash ── */}
      {showSplash && <LogoSplash onFinish={() => setShowSplash(false)} />}

      {/* ── Top Header Navigation Bar with Logo Branding ── */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo Emblem Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-slate-900 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-2xs">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider uppercase text-slate-900">
                GameHub
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase -mt-1">
                Arcade Suite
              </span>
            </div>
          </Link>

          {/* Top Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-900 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>15 Instant Mini-Games</span>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">

        {/* ── Hero Banner ── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 via-white to-slate-50 border border-slate-200/90 p-8 sm:p-12 mb-10 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-slate-900 text-white text-xs font-extrabold mb-5 shadow-2xs">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
              <span>Instant Web Mini-Game Arcade</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Welcome to <span className="text-slate-900 underline underline-offset-4 decoration-2">GameHub</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 font-medium">
              Play 15 classic arcade, puzzle, strategy, and reaction games instantly in your browser —
              no installs, no sign-ups. High scores are saved automatically!
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-slate-600 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-slate-900" />
                <span className="font-bold text-slate-900">15 Mini-Games</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-900" />
                <span className="font-semibold text-slate-800">No Login Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-slate-900" />
                <span className="font-semibold text-slate-800">Auto-Saved Scores</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category Filters + Search ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white border border-slate-900 shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-400 font-bold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all shadow-2xs"
            />
          </div>
        </div>

        {/* ── Game Cards Grid ── */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <Gamepad2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No games found</h3>
            <p className="text-slate-500 text-sm">Try clearing your search query or choosing another category.</p>
          </div>
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-slate-900" />
            <span className="text-slate-900 font-bold tracking-wider uppercase">GameHub Arcade Portal</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center">
            <span>Scores &amp; progress saved locally in browser LocalStorage</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span>&copy; {new Date().getFullYear()} GameHub. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
