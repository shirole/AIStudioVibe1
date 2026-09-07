import React, { useEffect, useRef } from 'react';
import { AnimationMode, Particle } from '../types';

interface AtmosphereCanvasProps {
  mode: AnimationMode;
  runId: number;
  durationMs?: number;
  onAnimationEnd?: () => void;
  onProgress?: (progress: number, remainingMs: number) => void;
}

// Elegant Dark balloon color palette
const BALLOON_COLORS = [
  { body: '#9f1239', highlight: '#f43f5e', knot: '#4c0519' }, // Elegant Wine / Bordeaux (#9f1239)
  { body: '#1e3a8a', highlight: '#60a5fa', knot: '#172554' }, // Royal Midnight Navy (#1e3a8a)
  { body: '#064e3b', highlight: '#34d399', knot: '#022c22' }, // Sovereign Deep Emerald (#064e3b)
  { body: '#78350f', highlight: '#fbbf24', knot: '#451a03' }, // Imperial Bronze / Amber (#78350f)
  { body: '#581c87', highlight: '#c084fc', knot: '#3b0764' }, // Regal Deep Purple (#581c87)
];

export const AtmosphereCanvas: React.FC<AtmosphereCanvasProps> = ({
  mode,
  runId,
  durationMs = 5000,
  onAnimationEnd,
  onProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const startTime = performance.now();
    let isFinished = false;

    // Adjust canvas resolution to device pixel ratio
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (mode === 'none') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }

    // Helper: spawn single snowflake
    const spawnSnowflake = (startY?: number): Particle => {
      const width = window.innerWidth;
      // Medium size: radius 13 to 18px (diameter ~26px to 36px)
      const size = 13 + Math.random() * 5;
      return {
        id: Math.random(),
        x: Math.random() * width,
        y: startY !== undefined ? startY : -size - Math.random() * 40,
        // Moderate downward velocity (130px - 220px / sec)
        vy: 2.2 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.4,
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.85 + Math.random() * 0.15,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.02 + Math.random() * 0.02,
        swayAmplitude: 0.8 + Math.random() * 1.2,
        patternType: Math.floor(Math.random() * 3),
      };
    };

    // Helper: spawn single balloon
    const spawnBalloon = (startY?: number): Particle => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Medium size: radius 18 to 24px (width 36px-48px, height 48px-62px)
      const size = 18 + Math.random() * 6;
      const colorIndex = Math.floor(Math.random() * BALLOON_COLORS.length);
      return {
        id: Math.random(),
        x: 30 + Math.random() * (width - 60),
        y: startY !== undefined ? startY : height + size * 2 + Math.random() * 50,
        // Upward velocity (160px - 260px / sec)
        vy: -(2.6 + Math.random() * 1.6),
        vx: (Math.random() - 0.5) * 0.3,
        size,
        rotation: (Math.random() - 0.5) * 0.15,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        opacity: 0.95,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.025 + Math.random() * 0.02,
        swayAmplitude: 0.9 + Math.random() * 1.0,
        color: colorIndex.toString(),
        stringLength: 48 + Math.random() * 20,
      };
    };

    // Populate initial batch
    const initialCount = mode === 'snowflakes' ? 45 : 28;
    for (let i = 0; i < initialCount; i++) {
      if (mode === 'snowflakes') {
        // Distribute some initially across the top portion of screen for instant visual gratification
        const initialY = -20 + (Math.random() * window.innerHeight * 0.7);
        particles.push(spawnSnowflake(initialY));
      } else {
        // Distribute some starting from bottom and just below the screen
        const initialY = window.innerHeight * 0.3 + (Math.random() * window.innerHeight * 0.8);
        particles.push(spawnBalloon(initialY));
      }
    }

    let lastSpawnTime = startTime;
    const spawnInterval = mode === 'snowflakes' ? 70 : 120; // continuous stream during 5s

    // Draw intricate medium snowflake
    const drawSnowflake = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      // Soft crystalline cyan-white glow
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(219, 234, 254, 0.75)';
      ctx.strokeStyle = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';

      const r = p.size;
      const branches = 6;
      const angleStep = (Math.PI * 2) / branches;

      // Draw 6 symmetrical arms
      for (let i = 0; i < branches; i++) {
        const a = i * angleStep;
        ctx.save();
        ctx.rotate(a);

        // Main spine
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, r);
        ctx.stroke();

        // Chevrons / sub-branches
        const p1 = r * 0.45;
        const bLen1 = r * 0.35;
        ctx.beginPath();
        ctx.moveTo(0, p1);
        ctx.lineTo(-bLen1 * 0.7, p1 + bLen1 * 0.7);
        ctx.moveTo(0, p1);
        ctx.lineTo(bLen1 * 0.7, p1 + bLen1 * 0.7);
        ctx.stroke();

        const p2 = r * 0.75;
        const bLen2 = r * 0.3;
        ctx.beginPath();
        ctx.moveTo(0, p2);
        ctx.lineTo(-bLen2 * 0.7, p2 + bLen2 * 0.7);
        ctx.moveTo(0, p2);
        ctx.lineTo(bLen2 * 0.7, p2 + bLen2 * 0.7);
        ctx.stroke();

        // Tip crystal point
        ctx.beginPath();
        ctx.arc(0, r, 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Central hexagonal facet
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = i * angleStep;
        const hx = Math.cos(a) * (r * 0.22);
        const hy = Math.sin(a) * (r * 0.22);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    };

    // Draw medium formal balloon
    const drawBalloon = (p: Particle, time: number) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      const palette = BALLOON_COLORS[Number(p.color) || 0];
      const r = p.size; // 18 - 24px
      const height = r * 2.4; // 43 - 58px

      // 1. Draw trailing thread / string
      const stringLen = p.stringLength || 55;
      const sway = Math.sin(time * 0.004 + p.swayPhase) * 12;
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.55)';
      ctx.lineWidth = 1.3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(0, height * 0.48);
      ctx.bezierCurveTo(
        sway * 0.4,
        height * 0.48 + stringLen * 0.35,
        -sway * 0.7,
        height * 0.48 + stringLen * 0.7,
        sway * 0.3,
        height * 0.48 + stringLen
      );
      ctx.stroke();
      ctx.restore();

      // 2. Draw tied neck / knot
      ctx.save();
      ctx.fillStyle = palette.knot;
      ctx.beginPath();
      const knotW = r * 0.25;
      const knotY = height * 0.46;
      ctx.moveTo(-knotW, knotY);
      ctx.lineTo(knotW, knotY);
      ctx.lineTo(knotW * 0.6, knotY + 4);
      ctx.lineTo(-knotW * 0.6, knotY + 4);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // 3. Draw balloon body (egg-shaped oval with bezier curves)
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';

      // Gradient shading for 3D metallic/latex volume
      const grad = ctx.createRadialGradient(
        -r * 0.3,
        -height * 0.15,
        r * 0.15,
        0,
        0,
        r * 1.5
      );
      grad.addColorStop(0, palette.highlight);
      grad.addColorStop(0.4, palette.body);
      grad.addColorStop(1, palette.knot);

      ctx.fillStyle = grad;
      ctx.beginPath();
      // Balloon shape: wider top, tapered bottom
      ctx.moveTo(0, -height * 0.45);
      // Top right curve
      ctx.bezierCurveTo(
        r * 1.15,
        -height * 0.45,
        r * 1.25,
        0,
        r * 0.6,
        height * 0.42
      );
      // Bottom knot taper
      ctx.lineTo(0, height * 0.46);
      // Bottom left curve
      ctx.lineTo(-r * 0.6, height * 0.42);
      ctx.bezierCurveTo(
        -r * 1.25,
        0,
        -r * 1.15,
        -height * 0.45,
        0,
        -height * 0.45
      );
      ctx.closePath();
      ctx.fill();

      // Subtle crisp highlight glint (specular reflection)
      ctx.beginPath();
      ctx.ellipse(
        -r * 0.38,
        -height * 0.18,
        r * 0.25,
        r * 0.55,
        -Math.PI / 6,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(255, 255, 255, 0.38)';
      ctx.fill();

      ctx.restore();

      ctx.restore();
    };

    const renderLoop = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const remaining = Math.max(0, durationMs - elapsed);
      const progress = Math.min(1, elapsed / durationMs);

      if (onProgress) {
        onProgress(progress, remaining);
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Periodically spawn new particles while within the 5-second window
      if (elapsed < durationMs) {
        if (timestamp - lastSpawnTime > spawnInterval) {
          if (mode === 'snowflakes') {
            particles.push(spawnSnowflake());
          } else if (mode === 'balloons') {
            particles.push(spawnBalloon());
          }
          lastSpawnTime = timestamp;
        }
      }

      // Update and draw particles
      const activeParticles: Particle[] = [];
      const viewH = window.innerHeight;
      const viewW = window.innerWidth;

      for (const p of particles) {
        // Physics update
        p.swayPhase += p.swaySpeed;
        p.rotation += p.rotationSpeed;
        p.x += p.vx + Math.sin(p.swayPhase) * p.swayAmplitude;
        p.y += p.vy;

        // Draw
        if (mode === 'snowflakes') {
          drawSnowflake(p);
          // Keep if still in screen area
          if (p.y < viewH + 60 && p.x > -100 && p.x < viewW + 100) {
            activeParticles.push(p);
          }
        } else if (mode === 'balloons') {
          drawBalloon(p, timestamp);
          // Keep if still in screen area (allow trailing string to clear)
          if (p.y > -120 && p.x > -100 && p.x < viewW + 100) {
            activeParticles.push(p);
          }
        }
      }

      particles = activeParticles;

      // 5-second timeout check
      if (elapsed >= durationMs) {
        if (!isFinished) {
          isFinished = true;
          if (onAnimationEnd) {
            onAnimationEnd();
          }
        }
        // If particles finished exiting, clear and stop loop
        if (particles.length === 0) {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          return;
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (canvasRef.current) {
        const cleanCtx = canvasRef.current.getContext('2d');
        if (cleanCtx) {
          cleanCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
    };
  }, [mode, runId, durationMs, onAnimationEnd, onProgress]);

  return (
    <canvas
      id="atmospheric-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 w-full h-full"
      style={{ display: mode === 'none' ? 'none' : 'block' }}
    />
  );
};
