import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  ArrowRight,
  BookOpen,
  FileText,
  Network,
  FolderKanban,
  ScrollText,
  Clock,
  ExternalLink,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ResearchService, DocumentService, ProjectService, ReportService } from '../services/api';
import CitationBadge from '../components/CitationBadge';
import EmptyState from '../components/EmptyState';

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [researchQuery, setResearchQuery] = useState('');
  const [recentPapers, setRecentPapers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [docs, projs, reps] = await Promise.all([
          DocumentService.getDocuments(),
          ProjectService.getProjects(),
          ReportService.getReports()
        ]);
        setDocuments(docs || []);
        setProjects(projs || []);
        setReports(reps || []);
      } catch (err) {
        console.error('Error fetching dashboard records', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const handleStartResearch = (e) => {
    e.preventDefault();
    if (researchQuery.trim()) {
      navigate(`/research?q=${encodeURIComponent(researchQuery.trim())}`);
    } else {
      navigate('/research');
    }
  };

  const sampleQuestions = [
    'How do neural transformers learn hierarchical abstractions?',
    'What are the state-of-the-art methods in quantized LLM inference?',
    'Synthesize recent findings on AlphaFold structural predictions'
  ];

  return (
    <div className="space-y-8">
      {/* Personalized Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-electric-teal animate-pulse" />
            <span className="font-mono text-xs text-electric-teal tracking-wider uppercase">
              Observatory Workspace
            </span>
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-midnight-navy dark:text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'Researcher'}.
          </h1>
          <p className="font-body text-sm sm:text-base text-light-muted dark:text-slate-300 mt-1">
            What will you discover today?
          </p>
        </div>

        {/* Quick action: New Project */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-light-border dark:border-[#283548] bg-white dark:bg-[#172235] text-xs font-semibold text-midnight-navy dark:text-white hover:border-electric-teal/50 transition-colors shadow-sm self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-electric-teal" />
          New Investigation Project
        </Link>
      </div>

      {/* Prominent Research Input Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-midnight-navy text-white border border-[#283548] shadow-2xl relative overflow-hidden">
        {/* Observatory Grid Effect */}
        <div className="absolute inset-0 observatory-grid opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-electric-teal/15 text-electric-teal font-mono text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            AI Academic Synthesis
          </div>

          <h2 className="font-heading font-semibold text-xl sm:text-2xl text-white mb-2">
            Ask an academic question or investigate a discovery
          </h2>
          <p className="font-body text-xs sm:text-sm text-slate-300 mb-6">
            Search peer-reviewed literature, compare hypotheses, extract methodology gaps, and trace citations.
          </p>

          <form onSubmit={handleStartResearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={researchQuery}
                onChange={(e) => setResearchQuery(e.target.value)}
                placeholder="Ask a question, explore a topic, or investigate a discovery..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#283548] bg-[#172235] text-white placeholder:text-slate-400 text-sm font-body focus:outline-none focus:ring-2 focus:ring-electric-teal focus:border-electric-teal transition-all"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-sm hover:bg-electric-teal-hover shadow-teal-glow transition-all flex-shrink-0"
            >
              Start Research
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Query Suggestions */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-slate-400">Try investigating:</span>
            {sampleQuestions.map((q, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setResearchQuery(q);
                  navigate(`/research?q=${encodeURIComponent(q)}`);
                }}
                className="text-xs font-body text-slate-300 hover:text-electric-teal bg-[#1D2939] px-2.5 py-1 rounded-lg border border-[#283548] transition-colors truncate max-w-xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Workspaces: Projects, Uploaded Papers, Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Saved Projects */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-electric-teal" />
                <h3 className="font-heading font-semibold text-base text-midnight-navy dark:text-white">
                  Active Projects
                </h3>
              </div>
              <Link to="/projects" className="text-xs font-mono text-electric-teal hover:underline flex items-center gap-0.5">
                View all ({projects.length})
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {projects.length === 0 ? (
              <p className="font-body text-xs text-light-muted dark:text-slate-400 py-4">
                No active projects created yet.
              </p>
            ) : (
              <div className="space-y-3">
                {projects.slice(0, 3).map((proj) => (
                  <Link
                    key={proj._id}
                    to="/projects"
                    className="block p-3 rounded-xl bg-light-surface dark:bg-[#1D2939] border border-light-border dark:border-[#283548] hover:border-electric-teal/40 transition-colors"
                  >
                    <h4 className="font-heading font-semibold text-xs sm:text-sm text-midnight-navy dark:text-white truncate">
                      {proj.name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5 font-mono text-[10px] text-light-muted dark:text-slate-400">
                      <span>{proj.papersCount} papers</span>
                      <span>•</span>
                      <span>{proj.reportsCount} reports</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/projects"
            className="mt-4 pt-3 border-t border-light-border dark:border-[#283548] text-xs font-mono text-light-muted dark:text-slate-300 hover:text-electric-teal flex items-center justify-between"
          >
            <span>Manage Project Spaces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Uploaded Manuscripts & Papers */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-warm-amber" />
                <h3 className="font-heading font-semibold text-base text-midnight-navy dark:text-white">
                  Document Library
                </h3>
              </div>
              <Link to="/documents" className="text-xs font-mono text-warm-amber hover:underline flex items-center gap-0.5">
                Manage ({documents.length})
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {documents.length === 0 ? (
              <p className="font-body text-xs text-light-muted dark:text-slate-400 py-4">
                No papers uploaded yet. Drag & drop research PDFs in the Document Library.
              </p>
            ) : (
              <div className="space-y-3">
                {documents.slice(0, 3).map((doc) => (
                  <Link
                    key={doc._id}
                    to="/documents"
                    className="block p-3 rounded-xl bg-light-surface dark:bg-[#1D2939] border border-light-border dark:border-[#283548] hover:border-warm-amber/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-semibold text-xs sm:text-sm text-midnight-navy dark:text-white truncate max-w-[200px]">
                        {doc.name}
                      </h4>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-warm-amber/15 text-warm-amber">
                        {doc.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 font-mono text-[10px] text-light-muted dark:text-slate-400">
                      <span>{(doc.size / (1024 * 1024)).toFixed(1)} MB</span>
                      <span>•</span>
                      <span>{doc.pages || 12} pgs</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/documents"
            className="mt-4 pt-3 border-t border-light-border dark:border-[#283548] text-xs font-mono text-light-muted dark:text-slate-300 hover:text-warm-amber flex items-center justify-between"
          >
            <span>Upload Research PDF</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Recent Research Reports */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ScrollText className="w-5 h-5 text-electric-teal" />
                <h3 className="font-heading font-semibold text-base text-midnight-navy dark:text-white">
                  Evidence Reports
                </h3>
              </div>
              <Link to="/reports" className="text-xs font-mono text-electric-teal hover:underline flex items-center gap-0.5">
                All Reports ({reports.length})
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {reports.length === 0 ? (
              <p className="font-body text-xs text-light-muted dark:text-slate-400 py-4">
                No synthesized reports created yet.
              </p>
            ) : (
              <div className="space-y-3">
                {reports.slice(0, 3).map((rep) => (
                  <Link
                    key={rep._id}
                    to="/reports"
                    className="block p-3 rounded-xl bg-light-surface dark:bg-[#1D2939] border border-light-border dark:border-[#283548] hover:border-electric-teal/40 transition-colors"
                  >
                    <h4 className="font-heading font-semibold text-xs sm:text-sm text-midnight-navy dark:text-white truncate">
                      {rep.title}
                    </h4>
                    <p className="font-body text-[11px] text-light-muted dark:text-slate-400 line-clamp-1 mt-1">
                      {rep.abstract}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/reports"
            className="mt-4 pt-3 border-t border-light-border dark:border-[#283548] text-xs font-mono text-light-muted dark:text-slate-300 hover:text-electric-teal flex items-center justify-between"
          >
            <span>Compose Research Synthesis</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Grounded Evidence Synthesis Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#101828] to-[#172235] text-white border border-[#283548] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-electric-teal/20 text-electric-teal border border-electric-teal/30 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-white">
              Grounded Academic Evidence Engine
            </h3>
            <p className="font-body text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Cross-index verified peer-reviewed preprints, synthesize literature comparisons, and extract empirical methodology benchmarks.
            </p>
          </div>
        </div>

        <Link
          to="/research"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-xs sm:text-sm hover:bg-electric-teal-hover transition-colors shadow-teal-glow flex-shrink-0"
        >
          Explore Research Engine
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
