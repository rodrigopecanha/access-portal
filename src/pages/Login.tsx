import { useState, useEffect, useRef } from 'react';
import { Mail, Lock, ChevronRight, Swords } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMockAuth } from '@/contexts/MockAuthContext';

export default function Login() {
  const { login } = useMockAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(252, 85%, 70%, ${p.alpha})`;
        ctx.fill();
      }
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(252, 85%, 65%, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  // Loading progress animation
  useEffect(() => {
    if (!isTransitioning) return;
    const start = Date.now();
    const duration = 1800;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(eased * 100);
      if (pct < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(login, 200);
      }
    };
    requestAnimationFrame(tick);
  }, [isTransitioning, login]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
  };

  if (isTransitioning) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50"
        style={{ background: 'linear-gradient(135deg, hsl(222 47% 6%), hsl(252 40% 12%), hsl(222 47% 8%))' }}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="relative z-10 flex flex-col items-center gap-8 animate-fade-in">
          <Swords className="w-12 h-12 text-primary animate-float" />
          <div className="w-72 h-2 rounded-full overflow-hidden"
            style={{ background: 'hsla(252, 85%, 60%, 0.15)' }}
          >
            <div
              className="h-full rounded-full transition-none"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, hsl(252 85% 60%), hsl(280 85% 55%), hsl(252 85% 65%))',
                boxShadow: '0 0 16px hsl(252 85% 60% / 0.5)',
              }}
            />
          </div>
          <p className="text-sm font-medium tracking-wide"
            style={{ color: 'hsl(220 20% 70%)' }}
          >
            {progress < 40
              ? 'Preparing your battlefield...'
              : progress < 75
                ? 'Loading your challenges...'
                : 'Almost there...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, hsl(222 47% 6%), hsl(252 40% 12%), hsl(222 47% 8%))' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div className="relative z-10 w-full max-w-md px-6 animate-fade-in">
        {/* Logo area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
            style={{
              background: 'linear-gradient(135deg, hsl(252 85% 60%), hsl(280 85% 55%))',
              boxShadow: '0 0 40px hsl(252 85% 60% / 0.35)',
            }}
          >
            <Swords className="w-8 h-8" style={{ color: 'hsl(0 0% 100%)' }} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2"
            style={{ color: 'hsl(0 0% 100%)' }}
          >
            SC Academy
          </h1>
          <p className="text-sm font-medium tracking-wide"
            style={{ color: 'hsl(252 60% 75%)' }}
          >
            Train. Conquer. Master the Agreement Battlefield.
          </p>
        </div>

        {/* Form card */}
        <form onSubmit={handleLogin}
          className="rounded-2xl p-8 space-y-5 border"
          style={{
            background: 'hsla(222, 47%, 11%, 0.7)',
            backdropFilter: 'blur(20px)',
            borderColor: 'hsla(252, 85%, 60%, 0.15)',
          }}
        >
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'hsl(220 20% 60%)' }}
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'hsl(220 20% 50%)' }}
              />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="pl-10 h-11 border-0 text-sm"
                style={{
                  background: 'hsla(222, 30%, 18%, 0.8)',
                  color: 'hsl(220 20% 90%)',
                }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'hsl(220 20% 60%)' }}
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'hsl(220 20% 50%)' }}
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 h-11 border-0 text-sm"
                style={{
                  background: 'hsla(222, 30%, 18%, 0.8)',
                  color: 'hsl(220 20% 90%)',
                }}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-sm font-bold tracking-wide gap-2 border-0"
            style={{
              background: 'linear-gradient(135deg, hsl(252 85% 60%), hsl(280 85% 55%))',
              color: 'hsl(0 0% 100%)',
              boxShadow: '0 4px 20px hsl(252 85% 60% / 0.35)',
            }}
          >
            Enter the Arena
            <ChevronRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-center text-xs mt-6"
          style={{ color: 'hsl(220 9% 40%)' }}
        >
          Demo environment — Any credentials will be accepted
        </p>
      </div>
    </div>
  );
}
