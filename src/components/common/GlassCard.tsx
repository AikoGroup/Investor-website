import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      backdrop-blur-lg
      bg-white/10
      rounded-2xl
      shadow-xl
      p-8
      border
      border-white/20
      hover:border-white/30
      transition-all
      duration-300
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;
