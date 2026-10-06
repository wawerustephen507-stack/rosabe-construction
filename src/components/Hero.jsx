import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';

export default function Hero({ onOpenQuote }) {
  return (
    <section id="home" className="relative min-h-[580px] lg:min-h-[620px] flex items-center bg-slate-900 overflow-hidden">
      {/* Background photo */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80')` 
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-10 py-16 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-amber-500 font-bold tracking-widest uppercase text-xs mb-3">
            <span className="w-8 h-[2px] bg-amber-500 inline-block" />
            Rosabe Construction
          </div>

          <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight text-white mb-5">
            Building Your <br className="hidden sm:inline" />
            Dreams, <span className="text-amber-500">Together</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
            At Rosabe Construction, we deliver quality building solutions that stand the test of time. 
            From residential homes to commercial developments, we turn your architectural vision into reality.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={onOpenQuote}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-md flex items-center gap-2 text-sm transition shadow-lg shadow-amber-500/10"
            >
              <FileText className="w-4 h-4" />
              Request a Quote
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <a 
              href="#projects" 
              className="border border-slate-600 hover:border-slate-400 hover:bg-slate-800/40 text-slate-200 font-semibold px-6 py-3.5 rounded-md text-sm transition"
            >
              View Our Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}