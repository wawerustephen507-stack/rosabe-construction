import React from 'react';
import { Mail, Phone, MapPin, Clock, CalendarCheck } from 'lucide-react';
import Logo from './Logo';
import { siteData } from '../data/siteData';

export default function Footer({ onOpenQuote, onOpenLegal, onOpenAdmin }) {
  const { email, phones, location } = siteData.contacts;

  return (
    <footer id="contact" className="bg-[#0b1329] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        
        {/* Top Grid: Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white inline-block p-3 rounded-xl shadow-sm">
              <Logo />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Delivering high-quality residential, commercial, and general engineering services 
              with lasting structural integrity. Operating from Ruiru Watalaam and serving projects across Kenya.
            </p>
            
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CalendarCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Sunday: By Site Appointment</span>
              </div>
            </div>

            <button
              onClick={onOpenQuote}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs transition duration-200 shadow-sm"
            >
              Book an On-Site Consultation
            </button>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#home" className="hover:text-amber-400 transition">Home</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition">Construction Services</a></li>
              <li><a href="#projects" className="hover:text-amber-400 transition">Our Projects</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition">About Us</a></li>
              <li><button onClick={onOpenQuote} className="hover:text-amber-400 transition text-left">Request a Quote</button></li>
            </ul>
          </div>

          {/* Contacts Information */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Reach Out
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{location}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href={`tel:${phones[0]}`} className="hover:text-amber-400 transition font-medium">{phones[0]}</a>
                  <a href={`tel:${phones[1]}`} className="hover:text-amber-400 transition font-medium">{phones[1]}</a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-amber-400 transition truncate">{email}</a>
              </li>
            </ul>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-4 rounded-xl overflow-hidden border border-slate-800 shadow-md">
            <iframe
              title="Rosabe Construction Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15956.120716654032!2d36.9535787!3d-1.1517724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f4625b099b24b%3A0x6b772c9bc67ce59b!2sRuiru!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-80 hover:opacity-100 hover:grayscale-0 transition duration-300"
            />
            <div className="bg-slate-900/90 p-2.5 text-center text-[11px] text-slate-400">
              📍 Site Visits & Office: Ruiru Watalaam, Kiambu County
            </div>
          </div>

        </div>

        {/* Bottom Bar with Active Legal Modals & Staff Portal Link */}
        <div className="border-t border-slate-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Rosabe Construction. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5 text-xs">
            <button 
              onClick={() => onOpenLegal && onOpenLegal('privacy')} 
              className="hover:text-amber-400 transition"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onOpenLegal && onOpenLegal('terms')} 
              className="hover:text-amber-400 transition"
            >
              Terms & Conditions
            </button>
            <button 
              onClick={() => onOpenLegal && onOpenLegal('cookies')} 
              className="hover:text-amber-400 transition"
            >
              Cookie Policy
            </button>
            <button 
              onClick={() => onOpenAdmin && onOpenAdmin()} 
              className="text-slate-400 hover:text-amber-400 font-semibold border-l border-slate-700 pl-4 transition flex items-center gap-1.5"
            >
              <span>🔒</span> Staff Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}