/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { AnimationMode } from './types';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { Header } from './components/Header';
import { ControlConsole } from './components/ControlConsole';

export default function App() {
  const [mode, setMode] = useState<AnimationMode>('none');
  const [runId, setRunId] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [remainingMs, setRemainingMs] = useState<number>(5000);

  // Trigger Snowflakes animation for 5 seconds (resets any ongoing sequence)
  const handleTriggerSnowflakes = useCallback(() => {
    setMode('snowflakes');
    setRunId((prev) => prev + 1);
    setIsActive(true);
    setProgress(0);
    setRemainingMs(5000);
  }, []);

  // Trigger Balloons animation for 5 seconds (resets any ongoing sequence)
  const handleTriggerBalloons = useCallback(() => {
    setMode('balloons');
    setRunId((prev) => prev + 1);
    setIsActive(true);
    setProgress(0);
    setRemainingMs(5000);
  }, []);

  // Reset/halt animation
  const handleReset = useCallback(() => {
    setMode('none');
    setRunId((prev) => prev + 1);
    setIsActive(false);
    setProgress(0);
    setRemainingMs(5000);
  }, []);

  // Handle animation sequence completion after 5000ms
  const handleAnimationEnd = useCallback(() => {
    setIsActive(false);
    setProgress(1);
    setRemainingMs(0);
  }, []);

  // Update progress in real time
  const handleProgress = useCallback((prog: number, remaining: number) => {
    setProgress(prog);
    setRemainingMs(remaining);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f8fafc] flex flex-col justify-between overflow-x-hidden selection:bg-white selection:text-black font-sans">
      {/* Background subtle formal textures */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle obsidian vignette gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(30,41,59,0.2),rgba(10,10,10,0.98))]" />
        {/* Subtle geometric architectural grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* 60 FPS Particle Canvas Overlay for Snowflakes & Balloons */}
      <AtmosphereCanvas
        mode={mode}
        runId={runId}
        durationMs={5000}
        onAnimationEnd={handleAnimationEnd}
        onProgress={handleProgress}
      />

      {/* Formal Header */}
      <Header mode={mode} isActive={isActive} />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14 max-w-6xl mx-auto w-full">
        <ControlConsole
          currentMode={mode}
          isActive={isActive}
          progress={progress}
          remainingMs={remainingMs}
          onTriggerSnowflakes={handleTriggerSnowflakes}
          onTriggerBalloons={handleTriggerBalloons}
          onReset={handleReset}
        />
      </main>

      {/* Elegant Dark Status Bar Footer */}
      <footer className="relative z-10 border-t border-[#1e293b] py-6 text-center text-[10px] text-[#334155] uppercase tracking-[2px]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-sm bg-[#334155]" />
            <span>EXECUTIVE PRESENTATION SYSTEM</span>
          </div>
          <div>5.0-SECOND DETERMINISTIC ANIMATION ENGINE</div>
          <div>STATUS: {isActive ? 'ACTIVE DISPATCH [5.0S]' : 'SYSTEM OPERATIONAL'}</div>
        </div>
      </footer>
    </div>
  );
}

