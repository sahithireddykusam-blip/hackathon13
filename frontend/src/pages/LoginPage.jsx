import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Lock, Mail, ShieldCheck } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('alexis.chen@observatory.edu');
  const [password, setPassword] = useState('researcher2025');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login('mock_jwt_token_sample', {
        _id: 'usr-001',
        name: 'Dr. Alexis Chen',
        email,
        role: 'Lead Researcher',
        institution: 'Institute for Advanced Computational Studies'
      });
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#101828] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Observatory Grid */}
      <div className="absolute inset-0 observatory-grid opacity-50 pointer-events-none" />

      {/* Outer Glows */}
      <div className="absolute w-96 h-96 bg-electric-teal/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#172235] border border-[#283548] rounded-3xl p-8 shadow-2xl relative z-10 animate-fadeIn">
        <div className="flex flex-col items-center text-center mb-8">
          <BrandLogo size="lg" showTagline={true} />
          <h2 className="font-heading font-bold text-xl text-white mt-6">
            Enter Research Observatory
          </h2>
          <p className="font-body text-xs text-slate-400 mt-1">
            Access your papers, knowledge networks, and evidence reports.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
              Academic Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full pl-10 pr-4 py-2.5 text-xs font-body rounded-xl border border-[#283548] bg-[#1D2939] text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs font-body rounded-xl border border-[#283548] bg-[#1D2939] text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-xs sm:text-sm hover:bg-electric-teal-hover shadow-teal-glow transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Workspace'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#283548] text-center">
          <p className="font-body text-xs text-slate-400">
            Don't have an observatory account?{' '}
            <Link to="/register" className="text-electric-teal hover:underline font-medium">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
