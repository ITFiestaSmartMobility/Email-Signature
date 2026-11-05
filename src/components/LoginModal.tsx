import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { VALID_USERNAME, VALID_PASSWORD } from '../data/fiestaConfig';

interface LoginModalProps {
  isOpen: boolean;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onLoginSuccess }) => {
  const [username, setUsername] = useState('fiesta');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    setTimeout(() => {
      if (username.trim() === VALID_USERNAME && password.trim() === VALID_PASSWORD) {
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid username or password. Please verify your credentials.');
        setIsSubmitting(false);
      }
    }, 200);
  };

  const handleQuickDemoLogin = () => {
    setUsername('fiesta');
    setPassword(VALID_PASSWORD);
    setErrorMsg('');
    setTimeout(() => {
      onLoginSuccess();
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white text-center relative">
          <div className="w-14 h-14 rounded-xl bg-white p-2 mx-auto mb-3 shadow-md flex items-center justify-center">
            <img
              src="https://erp.fiestaindia.net/assets/images/login-logo.png"
              alt="Fiesta Logo"
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = '<span class="text-red-600 font-extrabold text-xl">F</span>';
                }
              }}
            />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Fiesta Smart Mobility</h2>
          <p className="text-xs text-slate-300 mt-1 font-medium">
            Internal Staff Email Signature Portal
          </p>
        </div>

        {/* Content area */}
        <div className="p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-2 p-3 bg-red-50/70 rounded-xl border border-red-100 text-xs text-red-900">
            <ShieldCheck className="w-4 h-4 text-red-600 shrink-0" />
            <span>Authorized access only for Fiesta Smart Mobility team members.</span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-lg flex items-center gap-2 animate-in fade-in duration-150">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Staff Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter username"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-slate-600">Default: FSMSmart@2025</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                  className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Generator'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Instant One-Click Staff Login (Evaluation Mode)</span>
            </button>
          </div>

          <div className="text-center pt-1 text-[11px] text-slate-600">
            Assistance: contact IT at <span className="font-semibold text-slate-800">it@fiestaindia.net</span>
          </div>
        </div>
      </div>
    </div>
  );
};
