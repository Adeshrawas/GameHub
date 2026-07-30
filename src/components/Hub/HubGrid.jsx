import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { gamesList } from '../../data/gamesList';
import GameCard from './GameCard';
import { Gamepad2, Search, Filter, Zap, ShieldCheck } from 'lucide-react';

export default function HubGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...new Set(gamesList.map(g => g.category))];

  const filteredGames = gamesList.filter(game => {
    const matchesCat    = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1">

        {/* ── Hero ── */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 sm:p-12 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-medium mb-5">
              <Zap className="w-3.5 h-3.5" />
              <span>Instant Web Mini-Game Arcade</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Welcome to <span className="text-slate-300">GameHub</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
              Play classic arcade, puzzle, and reaction games instantly in your browser.
              No sign-ups, no loading screens. High scores save automatically.
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-slate-400 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-slate-500" />
                <span>6 Mini-Games</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>No Login Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-slate-500" />
                <span>Scores Saved Locally</span>
              </div>
            </div>
          </div>
          {/* Start button */}
          <div className="flex justify-center mt-6">
            <Link to="/games">
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg transform transition hover:scale-105">
                Start
              </button>
            </Link>
          </div>
        </div>

        {/* ── Filters + Search ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-600 shrink-0 hidden sm:block" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
                  selectedCategory === cat ? 'pill-active' : 'pill-inactive'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs placeholder:text-slate-600 transition-colors"
            />
          </div>
        </div>

        {/* ── Game Cards Grid ── */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-xl bg-slate-900 border border-slate-800">
            <Gamepad2 className="w-10 h-10 text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-400 mb-1">No games found</h3>
            <p className="text-slate-600 text-sm">Try clearing your search or switching categories.</p>
          </div>
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800 bg-slate-900 py-5 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-slate-500" />
            <span className="text-slate-500 font-medium">GameHub Portal</span>
          </div>
          <span>Scores &amp; progress saved in LocalStorage</span>
        </div>
      </footer>
    </div>
  );
}
