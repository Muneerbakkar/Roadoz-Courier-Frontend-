import React from "react";
import { X } from "lucide-react";

export default function CommonModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      {/* Modal Body */}
      <div className="relative bg-card-bg border border-border-subtle w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-border-subtle flex justify-between items-center bg-dashboard-bg/50">
          <h2 className="text-lg font-bold text-text-main uppercase tracking-widest">{title}</h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-white/10 rounded-full text-text-muted hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Section (Scrollable on small screens) */}
        <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}