import React, { useEffect, useRef } from 'react';

const NUM_BALLS = 20;

function makeBall(W, H) {
  const speed  = 0.35 + Math.random() * 0.7;
  const angle  = Math.random() * Math.PI * 2;
  return {
    x:        Math.random() * W,
    y:        Math.random() * H,
    vx:       Math.cos(angle) * speed,
    vy:       Math.sin(angle) * speed,
    radius:   55 + Math.random() * 75,
    baseHue:  195 + Math.random() * 90,   // blue → purple range
    baseOpa:  0.05 + Math.random() * 0.07,
  };
}

export default function BallCanvas({ mousePosRef }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let animId;

    /* ── Resize ──────────────────────────────── */
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── Initialise balls ────────────────────── */
    const balls = Array.from({ length: NUM_BALLS }, () =>
      makeBall(canvas.width, canvas.height)
    );

    /* ── Draw loop ───────────────────────────── */
    const draw = () => {
      const W  = canvas.width;
      const H  = canvas.height;
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;

      ctx.clearRect(0, 0, W, H);

      for (const b of balls) {
        /* move */
        b.x += b.vx;
        b.y += b.vy;

        /* wall bounce – push cleanly away from edge */
        if (b.x - b.radius < 0)  { b.x = b.radius;     b.vx =  Math.abs(b.vx); }
        if (b.x + b.radius > W)  { b.x = W - b.radius; b.vx = -Math.abs(b.vx); }
        if (b.y - b.radius < 0)  { b.y = b.radius;     b.vy =  Math.abs(b.vy); }
        if (b.y + b.radius > H)  { b.y = H - b.radius; b.vy = -Math.abs(b.vy); }

        /* cursor proximity */
        const dx   = b.x - mx;
        const dy   = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const prox = Math.max(0, 1 - dist / 320);   // 0 far … 1 very close

        const hue = b.baseHue + prox * 70;           // drift toward cyan/violet
        const opa = b.baseOpa  + prox * 0.18;

        /* radial gradient per ball */
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        g.addColorStop(0, `hsla(${hue}, 90%, 72%, ${opa})`);
        g.addColorStop(1, `hsla(${hue}, 90%, 55%, 0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mousePosRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position : 'fixed',
        inset    : 0,
        width    : '100%',
        height   : '100%',
        zIndex   : 0,
        filter   : 'blur(28px)',
        pointerEvents: 'none',
        opacity  : 0.92,
      }}
    />
  );
}
