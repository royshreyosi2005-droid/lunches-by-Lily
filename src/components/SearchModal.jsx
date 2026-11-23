import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Flame, ArrowRight } from 'lucide-react';
import { productsData } from '../data/siteData';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const categories = ['All', 'Chicken', 'Beef', 'Lamb', 'Seafood', 'Breakfast', 'Snacks'];

  const filteredProducts = productsData.filter((p) => {
    const matchesCat = activeCategory === 'All' || p.proteinType === activeCategory;
    const q = query.toLowerCase().trim();
    if (!q) return matchesCat;

    const inTitle = p.title.toLowerCase().includes(q);
    const inTags = p.tags?.some(t => t.toLowerCase().includes(q));
    const inDesc = p.body_html?.toLowerCase().includes(q);
    const inIngredients = p.ingredients?.toLowerCase().includes(q);
    return matchesCat && (inTitle || inTags || inDesc || inIngredients);
  });

  const handleSelectProduct = (handle) => {
    navigate(`/products/${handle}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#252721]/70 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-[#F7F4EC] rounded-3xl shadow-2xl overflow-hidden border border-[#263D30]/20 z-10 flex flex-col max-h-[82vh]"
          >
            {/* Search Header Input */}
            <div className="p-4 sm:p-5 border-b border-[#263D30]/10 flex items-center gap-3.5 bg-white/80 backdrop-blur-md">
              <Search className="w-5 h-5 text-[#263D30]/70 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search meals, macros, ingredients, proteins..."
                className="flex-1 bg-transparent border-none text-[#252721] placeholder-[#252721]/40 text-base focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-xs text-[#252721]/50 hover:text-[#252721] rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-[#252721]/60 hover:text-[#C87551] rounded-full hover:bg-[#EFE9DC] transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filters */}
            <div className="px-4 py-2.5 bg-[#EFE9DC]/75 border-b border-[#263D30]/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#263D30] text-[#F7F4EC]'
                      : 'bg-white/70 text-[#252721]/80 hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#263D30]/10">
              {filteredProducts.length === 0 ? (
                <div className="py-14 text-center text-[#252721]/60 space-y-2">
                  <p className="font-serif text-2xl text-[#263D30]">No meals found</p>
                  <p className="text-xs">Try searching for "Chicken", "Beef Ragu", "Overnight Weet-Bix" or "Salmon"</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A5AD91]">
                    Products ({filteredProducts.length})
                  </p>
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.handle)}
                      className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-white/80 transition-colors cursor-pointer group"
                    >
                      <img
                        src={p.images[0] || 'https://lunchesbylily.com.au/cdn/shop/files/Hero-banner-full-image.png'}
                        alt={p.title}
                        className="w-16 h-16 object-cover rounded-xl bg-[#EFE9DC] shrink-0 border border-[#263D30]/10 shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-base text-[#263D30] group-hover:text-[#C87551] transition-colors truncate font-normal">
                            {p.title}
                          </h4>
                          {p.macros?.protein && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EFE9DC] text-[#263D30] shrink-0">
                              {p.macros.protein} Prot
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#252721]/70 mt-1">
                          <span className="font-serif font-bold text-[#263D30]">${p.price.toFixed(2)} AUD</span>
                          <span>•</span>
                          <span>{p.proteinType}</span>
                          {p.macros?.calories && (
                            <>
                              <span>•</span>
                              <span>{p.macros.calories} kcal</span>
                            </>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#252721]/30 group-hover:text-[#C87551] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
