import React from 'react';
import {
  Sparkles,
  BookOpen,
  Building2,
  LogOut,
  Menu,
  X,
  Copy,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export type ActiveTab = 'generator' | 'guides' | 'directory';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  onQuickCopy: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isAuthenticated,
  onLogout,
  onQuickCopy,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'generator', label: 'Signature Studio', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'guides', label: 'Setup Guides', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'directory', label: 'Offices Directory', icon: <Building2 className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: 3 zones separated by gap-8 */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand title, single line */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('generator')}
              className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/90 p-1 flex items-center justify-center shadow-xs shrink-0 overflow-hidden">
                <img
                  src="https://erp.fiestaindia.net/assets/images/favicon.ico"
                  alt="Fiesta Icon"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.className =
                        'w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-base shadow-sm shrink-0';
                      target.parentElement.innerText = 'F';
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
                  Fiesta Smart Mobility
                </span>
                <span className="text-[11px] font-medium text-slate-500 -mt-0.5 whitespace-nowrap">
                  Signature Studio · Enterprise
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 nav links, single-line */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-red-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action group / logout */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isAuthenticated ? (
              <>
                <button
                  onClick={onQuickCopy}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                  title="Copy formatted signature to paste directly into Gmail or Outlook"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Signature</span>
                </button>

                <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-200">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Staff Portal</span>
                  </span>
                </div>

                <button
                  onClick={onLogout}
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
                  title="Sign out of Signature Studio"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit</span>
                </button>
              </>
            ) : (
              <a
                href="https://fiestacabs.com"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>fiestacabs.com</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors text-left ${
                    isActive
                      ? 'bg-red-50 text-red-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className={isActive ? 'text-red-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onQuickCopy();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-red-700"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Formatted Signature</span>
            </button>

            {isAuthenticated && (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out of Staff Session</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
