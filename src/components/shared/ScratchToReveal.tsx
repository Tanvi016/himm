import React, { useRef, useEffect } from 'react';

interface ScratchToRevealProps {
  children: React.ReactNode;
  width?: string | number;
  height?: string | number;
  coverColor?: string;
  brushSize?: number;
}

const ScratchToReveal: React.FC<ScratchToRevealProps> = ({ 
  children, 
  width = '100%', 
  height = '100%', 
  coverColor = '#D6B98C', // gold base
  brushSize = 35 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Match canvas to actual pixel size of container for crisp rendering
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill base color
    ctx.fillStyle = coverColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add texture
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    for(let i=0; i<300; i++) {
       ctx.beginPath();
       ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
       ctx.fill();
    }
    
    // Draw playful hint
    ctx.font = '22px "Dancing Script", cursive';
    ctx.fillStyle = 'rgba(100,50,50,0.5)';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch with your finger/mouse...', canvas.width / 2, canvas.height / 2);

    // Set composite operation to 'destination-out' so drawing *erases* pixels
    ctx.globalCompositeOperation = 'destination-out';
  }, [coverColor]);

  // Handle actual scratch logic
  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    // Normalize touch vs mouse
    if ('touches' in e) {
      if (e.touches.length > 0) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        return;
      }
    } else {
      x = (e as React.MouseEvent).nativeEvent.offsetX;
      y = (e as React.MouseEvent).nativeEvent.offsetY;
    }

    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const start = () => { isDrawing.current = true; };
  const end = () => { isDrawing.current = false; };

  return (
    <div ref={containerRef} style={{ position: 'relative', width, height, userSelect: 'none' }} className="rounded-lg overflow-hidden min-h-[150px]">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} className="p-4 flex items-center justify-center text-center">
        {children}
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={start}
        onMouseUp={end}
        onMouseMove={scratch}
        onMouseOut={end}
        onTouchStart={(e) => { start(); scratch(e); }}
        onTouchEnd={end}
        // stop scrolling while scratching
        onTouchMove={(e) => {
          // If using touch-action: none, e.preventDefault() is implicitly handled by browser or React sometimes throws passive errors. The CSS rule is safer.
          scratch(e);
        }}
        className="absolute top-0 left-0 cursor-crosshair w-full h-full"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
};

export default ScratchToReveal;
