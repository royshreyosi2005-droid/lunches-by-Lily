import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ArrowRight, Clock, Truck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { siteBrand } from '../data/siteData';

export default function Navbar({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItemsCount, setIsCartOpen, subtotal } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "This Week's Set Menu", path: "/pages/this-weeks-set-menu", highlight: true },
    { name: "Full Menu", path: "/collections/full-menu" },
    { name: "Delivery Info", path: "/pages/delivery-info" },
    { name: "About Us", path: "/pages/about-us" },
    { name: "FAQs", path: "/pages/faqs" },
    { name: "Contact", path: "/pages/contact" }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Editorial Announcement Bar */}
      <div className="bg-[#263D30] text-[#F7F4EC] text-[10px] sm:text-[11px] tracking-widest uppercase py-2 px-4 border-b border-[#F7F4EC]/10 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 mx-auto sm:mx-0 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C87551] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C87551]"></span>
            </span>
            <span>{siteBrand.announcement}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-[#A5AD91]">
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#C87551]" />
              Cut-off: Thursday 7:00 PM
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-[#C87551]" />
              Sunday & Wednesday Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-ivory shadow-soft border-b border-[#263D30]/10 py-3.5'
            : 'bg-[#F7F4EC] border-b border-[#263D30]/8 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Controls Left */}
            <div className="flex items-center gap-1 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#263D30] hover:text-[#C87551] transition-colors focus:outline-none cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 stroke-[1.75]" />
              </button>
              <button
                type="button"
                onClick={onOpenSearch}
                className="p-2 text-[#263D30] hover:text-[#C87551] transition-colors focus:outline-none cursor-pointer"
                aria-label="Search meals"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>
            </div>

            {/* Brand Logo: Exact Original "LUNCHESbylily." Image Asset */}
            <div className="flex items-center justify-center lg:justify-start">
              <Link to="/" className="block group select-none py-1" aria-label="Lunches By Lily - Home">
                <img
                  src={siteBrand.logoBlack || "/logo-black.png"}
                  alt="Lunches By Lily"
                  className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-300 group-hover:opacity-85"
                  style={{ aspectRatio: '2975 / 631' }}
                  width="170"
                  height="36"
                  fetchPriority="high"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative text-[12px] font-medium tracking-wider uppercase transition-colors py-1 group ${
                      active
                        ? 'text-[#263D30] font-semibold'
                        : 'text-[#252721]/75 hover:text-[#C87551]'
                    }`}
                  >
                    <span>{link.name}</span>
                    {active ? (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C87551] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C87551] rounded-full group-hover:w-full transition-all duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions: Search, Menu CTA & Bag */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              <button
                type="button"
                onClick={onOpenSearch}
                className="hidden lg:inline-flex items-center gap-2.5 px-3.5 py-1.5 text-xs text-[#252721]/70 hover:text-[#263D30] hover:bg-[#EFE9DC]/70 rounded-full border border-[#263D30]/15 transition-all cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5 text-[#263D30]" />
                <span className="text-[11px] tracking-wide font-medium">Search meals...</span>
                <kbd className="text-[10px] bg-[#F7F4EC] border border-[#263D30]/20 rounded px-1.5 py-0.5 text-[#252721]/50 font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Order Menu CTA Pill */}
              <Link
                to="/pages/this-weeks-set-menu"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase bg-[#263D30] text-[#F7F4EC] rounded-full hover:bg-[#C87551] transition-all duration-300 shadow-sm hover:shadow hover:-translate-y-0.5"
              >
                <span>Order Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3 py-2 sm:px-3.5 sm:py-2 rounded-full bg-[#EFE9DC] hover:bg-[#263D30] text-[#263D30] hover:text-[#F7F4EC] transition-all duration-300 focus:outline-none shadow-sm cursor-pointer group"
                aria-label={`Open shopping cart with ${totalItemsCount} items`}
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-105 transition-transform stroke-[2]" />
                <span className="text-xs font-semibold tabular-nums">
                  {totalItemsCount}
                </span>
                {totalItemsCount > 0 && subtotal > 0 && (
                  <span className="hidden md:inline-block text-[11px] font-bold border-l border-current/20 pl-2">
                    ${subtotal.toFixed(2)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Editorial Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#252721]/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 max-w-sm w-full bg-[#F7F4EC] shadow-2xl z-50 flex flex-col justify-between p-6 overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#263D30]/10">
                  <Link to="/" className="block select-none py-1" onClick={() => setMobileMenuOpen(false)} aria-label="Lunches By Lily - Home">
                    <img
                      src={siteBrand.logoBlack || "/logo-black.png"}
                      alt="Lunches By Lily"
                      className="h-7 w-auto object-contain"
                      style={{ aspectRatio: '2975 / 631' }}
                      width="133"
                      height="28"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#252721] hover:text-[#C87551] rounded-full hover:bg-[#EFE9DC] transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="py-6 space-y-1">
                  {navLinks.map((link) => {
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                          active
                            ? 'bg-[#263D30] text-[#F7F4EC] font-semibold'
                            : 'text-[#252721] hover:bg-[#EFE9DC]'
                        }`}
                      >
                        <span className="font-serif text-xl tracking-tight">
                          {link.name}
                        </span>
                        <ArrowRight className={`w-4 h-4 ${active ? 'text-[#C87551]' : 'text-[#252721]/30'}`} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Menu Footer Info */}
              <div className="pt-6 border-t border-[#263D30]/10 space-y-4">
                <div className="text-xs text-[#252721]/70 space-y-1.5 font-normal">
                  <p className="font-serif text-base text-[#263D30]">Lunches By Lily Sydney</p>
                  <p>Order cut-off: <strong>Thursday 7:00 PM</strong></p>
                  <p>Fresh delivery: <strong>Sunday & Wednesday</strong></p>
                  <p>Contact: <a href={`mailto:${siteBrand.email}`} className="underline text-[#C87551]">{siteBrand.email}</a></p>
                </div>
                <Link
                  to="/pages/this-weeks-set-menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 bg-[#C87551] text-white text-center rounded-full font-semibold tracking-wider uppercase text-xs flex items-center justify-center gap-2 hover:bg-[#AC5D3C] transition-colors shadow-sm"
                >
                  <span>View This Week's Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
