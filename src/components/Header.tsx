import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { AnimationMode } from '../types';

interface HeaderProps {
  mode: AnimationMode;
  isActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({ mode, isActive }) => {
  return (
    <header id="formal-header" className="w-full border-b border-[#1e293b] bg-[#0a0a0a]/95 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Crest & Title */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-10 h-10 rounded border border-[#1e293b] bg-transparent flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#94a3b8]" strokeWidth={1.25} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.3em] font-medium uppercase text-[#475569]">
                Atmospheric Environment Control
              </span>
              <span className="inline-block w-1 h-1 rounded-full bg-[#334155]" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#334155] font-mono">
                SYS.0x822A
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-light tracking-[0.2em] uppercase text-[#f8fafc]">
              Atmospheric Effects Console
            </h1>
          </div>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-3">
          <div
            id="status-indicator"
            className={`hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs tracking-[0.15em] font-medium transition-all duration-500 ${
              isActive
                ? 'border-white/50 bg-white/5 text-white shadow-[0_0_20px_rgba(255,255,255,0.12)]'
                : 'border-[#1e293b] bg-transparent text-[#64748b]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                isActive ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-[#334155]'
              }`}
            />
            <span className="font-mono uppercase text-[10px]">
              {isActive
                ? mode === 'snowflakes'
                  ? 'Active: Snowfall [5.0s]'
                  : 'Active: Balloons [5.0s]'
                : 'System: Operational'}
            </span>
          </div>

          <div className="flex items-center text-[#475569] text-[10px] px-2.5 py-1 rounded border border-[#1e293b] font-mono tracking-[0.15em]">
            <Sparkles className="w-3 h-3 mr-1.5 text-[#64748b]" />
            <span>60 FPS</span>
          </div>
        </div>
      </div>
    </header>
  );
};
