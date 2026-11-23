import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  privacyPolicyData,
  termsConditionsData,
  refundPolicyData,
  accessibilityStatementData
} from '../data/policyData';

export default function PolicyPage() {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  let currentPolicy = privacyPolicyData;
  let activeKey = 'privacy';

  if (path.includes('terms')) {
    currentPolicy = termsConditionsData;
    activeKey = 'terms';
  } else if (path.includes('refund')) {
    currentPolicy = refundPolicyData;
    activeKey = 'refund';
  } else if (path.includes('accessibility')) {
    currentPolicy = accessibilityStatementData;
    activeKey = 'accessibility';
  }

  const policies = [
    { key: 'privacy', label: 'Privacy Policy', path: '/pages/privacy-policy' },
    { key: 'terms', label: 'Terms & Conditions', path: '/pages/terms-conditions' },
    { key: 'refund', label: 'Refund & Returns Policy', path: '/pages/refund-returns-policy' },
    { key: 'accessibility', label: 'Accessibility Statement', path: '/pages/accessibility-statement' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 space-y-12">
      {/* Policy Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#263D30]/10 no-scrollbar">
        {policies.map((p) => {
          const isActive = activeKey === p.key;
          return (
            <Link
              key={p.key}
              to={p.path}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#263D30] text-[#F7F4EC] shadow-sm'
                  : 'bg-[#EFE9DC]/75 text-[#252721]/75 hover:bg-[#EFE9DC]'
              }`}
            >
              {p.label}
            </Link>
          );
        })}
      </div>

      {/* Main Document Frame */}
      <motion.div
        key={activeKey}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-8 sm:p-14 lg:p-16 rounded-[2rem] bg-white border border-[#263D30]/10 shadow-soft space-y-8"
      >
        <div className="space-y-3 border-b border-[#263D30]/10 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C87551]">
            Legal Document • Lunches By Lily
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#263D30] font-normal tracking-tight">
            {currentPolicy.title}
          </h1>
          {currentPolicy.lastUpdated && (
            <p className="text-xs text-[#252721]/60 font-medium">
              Last updated: {currentPolicy.lastUpdated}
            </p>
          )}
          {currentPolicy.intro && (
            <p className="text-sm sm:text-base text-[#252721]/80 leading-relaxed font-normal pt-2">
              {currentPolicy.intro}
            </p>
          )}
        </div>

        {/* Sections */}
        <div className="space-y-8 divide-y divide-[#263D30]/10">
          {currentPolicy.sections.map((sec, idx) => (
            <div key={idx} className="pt-8 first:pt-0 space-y-3">
              <h2 className="font-serif text-2xl text-[#263D30] font-normal">
                {sec.heading}
              </h2>
              <div className="space-y-3 text-sm sm:text-base text-[#252721]/80 leading-relaxed font-normal">
                {sec.content.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
