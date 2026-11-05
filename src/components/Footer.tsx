import React from 'react';
import { Mail, Shield, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-semibold text-slate-800">
              Fiesta Smart Mobility Private Limited
            </span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span>Version 2.0 (Responsive Edition)</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="mailto:it@fiestaindia.net"
              className="flex items-center gap-1 text-slate-600 hover:text-red-600 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>it@fiestaindia.net</span>
            </a>
            <a
              href="https://fiestacabs.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-slate-600 hover:text-red-600 transition-colors"
            >
              <span>fiestacabs.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Developed &amp; Maintained by Sanjaikumar S for Fiesta Smart Mobility Private Limited.
          </p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>Internal Enterprise Utility</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
