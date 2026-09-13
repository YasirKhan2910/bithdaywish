import { useEffect, useRef } from "react";

interface Heart {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  delay: number;
}

interface FloatingHeartsProps {
  count?: number;
  intense?: boolean;
}

export default function FloatingHearts({ count = 12, intense = false }: FloatingHeartsProps) {
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

    const hearts: Heart[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 300,
      size: Math.random() * (intense ? 20 : 14) + 6,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.8 + 0.3,
      drift: (Math.random() - 0.5) * 0.5,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      delay: i * (2000 / count),
    }));

    function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, rotation: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      const colors = intense
        ? ["rgba(212,96,122,1)", "rgba(242,184,198,1)", "rgba(240,192,112,1)"]
        : ["rgba(212,96,122,1)", "rgba(242,184,198,1)"];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)] || colors[0];

      ctx.beginPath();
      ctx.moveTo(0, -size * 0.25);
      ctx.bezierCurveTo(size * 0.5, -size * 0.75, size, -size * 0.1, 0, size * 0.65);
      ctx.bezierCurveTo(-size, -size * 0.1, -size * 0.5, -size * 0.75, 0, -size * 0.25);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.restore();
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 1;

      hearts.forEach((h) => {
        if (t < h.delay / 16) return; // respect delay

        h.y -= h.speed;
        h.x += h.drift + Math.sin(t * 0.01 + h.delay) * 0.3;
        h.rotation += h.rotationSpeed;

        drawHeart(ctx, h.x, h.y, h.size, h.opacity, h.rotation);

        if (h.y < -50) {
          h.y = canvas.height + 20;
          h.x = Math.random() * canvas.width;
          h.opacity = Math.random() * 0.4 + 0.1;
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count, intense]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
