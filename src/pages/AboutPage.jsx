import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, ShieldCheck, UtensilsCrossed, Leaf, CheckCircle2 } from 'lucide-react';
import { aboutPageData, founderStory, siteBrand } from '../data/siteData';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 space-y-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-4"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C87551]">
          <span>Our Story</span>
          <span>•</span>
          <span>Lunches By Lily</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#263D30] font-normal tracking-tight">
          {aboutPageData.title}
        </h1>
        <p className="text-base sm:text-lg text-[#252721]/75 leading-relaxed font-normal">
          Real food, cooked in real kitchens, for real everyday lives across Sydney.
        </p>
      </motion.div>

      {/* Main Story Grid with Founder Photography */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Founder Photo Editorial Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 space-y-4 lg:sticky lg:top-28"
        >
          <div className="rounded-[2rem] overflow-hidden bg-[#263D30] shadow-xl border border-[#263D30]/15 aspect-[3/4] relative">
            <img
              src={founderStory.image}
              alt={founderStory.imageAlt}
              className="w-full h-full object-cover object-top filter contrast-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/40 backdrop-blur-md text-white border border-white/10 text-xs">
              <p className="font-serif text-lg text-white font-medium">Lily</p>
              <p className="text-[#A5AD91] text-[11px]">Founder & Head Cook • Auburn, Sydney</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#EFE9DC]/75 border border-[#263D30]/10 text-xs text-[#252721]/80 space-y-1 text-center font-medium">
            <p className="font-serif text-base text-[#263D30]">"Cooked with the same care I feed my own family."</p>
            <p className="text-[11px] text-[#252721]/60">Fresh home-cooked meal prep delivered Sydney-wide every Sunday</p>
          </div>
        </motion.div>

        {/* Story Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 space-y-8 text-[#252721]/85 text-base sm:text-lg leading-relaxed font-normal"
        >
          <div className="space-y-6">
            {aboutPageData.paragraphs.map((para, idx) => {
              if (idx === 0) {
                return (
                  <p key={idx} className="font-serif text-2xl sm:text-3xl text-[#263D30] font-normal leading-snug">
                    {para}
                  </p>
                );
              }
              if (idx === aboutPageData.paragraphs.length - 1) {
                return (
                  <div key={idx} className="pt-4 flex items-center gap-2 text-[#C87551] font-serif text-2xl italic font-normal">
                    <span>{para}</span>
                    <Heart className="w-5 h-5 fill-[#C87551]" />
                  </div>
                );
              }
              return (
                <p key={idx} className="text-[#252721]/80">
                  {para}
                </p>
              );
            })}
          </div>

          {/* Kitchen Standards Cards */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#263D30]/15">
            <div className="p-5 rounded-2xl bg-white border border-[#263D30]/10 space-y-2 shadow-sm">
              <span className="font-serif text-xl text-[#263D30] block">Small Batches</span>
              <p className="text-xs text-[#252721]/70 leading-relaxed font-normal">Cooked fresh weekly to order, never mass-produced in factories or frozen.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#263D30]/10 space-y-2 shadow-sm">
              <span className="font-serif text-xl text-[#263D30] block">100% Halal</span>
              <p className="text-xs text-[#252721]/70 leading-relaxed font-normal">Premium lean meats, certified halal chicken, beef, and lamb with fresh market greens.</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-[#263D30]/10 space-y-2 shadow-sm">
              <span className="font-serif text-xl text-[#263D30] block">Real Ingredients</span>
              <p className="text-xs text-[#252721]/70 leading-relaxed font-normal">Olive oil, authentic seasonings, no hidden fillers, generous real food portions.</p>
            </div>
          </div>

          {/* Order CTA */}
          <div className="pt-4">
            <Link
              to="/pages/this-weeks-set-menu"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#263D30] hover:bg-[#C87551] text-[#F7F4EC] rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-xl group"
            >
              <span>Explore This Week's Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
