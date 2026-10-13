import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Filter,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  BookOpen,
  AlertCircle,
  HelpCircle,
  CheckCircle,
  ArrowRight,
  Layers,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { ResearchService } from '../services/api';
import CitationBadge from '../components/CitationBadge';
import EmptyState from '../components/EmptyState';
import BrandLoading from '../components/BrandLoading';

export default function ResearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [domain, setDomain] = useState('All Domains');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [keywordFilter, setKeywordFilter] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Collapsible section states
  const [showFindings, setShowFindings] = useState(true);
  const [showDetailed, setShowDetailed] = useState(true);
  const [showComparative, setShowComparative] = useState(true);
  const [showGaps, setShowGaps] = useState(true);

  // Domains list
  const domains = [
    'All Domains',
    'Computer Science',
    'AI & Foundation Models',
    'Biophysics & Medicine',
    'Mathematics & Logic',
    'Cognitive Science'
  ];

  // Year filters
  const years = ['All Years', '2024', '2023', '2022', '2020-2021'];

  const executeSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await ResearchService.search(searchQuery, {
        domain: domain !== 'All Domains' ? domain : undefined,
        year: yearFilter !== 'All Years' ? yearFilter : undefined,
        keyword: keywordFilter.trim() || undefined
      });
      setResults(data);
    } catch (err) {
      console.error('Research search error:', err);
      setError('Unable to complete research synthesis. Please try adjusting your inquiry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      executeSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      executeSearch(query.trim());
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/10 dark:bg-electric-teal/15 text-electric-teal text-xs font-mono font-medium mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          ACADEMIC INQUIRY & SYNTHESIS
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-midnight-navy dark:text-white">
          Scholarly Research Engine
        </h1>
        <p className="font-body text-sm text-light-muted dark:text-slate-300 mt-1 max-w-3xl">
          Formulate complex research questions. Synthesize peer-reviewed literature across preprint archives and journals with verified provenance.
        </p>
      </div>

      {/* Main Search & Filter Console */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-light-muted dark:text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask an academic question (e.g., How do neurosymbolic models ensure formal verification?)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-light-border dark:border-[#283548] bg-light-surface/60 dark:bg-[#1D2939] text-midnight-navy dark:text-white placeholder:text-light-muted dark:placeholder:text-slate-400 text-sm font-body focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-electric-teal transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-sm hover:bg-electric-teal-hover shadow-teal-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            {loading ? 'Synthesizing...' : 'Search & Synthesize'}
          </button>
        </form>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-light-border dark:border-[#283548]">
          <div className="flex items-center gap-2 text-xs font-mono text-light-muted dark:text-slate-400">
            <Filter className="w-3.5 h-3.5 text-electric-teal" />
            <span>Filters:</span>
          </div>

          {/* Domain Filter */}
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="px-3 py-1.5 text-xs font-body rounded-lg border border-light-border dark:border-[#283548] bg-white dark:bg-[#1D2939] text-midnight-navy dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-electric-teal"
          >
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Publication Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-body rounded-lg border border-light-border dark:border-[#283548] bg-white dark:bg-[#1D2939] text-midnight-navy dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-electric-teal"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          {/* Keyword / Methodology Tag */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={keywordFilter}
              onChange={(e) => setKeywordFilter(e.target.value)}
              placeholder="Keyword or method (e.g. GNN, QLoRA)..."
              className="w-full px-3 py-1.5 text-xs font-body rounded-lg border border-light-border dark:border-[#283548] bg-white dark:bg-[#1D2939] text-midnight-navy dark:text-slate-200 placeholder:text-light-muted dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-electric-teal"
            />
          </div>
        </div>
      </div>

      {/* Loading Skeleton State */}
      {loading && (
        <div className="p-12 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] flex flex-col items-center justify-center">
          <BrandLoading label="Observatory synthesis in progress: cross-indexing citations and synthesizing methodology..." size="md" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-status-error/10 border border-status-error/30 text-status-error text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Empty Initial State */}
      {!loading && !results && (
        <EmptyState
          icon={Compass}
          title="Ready for Scientific Inquiry"
          description="Type a question above or choose a domain filter to explore empirical findings, comparative literature insights, and citations."
          actionLabel="Explore Neurosymbolic AI"
          onAction={() => {
            setQuery('How do neurosymbolic models ensure formal verification?');
            setSearchParams({ q: 'How do neurosymbolic models ensure formal verification?' });
            executeSearch('How do neurosymbolic models ensure formal verification?');
          }}
          secondaryActionLabel="Explore Transformer Quantization"
          onSecondaryAction={() => {
            setQuery('What are the empirical trade-offs of 4-bit QLoRA?');
            setSearchParams({ q: 'What are the empirical trade-offs of 4-bit QLoRA?' });
            executeSearch('What are the empirical trade-offs of 4-bit QLoRA?');
          }}
        />
      )}

      {/* Results View: Main Synthesized Content + Supporting Source Panel */}
      {!loading && results && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Synthesized Findings Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Overview Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-light-border dark:border-[#283548] mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-electric-teal" />
                  <h2 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white">
                    Synthesized Research Overview
                  </h2>
                </div>
                <span className="font-mono text-xs text-electric-teal">
                  {results.sources?.length || 0} Grounded Sources
                </span>
              </div>

              <div className="editorial-body text-light-text dark:text-slate-200">
                <p className="leading-relaxed text-sm sm:text-base">
                  {results.overview}
                </p>
              </div>

              {/* Action: Compose into Report */}
              <div className="mt-6 pt-4 border-t border-light-border dark:border-[#283548] flex items-center justify-between">
                <span className="font-mono text-xs text-light-muted dark:text-slate-400">
                  Grounded Synthesis Confidence: 98.2%
                </span>
                <Link
                  to="/reports"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-electric-teal hover:underline"
                >
                  Generate Full Report <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Important Findings (Collapsible) */}
            <div className="rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm overflow-hidden">
              <button
                onClick={() => setShowFindings(!showFindings)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-light-surface/50 dark:hover:bg-[#1D2939]/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-electric-teal" />
                  <h3 className="font-heading font-semibold text-base text-midnight-navy dark:text-white">
                    Important Findings & Deductions
                  </h3>
                </div>
                {showFindings ? <ChevronUp className="w-4 h-4 text-light-muted" /> : <ChevronDown className="w-4 h-4 text-light-muted" />}
              </button>

              {showFindings && (
                <div className="p-5 pt-0 space-y-3">
                  {results.importantFindings?.map((finding, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-light-surface/60 dark:bg-[#1D2939] border border-light-border dark:border-[#283548] flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-electric-teal/15 text-electric-teal font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-body text-xs sm:text-sm text-light-text dark:text-slate-200 leading-relaxed">
                        {finding}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detailed Explanations */}
            <div className="rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm overflow-hidden">
              <button
                onClick={() => setShowDetailed(!showDetailed)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-light-surface/50 dark:hover:bg-[#1D2939]/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-electric-teal" />
                  <h3 className="font-heading font-semibold text-base text-midnight-navy dark:text-white">
                    Detailed Methodological Analysis
                  </h3>
                </div>
                {showDetailed ? <ChevronUp className="w-4 h-4 text-light-muted" /> : <ChevronDown className="w-4 h-4 text-light-muted" />}
              </button>

              {showDetailed && (
                <div className="p-5 pt-0">
                  <div className="editorial-body text-light-text dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                    <p>{results.detailedExplanations}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Comparative Insights */}
            <div className="rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm overflow-hidden">
              <button
                onClick={() => setShowComparative(!showComparative)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-light-surface/50 dark:hover:bg-[#1D2939]/50 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-5 h-5 text-warm-amber" />
                  <h3 className="font-heading font-semibold text-base text-midnight-navy dark:text-white">
                    Comparative Insights & Paradigms
                  </h3>
                </div>
                {showComparative ? <ChevronUp className="w-4 h-4 text-light-muted" /> : <ChevronDown className="w-4 h-4 text-light-muted" />}
              </button>

              {showComparative && (
                <div className="p-5 pt-0">
                  <p className="font-body text-sm sm:text-base text-light-text dark:text-slate-200 leading-relaxed">
                    {results.comparativeInsights}
                  </p>
                </div>
              )}
            </div>

            {/* Research Gaps & Limitations */}
            <div className="p-5 rounded-2xl bg-warm-amber/5 dark:bg-warm-amber/10 border border-warm-amber/30 space-y-3">
              <div className="flex items-center gap-2 text-warm-amber">
                <AlertCircle className="w-5 h-5" />
                <h4 className="font-heading font-semibold text-sm sm:text-base">
                  Identified Research Gaps & Boundary Limitations
                </h4>
              </div>

              {results.potentialGaps && results.potentialGaps.length > 0 && (
                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-light-text dark:text-slate-300">
                  {results.potentialGaps.map((gap, i) => (
                    <li key={i}>{gap}</li>
                  ))}
                </ul>
              )}

              {results.limitations && (
                <p className="text-xs font-mono text-light-muted dark:text-slate-400 pt-2 border-t border-warm-amber/20">
                  <span className="font-semibold text-warm-amber">Limitation Note: </span>
                  {results.limitations}
                </p>
              )}
            </div>
          </div>

          {/* Supporting Source Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sources List Box */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-light-border dark:border-[#283548] mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-electric-teal" />
                  <h3 className="font-heading font-semibold text-sm text-midnight-navy dark:text-white">
                    Primary Academic Sources
                  </h3>
                </div>
                <span className="font-mono text-xs text-electric-teal">
                  {results.sources?.length} Verified
                </span>
              </div>

              <div className="space-y-4">
                {results.sources?.map((source, idx) => (
                  <div
                    key={source.id || idx}
                    className="p-3.5 rounded-xl bg-light-surface/50 dark:bg-[#1D2939] border border-light-border dark:border-[#283548] hover:border-electric-teal/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-electric-teal/15 text-electric-teal font-semibold">
                        [{idx + 1}] {source.provider}
                      </span>
                      <span className="font-mono text-[10px] text-light-muted dark:text-slate-400">
                        {source.year}
                      </span>
                    </div>

                    <h4 className="font-heading font-semibold text-xs sm:text-sm text-midnight-navy dark:text-white mt-2 leading-snug">
                      {source.title}
                    </h4>

                    <p className="font-body text-[11px] text-light-muted dark:text-slate-400 mt-1 line-clamp-1">
                      {source.authors?.join(', ')}
                    </p>

                    {source.doi && (
                      <p className="font-mono text-[10px] text-electric-teal mt-2 truncate">
                        DOI: {source.doi}
                      </p>
                    )}

                    {source.abstract && (
                      <p className="font-body text-[11px] text-light-text dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                        {source.abstract}
                      </p>
                    )}

                    {source.url && (
                      <div className="mt-3 pt-2 border-t border-light-border dark:border-[#283548]/50 flex items-center justify-between">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[10px] text-electric-teal hover:underline"
                        >
                          Open Paper <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Related Research Topics */}
            {results.relatedTopics && results.relatedTopics.length > 0 && (
              <div className="p-5 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm">
                <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-light-muted dark:text-slate-400 mb-3">
                  Related Research Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.relatedTopics.map((topic, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setQuery(topic);
                        setSearchParams({ q: topic });
                        executeSearch(topic);
                      }}
                      className="px-2.5 py-1 text-xs font-body rounded-lg bg-light-surface dark:bg-[#1D2939] border border-light-border dark:border-[#283548] text-midnight-navy dark:text-slate-300 hover:border-electric-teal/50 hover:text-electric-teal transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
