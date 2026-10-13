import React, { useState } from 'react';
import { Sparkles, Network, BookOpen, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function HeroVisualization() {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    {
      id: 'n1',
      title: 'Multimodal Representations',
      category: 'Representation Learning',
      citation: 'arXiv:2402.1890',
      x: 18,
      y: 22,
      confidence: '98.4%',
      icon: Layers
    },
    {
      id: 'n2',
      title: 'Graph Latent Reasoning',
      category: 'Knowledge Graphs',
      citation: 'Nature MI 2024',
      x: 78,
      y: 26,
      confidence: '96.8%',
      icon: Network
    },
    {
      id: 'n3',
      title: 'Neurosymbolic Synthesis',
      category: 'Logic & Verification',
      citation: 'IEEE TPAMI 2024',
      x: 20,
      y: 74,
      confidence: '99.1%',
      icon: ShieldCheck
    },
    {
      id: 'n4',
      title: 'Latent Space Navigation',
      category: 'Algorithmic Optimization',
      citation: 'NeurIPS 2024',
      x: 76,
      y: 72,
      confidence: '97.2%',
      icon: Zap
    }
  ];

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square rounded-3xl bg-midnight-deep border border-midnight-border shadow-2xl p-6 overflow-hidden select-none">
      {/* Observatory Coordinate Background Grid */}
      <div className="absolute inset-0 observatory-grid opacity-70 pointer-events-none" />

      {/* Outer Concentric Observatory Rings */}
      <div className="absolute inset-8 rounded-full border border-electric-teal/15 pointer-events-none animate-spin" style={{ animationDuration: '60s' }} />
      <div className="absolute inset-20 rounded-full border border-dashed border-electric-teal/20 pointer-events-none" />
      <div className="absolute inset-32 rounded-full border border-warm-amber/15 pointer-events-none" />

      {/* SVG Connecting Beam Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Lines from center (50%, 50%) to each node */}
        <line x1="50%" y1="50%" x2="25%" y2="28%" stroke="#36D6C5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
        <line x1="50%" y1="50%" x2="72%" y2="30%" stroke="#36D6C5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
        <line x1="50%" y1="50%" x2="26%" y2="70%" stroke="#36D6C5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
        <line x1="50%" y1="50%" x2="70%" y2="68%" stroke="#F5B942" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />

        {/* Cross connections */}
        <line x1="25%" y1="28%" x2="72%" y2="30%" stroke="#36D6C5" strokeWidth="1" opacity="0.25" />
        <line x1="26%" y1="70%" x2="70%" y2="68%" stroke="#36D6C5" strokeWidth="1" opacity="0.25" />
      </svg>

      {/* Floating Scientific Data Indicator (Top Right) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-midnight-surface/80 border border-midnight-border backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-electric-teal animate-ping" />
        <span className="font-mono text-[10px] text-slate-300 tracking-wider">
          OBSERVATORY STATUS: ACTIVE
        </span>
      </div>

      {/* Central Research Question Hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-52 sm:w-60 p-4 rounded-2xl bg-midnight-surface/95 border border-electric-teal/50 shadow-teal-glow backdrop-blur-md text-center transition-all duration-300 hover:scale-105">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-electric-teal/15 text-electric-teal font-mono text-[10px] uppercase font-semibold mb-2">
          <Sparkles className="w-3 h-3" />
          Primary Investigation
        </div>
        <p className="font-heading font-medium text-xs sm:text-sm text-white leading-snug">
          "How does neurosymbolic AI establish verifiable scientific reasoning?"
        </p>
        <div className="mt-2 pt-2 border-t border-midnight-border flex items-center justify-between font-mono text-[10px] text-slate-400">
          <span>Sources: 14</span>
          <span className="text-electric-teal">Verified</span>
        </div>
      </div>

      {/* Orbiting Research Nodes */}
      {nodes.map((node) => {
        const IconComponent = node.icon;
        const isHovered = activeNode === node.id;
        return (
          <div
            key={node.id}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-300 ${
              isHovered ? 'scale-110 z-30' : 'hover:scale-105'
            }`}
          >
            <div
              className={`p-3 rounded-xl backdrop-blur-md border transition-all ${
                isHovered
                  ? 'bg-midnight-surface border-warm-amber shadow-amber-glow'
                  : 'bg-midnight-surface/90 border-midnight-border hover:border-electric-teal/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    isHovered ? 'bg-warm-amber/20 text-warm-amber' : 'bg-electric-teal/15 text-electric-teal'
                  }`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-xs text-white whitespace-nowrap">
                    {node.title}
                  </h4>
                  <p className="font-mono text-[9px] text-slate-400 flex items-center gap-1">
                    <span>{node.citation}</span>
                    <span className="text-electric-teal">• {node.confidence}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Floating Source Card (Bottom Center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-xl bg-midnight-navy/90 border border-midnight-border backdrop-blur-md flex items-center gap-3">
        <BookOpen className="w-4 h-4 text-warm-amber" />
        <div className="font-mono text-[11px] text-slate-300">
          Cross-indexed: <span className="text-warm-amber font-semibold">12,480+</span> academic corpora
        </div>
      </div>
    </div>
  );
}
