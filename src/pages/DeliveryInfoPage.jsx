import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { deliveryInfoData } from '../data/policyData';
import { deliveryZones, siteBrand } from '../data/siteData';

export default function DeliveryInfoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C87551]">
          <span>Sydney Delivery & Pickup</span>
          <span>•</span>
          <span>Lunches By Lily</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#263D30] font-normal tracking-tight">
          {deliveryInfoData.title}
        </h1>
        <p className="text-base sm:text-lg text-[#252721]/80 leading-relaxed font-normal max-w-2xl">
          {deliveryInfoData.subtitle}
        </p>
      </motion.div>

      {/* Free Delivery Banner */}
      <div className="p-6 sm:p-8 rounded-[2rem] bg-[#263D30] text-[#F7F4EC] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#263D30]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C87551] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Truck className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">FREE Delivery on 10+ Meals</h3>
            <p className="text-xs sm:text-sm text-[#A5AD91]">Delivered Sydney-wide in chilled courier vans every Sunday. Order by Thursday 7PM.</p>
          </div>
        </div>
        <Link
          to="/pages/this-weeks-set-menu"
          className="px-8 py-3.5 bg-[#F7F4EC] text-[#263D30] hover:bg-[#C87551] hover:text-white rounded-full text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap shadow-sm"
        >
          Order This Week
        </Link>
      </div>

      {/* Delivery Zones Cards */}
      <div className="space-y-6">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#263D30] font-normal">Delivery Zones & Fees</h2>
          <p className="text-xs sm:text-sm text-[#252721]/70 mt-1">
            Calculated at checkout based on distance from our Auburn commercial kitchen (Auburn 2144, Sydney).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {deliveryZones.map((zone, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#EFE9DC]/75 border border-[#263D30]/10 flex flex-col justify-between space-y-4 hover:border-[#263D30]/25 transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl text-[#263D30]">{zone.name}</span>
                <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-[#263D30] text-[#F7F4EC]">
                  {zone.fee}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#252721]/75 leading-relaxed font-normal">
                {zone.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Details Content Sections (100% original copy) */}
      <div className="space-y-10 pt-4 border-t border-[#263D30]/15">
        {deliveryInfoData.sections.map((sec, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#263D30] font-normal">{sec.heading}</h3>
            <div className="space-y-2.5 text-sm sm:text-base text-[#252721]/80 leading-relaxed font-normal">
              {sec.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Questions Contact Box */}
      <div className="p-8 rounded-3xl bg-white border border-[#263D30]/15 space-y-3 shadow-soft">
        <h4 className="font-serif text-2xl text-[#263D30]">Have a question about your delivery?</h4>
        <p className="text-sm text-[#252721]/75 leading-relaxed">
          Feel free to reach out to our team at{' '}
          <a href={`mailto:${siteBrand.email}`} className="text-[#C87551] font-semibold underline">
            {siteBrand.email}
          </a>{' '}
          or via WhatsApp at{' '}
          <a href={siteBrand.whatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-[#C87551] font-semibold underline">
            +61 457 713 394
          </a>.
        </p>
      </div>
    </div>
  );
}
