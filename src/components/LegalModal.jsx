import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { legalData } from '../data/legalData';

export default function LegalModal({ type, isOpen, onClose }) {
  if (!isOpen || !type || !legalData[type]) return null;

  const document = legalData[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-slate-900 relative shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-150 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-slate-900 leading-none">
                {document.title}
              </h3>
              <span className="text-[11px] text-slate-500">
                Last updated: {document.lastUpdated}
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed pr-2">
          {document.content.map((section, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">
                {section.heading}
              </h4>
              <p>{section.text}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold px-5 py-2.5 rounded-lg text-xs transition"
          >
            Close Document
          </button>
        </div>

      </div>
    </div>
  );
}