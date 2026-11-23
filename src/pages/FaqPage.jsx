import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';
import { faqList, siteBrand } from '../data/siteData';

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C87551]">
          <span>Help & Support</span>
          <span>•</span>
          <span>Lunches By Lily</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#263D30] font-normal tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-[#252721]/80 leading-relaxed font-normal max-w-2xl">
          Everything you need to know about our fresh meals, ordering deadlines, Sunday deliveries, and kitchen standards.
        </p>
      </motion.div>

      {/* Accordion Questions */}
      <div className="divide-y divide-[#263D30]/15 border-y border-[#263D30]/15">
        {faqList.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="py-5">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full text-left flex items-center justify-between gap-4 py-2 focus:outline-none group cursor-pointer"
              >
                <span className="font-serif text-xl sm:text-2xl text-[#263D30] group-hover:text-[#C87551] transition-colors">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#263D30] group-hover:text-[#C87551] transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#C87551]' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-3 text-base text-[#252721]/80 leading-relaxed font-normal">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="p-8 sm:p-10 rounded-[2rem] bg-[#EFE9DC]/75 border border-[#263D30]/10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#263D30]">Still have questions?</h3>
          <p className="text-xs sm:text-sm text-[#252721]/70 max-w-md">
            Can’t find the answer you’re looking for? Reach out directly to Lily and our Sydney kitchen team.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${siteBrand.email}`}
            className="px-6 py-3 bg-[#263D30] text-[#F7F4EC] hover:bg-[#C87551] rounded-full text-xs font-semibold tracking-wider uppercase transition-colors inline-flex items-center gap-2 shadow-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Email Us</span>
          </a>
          <a
            href={siteBrand.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-[#263D30] hover:bg-[#EFE9DC] border border-[#263D30]/20 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors inline-flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#C87551]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
