import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Search,
  Check,
  Copy,
  ArrowRight,
  Phone,
  Sparkles,
} from 'lucide-react';
import { FIESTA_LOCATIONS, FiestaLocation } from '../data/fiestaConfig';

interface DirectoryViewProps {
  onSelectLocation: (locationKey: string) => void;
  onNotify: (msg: string, type?: 'success' | 'info') => void;
}

export const DirectoryView: React.FC<DirectoryViewProps> = ({
  onSelectLocation,
  onNotify,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const zones = ['All', 'South', 'West', 'North', 'East'];

  const locationsList = Object.entries(FIESTA_LOCATIONS);

  const filteredLocations = locationsList.filter(([name, loc]) => {
    const matchesZone = selectedZone === 'All' || loc.zone === selectedZone;
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesZone && matchesSearch;
  });

  const handleCopyAddress = async (name: string, address: string) => {
    try {
      await navigator.clipboard.writeText(`${name} — ${address}`);
      setCopiedKey(name);
      onNotify(`Copied address for ${name}`, 'info');
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      onNotify('Failed to copy address.', 'info');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600 mb-1">
              <Building2 className="w-4 h-4" />
              <span>National Operations Network</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Fiesta Smart Mobility Branches &amp; Hubs
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              12 primary corporate centers and regional dispatch offices across India. Click any branch to populate your signature instantly.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-900">{locationsList.length}</span> Official Locations
          </div>
        </div>

        {/* Search & Zone Filters */}
        <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, branch name, or street..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg overflow-x-auto text-xs font-semibold">
            {zones.map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedZone === zone
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {zone === 'All' ? 'All Hubs' : `${zone} Zone`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Locations */}
      {filteredLocations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map(([name, loc]) => {
            const isCopied = copiedKey === name;
            return (
              <div
                key={name}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {name}
                      </h3>
                      {loc.isHQ && (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                          HQ
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {loc.zone}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed min-h-[3.5rem] flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyAddress(name, loc.address)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                    title="Copy full address"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectLocation(name)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-red-50 hover:text-red-700 rounded-lg border border-slate-200 transition-colors"
                  >
                    <span>Use in Signature</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800">No matching branches found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your search query or zone filter.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedZone('All');
            }}
            className="mt-4 px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
