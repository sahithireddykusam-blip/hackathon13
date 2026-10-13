import React, { useState } from 'react';
import {
  Settings,
  User,
  Sun,
  Moon,
  Shield,
  Save,
  CheckCircle2,
  Key,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme, isDark } = useTheme();

  const [name, setName] = useState(user?.name || 'Dr. Alexis Chen');
  const [email, setEmail] = useState(user?.email || 'alexis.chen@observatory.edu');
  const [institution, setInstitution] = useState('Institute for Advanced Computational Studies');
  const [role, setRole] = useState('Lead Principal Investigator');
  const [citationThreshold, setCitationThreshold] = useState('0.85');
  const [includePreprints, setIncludePreprints] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/15 text-electric-teal text-xs font-mono font-medium mb-2">
          <Settings className="w-3.5 h-3.5" />
          SYSTEM & RESEARCH PREFERENCES
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-midnight-navy dark:text-white">
          Workspace Settings
        </h1>
        <p className="font-body text-sm text-light-muted dark:text-slate-300 mt-1">
          Configure researcher metadata, interface appearance, and grounding verification parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-light-border dark:border-[#283548]">
            <User className="w-5 h-5 text-electric-teal" />
            <h2 className="font-heading font-semibold text-base text-midnight-navy dark:text-white">
              Researcher Identity & Affiliation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-light-muted dark:text-slate-400 uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-body rounded-xl border border-light-border dark:border-[#283548] bg-light-surface/60 dark:bg-[#1D2939] text-midnight-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-light-muted dark:text-slate-400 uppercase mb-1">
                Academic Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-body rounded-xl border border-light-border dark:border-[#283548] bg-light-surface/60 dark:bg-[#1D2939] text-midnight-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-light-muted dark:text-slate-400 uppercase mb-1">
                Research Institution / University
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-body rounded-xl border border-light-border dark:border-[#283548] bg-light-surface/60 dark:bg-[#1D2939] text-midnight-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-light-muted dark:text-slate-400 uppercase mb-1">
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-body rounded-xl border border-light-border dark:border-[#283548] bg-light-surface/60 dark:bg-[#1D2939] text-midnight-navy dark:text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
              />
            </div>
          </div>
        </div>

        {/* Visual Theme Selection */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-light-border dark:border-[#283548]">
            <Sun className="w-5 h-5 text-warm-amber" />
            <h2 className="font-heading font-semibold text-base text-midnight-navy dark:text-white">
              Interface Visual Theme
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Midnight Observatory (Dark) */}
            <div
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isDark
                  ? 'border-electric-teal bg-[#101828] text-white shadow-teal-glow'
                  : 'border-light-border dark:border-[#283548] bg-[#101828] text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-semibold text-sm">
                  Midnight Observatory (Dark)
                </span>
                {isDark && (
                  <CheckCircle2 className="w-4 h-4 text-electric-teal" />
                )}
              </div>
              <p className="font-body text-xs text-slate-300">
                Deep navy laboratory surfaces with electric teal highlights and warm amber discoveries.
              </p>
            </div>

            {/* Light Ivory Theme */}
            <div
              onClick={() => setTheme('light')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                !isDark
                  ? 'border-electric-teal bg-[#F7F6F2] text-[#172033] shadow-md'
                  : 'border-light-border dark:border-[#283548] bg-[#F7F6F2] text-[#172033]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading font-semibold text-sm text-[#172033]">
                  Ivory Journal (Light)
                </span>
                {!isDark && (
                  <CheckCircle2 className="w-4 h-4 text-electric-teal" />
                )}
              </div>
              <p className="font-body text-xs text-[#667085]">
                Warm ivory editorial surfaces optimized for daytime reading and paper drafting.
              </p>
            </div>
          </div>
        </div>

        {/* AI Grounding & Citation Quality Parameters */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-light-border dark:border-[#283548]">
            <Shield className="w-5 h-5 text-electric-teal" />
            <h2 className="font-heading font-semibold text-base text-midnight-navy dark:text-white">
              Scholarly Grounding & Verification Criteria
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-light-muted dark:text-slate-400 uppercase mb-1">
                Minimum Confidence Threshold ({Math.round(citationThreshold * 100)}%)
              </label>
              <input
                type="range"
                min="0.5"
                max="0.99"
                step="0.01"
                value={citationThreshold}
                onChange={(e) => setCitationThreshold(e.target.value)}
                className="w-full accent-electric-teal"
              />
              <p className="text-[11px] font-body text-light-muted dark:text-slate-400 mt-1">
                Higher values restrict deductions to claims backed by high-confidence peer-reviewed publications.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="font-heading font-semibold text-xs sm:text-sm text-midnight-navy dark:text-white">
                  Include ArXiv & BiorXiv Preprints
                </p>
                <p className="text-[11px] font-body text-light-muted dark:text-slate-400">
                  Allow synthesis over recent preprints alongside published journals.
                </p>
              </div>
              <input
                type="checkbox"
                checked={includePreprints}
                onChange={(e) => setIncludePreprints(e.target.checked)}
                className="w-4 h-4 accent-electric-teal rounded"
              />
            </div>
          </div>
        </div>

        {/* Save button & feedback toast */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-sm hover:bg-electric-teal-hover shadow-teal-glow transition-all"
          >
            <Save className="w-4 h-4" />
            Save Preferences
          </button>

          {savedFeedback && (
            <span className="font-mono text-xs text-status-success flex items-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              Preferences successfully updated!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
