import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const animationIdRef = useRef();
  const linesRef = useRef([]);
  const starsRef = useRef([]);
  const tickRef = useRef(0);

  const opts = {
    lineCount: 100,
    starCount: 30,
    radVel: 0.01,
    lineBaseVel: 0.1,
    lineAddedVel: 0.1,
    lineBaseLife: 0.4,
    lineAddedLife: 0.01,
    starBaseLife: 10,
    starAddedLife: 10,
    ellipseTilt: -0.3,
    ellipseBaseRadius: 0.15,
    ellipseAddedRadius: 0.02,
    ellipseAxisMultiplierX: 2,
    ellipseAxisMultiplierY: 1,
    repaintAlpha: 0.015
  };

  class Line {
    constructor(w, h) {
      this.w = w;
      this.h = h;
      this.reset();
    }

    reset() {
      this.rad = Math.random() * Math.PI * 2;
      this.len = this.w * (opts.ellipseBaseRadius + Math.random() * opts.ellipseAddedRadius);
      this.lenVel = opts.lineBaseVel + Math.random() * opts.lineAddedVel;
      
      this.x = this.px = Math.cos(this.rad) * this.len;
      this.y = this.py = Math.sin(this.rad) * this.len;
      
      this.life = this.originalLife = this.w * (opts.lineBaseLife + Math.random() * opts.lineAddedLife);
      this.alpha = 0.2 + Math.random() * 0.8;
    }

    step() {
      --this.life;
      
      this.px = this.x;
      this.py = this.y;
      
      this.rad += opts.radVel;
      this.len -= this.lenVel;
      
      this.x = Math.cos(this.rad) * this.len;
      this.y = Math.sin(this.rad) * this.len;
      
      if (this.life <= 0) this.reset();
    }

    draw(ctx, tick, w) {
      const ratio = Math.abs(this.life / this.originalLife - 1/2);
      
      ctx.lineWidth = ratio * 5;
      ctx.strokeStyle = `hsla(${tick + this.x / (w * (opts.ellipseBaseRadius + opts.ellipseAddedRadius)) * 100}, 80%, ${75 - ratio * 150}%, ${this.alpha})`;
      ctx.beginPath();
      ctx.moveTo(this.px, this.py);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
    }
  }

  class Star {
    constructor(w, h) {
      this.w = w;
      this.h = h;
      this.reset();
    }

    reset() {
      this.x = Math.random() * this.w;
      this.y = Math.random() * this.h;
      this.life = opts.starBaseLife + Math.random() * opts.starAddedLife;
    }

    step() {
      --this.life;
      if (this.life <= 0) this.reset();
    }

    draw(ctx, tick) {
      ctx.fillStyle = `hsla(${tick + this.x / this.w * 100}, 80%, 50%, 0.2)`;
      ctx.shadowBlur = this.life;
      ctx.fillRect(this.x, this.y, 1, 1);
    }
  }

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    opts.ellipseCX = w / 2;
    opts.ellipseCY = h / 2;

    linesRef.current = [];
    starsRef.current = [];

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, w, h);
  };

  const step = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.width;
    const h = canvas.height;

    tickRef.current += 0.5;

    if (linesRef.current.length < opts.lineCount && Math.random() < 0.5) {
      linesRef.current.push(new Line(w, h));
    }

    if (starsRef.current.length < opts.starCount) {
      starsRef.current.push(new Star(w, h));
    }

    linesRef.current.forEach(line => line.step());
    starsRef.current.forEach(star => star.step());
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = `rgba(0,0,0,${opts.repaintAlpha})`;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';

    ctx.save();
    ctx.translate(opts.ellipseCX, opts.ellipseCY);
    ctx.rotate(opts.ellipseTilt);
    ctx.scale(opts.ellipseAxisMultiplierX, opts.ellipseAxisMultiplierY);

    linesRef.current.forEach(line => line.draw(ctx, tickRef.current, w));

    ctx.restore();

    starsRef.current.forEach(star => star.draw(ctx, tickRef.current));
  };

  const animate = () => {
    step();
    draw();
    animationIdRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    initCanvas();
    animate();

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 bg-black"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
};

export default AnimatedBackground;