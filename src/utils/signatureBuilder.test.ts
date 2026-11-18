import test from 'node:test';
import assert from 'node:assert/strict';
import { generateSignatureHtml } from './signatureBuilder';
import {
  DEFAULT_COMPANY,
  DEFAULT_CERTIFICATION,
  DEFAULT_LOGO_URL,
  DEFAULT_WEBSITE_URL,
  FIESTA_LOCATIONS,
  CRS_NUMBERS,
  SignatureData,
} from '../data/fiestaConfig';

const sampleData: SignatureData = {
  name: 'Alex Kumar',
  title: 'Operations Executive',
  company: DEFAULT_COMPANY,
  certification: DEFAULT_CERTIFICATION,
  locationKey: 'Chennai HO',
  locationAddress: FIESTA_LOCATIONS['Chennai HO'].address,
  phone1: '+91 98765 43210',
  divisionKey: 'ETS CHN',
  divisionNumber: CRS_NUMBERS['ETS CHN'].number,
  divisionLabel: 'ETS',
  websiteUrl: DEFAULT_WEBSITE_URL,
  logoUrl: DEFAULT_LOGO_URL,
};

test('generateSignatureHtml has no globe before ISO line and keeps default globe symbol before website link', () => {
  const html = generateSignatureHtml(sampleData);
  assert.equal(
    html.includes('img.icons8.com'),
    false,
    'Should not use external icons8 globe image'
  );

  const isoRowRegex =
    /<tr>\s*<td colspan="2"[^>]*>\s*<strong[^>]*>An ISO 9001 and ISO\/IEC 27001 Certified Company<\/strong>\s*<\/td>\s*<\/tr>/;
  assert.match(html, isoRowRegex, 'ISO certification row should span cleanly with no globe icon');

  const websiteRowRegex =
    /<tr>\s*<td[^>]*>🌐<\/td>\s*<td[^>]*>\s*<a href="https:\/\/fiestacabs\.com"[^>]*>fiestacabs\.com<\/a>\s*<\/td>\s*<\/tr>/;
  assert.match(html, websiteRowRegex, 'Website link row should use the default 🌐 symbol');
});

test('generateSignatureHtml keeps compact line-height, 12pt name size, and MSO rules', () => {
  const html = generateSignatureHtml(sampleData);
  assert.match(html, /font-size:12pt; line-height:1\.2; color:#D83A2E;">Alex Kumar<\/strong>/);
  assert.match(html, /line-height:1\.2;/);
  assert.match(html, /mso-line-height-rule:exactly;/);
});
