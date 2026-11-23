import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { siteBrand } from '../data/siteData';

export default function InstagramFeedSection() {
  const instagramImages = [
    "https://lunchesbylily.com.au/cdn/shop/files/Hero-banner-full-image.png?v=1779250252&width=800",
    "https://lunchesbylily.com.au/cdn/shop/files/2P7A5951.jpg?height=800&v=1780364273",
    "https://lunchesbylily.com.au/cdn/shop/files/tuscan-chicken.png?v=1775532257&width=800",
    "https://lunchesbylily.com.au/cdn/shop/collections/Beef-collection-image.png?v=1779253743&width=800",
    "https://cdn.shopify.com/s/files/1/0967/1206/5337/files/Salmon-teriyaki.png?v=1794446805",
    "https://cdn.shopify.com/s/files/1/0967/1206/5337/files/Tuna_power_bowl.jpg?v=1771374931"
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header matching original Instafeed title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#263D30] font-normal tracking-tight">
          Follow Us
        </h2>

        <a
          href={siteBrand.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#263D30] text-[#F7F4EC] hover:bg-[#C87551] transition-all text-xs font-semibold tracking-wider uppercase shadow-sm group"
        >
          <InstagramIcon className="w-4 h-4" />
          <span>{siteBrand.instagramHandle}</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Photography Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {instagramImages.map((src, idx) => (
          <a
            key={idx}
            href={siteBrand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden aspect-square bg-[#EFE9DC] border border-[#263D30]/10 shadow-sm block"
          >
            <img
              src={src}
              alt="Lunches By Lily"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-[#263D30]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
              <InstagramIcon className="w-7 h-7 text-[#F7F4EC]" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
