import React from 'react';
import { Snowflake, RotateCcw, Clock, Layers, Wind, CheckCircle2 } from 'lucide-react';
import { AnimationMode } from '../types';

interface ControlConsoleProps {
  currentMode: AnimationMode;
  isActive: boolean;
  progress: number;
  remainingMs: number;
  onTriggerSnowflakes: () => void;
  onTriggerBalloons: () => void;
  onReset: () => void;
}

export const ControlConsole: React.FC<ControlConsoleProps> = ({
  currentMode,
  isActive,
  progress,
  remainingMs,
  onTriggerSnowflakes,
  onTriggerBalloons,
  onReset,
}) => {
  const remainingSeconds = (remainingMs / 1000).toFixed(2);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Elegant Dark Console Enclosure */}
      <div
        id="control-console"
        className="relative rounded-2xl border border-[#1e293b] bg-[#0c0c0c]/90 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl transition-all"
      >
        {/* Subtle decorative corner brackets for formal architectural look */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#1e293b] pointer-events-none" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#1e293b] pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#1e293b] pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#1e293b] pointer-events-none" />

        {/* Console Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1e293b] bg-transparent text-[#475569] text-[10px] tracking-[0.25em] uppercase mb-3">
            <Layers className="w-3.5 h-3.5 text-[#64748b]" />
            <span>Atmospheric Environment Control</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extralight tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#f8fafc]">
            Orchestrator
          </h2>
          <p className="mt-3 text-xs tracking-[0.2em] uppercase text-[#475569] max-w-xl mx-auto leading-relaxed">
            Select an atmospheric sequence. Medium-scale physics particles render smoothly for 5.0 seconds and reset after each click.
          </p>
        </div>

        {/* Primary Action Buttons: Snowflakes & Balloons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
          {/* Button 1: Snowflakes */}
          <button
            id="btn-snowflakes"
            type="button"
            onClick={onTriggerSnowflakes}
            className={`group relative overflow-hidden rounded-xl p-6 sm:p-7 text-left transition-all duration-500 cursor-pointer border ${
              currentMode === 'snowflakes' && isActive
                ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] -translate-y-1'
                : 'bg-transparent text-[#94a3b8] border-[#1e293b] hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-1'
            }`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`w-11 h-11 rounded-lg border flex items-center justify-center transition-colors duration-500 ${
                  currentMode === 'snowflakes' && isActive
                    ? 'border-black/20 bg-black/5 text-black'
                    : 'border-[#1e293b] bg-transparent text-[#94a3b8] group-hover:border-black/20 group-hover:bg-black/5 group-hover:text-black'
                }`}
              >
                <Snowflake className="w-5 h-5 animate-[spin_16s_linear_infinite]" />
              </div>
              <span
                className={`text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded border transition-colors duration-500 ${
                  currentMode === 'snowflakes' && isActive
                    ? 'border-black/30 bg-black/10 text-black font-semibold'
                    : 'border-[#1e293b] bg-transparent text-[#64748b] group-hover:border-black/20 group-hover:text-black'
                }`}
              >
                {currentMode === 'snowflakes' && isActive ? 'Active' : 'Trigger'}
              </span>
            </div>

            <div className="mt-5">
              <h3 className="text-base sm:text-lg font-light tracking-[0.2em] uppercase text-current flex items-center gap-2">
                Snowflakes
              </h3>
              <p
                className={`mt-1.5 text-xs leading-relaxed transition-colors duration-500 ${
                  currentMode === 'snowflakes' && isActive
                    ? 'text-neutral-700'
                    : 'text-[#64748b] group-hover:text-neutral-700'
                }`}
              >
                Medium crystalline snowflakes descending top-to-bottom with gentle rotational sway.
              </p>
            </div>

            <div
              className={`mt-5 pt-4 border-t flex items-center justify-between text-[10px] tracking-[0.15em] font-mono uppercase transition-colors duration-500 ${
                currentMode === 'snowflakes' && isActive
                  ? 'border-black/15 text-neutral-800'
                  : 'border-[#1e293b] text-[#64748b] group-hover:border-black/15 group-hover:text-neutral-800'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 5.0 Seconds
              </span>
              <span className="font-semibold">
                {currentMode === 'snowflakes' && isActive ? 'Restart ↺' : 'Engage →'}
              </span>
            </div>
          </button>

          {/* Button 2: Balloons */}
          <button
            id="btn-balloons"
            type="button"
            onClick={onTriggerBalloons}
            className={`group relative overflow-hidden rounded-xl p-6 sm:p-7 text-left transition-all duration-500 cursor-pointer border ${
              currentMode === 'balloons' && isActive
                ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] -translate-y-1'
                : 'bg-transparent text-[#94a3b8] border-[#1e293b] hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-1'
            }`}
          >
            <div className="flex items-start justify-between">
              <div
                className={`w-11 h-11 rounded-lg border flex items-center justify-center transition-colors duration-500 ${
                  currentMode === 'balloons' && isActive
                    ? 'border-black/20 bg-black/5 text-black'
                    : 'border-[#1e293b] bg-transparent text-[#94a3b8] group-hover:border-black/20 group-hover:bg-black/5 group-hover:text-black'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C7.5 2 4 5.5 4 10c0 4 3 7.5 8 8 5-.5 8-4 8-8 0-4.5-3.5-8-8-8z" />
                  <path d="M12 18v1" />
                  <path d="M11 19h2" />
                  <path d="M12 19c-1 2-2 3-1 5" />
                </svg>
              </div>
              <span
                className={`text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded border transition-colors duration-500 ${
                  currentMode === 'balloons' && isActive
                    ? 'border-black/30 bg-black/10 text-black font-semibold'
                    : 'border-[#1e293b] bg-transparent text-[#64748b] group-hover:border-black/20 group-hover:text-black'
                }`}
              >
                {currentMode === 'balloons' && isActive ? 'Active' : 'Trigger'}
              </span>
            </div>

            <div className="mt-5">
              <h3 className="text-base sm:text-lg font-light tracking-[0.2em] uppercase text-current flex items-center gap-2">
                Balloons
              </h3>
              <p
                className={`mt-1.5 text-xs leading-relaxed transition-colors duration-500 ${
                  currentMode === 'balloons' && isActive
                    ? 'text-neutral-700'
                    : 'text-[#64748b] group-hover:text-neutral-700'
                }`}
              >
                Medium celebratory balloons ascending bottom-to-top with aerodynamic buoyant swaying.
              </p>
            </div>

            <div
              className={`mt-5 pt-4 border-t flex items-center justify-between text-[10px] tracking-[0.15em] font-mono uppercase transition-colors duration-500 ${
                currentMode === 'balloons' && isActive
                  ? 'border-black/15 text-neutral-800'
                  : 'border-[#1e293b] text-[#64748b] group-hover:border-black/15 group-hover:text-neutral-800'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> 5.0 Seconds
              </span>
              <span className="font-semibold">
                {currentMode === 'balloons' && isActive ? 'Restart ↺' : 'Engage →'}
              </span>
            </div>
          </button>
        </div>

        {/* Real-time Sequence Progress Monitor */}
        <div className="rounded-xl border border-[#1e293b] bg-[#080808] p-4 sm:p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                  isActive
                    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    : 'bg-[#334155]'
                }`}
              />
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#94a3b8]">
                {isActive
                  ? currentMode === 'snowflakes'
                    ? 'Sequence: Snowflakes in Progress'
                    : 'Sequence: Balloons in Progress'
                  : 'System: Operational • Ready'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-mono tracking-[0.15em] uppercase">
              <div className="text-[#64748b]">
                Remaining:{' '}
                <span className={`font-semibold ${isActive ? 'text-[#f8fafc]' : 'text-[#475569]'}`}>
                  {isActive ? `${remainingSeconds}s` : '5.00s'}
                </span>
              </div>
              <div className="text-[#64748b]">
                Elapsed:{' '}
                <span className={`font-semibold ${isActive ? 'text-[#f8fafc]' : 'text-[#475569]'}`}>
                  {isActive ? `${Math.round(progress * 100)}%` : '0%'}
                </span>
              </div>
            </div>
          </div>

          {/* Precision Meter Bar */}
          <div className="w-full h-1.5 rounded-full bg-[#1e293b] overflow-hidden relative">
            <div
              className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-75 ease-linear"
              style={{ width: isActive ? `${progress * 100}%` : '0%' }}
            />
          </div>
        </div>

        {/* Sub-controls & Reset Command */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1e293b]">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-[#475569] font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#94a3b8] shrink-0" />
            <span>Clicking either button resets and initiates a fresh 5s sequence immediately.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              id="btn-reset"
              type="button"
              onClick={onReset}
              disabled={!isActive && currentMode === 'none'}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#1e293b] bg-transparent hover:bg-white hover:text-black hover:border-white text-[10px] font-mono tracking-[0.2em] uppercase text-[#94a3b8] transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Specifications & Formal Parameters Card */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
        <div className="rounded-xl border border-[#1e293b] bg-[#0c0c0c]/60 p-4">
          <div className="flex items-center gap-2 font-medium text-[#94a3b8] mb-2 font-mono uppercase tracking-[0.2em] text-[10px]">
            <Snowflake className="w-3.5 h-3.5 text-[#94a3b8]" />
            Snowflakes Specifications
          </div>
          <ul className="space-y-1.5 text-[#64748b] leading-relaxed text-[11px]">
            <li className="flex justify-between border-b border-[#1e293b]/60 pb-1">
              <span className="uppercase tracking-wider">Scale:</span>{' '}
              <span className="font-mono text-slate-300">Medium (Ø 26–36px)</span>
            </li>
            <li className="flex justify-between border-b border-[#1e293b]/60 pb-1">
              <span className="uppercase tracking-wider">Trajectory:</span>{' '}
              <span className="font-mono text-slate-300">Top → Bottom</span>
            </li>
            <li className="flex justify-between border-b border-[#1e293b]/60 pb-1">
              <span className="uppercase tracking-wider">Duration:</span>{' '}
              <span className="font-mono text-slate-300">5.0s (Precise)</span>
            </li>
            <li className="flex justify-between">
              <span className="uppercase tracking-wider">Dynamics:</span>{' '}
              <span className="font-mono text-slate-300">Symmetrical 6-fold crystal sway</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-[#1e293b] bg-[#0c0c0c]/60 p-4">
          <div className="flex items-center gap-2 font-medium text-[#94a3b8] mb-2 font-mono uppercase tracking-[0.2em] text-[10px]">
            <Wind className="w-3.5 h-3.5 text-[#94a3b8]" />
            Balloons Specifications
          </div>
          <ul className="space-y-1.5 text-[#64748b] leading-relaxed text-[11px]">
            <li className="flex justify-between border-b border-[#1e293b]/60 pb-1">
              <span className="uppercase tracking-wider">Scale:</span>{' '}
              <span className="font-mono text-slate-300">Medium (38×52px + String)</span>
            </li>
            <li className="flex justify-between border-b border-[#1e293b]/60 pb-1">
              <span className="uppercase tracking-wider">Trajectory:</span>{' '}
              <span className="font-mono text-slate-300">Bottom → Top</span>
            </li>
            <li className="flex justify-between border-b border-[#1e293b]/60 pb-1">
              <span className="uppercase tracking-wider">Duration:</span>{' '}
              <span className="font-mono text-slate-300">5.0s (Precise)</span>
            </li>
            <li className="flex justify-between">
              <span className="uppercase tracking-wider">Dynamics:</span>{' '}
              <span className="font-mono text-slate-300">Buoyant lateral wobble & string</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
