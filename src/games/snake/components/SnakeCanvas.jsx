import React, { useRef, useEffect } from 'react';

export default function SnakeCanvas({ snake, food, gridCols = 20, gridRows = 20 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cellWidth = width / gridCols;
    const cellHeight = height / gridRows;

    // 1. Clear & Draw Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Subtle Grid Lines
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
    ctx.lineWidth = 1;

    for (let c = 0; c <= gridCols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellWidth, 0);
      ctx.lineTo(c * cellWidth, height);
      ctx.stroke();
    }

    for (let r = 0; r <= gridRows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellHeight);
      ctx.lineTo(width, r * cellHeight);
      ctx.stroke();
    }

    // 3. Draw Food (Glowing Emerald Circle with pulse effect)
    const foodX = food.x * cellWidth + cellWidth / 2;
    const foodY = food.y * cellHeight + cellHeight / 2;
    const foodRadius = Math.min(cellWidth, cellHeight) / 2 - 2;

    ctx.save();
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(foodX, foodY, foodRadius, 0, Math.PI * 2);
    ctx.fill();

    // Food inner accent
    ctx.fillStyle = '#a7f3d0';
    ctx.beginPath();
    ctx.arc(foodX - 2, foodY - 2, foodRadius / 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Draw Snake Body Segments
    snake.forEach((segment, index) => {
      const x = segment.x * cellWidth;
      const y = segment.y * cellHeight;
      const isHead = index === 0;

      ctx.save();
      if (isHead) {
        // Snake Head (Glowing Rose Pink)
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#f43f5e';

        // Rounded head rectangle
        const padding = 1;
        const headW = cellWidth - padding * 2;
        const headH = cellHeight - padding * 2;
        const radius = 6;

        ctx.beginPath();
        ctx.roundRect(x + padding, y + padding, headW, headH, radius);
        ctx.fill();

        // Draw Head Eyes
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x + cellWidth * 0.35, y + cellHeight * 0.35, 2.5, 0, Math.PI * 2);
        ctx.arc(x + cellWidth * 0.65, y + cellHeight * 0.35, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Body Segment (Gradient transition to lighter rose)
        const alpha = Math.max(0.4, 1 - index / (snake.length + 5));
        ctx.fillStyle = `rgba(244, 63, 94, ${alpha})`;
        
        const padding = 1.5;
        const segW = cellWidth - padding * 2;
        const segH = cellHeight - padding * 2;
        const radius = 4;

        ctx.beginPath();
        ctx.roundRect(x + padding, y + padding, segW, segH, radius);
        ctx.fill();
      }
      ctx.restore();
    });
  }, [snake, food, gridCols, gridRows]);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square p-2.5 sm:p-3 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full h-full rounded-2xl block border border-slate-800/80 shadow-inner"
      />
    </div>
  );
}
