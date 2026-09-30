import React from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#1A1C1B] text-[#FAF9F7] border border-[#3E453D] px-4 py-3 rounded-[4px] shadow-xl flex items-center gap-3 text-xs font-mono-spec">
        <div className="w-5 h-5 rounded-full bg-[#526442] text-[#FAF9F7] flex items-center justify-center shrink-0">
          <Check className="w-3 h-3" />
        </div>
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="text-[#8C9B86] hover:text-[#FAF9F7] p-1 ml-2 cursor-pointer"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
