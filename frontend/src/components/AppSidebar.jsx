import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  FileText,
  Network,
  FolderKanban,
  ScrollText,
  Settings,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function AppSidebar({ isOpen, onClose }) {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Research Search', path: '/research', icon: Search, badge: 'AI' },
    { name: 'Document Library', path: '/documents', icon: FileText },
    { name: 'My Projects', path: '/projects', icon: FolderKanban },
    { name: 'Research Reports', path: '/reports', icon: ScrollText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#101828] text-white border-r border-[#283548]">
      {/* Brand Header */}
      <div className="flex items-center justify-between p-5 border-b border-[#283548]">
        <BrandLogo size="md" />
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1D2939] transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
          Research Workspace
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose ? onClose : undefined}
              className={({ isActive }) =>
                `group flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1D2939] text-[#36D6C5] border border-[#36D6C5]/40 shadow-sm'
                    : 'text-slate-300 hover:bg-[#172235] hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="font-body text-[13.5px]">{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {item.badge && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#36D6C5]/15 text-[#36D6C5] border border-[#36D6C5]/30">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* Observatory Status Card (Bottom) */}
      <div className="p-4 border-t border-[#283548]">
        <div className="p-3 rounded-xl bg-[#172235] border border-[#283548] relative overflow-hidden">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-[#36D6C5] uppercase font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#36D6C5] animate-ping" />
              Observatory Node
            </span>
            <span className="font-mono text-[10px] text-[#F5B942]">v2.4 Online</span>
          </div>
          <p className="font-body text-xs text-slate-300 leading-snug">
            Grounded academic synthesis with peer-reviewed verification.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed left, width 64) */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 flex-shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Overlay on small screens) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-50 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
