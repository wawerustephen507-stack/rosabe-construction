import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function TopBar() {
  const { email, phones, location } = siteData.contacts;

  return (
    <div className="bg-[#0b1329] text-gray-300 text-xs sm:text-sm py-2.5 px-4 sm:px-10 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-y-2 gap-x-6">
        <div className="flex flex-wrap items-center gap-y-1 gap-x-6">
          <a 
            href={`mailto:${email}`} 
            className="flex items-center gap-2 hover:text-amber-400 transition"
          >
            <Mail className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{email}</span>
          </a>
          
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-500 shrink-0" />
            <a href={`tel:${phones[0]}`} className="hover:text-amber-400 transition">
              {phones[0]}
            </a>
            <span className="text-slate-600">/</span>
            <a href={`tel:${phones[1]}`} className="hover:text-amber-400 transition">
              {phones[1]}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}