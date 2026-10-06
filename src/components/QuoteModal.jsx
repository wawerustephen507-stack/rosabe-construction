import React, { useState } from 'react';
import { X, MessageSquare, Mail, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const FORMSPREE_FORM_ID = 'meaeoare';

export default function QuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Residential Construction',
    details: '',
    targetPhone: '254719656461'
  });
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1. WhatsApp Delivery
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const message = 
      `*New Quote Request - Rosabe Construction*%0A%0A` +
      `*Client Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Email:* ${encodeURIComponent(formData.email || 'Not provided')}%0A` +
      `*Service Required:* ${encodeURIComponent(formData.service)}%0A` +
      `*Project Scope:* ${encodeURIComponent(formData.details || 'None provided')}`;

    const waUrl = `https://wa.me/${formData.targetPhone}?text=${message}`;
    window.open(waUrl, '_blank');
    onClose();
  };

  // 2. Direct Formspree Email Delivery
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMessage('');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          client_name: formData.name,
          phone_number: formData.phone,
          email: formData.email || 'Not provided',
          service_requested: formData.service,
          preferred_contact_line: formData.targetPhone === '254719656461' ? '0719656461' : '0768933093',
          project_scope: formData.details || 'None provided'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          onClose();
        }, 2500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not deliver form directly. Please use WhatsApp or reach out via phone.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 text-slate-900 relative shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-150">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">Inquiry Dispatched!</h3>
            <p className="text-sm text-slate-600">
              Your inquiry has been emailed straight to <strong>bensonwaweru4@gmail.com</strong>. We will get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                Fast Response
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">Request a Quote</h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter your project scope below and choose your preferred contact channel.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form className="space-y-3.5 text-left text-sm">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input 
                  required
                  type="text"
                  name="name"
                  placeholder="e.g. Stephen Waweru"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Phone *</label>
                  <input 
                    required
                    type="tel"
                    name="phone"
                    placeholder="07..."
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input 
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3.5 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Required Service</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option>Residential Construction</option>
                    <option>Commercial Construction</option>
                    <option>Renovations & Remodeling</option>
                    <option>Project Management</option>
                    <option>General Building Works</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Direct Rep Contact</label>
                  <select 
                    name="targetPhone"
                    value={formData.targetPhone}
                    onChange={handleChange}
                    className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="254719656461">0719656461 (Line 1)</option>
                    <option value="254768933093">0768933093 (Line 2)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Project Details</label>
                <textarea 
                  rows={3}
                  name="details"
                  placeholder="Location, estimated budget, measurements, timeline..."
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full text-xs sm:text-sm border border-slate-300 rounded-lg px-3.5 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  disabled={!formData.name || !formData.phone || isSending}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>

                <button 
                  type="button"
                  onClick={handleEmailSubmit}
                  disabled={!formData.name || !formData.phone || isSending}
                  className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-amber-400 font-bold py-3 px-4 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-2 transition"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 text-amber-400" />
                      <span>Send via Email</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}