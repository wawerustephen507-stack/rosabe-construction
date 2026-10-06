import React from 'react';
import { ShieldCheck, Award, Clock, Users, ArrowRight } from 'lucide-react';

const stats = [
  { value: '12+', label: 'Years of Experience' },
  { value: '150+', label: 'Projects Completed' },
  { value: '100%', label: 'Safety & Compliance' },
  { value: '98%', label: 'Satisfied Clients' },
];

const pillars = [
  {
    icon: <ShieldCheck className="w-5 h-5 text-amber-500" />,
    title: 'Certified Quality',
    desc: 'Uncompromising engineering standards from foundation to final finish.'
  },
  {
    icon: <Clock className="w-5 h-5 text-amber-500" />,
    title: 'On-Time Delivery',
    desc: 'Rigorous project management keeping every build on schedule.'
  },
  {
    icon: <Award className="w-5 h-5 text-amber-500" />,
    title: 'Transparent Pricing',
    desc: 'Clear, milestone-based quotes without hidden surcharges.'
  },
  {
    icon: <Users className="w-5 h-5 text-amber-500" />,
    title: 'Expert Craftsmanship',
    desc: 'Licensed masons, site engineers, and structural specialists.'
  }
];

export default function About({ onOpenQuote }) {
  return (
    <section id="about" className="py-20 px-4 sm:px-12 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid: Content + Side Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-amber-500 font-bold uppercase text-xs tracking-widest mb-3">
              <span className="w-8 h-[2px] bg-amber-500 inline-block" />
              About Rosabe Construction
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
              Built on Integrity, Driven by Quality & Lasting Spaces
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              Headquartered in Ruiru Watalaam, Rosabe Construction provides turnkey residential, commercial, 
              and civil engineering solutions across Kenya. We turn architectural blueprints into high-precision, 
              durable physical structures designed to serve generations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {pillars.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                  <div className="p-2 bg-amber-50 rounded shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onOpenQuote}
              className="bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold px-6 py-3 rounded-md text-sm inline-flex items-center gap-2 transition"
            >
              Consult With Our Engineers
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80" 
                alt="Site engineers at work" 
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-white/20 shadow-lg text-slate-900">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Local Commitment</p>
                <p className="text-sm font-bold mt-0.5">Operating from Ruiru Watalaam, Serving Kenya Nationwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Numbers & Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-slate-950 text-white rounded-2xl p-8 shadow-xl">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl sm:text-5xl font-black text-amber-500 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm font-medium text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}