import React from 'react';
import { ExternalLink, Bookmark } from 'lucide-react';

export default function CitationBadge({ doi, title, authors, year, provider, url, index }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-midnight-deep/5 dark:bg-midnight-surface/80 border border-light-border dark:border-midnight-border text-xs font-mono text-light-text dark:text-slate-300 hover:border-electric-teal/50 transition-colors">
      {index !== undefined && (
        <span className="w-4 h-4 rounded-full bg-electric-teal/20 text-electric-teal flex items-center justify-center text-[10px] font-bold">
          {index}
        </span>
      )}
      {provider && (
        <span className="font-semibold text-electric-teal text-[11px] uppercase tracking-wider">
          {provider}
        </span>
      )}
      {year && (
        <span className="text-light-muted dark:text-slate-400 text-[11px]">
          ({year})
        </span>
      )}
      {doi && (
        <span className="text-[10px] text-light-muted dark:text-slate-400 truncate max-w-[120px]">
          DOI:{doi}
        </span>
      )}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-electric-teal hover:text-white transition-colors ml-0.5"
          title="Open original publication"
        >
          <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  );
}
