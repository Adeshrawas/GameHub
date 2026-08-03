import React from 'react';
import { Scissors, FileText, Shield, Sparkles } from 'lucide-react';

const CHOICES_CONFIG = [
  {
    id: 'rock',
    label: 'Rock',
    emoji: '🪨',
    icon: Shield,
    accent: 'bg-white hover:bg-slate-100 border-slate-200 hover:border-slate-900 text-slate-900',
    glow: 'shadow-2xs hover:shadow-md',
    ringColor: 'ring-slate-900',
    badgeBg: 'bg-slate-100 text-slate-900 border-slate-200 font-bold'
  },
  {
    id: 'paper',
    label: 'Paper',
    emoji: '📄',
    icon: FileText,
    accent: 'bg-white hover:bg-slate-100 border-slate-200 hover:border-slate-900 text-slate-900',
    glow: 'shadow-2xs hover:shadow-md',
    ringColor: 'ring-slate-900',
    badgeBg: 'bg-slate-100 text-slate-900 border-slate-200 font-bold'
  },
  {
    id: 'scissors',
    label: 'Scissors',
    emoji: '✂️',
    icon: Scissors,
    accent: 'bg-white hover:bg-slate-100 border-slate-200 hover:border-slate-900 text-slate-900',
    glow: 'shadow-2xs hover:shadow-md',
    ringColor: 'ring-slate-900',
    badgeBg: 'bg-slate-100 text-slate-900 border-slate-200 font-bold'
  }
];

export default function ChoiceButtons({ onSelectChoice, disabled = false, selectedChoice = null }) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-slate-900 tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-slate-900" />
          Choose Your Move
        </h3>
        <p className="text-xs text-slate-600 font-medium mt-1">
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
                border transition-all duration-200 transform
                ${item.accent}
                ${item.glow}
                ${disabled ? 'opacity-50 cursor-not-allowed scale-100' : 'hover:-translate-y-1 active:scale-95 cursor-pointer'}
                ${isSelected ? `ring-2 ${item.ringColor} scale-105 bg-slate-100` : ''}
              `}
            >
              {/* Top Choice Badge */}
              <div className="text-3xl sm:text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">
                {item.emoji}
              </div>

              <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold tracking-wider uppercase text-slate-900">
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
