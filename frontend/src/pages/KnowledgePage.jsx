import React, { useState, useEffect } from 'react';
import {
  Network,
  List,
  Sparkles,
  Search,
  Filter,
  ExternalLink,
  BookOpen,
  Layers,
  Info,
  CheckCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { KnowledgeService } from '../services/api';
import KnowledgeGraphCanvas from '../components/KnowledgeGraphCanvas';
import EmptyState from '../components/EmptyState';
import BrandLoading from '../components/BrandLoading';

export default function KnowledgePage() {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState(null);
  const [viewMode, setViewMode] = useState('graph'); // 'graph' | 'list'
  const [conceptFilter, setConceptFilter] = useState('all'); // 'all' | 'discoveries' | 'core'
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    loadGraph();
  }, []);

  const loadGraph = async () => {
    setLoading(true);
    try {
      const data = await KnowledgeService.getGraph();
      setGraphData(data || { nodes: [], edges: [] });
      if (data?.nodes?.length > 0) {
        setSelectedNode(data.nodes[0]);
      }
    } catch (err) {
      console.error('Error fetching knowledge graph', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter nodes based on type and search query
  const filteredNodes = graphData.nodes.filter((node) => {
    const matchesSearch = node.label.toLowerCase().includes(searchFilter.toLowerCase());
    if (conceptFilter === 'discoveries') {
      return matchesSearch && (node.type === 'discovery' || node.isKey);
    }
    if (conceptFilter === 'core') {
      return matchesSearch && node.type === 'core' && !node.isKey;
    }
    return matchesSearch;
  });

  // Calculate connected edges & neighbors for selected node
  const connectedEdges = selectedNode
    ? graphData.edges.filter(
        (e) => e.source === selectedNode.id || e.target === selectedNode.id
      )
    : [];

  const connectedNeighbors = selectedNode
    ? connectedEdges.map((e) => {
        const neighborId = e.source === selectedNode.id ? e.target : e.source;
        const neighborNode = graphData.nodes.find((n) => n.id === neighborId);
        return {
          node: neighborNode,
          relation: e.label,
          direction: e.source === selectedNode.id ? 'outgoing' : 'incoming',
          isHypothesis: e.isHypothesis
        };
      })
    : [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/15 text-electric-teal text-xs font-mono font-medium mb-2">
            <Network className="w-3.5 h-3.5" />
            RELATIONAL KNOWLEDGE OBSERVATORY
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-midnight-navy dark:text-white">
            Knowledge Discovery Graph
          </h1>
          <p className="font-body text-sm text-light-muted dark:text-slate-300 mt-1 max-w-2xl">
            Inspect conceptual topologies, cross-document connections, and algorithmic discoveries synthesized from indexed academic papers.
          </p>
        </div>

        {/* View Toggle (Graph vs Accessible List) */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] self-start md:self-auto">
          <button
            onClick={() => setViewMode('graph')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              viewMode === 'graph'
                ? 'bg-electric-teal text-midnight-navy font-semibold shadow-sm'
                : 'text-light-muted dark:text-slate-300 hover:text-midnight-navy dark:hover:text-white'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Graph View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-electric-teal text-midnight-navy font-semibold shadow-sm'
                : 'text-light-muted dark:text-slate-300 hover:text-midnight-navy dark:hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            List View
          </button>
        </div>
      </div>

      {/* Filter and Concept Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-light-muted dark:text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-electric-teal" />
            Concept Scope:
          </span>
          <button
            onClick={() => setConceptFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
              conceptFilter === 'all'
                ? 'bg-midnight-navy text-white dark:bg-[#1D2939] dark:text-electric-teal border border-electric-teal/40'
                : 'text-light-muted dark:text-slate-400 hover:text-white'
            }`}
          >
            All Concepts ({graphData.nodes.length})
          </button>
          <button
            onClick={() => setConceptFilter('discoveries')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
              conceptFilter === 'discoveries'
                ? 'bg-warm-amber text-midnight-navy font-semibold'
                : 'text-light-muted dark:text-slate-400 hover:text-warm-amber'
            }`}
          >
            Key Discoveries
          </button>
          <button
            onClick={() => setConceptFilter('core')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
              conceptFilter === 'core'
                ? 'bg-electric-teal text-midnight-navy font-semibold'
                : 'text-light-muted dark:text-slate-400 hover:text-electric-teal'
            }`}
          >
            Core Foundations
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search concepts..."
            className="w-full pl-8 pr-3 py-1.5 text-xs font-body rounded-lg border border-light-border dark:border-[#283548] bg-light-surface/60 dark:bg-[#1D2939] text-midnight-navy dark:text-white placeholder:text-light-muted dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-electric-teal"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-16 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548]">
          <BrandLoading label="Constructing topological knowledge representation..." />
        </div>
      ) : graphData.nodes.length === 0 ? (
        <EmptyState
          icon={Network}
          title="No Knowledge Nodes Generated Yet"
          description="The knowledge graph is populated automatically as you run research queries or ingest academic PDFs in the Document Library."
          actionLabel="Execute Research Query"
          onAction={() => (window.location.href = '/research')}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual or List Canvas (8 cols) */}
          <div className="lg:col-span-8">
            {viewMode === 'graph' ? (
              <KnowledgeGraphCanvas
                nodes={filteredNodes}
                edges={graphData.edges}
                onSelectNode={(node) => setSelectedNode(node)}
                selectedNodeId={selectedNode?.id}
              />
            ) : (
              /* Accessible List-Based Alternative */
              <div className="p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-light-border dark:border-[#283548]">
                  <h3 className="font-heading font-semibold text-base text-midnight-navy dark:text-white">
                    Conceptual Nodes Index
                  </h3>
                  <span className="font-mono text-xs text-electric-teal">
                    {filteredNodes.length} Concepts
                  </span>
                </div>

                <div className="space-y-3">
                  {filteredNodes.map((node) => (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        selectedNode?.id === node.id
                          ? 'bg-light-surface dark:bg-[#1D2939] border-warm-amber shadow-sm'
                          : 'bg-white dark:bg-[#172235] border-light-border dark:border-[#283548] hover:border-electric-teal/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              node.isKey ? 'bg-warm-amber' : 'bg-electric-teal'
                            }`}
                          />
                          <h4 className="font-heading font-semibold text-sm text-midnight-navy dark:text-white">
                            {node.label}
                          </h4>
                          {node.isKey && (
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-warm-amber/15 text-warm-amber">
                              Key Discovery
                            </span>
                          )}
                        </div>
                        <p className="font-body text-xs text-light-muted dark:text-slate-400 line-clamp-1">
                          {node.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-light-muted dark:text-slate-400">
                          {node.papersCount} papers
                        </span>
                        <ChevronRight className="w-4 h-4 text-light-muted" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Node & Evidence Inspector Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {selectedNode ? (
              <div className="p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm space-y-5">
                {/* Node Details Header */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                        selectedNode.isKey
                          ? 'bg-warm-amber/15 text-warm-amber'
                          : 'bg-electric-teal/15 text-electric-teal'
                      }`}
                    >
                      {selectedNode.isKey ? 'Discovery Node' : 'Core Concept'}
                    </span>
                    <span className="font-mono text-xs text-light-muted dark:text-slate-400">
                      ID: {selectedNode.id}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-midnight-navy dark:text-white">
                    {selectedNode.label}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-light-muted dark:text-slate-300 mt-2 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Evidence & Connected Relationships */}
                <div className="pt-4 border-t border-light-border dark:border-[#283548]">
                  <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-light-muted dark:text-slate-400 mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-electric-teal" />
                    Connected Concepts & Evidence ({connectedNeighbors.length})
                  </h4>

                  <div className="space-y-2.5">
                    {connectedNeighbors.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => item.node && setSelectedNode(item.node)}
                        className="p-3 rounded-xl bg-light-surface/60 dark:bg-[#1D2939] border border-light-border dark:border-[#283548] hover:border-electric-teal/40 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-electric-teal mb-1">
                          <span className="truncate max-w-[150px]">{item.relation}</span>
                          <span className="text-light-muted dark:text-slate-400 text-[10px]">
                            {item.isHypothesis ? 'Hypothesis' : 'Verified'}
                          </span>
                        </div>
                        <p className="font-heading font-semibold text-xs text-midnight-navy dark:text-white">
                          {item.node?.label || 'Linked Research Node'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grounded Citation Sources */}
                <div className="pt-4 border-t border-light-border dark:border-[#283548]">
                  <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-light-muted dark:text-slate-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-warm-amber" />
                    Supporting Literature
                  </h4>
                  <p className="font-body text-xs text-light-muted dark:text-slate-400 leading-relaxed mb-3">
                    Validated across {selectedNode.papersCount} peer-reviewed preprint and journal publications.
                  </p>

                  <a
                    href={`/research?q=${encodeURIComponent(selectedNode.label)}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-electric-teal/15 text-electric-teal hover:bg-electric-teal hover:text-midnight-navy font-mono text-xs font-semibold transition-colors"
                  >
                    Investigate in Research Engine <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] text-center text-light-muted dark:text-slate-400 font-body text-xs">
                Select any concept node in the graph to inspect relationships, evidence, and citations.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
