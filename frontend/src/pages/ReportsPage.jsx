import React, { useState, useEffect } from 'react';
import {
  ScrollText,
  Save,
  Download,
  Printer,
  Sparkles,
  Share2,
  BookOpen,
  CheckCircle2,
  FileCheck,
  AlertCircle,
  Plus,
  Clock,
  Layers
} from 'lucide-react';
import { ReportService } from '../services/api';
import BrandLoading from '../components/BrandLoading';
import EmptyState from '../components/EmptyState';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(''); // '' | 'saving' | 'saved'

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await ReportService.getReports();
      setReports(data || []);
      if (data?.length > 0) {
        setActiveReport(data[0]);
      }
    } catch (err) {
      console.error('Error fetching reports', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    if (!activeReport) return;
    setActiveReport((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      }
    }));
  };

  const handleTitleChange = (val) => {
    setActiveReport((prev) => ({ ...prev, title: val }));
  };

  const handleAbstractChange = (val) => {
    setActiveReport((prev) => ({ ...prev, abstract: val }));
  };

  const handleSave = async () => {
    if (!activeReport) return;
    setSaveStatus('saving');
    try {
      await ReportService.saveReport(activeReport);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2500);
    } catch (err) {
      console.error(err);
      setSaveStatus('');
    }
  };

  // Export functions
  const handleExportMarkdown = () => {
    if (!activeReport) return;
    const c = activeReport.content;
    const md = `# ${activeReport.title}

## Abstract
${activeReport.abstract}

## Introduction
${c.introduction}

## Research Questions
${c.researchQuestions?.map((q) => `- ${q}`).join('\n')}

## Literature Overview
${c.literatureOverview}

## Main Findings
${c.mainFindings}

## Comparative Analysis
${c.comparativeAnalysis}

## Research Gaps & Limitations
${c.gaps}

## Conclusion
${c.conclusion}

## References
${c.references?.map((r, i) => `[${i + 1}] ${r}`).join('\n')}
`;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeReport.title.replace(/\s+/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportTxt = () => {
    if (!activeReport) return;
    const c = activeReport.content;
    const txt = `${activeReport.title.toUpperCase()}
============================================================

ABSTRACT:
${activeReport.abstract}

1. INTRODUCTION:
${c.introduction}

2. RESEARCH QUESTIONS:
${c.researchQuestions?.map((q, i) => `  ${i + 1}. ${q}`).join('\n')}

3. LITERATURE OVERVIEW:
${c.literatureOverview}

4. MAIN FINDINGS:
${c.mainFindings}

5. COMPARATIVE ANALYSIS:
${c.comparativeAnalysis}

6. RESEARCH Gaps:
${c.gaps}

7. CONCLUSION:
${c.conclusion}

REFERENCES:
${c.references?.map((r, i) => `  [${i + 1}] ${r}`).join('\n')}
`;

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeReport.title.replace(/\s+/g, '_')}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCreateNewReport = () => {
    const newRep = {
      _id: 'rep-' + Date.now(),
      title: 'New Investigation Synthesis: ' + new Date().toLocaleDateString(),
      abstract: 'Abstract summarizing new empirical findings and domain questions.',
      createdAt: new Date().toISOString(),
      status: 'Draft',
      content: {
        introduction: 'Contextual background outlining the motivation of the research.',
        researchQuestions: ['What are the boundary conditions of this inquiry?'],
        literatureOverview: 'Review of current publications and foundational frameworks.',
        mainFindings: 'Primary synthesized discoveries supported by experimental results.',
        comparativeAnalysis: 'Evaluation against prior state-of-the-art baselines.',
        gaps: 'Unaddressed complexities and prospective directions.',
        conclusion: 'Summary of contributions and reproducibility considerations.',
        references: [
          'National Science Foundation Guidelines for Reproducible Research (2024).'
        ]
      }
    };
    setReports((prev) => [newRep, ...prev]);
    setActiveReport(newRep);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/15 text-electric-teal text-xs font-mono font-medium mb-2">
            <ScrollText className="w-3.5 h-3.5" />
            EDITORIAL EVIDENCE SYNTHESIS
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-midnight-navy dark:text-white">
            Research Report Generator
          </h1>
          <p className="font-body text-sm text-light-muted dark:text-slate-300 mt-1 max-w-2xl">
            Compose publication-grade research reports adhering to editorial journal standards with grounded citations and methodology analysis.
          </p>
        </div>

        <button
          onClick={handleCreateNewReport}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-xs sm:text-sm hover:bg-electric-teal-hover shadow-teal-glow transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Compose New Report
        </button>
      </div>

      {loading ? (
        <div className="p-16 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548]">
          <BrandLoading label="Retrieving synthesized editorial reports..." />
        </div>
      ) : reports.length === 0 ? (
        <EmptyState
          icon={ScrollText}
          title="No Reports Synthesized"
          description="Create your first academic research report from your inquiries or start from a blank synthesis."
          actionLabel="Compose New Report"
          onAction={handleCreateNewReport}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Report Navigator (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm">
              <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-light-muted dark:text-slate-400 mb-3">
                Saved Reports ({reports.length})
              </h3>
              <div className="space-y-2">
                {reports.map((rep) => (
                  <button
                    key={rep._id}
                    onClick={() => setActiveReport(rep)}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      activeReport?._id === rep._id
                        ? 'bg-light-surface dark:bg-[#1D2939] border border-electric-teal/50 shadow-sm'
                        : 'border border-transparent hover:bg-light-surface/60 dark:hover:bg-[#1D2939]/60'
                    }`}
                  >
                    <h4 className="font-heading font-semibold text-xs text-midnight-navy dark:text-white line-clamp-2">
                      {rep.title}
                    </h4>
                    <div className="flex items-center justify-between font-mono text-[10px] text-light-muted dark:text-slate-400 mt-2">
                      <span>{new Date(rep.createdAt).toLocaleDateString()}</span>
                      <span className="text-electric-teal">
                        {activeReport?._id === rep._id ? 'Active' : ''}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Generated Integrity Badge */}
            <div className="p-4 rounded-xl bg-midnight-navy text-white border border-[#283548]">
              <div className="flex items-center gap-2 mb-1.5">
                <FileCheck className="w-4 h-4 text-electric-teal" />
                <span className="font-mono text-xs font-semibold text-electric-teal">
                  Integrity Verified
                </span>
              </div>
              <p className="font-body text-xs text-slate-300 leading-snug">
                Every deduction in this report traces to registered DOI preprints and peer-reviewed journal papers.
              </p>
            </div>
          </div>

          {/* Right: Editorial Reading & Editing Document (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {activeReport && (
              <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm space-y-8">
                {/* Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-light-border dark:border-[#283548]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saveStatus === 'saving'}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-xs hover:bg-electric-teal-hover transition-colors shadow-teal-glow"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {saveStatus === 'saving'
                        ? 'Saving...'
                        : saveStatus === 'saved'
                        ? 'Saved ✓'
                        : 'Save Changes'}
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportMarkdown}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-light-border dark:border-[#283548] text-xs font-mono text-light-text dark:text-slate-200 hover:border-electric-teal transition-colors"
                      title="Export Markdown"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export .MD
                    </button>

                    <button
                      onClick={handleExportTxt}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-light-border dark:border-[#283548] text-xs font-mono text-light-text dark:text-slate-200 hover:border-electric-teal transition-colors"
                      title="Export Text"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export .TXT
                    </button>

                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-light-border dark:border-[#283548] text-xs font-mono text-light-text dark:text-slate-200 hover:border-electric-teal transition-colors"
                      title="Print or Save PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print / PDF
                    </button>
                  </div>
                </div>

                {/* Report Editable Title */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-light-muted dark:text-slate-400 mb-1">
                    Report Title
                  </label>
                  <input
                    type="text"
                    value={activeReport.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full font-heading font-bold text-2xl sm:text-3xl text-midnight-navy dark:text-white bg-transparent border-b border-dashed border-light-border dark:border-[#283548] focus:border-electric-teal focus:outline-none pb-2 transition-colors"
                  />
                </div>

                {/* Abstract Section */}
                <div className="p-5 rounded-xl bg-light-surface/60 dark:bg-[#1D2939] border border-light-border dark:border-[#283548]">
                  <label className="block text-xs font-heading font-semibold uppercase text-electric-teal mb-2">
                    Abstract
                  </label>
                  <textarea
                    rows={3}
                    value={activeReport.abstract}
                    onChange={(e) => handleAbstractChange(e.target.value)}
                    className="w-full text-xs sm:text-sm font-body text-light-text dark:text-slate-200 bg-transparent border-0 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Section 1: Introduction */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white mb-2">
                    1. Introduction & Theoretical Motivation
                  </h3>
                  <textarea
                    rows={4}
                    value={activeReport.content?.introduction || ''}
                    onChange={(e) => handleFieldChange('introduction', e.target.value)}
                    className="w-full p-4 text-xs sm:text-sm font-body text-light-text dark:text-slate-200 rounded-xl bg-light-surface/30 dark:bg-[#1D2939]/40 border border-light-border dark:border-[#283548] focus:border-electric-teal focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Section 2: Research Questions */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white mb-2">
                    2. Primary Research Questions
                  </h3>
                  <div className="space-y-2">
                    {activeReport.content?.researchQuestions?.map((q, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-light-surface/50 dark:bg-[#1D2939] border border-light-border dark:border-[#283548] text-xs sm:text-sm text-light-text dark:text-slate-200 flex items-start gap-2"
                      >
                        <span className="font-mono text-electric-teal font-semibold">
                          RQ{idx + 1}:
                        </span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Literature Overview */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white mb-2">
                    3. Literature Overview & Prior State-of-the-Art
                  </h3>
                  <textarea
                    rows={4}
                    value={activeReport.content?.literatureOverview || ''}
                    onChange={(e) => handleFieldChange('literatureOverview', e.target.value)}
                    className="w-full p-4 text-xs sm:text-sm font-body text-light-text dark:text-slate-200 rounded-xl bg-light-surface/30 dark:bg-[#1D2939]/40 border border-light-border dark:border-[#283548] focus:border-electric-teal focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Section 4: Main Findings */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white mb-2">
                    4. Synthesized Findings & Evidence
                  </h3>
                  <textarea
                    rows={4}
                    value={activeReport.content?.mainFindings || ''}
                    onChange={(e) => handleFieldChange('mainFindings', e.target.value)}
                    className="w-full p-4 text-xs sm:text-sm font-body text-light-text dark:text-slate-200 rounded-xl bg-light-surface/30 dark:bg-[#1D2939]/40 border border-light-border dark:border-[#283548] focus:border-electric-teal focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Section 5: Comparative Analysis */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white mb-2">
                    5. Comparative Analysis & Trade-offs
                  </h3>
                  <textarea
                    rows={4}
                    value={activeReport.content?.comparativeAnalysis || ''}
                    onChange={(e) => handleFieldChange('comparativeAnalysis', e.target.value)}
                    className="w-full p-4 text-xs sm:text-sm font-body text-light-text dark:text-slate-200 rounded-xl bg-light-surface/30 dark:bg-[#1D2939]/40 border border-light-border dark:border-[#283548] focus:border-electric-teal focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Section 6: Research Gaps & Limitations */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white mb-2">
                    6. Critical Gaps & Experimental Limitations
                  </h3>
                  <textarea
                    rows={3}
                    value={activeReport.content?.gaps || ''}
                    onChange={(e) => handleFieldChange('gaps', e.target.value)}
                    className="w-full p-4 text-xs sm:text-sm font-body text-light-text dark:text-slate-200 rounded-xl bg-light-surface/30 dark:bg-[#1D2939]/40 border border-light-border dark:border-[#283548] focus:border-electric-teal focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Section 7: Conclusion */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white mb-2">
                    7. Conclusion
                  </h3>
                  <textarea
                    rows={3}
                    value={activeReport.content?.conclusion || ''}
                    onChange={(e) => handleFieldChange('conclusion', e.target.value)}
                    className="w-full p-4 text-xs sm:text-sm font-body text-light-text dark:text-slate-200 rounded-xl bg-light-surface/30 dark:bg-[#1D2939]/40 border border-light-border dark:border-[#283548] focus:border-electric-teal focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Section 8: Bibliography & References */}
                <div className="pt-4 border-t border-light-border dark:border-[#283548]">
                  <h3 className="font-heading font-semibold text-lg text-midnight-navy dark:text-white mb-3">
                    References & Grounded Citations
                  </h3>
                  <div className="space-y-2">
                    {activeReport.content?.references?.map((ref, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-light-surface/40 dark:bg-[#1D2939] border border-light-border dark:border-[#283548] font-mono text-xs text-light-text dark:text-slate-300 leading-relaxed"
                      >
                        <span className="text-electric-teal font-semibold mr-2">
                          [{idx + 1}]
                        </span>
                        {ref}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
