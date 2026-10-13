import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  FileText,
  ShieldCheck,
  Sparkles,
  Network,
  ScrollText,
  ArrowRight,
  Compass,
  CheckCircle2,
  ExternalLink,
  Layers,
  BrainCircuit,
  Eye
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import HeroVisualization from '../components/HeroVisualization';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function LandingPage() {
  const { toggleTheme, isDark } = useTheme();

  const features = [
    {
      icon: Search,
      title: 'AI Research Search',
      description: 'Explore millions of academic preprints and peer-reviewed journals with query-understanding and domain-specific filters.'
    },
    {
      icon: FileText,
      title: 'Intelligent PDF Analysis',
      description: 'Ingest complex manuscripts, dissertations, and research papers with layout-aware semantic parsing and table understanding.'
    },
    {
      icon: ShieldCheck,
      title: 'Evidence-Backed Answers',
      description: 'Every generated conclusion cites verifiable literature with DOIs, author attributions, and exact section provenance.'
    },
    {
      icon: Sparkles,
      title: 'Smart Summarization',
      description: 'Extract executive summaries, core methodologies, empirical benchmarks, and statistical findings in seconds.'
    },
    {
      icon: Layers,
      title: 'Comparative Literature Insights',
      description: 'Evaluate methodological baselines, identify experimental trade-offs, and discover unaddressed research gaps across studies.'
    },
    {
      icon: ScrollText,
      title: 'Research Report Generation',
      description: 'Synthesize comprehensive academic reports complete with abstracts, literature overviews, methodology analysis, and bibliographies.'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Ask a Research Question',
      description: 'State your research thesis, hypothesis, or inquiry in natural academic language or specify technical keywords.'
    },
    {
      step: '02',
      title: 'Explore Relevant Sources',
      description: 'Inspect peer-reviewed literature across arXiv, Nature, PubMed, and IEEE with grounded DOI metadata.'
    },
    {
      step: '03',
      title: 'Analyze and Connect Findings',
      description: 'Synthesize cross-disciplinary evidence, compare experimental benchmarks, and resolve literature contradictions.'
    },
    {
      step: '04',
      title: 'Generate Your Research Report',
      description: 'Export an evidence-backed, publication-ready research synthesis with complete scholarly citation integrity.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] dark:bg-[#101828] text-[#172033] dark:text-[#F7F6F2] transition-colors flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#101828]/85 backdrop-blur-md border-b border-light-border dark:border-[#283548]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <BrandLogo size="lg" showTagline={false} />

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-light-muted dark:text-slate-300">
            <a href="#features" className="hover:text-electric-teal transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-electric-teal transition-colors">
              How It Works
            </a>
            <Link to="/research" className="hover:text-electric-teal transition-colors">
              Research Tools
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-light-border dark:border-[#283548] text-light-text dark:text-slate-300 hover:bg-light-surface dark:hover:bg-[#1D2939] transition-colors"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-warm-amber" /> : <Moon className="w-4 h-4 text-midnight-navy" />}
            </button>

            <Link
              to="/login"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium rounded-lg text-midnight-navy dark:text-slate-200 hover:text-electric-teal transition-colors"
            >
              Login
            </Link>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-electric-teal text-midnight-navy hover:bg-electric-teal-hover shadow-teal-glow transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-teal/5 dark:bg-electric-teal/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-warm-amber/5 dark:bg-warm-amber/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/10 dark:bg-electric-teal/15 border border-electric-teal/30 text-electric-teal text-xs font-mono font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-electric-teal animate-pulse" />
                MIDNIGHT OBSERVATORY RESEARCH ENGINE
              </div>

              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-midnight-navy dark:text-white leading-[1.1] tracking-tight mb-6">
                Every Great Discovery Starts With a <span className="text-electric-teal underline decoration-electric-teal/40 decoration-wavy">Question.</span>
              </h1>

              <p className="font-body text-base sm:text-lg lg:text-xl text-light-muted dark:text-slate-300 leading-relaxed mb-8 max-w-2xl">
                Explore research, uncover meaningful connections, and transform complex information into clear, evidence-backed knowledge.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link
                  to="/research"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-base hover:bg-electric-teal-hover shadow-teal-glow transition-all"
                >
                  Start Exploring
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="#features"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-light-border dark:border-[#283548] bg-white dark:bg-[#172235] text-midnight-navy dark:text-white font-medium text-base hover:border-electric-teal/40 transition-colors"
                >
                  <Eye className="w-5 h-5 text-electric-teal" />
                  Discover the Platform
                </a>
              </div>

              {/* Scientific Trust Badges */}
              <div className="mt-12 pt-8 border-t border-light-border dark:border-[#283548] flex flex-wrap items-center gap-6 text-xs font-mono text-light-muted dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-electric-teal" />
                  Peer-Reviewed Citations
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-electric-teal" />
                  DOI-Linked References
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-warm-amber" />
                  Zero Fabricated Claims
                </span>
              </div>
            </div>

            {/* Right Hero Interactive Research Visualization */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="features" className="py-20 bg-white/50 dark:bg-[#172235]/40 border-y border-light-border dark:border-[#283548]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/10 text-electric-teal text-xs font-mono mb-3">
              RESEARCH WORKSPACE CAPABILITIES
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-midnight-navy dark:text-white tracking-tight">
              Architected for Scholarly Precision
            </h2>
            <p className="font-body text-base text-light-muted dark:text-slate-300 mt-3">
              Purpose-built tools designed specifically for academic investigators, college students, researchers, and scientific professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="group p-7 rounded-2xl bg-white dark:bg-[#1D2939] border border-light-border dark:border-[#283548] hover:border-electric-teal/50 hover:shadow-card-dark transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-electric-teal/10 dark:bg-electric-teal/15 text-electric-teal border border-electric-teal/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white mb-2 group-hover:text-electric-teal transition-colors">
                      {feat.title}
                    </h3>
                    <p className="font-body text-sm text-light-muted dark:text-slate-300 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-light-border dark:border-[#283548]/50 flex items-center text-xs font-mono text-electric-teal gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Capability <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/15 text-warm-amber text-xs font-mono mb-3">
              DISCOVERY METHODOLOGY
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-midnight-navy dark:text-white tracking-tight">
              From Inquiry to Verifiable Synthesis
            </h2>
            <p className="font-body text-base text-light-muted dark:text-slate-300 mt-3">
              Follow a disciplined four-stage scientific investigation pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] hover:border-warm-amber/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-2xl font-bold text-warm-amber mb-3">
                    {step.step}
                  </div>
                  <h3 className="font-heading font-semibold text-base text-midnight-navy dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-light-muted dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-[#101828] text-white border-t border-[#283548] relative overflow-hidden">
        <div className="absolute inset-0 observatory-grid opacity-60 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
            Accelerate Your Academic Research Today
          </h2>
          <p className="font-body text-base text-slate-300 max-w-2xl mx-auto mb-8">
            Experience the Midnight Observatory research environment. Ground your papers in verified citations, explore conceptual networks, and generate reports.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/research"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-base hover:bg-electric-teal-hover shadow-teal-glow transition-all"
            >
              Launch Research Workspace
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#283548] bg-[#172235] text-white font-medium text-base hover:border-electric-teal/50 transition-colors"
            >
              View Research Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Scientific Footer */}
      <footer className="mt-auto py-8 bg-[#101828] border-t border-[#283548] text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" clickable={false} />
            <span className="text-slate-500">|</span>
            <span>Discover Knowledge. Connect Ideas.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Midnight Observatory Design System</span>
            <span className="text-electric-teal">v2.4.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
