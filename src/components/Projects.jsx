import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X, Calendar, MapPin, Tag } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const defaultProjects = [
  {
    id: 'default-1',
    title: 'Modern Suburban Villa',
    category: 'residential',
    categoryLabel: 'Residential',
    location: 'Ruiru, Kiambu',
    duration: '8 Months',
    scope: 'Full Turnkey Build (Structural, Plumbing, Electrical, Finishes)',
    description: 'A 5-bedroom luxury family residence engineered with contemporary open-plan spaces, reinforced concrete cantilever slabs, and energy-efficient window placement.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'default-2',
    title: 'Watalaam Commercial Complex',
    category: 'commercial',
    categoryLabel: 'Commercial',
    location: 'Watalaam, Kenya',
    duration: '14 Months',
    scope: 'Multi-Storey Commercial Retail & Office Plaza',
    description: 'High-traffic commercial infrastructure featuring underground parking, reinforced structural columns, and flexible office floor partitions.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'default-3',
    title: 'Luxury Family Bungalow',
    category: 'residential',
    categoryLabel: 'Residential',
    location: 'Thika Road, Nairobi',
    duration: '6 Months',
    scope: '4-Bedroom Master En-Suite Construction',
    description: 'Designed for durability and thermal comfort featuring decra stone-coated roofing, natural stone cladding, and custom perimeter masonry.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'default-4',
    title: 'Contemporary Office Fit-Out',
    category: 'renovation',
    categoryLabel: 'Renovation',
    location: 'Westlands, Nairobi',
    duration: '3 Months',
    scope: 'Interior Architectural Remodel & Acoustic Ceilings',
    description: 'Complete corporate space renovation including gypsum partitioning, glass curtain walls, ergonomic lighting, and modernized HVAC routing.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'default-5',
    title: 'Executive Townhouses',
    category: 'residential',
    categoryLabel: 'Residential',
    location: 'Membley, Ruiru',
    duration: '11 Months',
    scope: 'Gated Community 4-Unit Development',
    description: 'Gated modern cluster homes with cabro-paved driveways, integrated solar water heating, and modern septic drainage engineering.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'default-6',
    title: 'Retail Business Plaza',
    category: 'commercial',
    categoryLabel: 'Commercial',
    location: 'Juja, Kiambu',
    duration: '10 Months',
    scope: 'Retail Mall Construction & Drainage Works',
    description: 'Spacious retail layout with high-durability epoxy flooring, wide vehicle access bays, and reinforced perimeter security installations.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
];

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'renovation', label: 'Renovation' },
];

export default function Projects({ onOpenQuote }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(defaultProjects);

  // Live Firebase Sync
  useEffect(() => {
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const liveData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProjects(liveData);
        } else {
          setProjects(defaultProjects);
        }
      }, (error) => {
        console.warn("Using default project portfolio:", error);
      });
      return () => unsubscribe();
    } catch (err) {
      console.warn("Firebase not yet configured, showing defaults:", err);
    }
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((item) => item.category === activeFilter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-12 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-amber-500 font-bold uppercase text-xs tracking-widest mb-2">
              <span className="w-6 h-[2px] bg-amber-500 inline-block" />
              Featured Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Recent Projects
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Click on any project to inspect structural scope and specifications.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition duration-200 ${
                  activeFilter === cat.key
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative rounded-xl overflow-hidden bg-slate-950 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-800">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 mb-2">
                    {project.categoryLabel || project.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    {project.location}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-500 transition duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-150 max-h-[90vh] flex flex-col text-slate-900">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 sm:h-72 w-full shrink-0 bg-slate-900">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
                  {selectedProject.categoryLabel || selectedProject.category}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-left text-sm">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-medium">Location</span>
                    <strong className="text-slate-800">{selectedProject.location}</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 block font-medium">Project Duration</span>
                    <strong className="text-slate-800">{selectedProject.duration || 'Completed'}</strong>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> Scope of Works
                </h4>
                <p className="font-semibold text-slate-800 text-sm">
                  {selectedProject.scope || 'Full Construction Service'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Project Overview
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  {selectedProject.description}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="text-xs text-amber-950">
                  <strong className="block font-bold">Planning a similar structure?</strong>
                  Request a cost estimate customized for your land dimensions.
                </div>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onOpenQuote();
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shrink-0 transition"
                >
                  Get Estimate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}