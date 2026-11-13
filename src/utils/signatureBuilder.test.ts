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

test('generateSignatureHtml renders the red globe icon before both certification and website link', () => {
  const html = generateSignatureHtml(sampleData);
  const globeImg = '<img src="https://img.icons8.com/ios-glyphs/48/D83A2E/globe--v1.png"';
  const occurrences = html.split(globeImg).length - 1;
  assert.equal(occurrences, 2, 'Expected two red globe icons: one for ISO line and one for website link');

  const websiteRowRegex =
    /<tr>\s*<td[^>]*>\s*<img src="https:\/\/img\.icons8\.com\/ios-glyphs\/48\/D83A2E\/globe--v1\.png"[^>]*>\s*<\/td>\s*<td[^>]*>\s*<a href="https:\/\/fiestacabs\.com"[^>]*>fiestacabs\.com<\/a>\s*<\/td>\s*<\/tr>/;
  assert.match(html, websiteRowRegex, 'Website link row should have the globe icon in its left cell');
});

test('generateSignatureHtml keeps compact line-height, 12pt name size, and MSO rules', () => {
  const html = generateSignatureHtml(sampleData);
  assert.match(html, /font-size:12pt; line-height:1\.2; color:#D83A2E;">Alex Kumar<\/strong>/);
  assert.match(html, /line-height:1\.2;/);
  assert.match(html, /mso-line-height-rule:exactly;/);
});
