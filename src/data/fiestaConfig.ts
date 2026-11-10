export interface FiestaLocation {
  name: string;
  address: string;
  city: string;
  zone: 'South' | 'North' | 'West' | 'East';
  isHQ?: boolean;
}

export interface CrsDivision {
  key: string;
  name: string;
  number: string;
  label: string;
  description: string;
}

export interface SignatureData {
  name: string;
  title: string;
  company: string;
  certification?: string;
  locationKey: string;
  locationAddress: string;
  phone1: string;
  divisionKey: string;
  divisionNumber: string;
  divisionLabel: string;
  websiteUrl: string;
  logoUrl: string;
  includeDisclaimer?: boolean;
}

// ============================================================================
// STAFF PORTAL CREDENTIALS (AUTHENTICATION)
// ============================================================================
// To change the portal login credentials for Fiesta Smart Mobility staff:
// 1. Update VALID_USERNAME or VALID_PASSWORD below.
// 2. Save the file.
// 3. Run 'npm run build' if deploying the static production bundle.
// ============================================================================
export const VALID_USERNAME = 'fiesta';
export const VALID_PASSWORD = 'FSMSmart@2025';


export const DEFAULT_COMPANY = 'Fiesta Smart Mobility Private Limited';
export const DEFAULT_CERTIFICATION = 'An ISO 9001 and ISO/IEC 27001 Certified Company';
export const DEFAULT_LOGO_URL = 'https://erp.fiestaindia.net/assets/images/login-logo.png';
export const DEFAULT_WEBSITE_URL = 'https://fiestacabs.com';
export const BRAND_RED = '#D83A2E';

export const FIESTA_LOCATIONS: Record<string, FiestaLocation> = {
  'Chennai HO': {
    name: 'Chennai HO',
    address: '523, Vinayagapuram, S. Kolathur, Chennai 600 129.',
    city: 'Chennai',
    zone: 'South',
    isHQ: true,
  },
  'Chennai RO': {
    name: 'Chennai RO',
    address: 'No. 99, L D G Road, Little Mount, Saidapet, Chennai – 600 015.',
    city: 'Chennai',
    zone: 'South',
  },
  'Bangalore': {
    name: 'Bangalore',
    address: 'No. 45/A, 2nd Floor, RJ Elite, Ramamurthy Nagar Main Road, Bengaluru – 560 016.',
    city: 'Bengaluru',
    zone: 'South',
  },
  'Hyderabad': {
    name: 'Hyderabad',
    address: '8-1-43/1/A/26, Pioneer Plaza, 7 Tombs Road, Shaikpet, Hyderabad – 500008.',
    city: 'Hyderabad',
    zone: 'South',
  },
  'Mumbai': {
    name: 'Mumbai',
    address: '# 109, 1st Floor, ACME Industrial Park, Goregaon East, Mumbai – 400 063.',
    city: 'Mumbai',
    zone: 'West',
  },
  'Pune': {
    name: 'Pune',
    address: 'Niche Façade, Office No. 204, 2nd Floor 232 Road, Plot Number: 26 & 27 & Survey Number, Sakore Nagar, Viman Nagar, Pune, Maharashtra 411014',
    city: 'Pune',
    zone: 'West',
  },
  'Ahmedabad': {
    name: 'Ahmedabad',
    address: '5th Floor, Gala Argos, Netaji Rd, Ellisbridge, Ahmedabad, Gujarat 380006.',
    city: 'Ahmedabad',
    zone: 'West',
  },
  'Gurgaon': {
    name: 'Gurgaon',
    address: 'H-103 GF, Sushant Shopping Arcade, Sushant Lok-1, Gurgaon – 122009',
    city: 'Gurgaon / Delhi NCR',
    zone: 'North',
  },
  'Kolkata': {
    name: 'Kolkata',
    address: '34/1Q, Ballygunge Circular Road, Kolkata, West Bengal – 700 019.',
    city: 'Kolkata',
    zone: 'East',
  },
  'Oragadam': {
    name: 'Oragadam',
    address: 'No. 44, Vandalur – Walajabad Road, Oragadam Junction, Oragadam, Kanchipuram – 602 105.',
    city: 'Kanchipuram',
    zone: 'South',
  },
  'Hosur': {
    name: 'Hosur',
    address: 'No.3/36/1, Gandhi Nagar, Thorapalli Agraharam, Hosur – 635 109.',
    city: 'Hosur',
    zone: 'South',
  },
  'Mcity': {
    name: 'Mcity',
    address: '58, Bharathiyar Street, near Mcity, Mahindra World City, Veerapuram, Tamil Nadu – 603002',
    city: 'Chengalpattu',
    zone: 'South',
  },
};

export const CRS_NUMBERS: Record<string, CrsDivision> = {
  'ETS CHN': {
    key: 'ETS CHN',
    name: 'ETS Chennai Division',
    number: '+91 98407 73765',
    label: 'ETS',
    description: 'Employee Transportation Services - Chennai Hub',
  },
  'ETS BLR': {
    key: 'ETS BLR',
    name: 'ETS Bangalore Division',
    number: '+91 80 4124 8273, +91 99164 54848',
    label: 'ETS',
    description: 'Employee Transportation Services - Bengaluru Hub',
  },
  'ETS HYD': {
    key: 'ETS HYD',
    name: 'ETS Hyderabad Division',
    number: '+91 91542 32757',
    label: 'ETS',
    description: 'Employee Transportation Services - Hyderabad Hub',
  },
  'PCR & HO': {
    key: 'PCR & HO',
    name: 'PCR & Head Office Booking',
    number: '+91 99164 54848 📧 booking@fiestaindia.net',
    label: 'For Booking:',
    description: 'Passenger Car Rental & Central Corporate Booking Desk',
  },
};

export const DEFAULT_LOCATION_KEY = 'Chennai HO';
export const DEFAULT_CRS_KEY = 'ETS CHN';

