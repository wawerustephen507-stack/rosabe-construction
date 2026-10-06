import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('254719656461');
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    "I'd like to get a quote for a new building.",
    "Can you share more details about your residential projects?",
    "I have an upcoming renovation in Kiambu/Nairobi."
  ];

  const handleStartChat = (messageText) => {
    const textToSend = messageText || customMsg || "Hello Rosabe Construction, I have an inquiry about your building services.";
    const url = `https://wa.me/${selectedNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group"
          aria-label="Open WhatsApp Chat"
        >
          {/* Subtle radar ping ring */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping" />
          <MessageCircle className="w-7 h-7 relative z-10" fill="currentColor" />
          
          {/* Badge Tooltip */}
          <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none">
            Chat with us on WhatsApp
          </span>
        </button>
      )}

      {/* Expanded Interactive Chat Box */}
      {isOpen && (
        <div className="w-[340px] sm:w-[370px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200 text-slate-900">
          
          {/* Widget Header */}
          <div className="bg-[#0b1329] text-white p-4 relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 bg-amber-500 rounded-full flex items-center justify-center font-bold text-slate-950 text-lg shadow-inner">
                  🏗️
                </div>
                <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0b1329] rounded-full absolute bottom-0 right-0" />
              </div>

              <div>
                <h4 className="font-extrabold text-sm leading-tight text-white">Rosabe Construction</h4>
                <p className="text-[11px] text-amber-400 font-medium">Typically replies within minutes</p>
              </div>
            </div>
          </div>

          {/* Widget Body */}
          <div className="p-4 bg-[#f8fafc] space-y-3 max-h-[380px] overflow-y-auto text-xs">
            
            {/* Intro Chat Bubble */}
            <div className="bg-white p-3.5 rounded-xl rounded-tl-none border border-slate-200 shadow-sm space-y-1.5 leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">
                Jambo! Welcome to Rosabe Construction 👋
              </p>
              <p>
                We specialize in residential homes, commercial complexes, and quality renovations based out of Ruiru Watalaam.
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                How can our engineering team assist you today?
              </p>
            </div>

            {/* Rep selector */}
            <div className="bg-white p-2.5 rounded-xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                Select WhatsApp Line:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedNumber('254719656461')}
                  className={`py-1.5 px-2 rounded-lg font-bold text-[11px] border transition ${
                    selectedNumber === '254719656461'
                      ? 'bg-amber-500 border-amber-500 text-slate-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  0719656461
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedNumber('254768933093')}
                  className={`py-1.5 px-2 rounded-lg font-bold text-[11px] border transition ${
                    selectedNumber === '254768933093'
                      ? 'bg-amber-500 border-amber-500 text-slate-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  0768933093
                </button>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Frequently Asked:
              </span>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStartChat(prompt)}
                  className="w-full text-left p-2 rounded-lg bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-400 text-slate-700 font-medium transition duration-150 text-[11px]"
                >
                  "{prompt}"
                </button>
              ))}
            </div>

          </div>

          {/* Custom Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Type your message..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStartChat(customMsg)}
              className="flex-1 text-xs border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            />
            <button
              onClick={() => handleStartChat(customMsg)}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2 rounded-lg transition"
              title="Start Chat"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}