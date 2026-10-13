import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Mail, User, School } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login('mock_jwt_token_sample', {
        _id: 'usr-' + Date.now(),
        name: name || 'Academic Researcher',
        email,
        role: 'Research Fellow',
        institution: institution || 'Academic Observatory'
      });
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#101828] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 observatory-grid opacity-50 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-warm-amber/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#172235] border border-[#283548] rounded-3xl p-8 shadow-2xl relative z-10 animate-fadeIn">
        <div className="flex flex-col items-center text-center mb-6">
          <BrandLogo size="lg" showTagline={true} />
          <h2 className="font-heading font-bold text-xl text-white mt-6">
            Register Observatory Profile
          </h2>
          <p className="font-body text-xs text-slate-400 mt-1">
            Join thousands of academic investigators discovering verifiable science.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3.5">
          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Jordan Blake"
                className="w-full pl-10 pr-4 py-2 text-xs font-body rounded-xl border border-[#283548] bg-[#1D2939] text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
              />
            </div>
          </div>

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
                placeholder="j.blake@mit.edu"
                className="w-full pl-10 pr-4 py-2 text-xs font-body rounded-xl border border-[#283548] bg-[#1D2939] text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
              University / Laboratory Affiliation
            </label>
            <div className="relative">
              <School className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Computational Sciences Lab"
                className="w-full pl-10 pr-4 py-2 text-xs font-body rounded-xl border border-[#283548] bg-[#1D2939] text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
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
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2 text-xs font-body rounded-xl border border-[#283548] bg-[#1D2939] text-white focus:outline-none focus:ring-1 focus:ring-electric-teal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-electric-teal text-midnight-navy font-semibold text-xs sm:text-sm hover:bg-electric-teal-hover shadow-teal-glow transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Creating...' : 'Register Profile'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#283548] text-center">
          <p className="font-body text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-electric-teal hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
