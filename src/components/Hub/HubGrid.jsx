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
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* ── Animated Opening Logo Splash ── */}
      {showSplash && <LogoSplash onFinish={() => setShowSplash(false)} />}

      {/* ── Top Header Navigation Bar with Logo Branding ── */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo Emblem Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 blur-sm opacity-70 group-hover:opacity-100 transition duration-200" />
              <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-indigo-500/50 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-5 h-5 text-indigo-400" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                GameHub
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase -mt-1">
                Arcade Suite
              </span>
            </div>
          </Link>

          {/* Top Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>15 Instant Mini-Games</span>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">

        {/* ── Hero Banner ── */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 sm:p-12 mb-10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold mb-5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant Web Mini-Game Arcade</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">GameHub</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
              Play 15 classic arcade, puzzle, strategy, and reaction games instantly in your browser.
              No sign-ups required. All high scores save automatically in LocalStorage!
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-slate-400 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-slate-200">15 Mini-Games</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">No Login Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span className="font-medium">Auto-Saved Scores</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category Filters + Search ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 text-slate-500 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
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
          <div className="text-center py-16 rounded-2xl bg-slate-900 border border-slate-800">
            <Gamepad2 className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-300 mb-1">No games found</h3>
            <p className="text-slate-500 text-sm">Try clearing your search query or choosing another category.</p>
          </div>
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-400 font-bold tracking-wider uppercase">GameHub Arcade Portal</span>
          </div>
          <span>Scores &amp; progress saved locally in browser LocalStorage</span>
        </div>
      </footer>
    </div>
  );
}
