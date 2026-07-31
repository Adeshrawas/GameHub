import React from 'react';
import { Scissors, FileText, Shield, Sparkles } from 'lucide-react';

const CHOICES_CONFIG = [
  {
    id: 'rock',
    label: 'Rock',
    emoji: '🪨',
    icon: Shield,
    accent: 'from-amber-500/20 to-orange-600/20 hover:from-amber-500/30 hover:to-orange-600/30 border-amber-500/40 text-amber-400',
    glow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.45)]',
    ringColor: 'ring-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
  },
  {
    id: 'paper',
    label: 'Paper',
    emoji: '📄',
    icon: FileText,
    accent: 'from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 border-cyan-500/40 text-cyan-400',
    glow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_35px_rgba(6,182,212,0.45)]',
    ringColor: 'ring-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
  },
  {
    id: 'scissors',
    label: 'Scissors',
    emoji: '✂️',
    icon: Scissors,
    accent: 'from-purple-500/20 to-pink-600/20 hover:from-purple-500/30 hover:to-pink-600/30 border-purple-500/40 text-purple-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:shadow-[0_0_35px_rgba(168,85,247,0.45)]',
    ringColor: 'ring-purple-400',
    badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30'
  }
];

export default function ChoiceButtons({ onSelectChoice, disabled = false, selectedChoice = null }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-slate-200 tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Choose Your Move
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Select Rock, Paper, or Scissors to challenge the computer
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {CHOICES_CONFIG.map((item) => {
          const IconComponent = item.icon;
          const isSelected = selectedChoice === item.id;

          return (
            <button
              key={item.id}
              onClick={() => !disabled && onSelectChoice(item.id)}
              disabled={disabled}
              className={`
                group relative flex flex-col items-center justify-center p-5 sm:p-7 rounded-2xl
                bg-gradient-to-b border backdrop-blur-md transition-all duration-300 transform
                ${item.accent}
                ${item.glow}
                ${disabled ? 'opacity-50 cursor-not-allowed scale-100' : 'hover:-translate-y-1.5 active:scale-95 cursor-pointer'}
                ${isSelected ? `ring-2 ${item.ringColor} scale-105 bg-slate-800/90` : ''}
              `}
            >
              {/* Top Choice Badge */}
              <div className="text-3xl sm:text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">
                {item.emoji}
              </div>

              <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold tracking-wider uppercase">
                <IconComponent className="w-4 h-4 opacity-80" />
                <span>{item.label}</span>
              </div>

              {/* Subtext info */}
              <span className={`mt-2 text-[10px] sm:text-xs px-2 py-0.5 rounded-full border ${item.badgeBg}`}>
                {item.id === 'rock' ? 'Beats Scissors' : item.id === 'paper' ? 'Beats Rock' : 'Beats Paper'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
