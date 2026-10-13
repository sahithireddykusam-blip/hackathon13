import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Compass,
  title = 'No research found yet',
  description = 'Begin your investigation by asking an academic question or uploading research documents.',
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = ''
}) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-light-border dark:border-midnight-border bg-light-surface/40 dark:bg-midnight-deep/30 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-electric-teal/10 dark:bg-electric-teal/15 border border-electric-teal/20 flex items-center justify-center text-electric-teal mb-4 shadow-sm">
        <Icon className="w-7 h-7" />
      </div>

      <h3 className="font-heading font-semibold text-lg sm:text-xl text-midnight-navy dark:text-white mb-2">
        {title}
      </h3>

      <p className="font-body text-sm sm:text-base text-light-muted dark:text-slate-400 max-w-md mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-electric-teal text-midnight-navy font-semibold text-sm hover:bg-electric-teal-hover transition-colors shadow-teal-glow focus:outline-none focus:ring-2 focus:ring-electric-teal"
          >
            <Sparkles className="w-4 h-4" />
            {actionLabel}
          </button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-light-border dark:border-midnight-border bg-white dark:bg-midnight-surface text-light-text dark:text-slate-200 font-medium text-sm hover:border-electric-teal/40 transition-colors focus:outline-none focus:ring-2 focus:ring-electric-teal"
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
