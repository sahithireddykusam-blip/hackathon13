import React from 'react';
import { Link } from 'react-router-dom';

export default function BrandLogo({ size = 'md', showTagline = false, clickable = true, className = '' }) {
  // Size variants
  const sizeMap = {
    sm: { icon: 24, text: 'text-base', badge: 'text-[9px] px-1 py-0.5' },
    md: { icon: 32, text: 'text-xl', badge: 'text-[10px] px-1.5 py-0.5' },
    lg: { icon: 42, text: 'text-2xl', badge: 'text-xs px-2 py-0.5' },
    xl: { icon: 56, text: 'text-3xl', badge: 'text-xs px-2.5 py-1' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Abstract Research Lens + Knowledge Nodes Logo SVG */}
      <div className="relative flex-shrink-0">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:rotate-6"
        >
          {/* Subtle Outer Orbit Ring */}
          <circle
            cx="18"
            cy="18"
            r="14"
            stroke="currentColor"
            className="text-electric-teal/30"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Research Lens Focal Ring */}
          <circle
            cx="18"
            cy="18"
            r="10"
            stroke="#36D6C5"
            strokeWidth="2.5"
            className="transition-all duration-300 group-hover:stroke-electric-teal"
          />

          {/* Connected Research Knowledge Core */}
          <circle cx="18" cy="18" r="3.5" fill="#36D6C5" />

          {/* Connected Knowledge Node 1 (Teal) */}
          <circle cx="9" cy="12" r="2.2" fill="#36D6C5" opacity="0.8" />
          <path d="M11 13.5L15 16" stroke="#36D6C5" strokeWidth="1.2" opacity="0.7" />

          {/* Discovery Node (Warm Amber Accent) */}
          <circle cx="28" cy="10" r="3" fill="#F5B942" className="animate-pulse" />
          <path d="M22 15L26 12" stroke="#F5B942" strokeWidth="1.5" strokeLinecap="round" />

          {/* Observatory Lens Scope / Handle */}
          <path
            d="M25 25L34 34"
            stroke="#36D6C5"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-heading font-bold tracking-tight text-midnight-navy dark:text-white ${currentSize.text}`}>
            Research<span className="text-electric-teal">Genius</span>
          </span>
          <span className={`font-mono uppercase font-semibold bg-electric-teal/15 text-electric-teal border border-electric-teal/30 rounded ${currentSize.badge}`}>
            AI
          </span>
        </div>
        {showTagline && (
          <span className="font-mono text-[11px] tracking-wider text-light-muted dark:text-slate-400 mt-1 uppercase">
            Discover Knowledge. Connect Ideas.
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="inline-block group focus:outline-none focus:ring-2 focus:ring-electric-teal rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
