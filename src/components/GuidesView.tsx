import React, { useState } from 'react';
import {
  Mail,
  Monitor,
  Globe,
  Smartphone,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
} from 'lucide-react';

interface GuidesViewProps {
  onCopySignature: () => void;
}

type GuidePlatform = 'gmail' | 'outlook-app' | 'outlook-web' | 'apple-mail' | 'faq';

export const GuidesView: React.FC<GuidesViewProps> = ({ onCopySignature }) => {
  const [activePlatform, setActivePlatform] = useState<GuidePlatform>('gmail');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Email Signature Installation Guides
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Step-by-step visual instructions to install your official Fiesta Smart Mobility signature.
            </p>
          </div>
          <button
            type="button"
            onClick={onCopySignature}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors shrink-0"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy My Signature First</span>
          </button>
        </div>

        {/* General Quick Steps Bar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 pt-6 border-t border-slate-200">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="inline-block w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold text-center leading-5 mb-2">
              1
            </span>
            <h3 className="text-xs font-bold text-slate-900">Fill Details</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Enter your Name, Designation, Branch Location, and Division Contact in the Studio.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="inline-block w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold text-center leading-5 mb-2">
              2
            </span>
            <h3 className="text-xs font-bold text-slate-900">Copy or Download</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Click &ldquo;Copy Formatted Signature&rdquo; or download the self-contained HTML file.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80">
            <span className="inline-block w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-bold text-center leading-5 mb-2">
              3
            </span>
            <h3 className="text-xs font-bold text-slate-900">Paste in Settings</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Open your email client settings, paste with <kbd className="font-mono text-[10px] bg-white border border-slate-300 px-1 py-0.5 rounded">Ctrl+V</kbd>, and save changes.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActivePlatform('gmail')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
            activePlatform === 'gmail'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Gmail (Google Workspace)</span>
        </button>

        <button
          onClick={() => setActivePlatform('outlook-app')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
            activePlatform === 'outlook-app'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>Outlook Desktop App</span>
        </button>

        <button
          onClick={() => setActivePlatform('outlook-web')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
            activePlatform === 'outlook-web'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Outlook Web (365)</span>
        </button>

        <button
          onClick={() => setActivePlatform('apple-mail')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
            activePlatform === 'apple-mail'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Apple Mail / Mobile</span>
        </button>

        <button
          onClick={() => setActivePlatform('faq')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors ${
            activePlatform === 'faq'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Troubleshooting &amp; FAQ</span>
        </button>
      </div>

      {/* Guide Content Display */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        {/* GMAIL TAB */}
        {activePlatform === 'gmail' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Setup for Gmail &amp; Google Workspace</h2>
                  <p className="text-xs text-slate-500">
                    Official procedure for <a href="https://mail.google.com" target="_blank" rel="noreferrer" className="text-red-600 underline font-medium">mail.google.com</a>
                  </p>
                </div>
              </div>
              <a
                href="https://mail.google.com/mail/u/0/#settings/general"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <span>Open Gmail Settings</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <ol className="space-y-4">
              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Copy the Formatted Signature</p>
                  <p>In Fiesta Signature Studio, click the red <strong>&ldquo;Copy Formatted Signature&rdquo;</strong> button. This copies the rendered visual design directly to your clipboard.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Navigate to Gmail Settings</p>
                  <p>Open Gmail, click the <strong>gear icon (⚙️)</strong> in the top-right corner, and select <strong>&ldquo;See all settings&rdquo;</strong>.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Create or Edit Signature</p>
                  <p>Under the <strong>General</strong> tab, scroll down to the <strong>Signature</strong> section. Click <strong>&ldquo;Create new&rdquo;</strong> and name it (e.g. <em>Fiesta Official</em>).</p>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Paste and Set Defaults</p>
                  <p>Click inside the signature edit box and press <kbd className="font-mono bg-white border border-slate-300 px-1 py-0.5 rounded">Ctrl+V</kbd> (<kbd className="font-mono bg-white border border-slate-300 px-1 py-0.5 rounded">Cmd+V</kbd> on macOS). You will see the Fiesta red branding, contact details, and logo appear.</p>
                  <p className="text-slate-500">Under <em>Signature defaults</em>, select your new signature for <strong>&ldquo;For new emails use&rdquo;</strong> and <strong>&ldquo;On reply/forward use&rdquo;</strong>.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  5
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Save Changes</p>
                  <p>Scroll all the way down to the bottom of the page and click <strong>&ldquo;Save Changes&rdquo;</strong>. Compose a new email to verify.</p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* OUTLOOK DESKTOP TAB */}
        {activePlatform === 'outlook-app' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Setup for Microsoft Outlook (Desktop App)</h2>
                  <p className="text-xs text-slate-500">
                    Works for Microsoft 365 Outlook, Outlook 2021, and Outlook 2019
                  </p>
                </div>
              </div>
            </div>

            <ol className="space-y-4">
              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Open Outlook and Click &ldquo;New Email&rdquo;</p>
                  <p>Launch Outlook and open a new email compose window.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Open Signatures Dialog</p>
                  <p>In the top ribbon, look for <strong>Signature</strong> (under the <em>Include</em> section) and click <strong>&ldquo;Signatures...&rdquo;</strong> from the dropdown.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Add New Signature &amp; Paste</p>
                  <p>Click <strong>New</strong>, enter a name (e.g. <em>Fiesta Smart Mobility</em>), and click inside the edit signature box at the bottom. Press <kbd className="font-mono bg-white border border-slate-300 px-1 py-0.5 rounded">Ctrl+V</kbd> to paste your signature.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Set Default Signatures &amp; Confirm</p>
                  <p>In the top right corner under <em>Choose default signature</em>, select your email account and pick your new signature for both <strong>New messages</strong> and <strong>Replies/forwards</strong>. Click <strong>OK</strong>.</p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* OUTLOOK WEB TAB */}
        {activePlatform === 'outlook-web' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Setup for Outlook on the Web (Office 365)</h2>
                  <p className="text-xs text-slate-500">
                    For browser access at <a href="https://outlook.office.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-medium">outlook.office.com</a>
                  </p>
                </div>
              </div>
            </div>

            <ol className="space-y-4">
              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Open Settings</p>
                  <p>In Outlook Web, click the <strong>Gear icon (⚙️)</strong> in the top header, then click <strong>&ldquo;View all Outlook settings&rdquo;</strong>.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Go to Compose and Reply</p>
                  <p>Navigate to <strong>Mail</strong> &rarr; <strong>Compose and reply</strong> &rarr; <strong>Email signature</strong>.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">Paste and Save</p>
                  <p>Click <strong>+ New signature</strong>, paste with <kbd className="font-mono bg-white border border-slate-300 px-1 py-0.5 rounded">Ctrl+V</kbd>, assign defaults, and click <strong>Save</strong>.</p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* APPLE MAIL TAB */}
        {activePlatform === 'apple-mail' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Setup for Apple Mail (macOS &amp; iOS)</h2>
                  <p className="text-xs text-slate-500">
                    For Mac Mail application or iPhone / iPad devices
                  </p>
                </div>
              </div>
            </div>

            <ol className="space-y-4">
              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">macOS Mail App</p>
                  <p>Open Mail &rarr; click <strong>Mail</strong> in the menu bar &rarr; <strong>Settings...</strong> &rarr; <strong>Signatures</strong> tab. Select your corporate email, click <strong>+</strong>, uncheck &ldquo;Always match my default message font&rdquo;, and paste with <kbd className="font-mono bg-white border border-slate-300 px-1 py-0.5 rounded">Cmd+V</kbd>.</p>
                </div>
              </li>

              <li className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <p className="font-semibold text-slate-900">iPhone / iPad Mobile Mail</p>
                  <p>Send an email containing your copied signature to your mobile inbox. In Mail on iOS, highlight the signature, tap <strong>Copy</strong>. Go to iOS <strong>Settings</strong> &rarr; <strong>Mail</strong> &rarr; <strong>Signature</strong>, select your corporate account, paste, and gently shake the device to tap <strong>Undo Change Attributes</strong> if iOS auto-modifies formatting.</p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* FAQ TAB */}
        {activePlatform === 'faq' && (
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h2 className="text-base font-bold text-slate-900">Frequently Asked Questions &amp; Troubleshooting</h2>
              <p className="text-xs text-slate-500">Quick fixes for common email client display questions</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Why does the logo sometimes show a small placeholder in webmail?</span>
                </div>
                <p className="text-slate-600 pl-6 leading-relaxed">
                  Some corporate networks require permission to display remote images. When opening an email, click &ldquo;Always display images from this sender&rdquo; once. The logo is served from the secure Fiesta ERP host (<code className="font-mono text-slate-800">erp.fiestaindia.net</code>).
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>What is the difference between ETS and PCR &amp; HO division?</span>
                </div>
                <p className="text-slate-600 pl-6 leading-relaxed">
                  <strong>ETS</strong> covers Employee Transportation Services dedicated helpline numbers for Chennai, Bangalore, and Hyderabad hubs. <strong>PCR &amp; HO</strong> represents Passenger Car Rental &amp; Central Corporate Booking Desk for corporate rentals.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Can I download the HTML file and open it in Google Chrome?</span>
                </div>
                <p className="text-slate-600 pl-6 leading-relaxed">
                  Yes! Click <strong>&ldquo;Download Signature HTML&rdquo;</strong> in the Studio. You can open that file in any browser (Chrome, Edge, Safari), press <kbd className="font-mono bg-white border border-slate-300 px-1 py-0.5 rounded">Ctrl+A</kbd> then <kbd className="font-mono bg-white border border-slate-300 px-1 py-0.5 rounded">Ctrl+C</kbd>, and paste it anywhere.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Need internal IT help or custom branch updates?</span>
                </div>
                <p className="text-slate-600 pl-6 leading-relaxed">
                  Contact the Fiesta IT department directly at <a href="mailto:it@fiestaindia.net" className="font-semibold text-red-600 hover:underline">it@fiestaindia.net</a>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
