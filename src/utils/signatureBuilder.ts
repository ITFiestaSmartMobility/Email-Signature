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

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Segoe UI', Arial, sans-serif; font-size:12px; color:#000; line-height:1.2; max-width:500px; border-collapse:collapse; mso-line-height-rule:exactly;">
  <tr>
    <td style="padding:0; margin:0; color:#000; line-height:1.2;">
      <span style="color:#000; line-height:1.2;">Thanks &amp; Regards,<br></span>
      <strong style="font-size:12pt; line-height:1.2; color:${BRAND_RED};">${escapeHtml(name)}</strong><br>
      <span style="color:#000; line-height:1.2;"><em>${escapeHtml(title)}</em></span><br>
      <strong style="font-size:12pt; line-height:1.2; color:${BRAND_RED};">${escapeHtml(company)}</strong>
    </td>
  </tr>
  <tr>
    <td style="padding-top:3px; padding-bottom:0; margin:0;">
      <table cellpadding="0" cellspacing="0" border="0" style="font-family:'Segoe UI', Arial, sans-serif; font-size:12px; color:#000; line-height:1.2; border-collapse:collapse; mso-line-height-rule:exactly;">
        ${certification ? `<tr>
          <td colspan="2" valign="middle" style="padding:0 0 2px 0; vertical-align:middle; line-height:1.2;">
            <strong style="color:#000; font-size:9pt; font-weight:bold; font-family:'Segoe UI', Arial, sans-serif; line-height:1.2;">${escapeHtml(certification)}</strong>
          </td>
        </tr>` : ''}
        <tr>
          <td width="18" align="center" valign="top" style="width:18px; min-width:18px; padding:0 4px 1px 0; text-align:center; vertical-align:top; color:${BRAND_RED}; font-size:12px; line-height:1.2;">📍</td>
          <td valign="top" style="padding:0 0 1px 0; vertical-align:top; color:#000; font-size:12px; line-height:1.2;">${escapeHtml(location)}</td>
        </tr>
        <tr>
          <td width="18" align="center" valign="middle" style="width:18px; min-width:18px; padding:0 4px 1px 0; text-align:center; vertical-align:middle; color:${BRAND_RED}; font-size:12px; line-height:1.2;">📞</td>
          <td valign="middle" style="padding:0 0 1px 0; vertical-align:middle; color:#000; font-size:12px; line-height:1.2;">${escapeHtml(phone1)}</td>
        </tr>
        <tr>
          <td width="18" align="center" valign="middle" style="width:18px; min-width:18px; padding:0 4px 1px 0; text-align:center; vertical-align:middle; color:${BRAND_RED}; font-size:12px; line-height:1.2;">📲</td>
          <td valign="middle" style="padding:0 0 1px 0; vertical-align:middle; color:#000; font-size:12px; line-height:1.2;"><strong style="color:${BRAND_RED};">${escapeHtml(phone2Label)} </strong>${escapeHtml(phone2)}</td>
        </tr>
        <tr>
          <td width="18" align="center" valign="middle" style="width:18px; min-width:18px; padding:0 4px 0 0; text-align:center; vertical-align:middle; color:${BRAND_RED}; font-size:12px; line-height:1.2;">🌐</td>
          <td valign="middle" style="padding:0; vertical-align:middle; font-size:12px; line-height:1.2;">
            <a href="${escapeHtml(websiteUrl)}" target="_blank" rel="noopener noreferrer" style="color:${BRAND_RED}; text-decoration:none; font-family:'Segoe UI', Arial, sans-serif; line-height:1.2;">${escapeHtml(websiteHost)}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-top:5px; padding-bottom:0; margin:0;">
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
