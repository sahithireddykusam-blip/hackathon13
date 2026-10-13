import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, ShieldCheck, ExternalLink, Sparkles } from 'lucide-react';

export default function KnowledgeGraphCanvas({
  nodes = [],
  edges = [],
  onSelectNode,
  selectedNodeId = null
}) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState(null);

  // Reset zoom & pan
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse pan handlers
  const handleMouseDown = (e) => {
    // Only drag when clicking background
    if (e.target.tagName === 'svg' || e.target.id === 'graph-canvas-bg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.4), 2.5));
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className="relative w-full h-[540px] sm:h-[620px] rounded-2xl bg-[#101828] border border-midnight-border overflow-hidden select-none cursor-grab active:cursor-grabbing"
    >
      {/* Background Observatory Grid Pattern */}
      <div
        id="graph-canvas-bg"
        className="absolute inset-0 observatory-grid opacity-80 pointer-events-none"
      />

      {/* Control Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 rounded-xl bg-midnight-deep/90 border border-midnight-border backdrop-blur-md shadow-lg">
        <button
          onClick={() => setZoom((prev) => Math.min(prev + 0.2, 2.5))}
          className="p-2 text-slate-300 hover:text-electric-teal hover:bg-midnight-surface rounded-lg transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((prev) => Math.max(prev - 0.2, 0.4))}
          className="p-2 text-slate-300 hover:text-electric-teal hover:bg-midnight-surface rounded-lg transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 text-slate-300 hover:text-electric-teal hover:bg-midnight-surface rounded-lg transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="px-2 py-1 font-mono text-[11px] text-slate-400 border-l border-midnight-border">
          {Math.round(zoom * 100)}%
        </div>
      </div>

      {/* Status Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-4 px-3.5 py-2 rounded-xl bg-midnight-deep/90 border border-midnight-border backdrop-blur-md text-xs font-mono">
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-electric-teal" />
          <span>Core Concept</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-warm-amber" />
          <span>Key Discovery</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-4 h-0.5 bg-electric-teal opacity-60" />
          <span>Evidence Relation</span>
        </div>
      </div>

      {/* Graph Render Layer */}
      <svg
        className="w-full h-full"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '50% 50%',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        <defs>
          {/* Arrowhead marker for directed evidence */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="16"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#36D6C5" opacity="0.8" />
          </marker>
        </defs>

        {/* Connection Edges */}
        {edges.map((edge, idx) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          const isConnectedToSelected =
            selectedNodeId &&
            (edge.source === selectedNodeId || edge.target === selectedNodeId);

          return (
            <g key={`edge-${idx}`}>
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={isConnectedToSelected ? '#F5B942' : '#36D6C5'}
                strokeWidth={isConnectedToSelected ? 2.5 : 1.5}
                strokeDasharray={edge.isHypothesis ? '4 4' : 'none'}
                opacity={isConnectedToSelected ? 0.9 : 0.4}
                markerEnd="url(#arrowhead)"
              />
              {/* Edge Relationship Label */}
              {edge.label && (
                <text
                  x={(sourceNode.x + targetNode.x) / 2}
                  y={(sourceNode.y + targetNode.y) / 2 - 6}
                  fill={isConnectedToSelected ? '#F5B942' : '#94A3B8'}
                  fontSize="10"
                  fontFamily="IBM Plex Mono"
                  textAnchor="middle"
                  className="select-none pointer-events-none"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Graph Nodes */}
        {nodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const isHovered = hoveredNode === node.id;
          const isDiscovery = node.type === 'discovery' || node.isKey;

          return (
            <g
              key={node.id}
              onClick={() => onSelectNode && onSelectNode(node)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer transition-transform duration-200"
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              {/* Highlight Aura if Selected or Key Discovery */}
              {isSelected && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="38"
                  fill="none"
                  stroke="#F5B942"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-spin"
                  style={{ animationDuration: '10s' }}
                />
              )}

              {/* Node Outer Halo */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? '28' : '22'}
                fill={isSelected ? '#F5B942' : isDiscovery ? '#F5B942' : '#36D6C5'}
                opacity={isSelected ? 0.25 : 0.15}
              />

              {/* Node Body Circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={isSelected ? '20' : '16'}
                fill="#1D2939"
                stroke={isSelected ? '#F5B942' : isDiscovery ? '#F5B942' : '#36D6C5'}
                strokeWidth={isSelected ? '3' : '2'}
                className="transition-all duration-200"
              />

              {/* Inner Node Accent */}
              <circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill={isSelected ? '#F5B942' : isDiscovery ? '#F5B942' : '#36D6C5'}
              />

              {/* Label below node */}
              <text
                x={node.x}
                y={node.y + 32}
                fill={isSelected ? '#FFFFFF' : '#E2E8F0'}
                fontSize={isSelected ? '12' : '11'}
                fontWeight={isSelected ? '600' : '500'}
                fontFamily="Space Grotesk"
                textAnchor="middle"
                className="select-none pointer-events-none drop-shadow"
              >
                {node.label}
              </text>

              {/* Sub-label / Citations count */}
              <text
                x={node.x}
                y={node.y + 45}
                fill={isSelected ? '#F5B942' : '#94A3B8'}
                fontSize="9"
                fontFamily="IBM Plex Mono"
                textAnchor="middle"
                className="select-none pointer-events-none"
              >
                {node.papersCount || 1} papers
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
