import React, { useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onOpenQuote, activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Construction Services', href: '#services', id: 'services' },
    { name: 'Our Projects', href: '#projects', id: 'projects' },
    { name: 'About Us', href: '#about', id: 'about' },
    { name: 'Contact Us', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="bg-white text-slate-900 px-4 sm:px-12 py-3.5 shadow-sm sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Nav Links with Active Highlighting */}
        <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-semibold text-slate-700">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive ? 'text-amber-500 font-bold' : 'text-slate-700 hover:text-amber-500'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-amber-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenQuote}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded text-xs sm:text-sm flex items-center gap-2 transition shadow-sm"
          >
            <FileText className="w-4 h-4 text-slate-950" />
            <span>Request a Quote</span>
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-slate-700 lg:hidden hover:text-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 mt-3 pt-3 pb-2 space-y-2 text-sm font-semibold text-slate-700">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-2 py-1.5 rounded transition ${
                activeSection === link.id ? 'bg-amber-50 text-amber-500 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}