import { SignatureData, BRAND_RED, DEFAULT_CERTIFICATION } from '../data/fiestaConfig';

/**
 * Builds the inline-styled HTML signature table compatible with all desktop & web email clients.
 */
export function generateSignatureHtml(data: SignatureData): string {
  const name = data.name.trim() || 'Your Name';
  const title = data.title.trim() || 'Your Title';
  const company = data.company.trim() || 'Fiesta Smart Mobility Private Limited';
  const location = data.locationAddress.trim() || '523, Vinayagapuram, S. Kolathur, Chennai 600 129.';
  const phone1 = data.phone1.trim() || '+91 98765 43210';
  const phone2Label = data.divisionLabel.trim() || 'ETS';
  const phone2 = data.divisionNumber.trim() || '+91 98407 73765';
  const websiteUrl = data.websiteUrl.trim() || 'https://fiestacabs.com';
  const logoUrl = data.logoUrl.trim() || 'https://erp.fiestaindia.net/assets/images/login-logo.png';
  const rawCert = (data.certification !== undefined
    ? data.certification
    : DEFAULT_CERTIFICATION
  ).trim();
  const certification = rawCert.replace(/^(🌐|🌍|🌎|🌏)\s*/, '');

  const websiteHost = websiteUrl
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .replace(/\/$/, '');

  const LOGO_WIDTH = 150;
  const LOGO_HEIGHT = 50;

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Segoe UI', Arial, sans-serif; font-size:12px; color:#000; line-height:1.4; max-width:500px; border-collapse:collapse;">
  <tr>
    <td style="padding:0; margin:0; color:#000;">
      <span style="color:#000;">Thanks &amp; Regards,<br></span>
      <strong style="font-size:14pt; color:${BRAND_RED};">${escapeHtml(name)}</strong><br>
      <span style="color:#000;"><em>${escapeHtml(title)}</em></span><br>
      <strong style="font-size:12pt; color:${BRAND_RED};">${escapeHtml(company)}</strong>
    </td>
  </tr>
  <tr>
    <td style="padding-top:5px; padding-bottom:0; margin:0;">
      <table cellpadding="0" cellspacing="0" border="0" style="font-family:'Segoe UI', Arial, sans-serif; font-size:12px; color:#000; line-height:1.4; border-collapse:collapse;">
        ${certification ? `<tr>
          <td width="18" align="center" valign="middle" style="width:18px; min-width:18px; padding:1px 5px 3px 0; text-align:center; vertical-align:middle; line-height:1;">
            <img src="https://img.icons8.com/ios-glyphs/48/D83A2E/globe--v1.png" alt="🌐" width="13" height="13" style="display:block; margin:0 auto; width:13px; height:13px; border:0; outline:none; text-decoration:none;" />
          </td>
          <td valign="middle" style="padding:1px 0 3px 0; vertical-align:middle; line-height:1.3;">
            <strong style="color:#000; font-size:9pt; font-weight:bold; font-family:'Segoe UI', Arial, sans-serif;">${escapeHtml(certification)}</strong>
          </td>
        </tr>` : ''}
        <tr>
          <td width="18" align="center" valign="top" style="width:18px; min-width:18px; padding:1px 5px 1px 0; text-align:center; vertical-align:top; color:${BRAND_RED}; font-size:13px; line-height:1.4;">📍</td>
          <td valign="top" style="padding:1px 0; vertical-align:top; color:#000; font-size:12px; line-height:1.4;">${escapeHtml(location)}</td>
        </tr>
        <tr>
          <td width="18" align="center" valign="middle" style="width:18px; min-width:18px; padding:1px 5px 1px 0; text-align:center; vertical-align:middle; color:${BRAND_RED}; font-size:13px; line-height:1.4;">📞</td>
          <td valign="middle" style="padding:1px 0; vertical-align:middle; color:#000; font-size:12px; line-height:1.4;">${escapeHtml(phone1)}</td>
        </tr>
        <tr>
          <td width="18" align="center" valign="middle" style="width:18px; min-width:18px; padding:1px 5px 1px 0; text-align:center; vertical-align:middle; color:${BRAND_RED}; font-size:13px; line-height:1.4;">📲</td>
          <td valign="middle" style="padding:1px 0; vertical-align:middle; color:#000; font-size:12px; line-height:1.4;"><strong style="color:${BRAND_RED};">${escapeHtml(phone2Label)} </strong>${escapeHtml(phone2)}</td>
        </tr>
        <tr>
          <td width="18" align="center" valign="middle" style="width:18px; min-width:18px; padding:1px 5px 1px 0; text-align:center; vertical-align:middle;">&nbsp;</td>
          <td valign="middle" style="padding:1px 0; vertical-align:middle; font-size:12px; line-height:1.4;">
            <a href="${escapeHtml(websiteUrl)}" target="_blank" rel="noopener noreferrer" style="color:${BRAND_RED}; text-decoration:none; font-family:'Segoe UI', Arial, sans-serif;">${escapeHtml(websiteHost)}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top:8px; padding-bottom:0; margin:0;">
      <img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(company)} Logo" 
           width="${LOGO_WIDTH}" 
           style="display:block; max-width:${LOGO_WIDTH}px; height:auto; border:0; text-decoration:none;" 
           onerror="this.src='https://placehold.co/${LOGO_WIDTH}x${LOGO_HEIGHT}/eeeeee/333333?text=Logo+Not+Found'; this.width=${LOGO_WIDTH}; this.style.border='1px solid #ccc';">
    </td>
  </tr>
</table>`;
}

function toAbsoluteUrl(url: string): string {
  if (!url) return '';
  if (/^(https?:|\/\/|data:)/i.test(url)) return url;
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin.replace(/\/$/, '');
    return `${origin}${url.startsWith('/') ? '' : '/'}${url}`;
  }
  return url;
}

/**
 * Creates a complete standalone HTML document for downloading.
 */
export function generateStandaloneHtmlDocument(data: SignatureData): string {
  const signatureHtml = generateSignatureHtml(data);
  const employeeName = data.name.trim() || 'Employee';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(employeeName)} - Fiesta Smart Mobility Email Signature</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #f8fafc;
      color: #1e293b;
      margin: 0;
      padding: 32px 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .wrapper {
      max-width: 640px;
      width: 100%;
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05);
      padding: 24px 32px;
    }
    .header {
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .header h1 {
      font-size: 18px;
      margin: 0 0 6px 0;
      color: #0f172a;
    }
    .instructions {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 12px 16px;
      margin-bottom: 24px;
      border-radius: 4px;
      font-size: 13px;
      line-height: 1.5;
      color: #1e40af;
    }
    .preview-box {
      background: #ffffff;
      border: 1px dashed #cbd5e1;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .footer-note {
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
      margin-top: 24px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Fiesta Smart Mobility — Email Signature</h1>
      <p style="margin: 0; font-size: 13px; color: #64748b;">Ready to install into Gmail, Microsoft Outlook, or Apple Mail</p>
    </div>
    
    <div class="instructions">
      <strong>How to use this file:</strong><br>
      1. Highlight the signature box below (or press <kbd>Ctrl+A</kbd> / <kbd>Cmd+A</kbd>).<br>
      2. Press <kbd>Ctrl+C</kbd> / <kbd>Cmd+C</kbd> to copy.<br>
      3. Open your email client's signature settings (Gmail or Outlook) and press <kbd>Ctrl+V</kbd> / <kbd>Cmd+V</kbd> to paste.
    </div>

    <div class="preview-box" id="signature-target">
      ${signatureHtml}
    </div>

    <p class="footer-note">Generated via Fiesta Signature Studio · Fiesta Smart Mobility Private Limited</p>
  </div>
</body>
</html>`;
}

/**
 * Copies rich formatted HTML to the system clipboard using the modern Clipboard API.
 */
export async function copyRichSignatureToClipboard(htmlString: string): Promise<boolean> {
  // Method 1: ClipboardItem API (supported in Chrome, Edge, Safari, Firefox 127+)
  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard && navigator.clipboard.write) {
    try {
      const blobHtml = new Blob([htmlString], { type: 'text/html' });
      const blobText = new Blob([stripHtml(htmlString)], { type: 'text/plain' });
      const item = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText,
      });
      await navigator.clipboard.write([item]);
      return true;
    } catch {
      // Fall through to DOM range copy
    }
  }

  // Method 2: Fallback using hidden contenteditable DOM node
  try {
    const container = document.createElement('div');
    container.contentEditable = 'true';
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.opacity = '0';
    container.innerHTML = htmlString;
    document.body.appendChild(container);

    const range = document.createRange();
    range.selectNodeContents(container);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      const successful = document.execCommand('copy');
      selection.removeAllRanges();
      document.body.removeChild(container);
      if (successful) return true;
    }
  } catch {
    // Fall through
  }

  // Method 3: Plain text copy
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(htmlString);
    return true;
  }

  return false;
}

/**
 * Downloads the signature file as an HTML file.
 */
export function downloadSignatureHtmlFile(data: SignatureData): void {
  const fullHtml = generateStandaloneHtmlDocument(data);
  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const sanitizedName = (data.name.trim() || 'Fiesta_Employee')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .toLowerCase();

  const fileName = `${sanitizedName}_signature.html`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html
    .replace(/<img[^>]*alt="([^"]*)"[^>]*>/gi, '$1 ')
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '🌐 ')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/td>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n');
  return (tmp.textContent || tmp.innerText || '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}
