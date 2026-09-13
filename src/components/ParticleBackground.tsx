import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleOffset: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  color: string;
}

interface ParticleBackgroundProps {
  intensity?: "low" | "medium" | "high";
}

export default function ParticleBackground({ intensity = "medium" }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const starCount = intensity === "low" ? 80 : intensity === "medium" ? 140 : 200;
    const particleCount = intensity === "high" ? 15 : 8;

    // Build stars
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    const particles: Particle[] = [];
    const COLORS = [
      "rgba(212,96,122,",
      "rgba(242,184,198,",
      "rgba(240,192,112,",
      "rgba(255,255,255,",
    ];

    const spawnParticle = () => {
      if (particles.length < particleCount) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -(Math.random() * 0.8 + 0.3),
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          life: 0,
          maxLife: Math.random() * 300 + 200,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      // Stars
      stars.forEach((star) => {
        const twinkle = Math.sin(t * 2 + star.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,232,232,${star.opacity * twinkle})`;
        ctx.fill();

        // Move very slightly
        star.y -= star.speed * 0.1;
        if (star.y < -5) star.y = canvas.height + 5;
      });

      // Atmospheric glow blobs
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const grad = ctx.createRadialGradient(cx, cy * 0.7, 0, cx, cy * 0.7, canvas.width * 0.5);
      grad.addColorStop(0, "rgba(139,26,74,0.06)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floating particles
      if (Math.random() < 0.05) spawnParticle();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const progress = p.life / p.maxLife;
        const alpha = p.opacity * (1 - progress);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
