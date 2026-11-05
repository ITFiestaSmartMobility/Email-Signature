/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { SignatureForm } from './components/SignatureForm';
import { SignaturePreview } from './components/SignaturePreview';
import { GuidesView } from './components/GuidesView';
import { DirectoryView } from './components/DirectoryView';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import {
  SignatureData,
  FIESTA_LOCATIONS,
  CRS_NUMBERS,
  DEFAULT_COMPANY,
  DEFAULT_CERTIFICATION,
  DEFAULT_LOGO_URL,
  DEFAULT_ISO_BANNER_URL,
  DEFAULT_WEBSITE_URL,
  DEFAULT_LOCATION_KEY,
  DEFAULT_CRS_KEY,
} from './data/fiestaConfig';
import { copyRichSignatureToClipboard, generateSignatureHtml } from './utils/signatureBuilder';
import { Sparkles, Edit3, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';

const INITIAL_FORM_DATA: SignatureData = {
  name: '',
  title: '',
  company: DEFAULT_COMPANY,
  certification: DEFAULT_CERTIFICATION,
  locationKey: DEFAULT_LOCATION_KEY,
  locationAddress: FIESTA_LOCATIONS[DEFAULT_LOCATION_KEY].address,
  phone1: '',
  divisionKey: DEFAULT_CRS_KEY,
  divisionNumber: CRS_NUMBERS[DEFAULT_CRS_KEY].number,
  divisionLabel: 'ETS',
  websiteUrl: DEFAULT_WEBSITE_URL,
  logoUrl: DEFAULT_LOGO_URL,
  isoBannerUrl: DEFAULT_ISO_BANNER_URL,
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('fiesta_auth_session') === 'true';
  });
  const [showLoginModal, setShowLoginModal] = useState<boolean>(!isAuthenticated);

  const [activeTab, setActiveTab] = useState<ActiveTab>('generator');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileViewSection, setMobileViewSection] = useState<'form' | 'preview'>('form');

  const [formData, setFormData] = useState<SignatureData>(() => {
    const saved = localStorage.getItem('fiesta_signature_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Sanjaikumar S') {
          return INITIAL_FORM_DATA;
        }
        if (
          !parsed.certification ||
          parsed.certification === 'An ISO 9001:2015 and ISO/IEC 27001:2022 Certified Company'
        ) {
          parsed.certification = DEFAULT_CERTIFICATION;
        }
        if (!parsed.isoBannerUrl || !parsed.isoBannerUrl.startsWith('http')) {
          parsed.isoBannerUrl = DEFAULT_ISO_BANNER_URL;
        }
        return parsed;
      } catch {
        // Fall back
      }
    }
    return INITIAL_FORM_DATA;
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fiesta_signature_draft', JSON.stringify(formData));
  }, [formData]);

  const notify = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({
      id: Math.random().toString(),
      text,
      type,
    });
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
    localStorage.setItem('fiesta_auth_session', 'true');
    notify('Successfully authenticated as Fiesta Smart Mobility staff', 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLoginModal(true);
    localStorage.removeItem('fiesta_auth_session');
    notify('Signed out of staff session', 'info');
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    notify('Restored default signature values', 'info');
  };

  const handleSelectLocationFromDirectory = (locKey: string) => {
    const loc = FIESTA_LOCATIONS[locKey];
    if (loc) {
      setFormData((prev) => ({
        ...prev,
        locationKey: locKey,
        locationAddress: loc.address,
      }));
      setActiveTab('generator');
      notify(`Selected ${locKey} branch for your signature`, 'success');
    }
  };

  const handleQuickCopy = async () => {
    if (!formData.name.trim() || !formData.title.trim() || !formData.phone1.trim()) {
      notify('Please fill in all required fields (Name, Title, Phone).', 'error');
      return;
    }
    const html = generateSignatureHtml(formData);
    const ok = await copyRichSignatureToClipboard(html);
    if (ok) {
      notify('Signature copied! Paste directly into Gmail or Outlook.', 'success');
    } else {
      notify('Rich copy restricted. Please use Download button in Studio.', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onQuickCopy={handleQuickCopy}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Sub-hero header bar for Generator Studio */}
        {activeTab === 'generator' && (
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    Fiesta Signature Studio
                  </h1>
                  <span className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200/60 px-2 py-0.5 rounded-full">
                    v2.0
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Generate email-standard corporate signatures compliant with Gmail, Microsoft Outlook &amp; Apple Mail.
                </p>
              </div>
            </div>

            {/* Mobile Form vs Preview Toggle Bar */}
            <div className="lg:hidden flex items-center p-1 bg-slate-100 rounded-lg text-xs font-semibold self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setMobileViewSection('form')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  mobileViewSection === 'form'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Fields</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileViewSection('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  mobileViewSection === 'preview'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live Preview</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: GENERATOR STUDIO */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Form Editor (Visible on desktop or when mobileViewSection === 'form') */}
            <div
              className={`lg:col-span-6 xl:col-span-5 ${
                mobileViewSection === 'form' ? 'block' : 'hidden lg:block'
              }`}
            >
              <SignatureForm
                formData={formData}
                onChange={setFormData}
                onReset={handleReset}
              />
            </div>

            {/* Right Column: Live Preview & Export (Visible on desktop or when mobileViewSection === 'preview') */}
            <div
              className={`lg:col-span-6 xl:col-span-7 sticky top-20 ${
                mobileViewSection === 'preview' ? 'block' : 'hidden lg:block'
              }`}
            >
              <SignaturePreview formData={formData} onNotify={notify} />
            </div>
          </div>
        )}

        {/* Tab 2: INSTALLATION GUIDES */}
        {activeTab === 'guides' && <GuidesView onCopySignature={handleQuickCopy} />}

        {/* Tab 3: BRANCH DIRECTORY */}
        {activeTab === 'directory' && (
          <DirectoryView
            onSelectLocation={handleSelectLocationFromDirectory}
            onNotify={notify}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Authentication Modal / Gate */}
      <LoginModal isOpen={showLoginModal} onLoginSuccess={handleLoginSuccess} />

      {/* Toast notifications */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
