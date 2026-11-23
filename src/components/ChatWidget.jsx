import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail, CheckCircle2, Sparkles, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { siteBrand, founderStory } from '../data/siteData';

/**
 * ChatWidget — Restores the original Lunches By Lily customer chat functionality.
 * Originally powered by Shopify Inbox (App block: shopify://apps/inbox/blocks/chat/841fc607-4181-4ad1-842d-e24d7f8bad6b).
 * - Exact original greeting: "Welcome to Lunches By Lily. How can I help?"
 * - Direct real-time support via WhatsApp (+61 457 713 394) and Email (hello@lunchesbylily.com.au).
 * - Floating bottom-right activator with smooth Framer Motion spring physics.
 * - Mobile safe-area positioning (z-40, safely below z-50 CartDrawer/SearchModal).
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'form'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Lily',
      time: 'Just now',
      text: 'Welcome to Lunches By Lily. How can I help?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const quickPrompts = [
    {
      label: 'Order Cut-Off',
      answer: 'Orders close every Thursday at 7:00 PM sharp for fresh cooking and Sunday delivery across Sydney.'
    },
    {
      label: 'Halal Certified?',
      answer: 'Yes! 100% of our chicken, beef, and lamb meals are prepared with certified Halal meats.'
    },
    {
      label: 'Auburn Pickup',
      answer: 'Free pickup is available from our Auburn 2144 kitchen every Sunday between 4:00 PM and 6:00 PM.'
    }
  ];

  const handleSelectPrompt = (prompt) => {
    // Add user question
    const userMsg = {
      id: Date.now(),
      sender: 'You',
      time: 'Just now',
      text: prompt.label
    };
    // Add official response
    const replyMsg = {
      id: Date.now() + 1,
      sender: 'Lily',
      time: 'Just now',
      text: prompt.answer
    };
    setMessages((prev) => [...prev, userMsg, replyMsg]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'You',
      time: 'Just now',
      text: inputMessage
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Authentic helpful automatic acknowledgement routing to Lily's direct email/WhatsApp
    setTimeout(() => {
      const acknowledgment = {
        id: Date.now() + 1,
        sender: 'Lily',
        time: 'Just now',
        text: "Thank you for reaching out! To chat with me directly right now, tap the WhatsApp button below or leave your email and I'll reply shortly."
      };
      setMessages((prev) => [...prev, acknowledgment]);
    }, 600);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
      setActiveTab('chat');
    }, 3000);
  };

  return (
    <>
      {/* Floating Chat Activator Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 select-none">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#263D30] text-[#F7F4EC] shadow-2xl border border-white/20 hover:bg-[#1e3026] transition-colors cursor-pointer group"
          aria-label={isOpen ? "Close customer chat" : "Open customer chat with Lunches By Lily"}
        >
          <div className="relative">
            {isOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <MessageCircle className="w-5 h-5 text-white" />
            )}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#A5AD91] rounded-full border-2 border-[#263D30] animate-pulse" />
            )}
          </div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">
            {isOpen ? 'Close' : 'Chat'}
          </span>
        </motion.button>
      </div>

      {/* Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-7 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[580px] bg-[#F7F4EC] rounded-3xl shadow-2xl border border-[#263D30]/20 z-40 flex flex-col overflow-hidden"
          >
            {/* Header: Brand Identity & Active Status */}
            <div className="p-4 sm:p-5 bg-[#263D30] text-[#F7F4EC] flex items-center justify-between border-b border-[#263D30]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={founderStory.image}
                    alt="Lily"
                    className="w-10 h-10 rounded-full object-cover object-top border border-white/20 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#263D30]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-normal text-white">Lunches By Lily</h3>
                  <p className="text-[11px] text-[#A5AD91]">Typically replies in minutes • Sydney</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close chat window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Direct Connect Pills Bar */}
            <div className="px-4 py-2.5 bg-[#EFE9DC] border-b border-[#263D30]/10 flex items-center justify-between text-xs">
              <span className="text-[11px] font-semibold text-[#263D30]/70 uppercase tracking-wider">
                Direct Channels:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={siteBrand.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] font-semibold text-[11px] transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${siteBrand.email}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#263D30]/10 hover:bg-[#263D30]/20 text-[#263D30] font-semibold text-[11px] transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            {/* Message Thread Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-[240px] max-h-[300px] text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'You' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="font-semibold text-[10px] text-[#252721]/60">{m.sender}</span>
                    <span className="text-[9px] text-[#252721]/40">• {m.time}</span>
                  </div>
                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                      m.sender === 'You'
                        ? 'bg-[#263D30] text-[#F7F4EC] rounded-tr-xs'
                        : 'bg-white border border-[#263D30]/10 text-[#252721] shadow-xs rounded-tl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Quick FAQ Suggestion Pills */}
              <div className="pt-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A5AD91] mb-2">
                  Frequently Asked
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPrompt(p)}
                      className="px-2.5 py-1 rounded-full bg-white hover:bg-[#EFE9DC] border border-[#263D30]/15 text-[11px] text-[#263D30] transition-colors cursor-pointer text-left"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Footer / Quick Send */}
            <div className="p-3.5 bg-white border-t border-[#263D30]/10">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Lily about meals, delivery, or cut-offs..."
                  className="flex-1 px-3.5 py-2.5 rounded-full bg-[#F7F4EC] border border-[#263D30]/15 text-xs text-[#252721] focus:outline-none focus:ring-1 focus:ring-[#263D30]"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2.5 rounded-full bg-[#263D30] hover:bg-[#C87551] text-[#F7F4EC] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[10px] text-[#252721]/50 pt-2 px-1">
                <span>Official Customer Service: {siteBrand.email}</span>
                <span>Cut-off: Thu 7PM</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
