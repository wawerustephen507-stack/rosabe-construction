import React from 'react';

// Exact minimalist icons matching the mockup icons
function HomeIcon() {
  return (
    <svg className="w-7 h-7 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" />
      <rect x="9" y="13" width="6" height="8" />
    </svg>
  );
}

function CityIcon() {
  return (
    <svg className="w-7 h-7 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="6" height="13" rx="0.5" />
      <rect x="11" y="3" width="7" height="18" rx="0.5" />
      <path d="M19 12h2v9h-2z" />
      <path d="M6 11h.01M6 14h.01M6 17h.01M14 6h.01M14 9h.01M14 12h.01M14 15h.01M14 18h.01" />
    </svg>
  );
}

function ToolsIcon() {
  return (
    <svg className="w-7 h-7 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function HelmetIcon() {
  return (
    <svg className="w-7 h-7 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15a8 8 0 0116 0v2H4v-2z" />
      <path d="M12 7v8" />
      <path d="M8 8.5v6.5" />
      <path d="M16 8.5v6.5" />
      <path d="M2 17h20v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2z" />
    </svg>
  );
}

function BrickIcon() {
  return (
    <svg className="w-7 h-7 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="M3 10h18" />
      <path d="M3 15h18" />
      <path d="M9 5v5" />
      <path d="M15 5v5" />
      <path d="M6 10v5" />
      <path d="M12 10v5" />
      <path d="M18 10v5" />
      <path d="M9 15v4" />
      <path d="M15 15v4" />
    </svg>
  );
}

const serviceItems = [
  {
    icon: <HomeIcon />,
    title: "Residential Construction",
    desc: "Modern, durable and comfortable homes."
  },
  {
    icon: <CityIcon />,
    title: "Commercial Construction",
    desc: "Offices, shops and business spaces that work for you."
  },
  {
    icon: <ToolsIcon />,
    title: "Renovations & Remodeling",
    desc: "Give your space a fresh new look."
  },
  {
    icon: <HelmetIcon />,
    title: "Project Management",
    desc: "On time, on budget, with clear communication."
  },
  {
    icon: <BrickIcon />,
    title: "General Building Works",
    desc: "From foundation to finish, we do it all."
  }
];

export default function Services() {
  return (
    <section id="services" className="bg-[#FAF9F6] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {serviceItems.map((item, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center text-center px-4 py-6 sm:py-2 transition duration-200 hover:-translate-y-1"
            >
              <div className="mb-3.5 flex items-center justify-center h-10">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1.5">
                {item.title}
              </h3>
              <p className="text-[12px] text-gray-500 leading-relaxed max-w-[210px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}