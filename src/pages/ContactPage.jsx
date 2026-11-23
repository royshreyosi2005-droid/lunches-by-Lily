import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { contactPageData } from '../data/policyData';
import { siteBrand } from '../data/siteData';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-4"
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C87551]">
          <span>Get in Touch</span>
          <span>•</span>
          <span>Lunches By Lily</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#263D30] font-normal tracking-tight">
          {contactPageData.title}
        </h1>
        <div className="space-y-2 text-base sm:text-lg text-[#252721]/80 leading-relaxed font-normal">
          {contactPageData.intro.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </motion.div>

      {/* Main Grid: Info Cards + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* General & Orders Contact */}
          <div className="p-8 rounded-[2rem] bg-[#EFE9DC]/75 border border-[#263D30]/10 space-y-5 shadow-sm">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#263D30]">Direct Channels</h3>
            <p className="text-xs sm:text-sm text-[#252721]/70 leading-relaxed">
              If you need help with an existing order, please include your <strong>name and order number</strong> so we can assist you quickly.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={`mailto:${siteBrand.email}`}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white hover:bg-[#F7F4EC] border border-[#263D30]/10 transition-colors text-xs sm:text-sm font-medium text-[#263D30] shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-[#263D30] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-[#252721]/50 uppercase tracking-wider font-semibold">Email</span>
                  <span className="font-semibold">{siteBrand.email}</span>
                </div>
              </a>

              <a
                href={siteBrand.whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white hover:bg-[#F7F4EC] border border-[#263D30]/10 transition-colors text-xs sm:text-sm font-medium text-[#263D30] shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-[#C87551] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-[#252721]/50 uppercase tracking-wider font-semibold">WhatsApp</span>
                  <span className="font-semibold">+61 457 713 394</span>
                </div>
              </a>

              <a
                href={siteBrand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white hover:bg-[#F7F4EC] border border-[#263D30]/10 transition-colors text-xs sm:text-sm font-medium text-[#263D30] shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-[#A5AD91] text-[#263D30] flex items-center justify-center shrink-0">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-[#252721]/50 uppercase tracking-wider font-semibold">Instagram</span>
                  <span className="font-semibold">@lunchesbylily</span>
                </div>
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="p-6 rounded-2xl bg-white border border-[#263D30]/10 space-y-3 shadow-soft">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C87551]" />
              <h4 className="font-serif text-xl text-[#263D30]">Kitchen & Support Hours</h4>
            </div>
            <p className="text-xs text-[#252721]/70 leading-relaxed">
              Messages are monitored during kitchen hours and we aim to respond promptly.
            </p>
            <div className="pt-1 text-xs text-[#252721]/80 space-y-1 font-medium">
              <p>• {siteBrand.hours.weekdays}</p>
              <p>• {siteBrand.hours.weekends}</p>
            </div>
          </div>

          {/* Pickup Location */}
          <div className="p-6 rounded-2xl bg-white border border-[#263D30]/10 space-y-2 shadow-soft">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C87551]" />
              <h4 className="font-serif text-xl text-[#263D30]">Free Auburn Pickup</h4>
            </div>
            <p className="text-xs text-[#252721]/70 leading-relaxed">
              Auburn 2144, Sydney NSW. Pickup time: Sunday 4:00 PM – 6:00 PM. Full street address provided in your order confirmation email.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 rounded-[2rem] bg-[#EFE9DC]/50 border border-[#263D30]/10 shadow-soft">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#263D30] mb-2">Send us an enquiry</h3>
          <p className="text-xs sm:text-sm text-[#252721]/70 mb-8">
            Fill in the details below and Lily or our team will get back to you shortly.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 rounded-2xl bg-white border border-[#263D30]/15 text-center space-y-4 shadow-sm"
            >
              <CheckCircle2 className="w-12 h-12 text-[#263D30] mx-auto" />
              <h4 className="font-serif text-2xl text-[#263D30]">Thank you for reaching out!</h4>
              <p className="text-sm text-[#252721]/70 max-w-sm mx-auto leading-relaxed">
                We have received your message and will respond to <span className="font-semibold text-[#263D30]">{formData.email}</span> during business hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', orderNumber: '', message: '' });
                }}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#263D30] text-[#F7F4EC] text-xs font-semibold uppercase tracking-wider hover:bg-[#C87551] transition-colors"
              >
                Send Another Note
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#263D30] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lily Smith"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#263D30]/20 text-sm focus:outline-none focus:ring-1 focus:ring-[#263D30]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#263D30] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#263D30]/20 text-sm focus:outline-none focus:ring-1 focus:ring-[#263D30]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#263D30] mb-1.5">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0400 000 000"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#263D30]/20 text-sm focus:outline-none focus:ring-1 focus:ring-[#263D30]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#263D30] mb-1.5">
                    Order Number (If applicable)
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    placeholder="#1045"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#263D30]/20 text-sm focus:outline-none focus:ring-1 focus:ring-[#263D30]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#263D30] mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#263D30]/20 text-sm focus:outline-none focus:ring-1 focus:ring-[#263D30] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#263D30] hover:bg-[#C87551] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
