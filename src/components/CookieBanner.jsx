import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner({ onOpenPolicy }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('rosabe_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('rosabe_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('rosabe_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-md w-[calc(100%-3rem)] bg-white text-slate-900 p-5 rounded-2xl shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6 duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-50 rounded-xl text-amber-500 shrink-0">
          <Cookie className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
            Cookie Notice
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            We use cookies to analyze traffic and optimize your quote request experience.{' '}
            <button 
              onClick={() => onOpenPolicy('cookies')} 
              className="text-amber-600 underline font-semibold hover:text-amber-700"
            >
              Read Cookie Policy
            </button>.
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs transition"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-1.5 rounded-lg text-xs transition"
            >
              Decline
            </button>
          </div>
        </div>

        <button 
          onClick={handleDecline}
          className="text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}