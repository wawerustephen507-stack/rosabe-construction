import React, { useState, useEffect } from 'react';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import WhatsAppWidget from './components/WhatsAppWidget';
import LegalModal from './components/LegalModal';
import CookieBanner from './components/CookieBanner';
import AdminPortal from './components/AdminPortal';
import { ArrowRight } from 'lucide-react';

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [legalModalType, setLegalModalType] = useState(null); // 'privacy' | 'terms' | 'cookies' | null

  // Route & Hash detection for Admin Portal
  useEffect(() => {
    const handleRouteCheck = () => {
      if (
        window.location.hash.toLowerCase().includes('admin') || 
        window.location.search.toLowerCase().includes('admin')
      ) {
        setIsAdminOpen(true);
      }
    };

    handleRouteCheck();
    window.addEventListener('hashchange', handleRouteCheck);
    return () => window.removeEventListener('hashchange', handleRouteCheck);
  }, []);

  // Section highlight on scroll
  useEffect(() => {
    const sectionIds = ['home', 'services', 'projects', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 scroll-smooth">
      <TopBar />
      <Navbar onOpenQuote={() => setIsQuoteOpen(true)} activeSection={activeSection} />
      
      <main>
        <Hero onOpenQuote={() => setIsQuoteOpen(true)} />
        <Services />
        <Projects onOpenQuote={() => setIsQuoteOpen(true)} />
        <About onOpenQuote={() => setIsQuoteOpen(true)} />
        <Testimonials />

        {/* Teaser CTA */}
        <section className="bg-slate-950 py-16 px-4 text-center border-t border-slate-800">
          <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">
            — Quality Construction • Trusted Partner —
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            Let's Build Something Great
          </h2>
          <button 
            onClick={() => setIsQuoteOpen(true)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3.5 rounded-md inline-flex items-center gap-2 text-sm transition"
          >
            Start Your Project Today
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </main>

      <Footer 
        onOpenQuote={() => setIsQuoteOpen(true)} 
        onOpenLegal={(type) => setLegalModalType(type)} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Popups, Portals & Widgets */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <WhatsAppWidget />
      <LegalModal 
        type={legalModalType} 
        isOpen={Boolean(legalModalType)} 
        onClose={() => setLegalModalType(null)} 
      />
      <CookieBanner onOpenPolicy={(type) => setLegalModalType(type)} />
      
      {/* Client Admin Upload Portal */}
      <AdminPortal 
        isOpen={isAdminOpen} 
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash.toLowerCase().includes('admin')) {
            window.history.pushState(null, '', window.location.pathname);
          }
        }} 
      />
    </div>
  );
}