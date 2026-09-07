export type AnimationMode = 'none' | 'snowflakes' | 'balloons';

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swayPhase: number;
  swaySpeed: number;
  swayAmplitude: number;
  color?: string;
  stringLength?: number;
  patternType?: number;
}

export interface AnimationState {
  mode: AnimationMode;
  startTime: number | null;
  durationMs: number;
  remainingMs: number;
  progress: number;
  runId: number;
}
