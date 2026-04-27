import React from 'react';

interface TapeProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  color?: string;
}

const Tape: React.FC<TapeProps> = ({ 
  position = 'top-right', 
  className = '', 
  color = 'bg-[#8A8D91]' // Grey duct tape color
}) => {
  const getPositionClasses = () => {
    // Vertical placement, pinned further inside horizontally (e.g. left-6) but sticking out vertically
    switch (position) {
      case 'top-left': return '-top-6 left-6 rotate-[-3deg]';
      case 'top-right': return '-top-6 right-6 rotate-[4deg]';
      case 'bottom-left': return '-bottom-6 left-6 rotate-[2deg]';
      case 'bottom-right': return '-bottom-6 right-6 rotate-[-5deg]';
    }
  };

  return (
    <div 
      className={`absolute w-8 h-16 ${color} shadow-[0_2px_4px_rgba(0,0,0,0.2)] pointer-events-none z-20 ${getPositionClasses()} ${className}`}
      // Uneven jagged polygon cuts for the duct tape ends
      style={{ clipPath: 'polygon(3% 2%, 96% 4%, 100% 98%, 4% 96%, 0% 45%)' }}
    >
      {/* Duct tape mesh texture */}
      <div className="absolute inset-0 opacity-[0.25] bg-[url('https://www.transparenttextures.com/patterns/bg-noise.png')]" />
      
      {/* Tape crease / gloss overlay */}
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export default Tape;
