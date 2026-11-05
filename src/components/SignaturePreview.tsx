import React, { useState } from 'react';
import {
  Copy,
  Download,
  Code,
  Smartphone,
  Monitor,
  Check,
  Mail,
  RefreshCw,
  Send,
  Paperclip,
  Smile,
  ExternalLink,
  Info,
} from 'lucide-react';
import { SignatureData } from '../data/fiestaConfig';
import {
  generateSignatureHtml,
  copyRichSignatureToClipboard,
  downloadSignatureHtmlFile,
} from '../utils/signatureBuilder';

interface SignaturePreviewProps {
  formData: SignatureData;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

type PreviewClientMode = 'gmail' | 'outlook' | 'mobile' | 'raw' | 'code';

export const SignaturePreview: React.FC<SignaturePreviewProps> = ({
  formData,
  onNotify,
}) => {
  const [clientMode, setClientMode] = useState<PreviewClientMode>('gmail');
  const [copying, setCopying] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const signatureHtml = generateSignatureHtml(formData);

  const handleCopyRich = async () => {
    if (!formData.name.trim() || !formData.title.trim() || !formData.phone1.trim()) {
      onNotify('Please fill in all required fields (Name, Title, Phone).', 'error');
      return;
    }
    setCopying(true);
    try {
      const ok = await copyRichSignatureToClipboard(signatureHtml);
      if (ok) {
        onNotify('Signature copied to clipboard! Paste directly into Gmail or Outlook.', 'success');
      } else {
        onNotify('Rich copy restricted by browser. You can download the HTML file instead.', 'info');
      }
    } catch {
      onNotify('Failed to copy. Please try the Download HTML button.', 'error');
    } finally {
      setTimeout(() => setCopying(false), 1200);
    }
  };

  const handleDownload = () => {
    if (!formData.name.trim() || !formData.title.trim() || !formData.phone1.trim()) {
      onNotify('Please fill in all required fields (Name, Title, Phone).', 'error');
      return;
    }
    downloadSignatureHtmlFile(formData);
    onNotify(`Downloaded ${formData.name.trim() || 'Fiesta'}_signature.html`, 'success');
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(signatureHtml);
      setCodeCopied(true);
      onNotify('Raw HTML code copied to clipboard!', 'info');
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      onNotify('Unable to copy code to clipboard.', 'error');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full select-none">
      {/* Top Header & Client Switcher */}
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Live Simulation &amp; Export</h2>
            <p className="text-[11px] text-slate-500">Real-time email client rendering</p>
          </div>
        </div>

        {/* Client View Segmented Control */}
        <div className="flex items-center p-0.5 bg-slate-200/80 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setClientMode('gmail')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
              clientMode === 'gmail'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Gmail composition preview"
          >
            <Mail className="w-3.5 h-3.5 text-red-600" />
            <span className="hidden sm:inline">Gmail</span>
          </button>

          <button
            type="button"
            onClick={() => setClientMode('outlook')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
              clientMode === 'outlook'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Outlook desktop preview"
          >
            <Monitor className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Outlook</span>
          </button>

          <button
            type="button"
            onClick={() => setClientMode('mobile')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1.5 ${
              clientMode === 'mobile'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Mobile phone viewport preview"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Mobile</span>
          </button>

          <button
            type="button"
            onClick={() => setClientMode('raw')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              clientMode === 'raw'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Pure signature output"
          >
            Raw
          </button>

          <button
            type="button"
            onClick={() => setClientMode('code')}
            className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
              clientMode === 'code'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="HTML source code"
          >
            <Code className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Code</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="p-4 sm:p-5 flex-1 bg-slate-100/60 flex items-center justify-center overflow-auto min-h-[360px] select-none">
        {/* Mode: GMAIL MOCKUP */}
        {clientMode === 'gmail' && (
          <div className="w-full max-w-xl bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden text-xs">
            {/* Gmail Window Bar */}
            <div className="bg-slate-100 px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800 text-xs">New Message</span>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
              </div>
            </div>

            {/* Email Meta Fields */}
            <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-2 text-slate-500">
              <span className="text-slate-400 w-12 font-medium">To:</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-mono text-[11px]">
                client@corporatename.com
              </span>
            </div>
            <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-2 text-slate-500">
              <span className="text-slate-400 w-12 font-medium">Subject:</span>
              <span className="text-slate-700 font-medium">
                Fiesta Smart Mobility — Ride Confirmation &amp; Schedule
              </span>
            </div>

            {/* Email Body & Signature */}
            <div className="p-4 sm:p-5 space-y-4 text-slate-700 min-h-[220px]">
              <p className="leading-relaxed">
                Dear Team,
                <br />
                <br />
                Thank you for reaching out to Fiesta Smart Mobility. Your corporate transport request has been scheduled with our dispatch team. Please feel free to connect with me if you need any adjustments.
              </p>

              {/* Signature rendered in isolated box */}
              <div className="pt-3 border-t border-slate-200 overflow-x-auto">
                <div
                  className="signature-rendered-box min-w-[280px]"
                  dangerouslySetInnerHTML={{ __html: signatureHtml }}
                />
              </div>
            </div>

            {/* Gmail Compose Footer */}
            <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3.5 py-1.5 bg-blue-600 text-white font-semibold rounded text-xs flex items-center gap-1.5 cursor-default"
                >
                  <Send className="w-3 h-3" />
                  <span>Send</span>
                </button>
                <div className="flex items-center gap-1.5 text-slate-400 pl-2">
                  <Paperclip className="w-3.5 h-3.5" />
                  <Smile className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-[10px] text-slate-600">Simulated Gmail Desktop Web</span>
            </div>
          </div>
        )}

        {/* Mode: OUTLOOK MOCKUP */}
        {clientMode === 'outlook' && (
          <div className="w-full max-w-xl bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden text-xs">
            {/* Outlook Ribbon Bar */}
            <div className="bg-[#0078d4] text-white px-3.5 py-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight">Outlook</span>
                <span className="text-blue-100 text-[11px]">| Message Ribbon</span>
              </div>
              <span className="text-[10px] bg-blue-800/80 px-2 py-0.5 rounded font-mono">
                HTML Format
              </span>
            </div>

            {/* Email Fields */}
            <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-slate-500">
                <span className="w-16 font-semibold text-slate-600">To...</span>
                <span className="text-slate-700">it@fiestaindia.net; operations@fiestaindia.net</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <span className="w-16 font-semibold text-slate-600">Subject:</span>
                <span className="text-slate-800 font-medium">Daily Route &amp; ETS Manifest</span>
              </div>
            </div>

            {/* Outlook Body */}
            <div className="p-4 sm:p-5 space-y-3 min-h-[220px]">
              <p className="text-slate-700">
                Hi Sanjai,
                <br />
                <br />
                Attaching the updated dispatch roster for tomorrow&apos;s shift operations.
              </p>

              <div className="pt-2 border-t border-slate-200 overflow-x-auto">
                <div
                  className="signature-rendered-box min-w-[280px]"
                  dangerouslySetInnerHTML={{ __html: signatureHtml }}
                />
              </div>
            </div>

            <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-right">
              <span className="text-[10px] text-slate-600">
                Compatible with Microsoft 365, Outlook 2019/2021 &amp; Outlook Web
              </span>
            </div>
          </div>
        )}

        {/* Mode: MOBILE PHONE MOCKUP */}
        {clientMode === 'mobile' && (
          <div className="w-[320px] bg-slate-900 p-3 rounded-[36px] shadow-xl border-4 border-slate-800">
            {/* Phone Speaker Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-700 mr-2"></div>
              <div className="w-8 h-1.5 rounded-full bg-slate-700"></div>
            </div>

            {/* Mobile Screen */}
            <div className="bg-white rounded-[24px] p-3 text-[11px] overflow-hidden min-h-[380px] flex flex-col justify-between">
              <div>
                <div className="border-b border-slate-200 pb-2 mb-2 flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-slate-800 text-xs">Inbox · Mail</span>
                  <span className="font-mono text-[10px] text-slate-600">09:41 AM</span>
                </div>

                <div className="mb-2 text-slate-700">
                  <p className="text-xs font-semibold text-slate-900">
                    {formData.name.trim() || 'Fiesta Team'}
                  </p>
                  <p className="text-[10px] text-slate-600">Re: Employee Transport Confirmation</p>
                </div>

                <p className="text-slate-600 mb-3 leading-relaxed">
                  Hi, your booking has been recorded. Here are my direct details below.
                </p>

                <div className="pt-2 border-t border-slate-200 overflow-x-auto">
                  <div
                    className="signature-rendered-box scale-95 origin-top-left"
                    dangerouslySetInnerHTML={{ __html: signatureHtml }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-center">
                <span className="text-[9px] text-slate-600 font-medium">
                  Responsive: Fits within 320px mobile viewport without horizontal break
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Mode: RAW PREVIEW */}
        {clientMode === 'raw' && (
          <div className="bg-white p-6 rounded-xl shadow-xs border border-slate-200 max-w-lg w-full">
            <div className="mb-3 pb-2 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Isolated Signature Preview</span>
              <span className="font-mono text-[11px] text-slate-600">12px Segoe UI</span>
            </div>
            <div
              className="signature-rendered-box"
              dangerouslySetInnerHTML={{ __html: signatureHtml }}
            />
          </div>
        )}

        {/* Mode: CODE INSPECTOR */}
        {clientMode === 'code' && (
          <div className="w-full max-w-xl bg-slate-900 rounded-xl shadow-lg border border-slate-800 text-slate-200 overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono font-medium text-slate-400">
                signature-template.html
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 transition-colors"
              >
                {codeCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{codeCopied ? 'Copied' : 'Copy HTML'}</span>
              </button>
            </div>
            <pre className="p-4 text-[11px] font-mono leading-relaxed overflow-x-auto text-emerald-300 max-h-[300px]">
              {signatureHtml}
            </pre>
          </div>
        )}
      </div>

      {/* Action Footer Bar */}
      <div className="p-4 bg-white border-t border-slate-200 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Primary Action: 1-Click Rich Copy */}
          <button
            type="button"
            onClick={handleCopyRich}
            disabled={copying}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            {copying ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Copying Formatted HTML...</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Formatted Signature</span>
              </>
            )}
          </button>

          {/* Secondary Action: Download HTML */}
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-700"
          >
            <Download className="w-4 h-4" />
            <span>Download Signature HTML</span>
          </button>
        </div>

        {/* Tip Box */}
        <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-lg text-slate-600 text-xs">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-800">Fast Setup:</strong> Click{' '}
            <strong className="text-red-600">&ldquo;Copy Formatted Signature&rdquo;</strong>, go to your
            Gmail or Outlook signature box, and press <kbd className="px-1 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Ctrl+V</kbd> (<kbd className="px-1 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Cmd+V</kbd> on Mac).
          </p>
        </div>
      </div>
    </div>
  );
};
