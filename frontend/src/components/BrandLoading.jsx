import React from 'react';

export default function BrandLoading({ label = 'Synthesizing research nodes...', size = 'md' }) {
  const sizeMap = {
    sm: { box: 'w-10 h-10', text: 'text-xs' },
    md: { box: 'w-16 h-16', text: 'text-sm' },
    lg: { box: 'w-24 h-24', text: 'text-base' }
  };

  const current = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3 select-none">
      <div className={`relative ${current.box} flex items-center justify-center`}>
        {/* Outer Rotating Lens Orbit */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-electric-teal/30 animate-spin" style={{ animationDuration: '8s' }}></div>
        
        {/* Middle Pulse Ring */}
        <div className="absolute inset-2 rounded-full border border-electric-teal/50 animate-ping opacity-25"></div>

        {/* Observatory Focal Ring */}
        <div className="relative w-8 h-8 rounded-full border-2 border-electric-teal flex items-center justify-center shadow-teal-glow">
          {/* Inner core */}
          <div className="w-2.5 h-2.5 rounded-full bg-electric-teal"></div>
        </div>

        {/* Satellite Discovery Amber Node */}
        <div 
          className="absolute w-2.5 h-2.5 rounded-full bg-warm-amber shadow-amber-glow animate-pulse"
          style={{ top: '10%', right: '10%' }}
        ></div>
      </div>

      {label && (
        <p className={`font-mono text-light-muted dark:text-slate-400 tracking-wide ${current.text} animate-pulse`}>
          {label}
        </p>
      )}
    </div>
  );
}
