import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Sun,
  Moon,
  Search,
  User,
  LogOut,
  Bell,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function TopNavigation({ onOpenSidebar }) {
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Derive route title
  const routeTitles = {
    '/dashboard': 'Research Dashboard',
    '/research': 'Academic Research Search',
    '/documents': 'Document Library & Analysis',
    '/projects': 'Research Projects',
    '/reports': 'Report Generator & Synthesis',
    '/settings': 'System Settings'
  };

  const currentTitle = routeTitles[location.pathname] || 'Research Workspace';

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/research?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full h-16 bg-white/80 dark:bg-[#101828]/85 backdrop-blur-md border-b border-light-border dark:border-[#283548] px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile hamburger + Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 rounded-lg text-light-muted dark:text-slate-300 hover:bg-light-surface dark:hover:bg-[#1D2939] transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-mono text-light-muted dark:text-slate-400">
            <span>Observatory</span>
            <span>/</span>
            <span className="text-electric-teal font-medium">{location.pathname.replace('/', '') || 'home'}</span>
          </div>
          <h1 className="font-heading font-semibold text-sm sm:text-base text-midnight-navy dark:text-white leading-tight">
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Middle: Global Quick Search Input */}
      <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
        <form onSubmit={handleGlobalSearch} className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-light-muted dark:text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers, concepts, or queries (e.g. quantum entanglement)..."
            className="w-full pl-9 pr-4 py-1.5 text-xs font-body rounded-xl border border-light-border dark:border-[#283548] bg-light-surface/60 dark:bg-[#172235] text-midnight-navy dark:text-slate-200 placeholder:text-light-muted dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-electric-teal focus:border-electric-teal transition-all"
          />
        </form>
      </div>

      {/* Right Actions: Theme Toggle, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-light-border dark:border-[#283548] text-light-text dark:text-slate-300 hover:bg-light-surface dark:hover:bg-[#1D2939] hover:border-electric-teal/50 transition-colors"
          title={`Switch to ${isDark ? 'Light (Ivory)' : 'Midnight Observatory (Dark)'} theme`}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-warm-amber" />
          ) : (
            <Moon className="w-4 h-4 text-midnight-navy" />
          )}
        </button>

        {/* User Profile Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu((prev) => !prev)}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl border border-light-border dark:border-[#283548] hover:bg-light-surface dark:hover:bg-[#1D2939] transition-colors focus:outline-none"
          >
            <div className="w-7 h-7 rounded-lg bg-electric-teal/20 text-electric-teal border border-electric-teal/30 flex items-center justify-center font-heading font-semibold text-xs">
              {user?.name ? user.name[0] : 'R'}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-heading font-medium text-xs text-midnight-navy dark:text-white leading-none">
                {user?.name || 'Researcher'}
              </span>
              <span className="font-mono text-[9px] text-light-muted dark:text-slate-400 mt-0.5 leading-none">
                {user?.role || 'Academic'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-light-muted dark:text-slate-400" />
          </button>

          {/* Profile Menu Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#172235] border border-light-border dark:border-[#283548] shadow-xl p-2 z-50 animate-fadeIn">
              <div className="p-2 border-b border-light-border dark:border-[#283548] mb-1">
                <p className="font-heading font-semibold text-xs text-midnight-navy dark:text-white">
                  {user?.name || 'Dr. Alexis Chen'}
                </p>
                <p className="font-mono text-[10px] text-light-muted dark:text-slate-400 truncate">
                  {user?.email || 'alexis.chen@observatory.edu'}
                </p>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate('/settings');
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-light-text dark:text-slate-300 hover:bg-light-surface dark:hover:bg-[#1D2939] rounded-lg transition-colors flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5" />
                Researcher Settings
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                  navigate('/');
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-status-error hover:bg-status-error/10 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
