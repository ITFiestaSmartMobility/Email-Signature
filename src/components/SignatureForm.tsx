import React, { useState } from 'react';
import {
  User,
  Briefcase,
  MapPin,
  Phone,
  Radio,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Globe,
  Image as ImageIcon,
} from 'lucide-react';
import {
  SignatureData,
  FIESTA_LOCATIONS,
  CRS_NUMBERS,
  DEFAULT_COMPANY,
  DEFAULT_CERTIFICATION,
  DEFAULT_LOGO_URL,
  DEFAULT_WEBSITE_URL,
} from '../data/fiestaConfig';

interface SignatureFormProps {
  formData: SignatureData;
  onChange: (updated: SignatureData) => void;
  onReset: () => void;
}

export const SignatureForm: React.FC<SignatureFormProps> = ({
  formData,
  onChange,
  onReset,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [useCustomAddress, setUseCustomAddress] = useState(false);

  const handleFieldChange = (field: keyof SignatureData, value: string) => {
    onChange({
      ...formData,
      [field]: value,
    });
  };

  const handleLocationSelect = (locKey: string) => {
    const loc = FIESTA_LOCATIONS[locKey];
    if (loc) {
      onChange({
        ...formData,
        locationKey: locKey,
        locationAddress: loc.address,
      });
    }
  };

  const handleDivisionSelect = (divKey: string) => {
    const div = CRS_NUMBERS[divKey];
    if (div) {
      // Determine label: if starts with ETS -> 'ETS', if PCR & HO -> 'For Booking:'
      let label = div.label;
      if (divKey.startsWith('ETS')) {
        label = 'ETS';
      } else if (divKey === 'PCR & HO') {
        label = 'For Booking:';
      }

      onChange({
        ...formData,
        divisionKey: divKey,
        divisionNumber: div.number,
        divisionLabel: label,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
            1
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">Employee Details</h2>
            <p className="text-xs text-slate-500">Configure your official email signature info</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
          title="Reset to default template"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="Enter Your Name"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-medium"
              required
            />
          </div>
        </div>

        {/* Job Title / Designation */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Designation / Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              placeholder="E.g., Jr.Executive Operations"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Office Location Selection */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Office Branch / Location <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setUseCustomAddress(!useCustomAddress)}
              className="text-[11px] font-medium text-red-600 hover:text-red-700"
            >
              {useCustomAddress ? 'Use Branch List' : 'Custom Address'}
            </button>
          </div>

          {!useCustomAddress ? (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                value={formData.locationKey}
                onChange={(e) => handleLocationSelect(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none font-medium cursor-pointer"
              >
                <optgroup label="South Region">
                  <option value="Chennai HO">Chennai HO (Headquarters)</option>
                  <option value="Chennai RO">Chennai RO (Regional Office)</option>
                  <option value="Bangalore">Bangalore (RJ Elite, Ramamurthy Nagar)</option>
                  <option value="Hyderabad">Hyderabad (Pioneer Plaza, Shaikpet)</option>
                  <option value="Oragadam">Oragadam (Vandalur-Walajabad Rd)</option>
                  <option value="Hosur">Hosur (Gandhi Nagar, Thorapalli)</option>
                  <option value="Mcity">Mcity (Mahindra World City)</option>
                </optgroup>
                <optgroup label="West & North Region">
                  <option value="Mumbai">Mumbai (ACME Ind. Park, Goregaon)</option>
                  <option value="Pune">Pune (Sakore Nagar, Viman Nagar)</option>
                  <option value="Ahmedabad">Ahmedabad (Gala Argos, Netaji Rd)</option>
                  <option value="Gurgaon">Gurgaon (Sushant Shopping Arcade)</option>
                </optgroup>
                <optgroup label="East Region">
                  <option value="Kolkata">Kolkata (Ballygunge Circular Road)</option>
                </optgroup>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          ) : (
            <textarea
              rows={2}
              value={formData.locationAddress}
              onChange={(e) => handleFieldChange('locationAddress', e.target.value)}
              placeholder="Enter full address line..."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          )}

          {/* Active address preview */}
          <div className="mt-1.5 p-2 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200/80 flex items-start gap-1.5">
            <span className="text-red-500 shrink-0 font-bold">📍</span>
            <span className="line-clamp-2 leading-relaxed">{formData.locationAddress}</span>
          </div>
        </div>

        {/* Two-Column Split: Direct Phone & Division CRS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Direct Phone */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Direct Phone (📞) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                value={formData.phone1}
                onChange={(e) => handleFieldChange('phone1', e.target.value)}
                placeholder="E.g., +91 9876543210"
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all font-mono"
                required
              />
            </div>
          </div>

          {/* Division No / CRS Select */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Division / CRS No (📲) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Radio className="w-4 h-4" />
              </div>
              <select
                value={formData.divisionKey}
                onChange={(e) => handleDivisionSelect(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none font-medium cursor-pointer"
              >
                {Object.entries(CRS_NUMBERS).map(([key, item]) => (
                  <option key={key} value={key}>
                    {key} — {item.name.replace('Division', '')}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Division details banner */}
        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-800">{formData.divisionLabel}</span>
            <span className="font-mono text-slate-900">{formData.divisionNumber}</span>
          </div>
          <span className="text-[11px] text-slate-600 hidden md:inline">Auto-formatted</span>
        </div>

        {/* Collapsible Advanced / Branding Settings */}
        <div className="pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center justify-between w-full py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Advanced Corporate Parameters</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 transform transition-transform ${
                showAdvanced ? 'rotate-180' : ''
              }`}
            />
          </button>

          {showAdvanced && (
            <div className="mt-3 space-y-3 p-3 bg-slate-50 rounded-lg border border-slate-200 animate-in fade-in duration-150">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleFieldChange('company', e.target.value)}
                  placeholder={DEFAULT_COMPANY}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  ISO Certification Text
                </label>
                <input
                  type="text"
                  value={formData.certification ?? DEFAULT_CERTIFICATION}
                  onChange={(e) => handleFieldChange('certification', e.target.value)}
                  placeholder={DEFAULT_CERTIFICATION}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    <span>Website Link</span>
                  </label>
                  <input
                    type="url"
                    value={formData.websiteUrl}
                    onChange={(e) => handleFieldChange('websiteUrl', e.target.value)}
                    placeholder={DEFAULT_WEBSITE_URL}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    <span>Logo Image URL</span>
                  </label>
                  <input
                    type="url"
                    value={formData.logoUrl}
                    onChange={(e) => handleFieldChange('logoUrl', e.target.value)}
                    placeholder={DEFAULT_LOGO_URL}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-1 focus:ring-red-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-600">
                <span>Optimized dimensions: 150px wide for Outlook &amp; Gmail compatibility</span>
                <button
                  type="button"
                  onClick={() => {
                    onChange({
                      ...formData,
                      company: DEFAULT_COMPANY,
                      certification: DEFAULT_CERTIFICATION,
                      websiteUrl: DEFAULT_WEBSITE_URL,
                      logoUrl: DEFAULT_LOGO_URL,
                    });
                  }}
                  className="text-red-600 hover:underline font-semibold"
                >
                  Restore Defaults
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
