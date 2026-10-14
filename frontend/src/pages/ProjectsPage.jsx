import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Plus,
  BookOpen,
  ScrollText,
  Clock,
  Tag,
  ArrowRight,
  ExternalLink,
  Sparkles,
  X
} from 'lucide-react';
import { ProjectService } from '../services/api';
import EmptyState from '../components/EmptyState';
import BrandLoading from '../components/BrandLoading';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('Computer Science, AI');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await ProjectService.getProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      const created = await ProjectService.createProject({
        name: newTitle.trim(),
        description: newDesc.trim() || 'Academic inquiry workspace.',
        tags: tagsArray
      });

      if (created) {
        setProjects((prev) => [created, ...(Array.isArray(prev) ? prev : [])]);
      }
    } catch (err) {
      console.error('Failed to create project:', err);
    }

    setIsModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/15 text-electric-teal text-xs font-mono font-medium mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            INVESTIGATION WORKSPACES
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-midnight-navy dark:text-white">
            Research Projects
          </h1>
          <p className="font-body text-sm text-light-muted dark:text-slate-300 mt-1 max-w-2xl">
            Organize ongoing research projects, group relevant papers, track hypotheses, and compile shared bibliographies.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-xs sm:text-sm hover:bg-electric-teal-hover shadow-teal-glow transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          New Research Project
        </button>
      </div>

      {loading ? (
        <div className="p-16 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548]">
          <BrandLoading label="Retrieving project workspaces..." />
        </div>
      ) : !Array.isArray(projects) || projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No Research Projects"
          description="Create your first research workspace to organize papers, notes, and generated syntheses."
          actionLabel="Create Project"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id || proj.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] hover:border-electric-teal/40 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-light-border dark:border-[#283548] mb-3">
                  <span className="font-mono text-xs text-electric-teal flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-electric-teal" />
                    Active Workspace
                  </span>
                  <span className="font-mono text-[10px] text-light-muted dark:text-slate-400">
                    Updated {new Date(proj.updatedAt || proj.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-base sm:text-lg text-midnight-navy dark:text-white mb-2 leading-snug">
                  {proj.name}
                </h3>

                <p className="font-body text-xs sm:text-sm text-light-muted dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tags */}
                {Array.isArray(proj.tags) && proj.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-light-surface dark:bg-[#1D2939] text-light-muted dark:text-slate-300 border border-light-border dark:border-[#283548]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Stats & Actions */}
              <div className="pt-4 border-t border-light-border dark:border-[#283548] flex items-center justify-between">
                <div className="flex items-center gap-3 font-mono text-xs text-light-muted dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-electric-teal" />
                    {proj.papersCount} papers
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ScrollText className="w-3.5 h-3.5 text-warm-amber" />
                    {proj.reportsCount} reports
                  </span>
                </div>

                <a
                  href={`/research?q=${encodeURIComponent(proj.name)}`}
                  className="font-mono text-xs text-electric-teal hover:underline flex items-center gap-1"
                >
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-navy/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-[#172235] rounded-2xl border border-light-border dark:border-[#283548] shadow-2xl p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-light-muted dark:text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white mb-4">
              Initialize New Investigation Project
            </h3>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-light-muted dark:text-slate-400 uppercase mb-1">
                  Project Workspace Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Neural Algorithmic Reasoning & Graph Latents"
                  className="w-full px-3.5 py-2.5 text-sm font-body rounded-xl border border-light-border dark:border-[#283548] bg-light-surface/60 dark:bg-[#1D2939] text-midnight-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-light-muted dark:text-slate-400 uppercase mb-1">
                  Scope & Research Thesis
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Briefly describe the key questions or hypotheses to investigate..."
                  className="w-full p-3.5 text-sm font-body rounded-xl border border-light-border dark:border-[#283548] bg-light-surface/60 dark:bg-[#1D2939] text-midnight-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-electric-teal resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-light-muted dark:text-slate-400 uppercase mb-1">
                  Scientific Domains / Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="AI, GNN, Verification"
                  className="w-full px-3.5 py-2.5 text-sm font-body rounded-xl border border-light-border dark:border-[#283548] bg-light-surface/60 dark:bg-[#1D2939] text-midnight-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-light-border dark:border-[#283548] text-light-text dark:text-slate-300 hover:bg-light-surface dark:hover:bg-[#1D2939]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-electric-teal text-midnight-navy hover:bg-electric-teal-hover shadow-teal-glow transition-all"
                >
                  Create Project Space
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
