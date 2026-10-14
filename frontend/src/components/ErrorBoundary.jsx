import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.hash = '#/';
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#101828] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-warm-amber/15 border border-warm-amber/30 flex items-center justify-center text-warm-amber mb-6 shadow-amber-glow animate-pulse">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h2 className="font-heading font-bold text-2xl text-white mb-2">
            Research Workspace Interrupted
          </h2>

          <p className="font-body text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
            An unexpected error occurred while rendering this research view. The observatory state has been preserved.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-sm hover:bg-electric-teal-hover shadow-teal-glow transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Reload View
            </button>

            <button
              onClick={this.handleGoHome}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#283548] bg-[#172235] text-slate-300 font-medium text-sm hover:text-white transition-all"
            >
              <Home className="w-4 h-4" />
              Observatory Home
            </button>
          </div>

          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <pre className="mt-8 p-4 rounded-xl bg-[#172235] border border-[#283548] text-[11px] font-mono text-slate-400 text-left max-w-xl overflow-x-auto">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
