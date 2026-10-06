import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Eng. David Mwangi',
    role: 'Commercial Property Developer',
    location: 'Ruiru, Kenya',
    text: 'Rosabe Construction handled our commercial plaza build with utmost precision. Their structural integrity, milestone reporting, and adherence to county building codes were exemplary.',
    stars: 5,
  },
  {
    name: 'Grace Wambui',
    role: 'Homeowner',
    location: 'Membley Estate',
    text: 'Building a home from abroad can be stressful, but Benson and the team sent weekly site updates and kept every single material cost transparent. Highly recommended for residential builds.',
    stars: 5,
  },
  {
    name: 'Patrick Kiprop',
    role: 'Managing Director, Horizon Logix',
    location: 'Nairobi',
    text: 'The office remodeling completed by Rosabe transformed our corporate workplace. High quality finishes, quick turn-around, and zero budget overruns.',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-12 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-amber-500 font-bold uppercase text-xs tracking-widest mb-2">
            <span className="w-6 h-[2px] bg-amber-500" />
            Client Endorsements
            <span className="w-6 h-[2px] bg-amber-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Builders & Families
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-2">
            Here is what clients across Kiambu, Nairobi, and beyond say about working with Rosabe Construction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl p-7 flex flex-col justify-between hover:shadow-lg transition duration-200 relative group"
            >
              <Quote className="w-10 h-10 text-amber-500/20 absolute top-6 right-6 group-hover:text-amber-500/40 transition" />
              
              <div>
                <div className="flex gap-1 mb-4 text-amber-400">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="border-t border-slate-200/70 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-sm">
                  {rev.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.role} • {rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}