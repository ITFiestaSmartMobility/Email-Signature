import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3800);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-emerald-900/90 text-white border-emerald-700',
    info: 'bg-slate-900/95 text-white border-slate-700',
    error: 'bg-rose-900/95 text-white border-rose-700',
  }[toast.type];

  const Icon = {
    success: CheckCircle2,
    info: Info,
    error: AlertCircle,
  }[toast.type];

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full px-4 sm:px-0 animate-in slide-in-from-bottom-3 duration-200">
      <div
        className={`flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-xl border backdrop-blur-md text-xs font-medium ${bgStyles}`}
      >
        <div className="flex items-center gap-2.5">
          <Icon className="w-4 h-4 shrink-0 text-emerald-400" />
          <span className="leading-snug">{toast.text}</span>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
