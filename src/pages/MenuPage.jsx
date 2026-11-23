import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Truck, ShieldCheck, ArrowUpDown, Sparkles, Filter } from 'lucide-react';
import { productsData, siteBrand } from '../data/siteData';
import ProductCard from '../components/ProductCard';

export default function MenuPage() {
  const { category } = useParams();
  const location = useLocation();

  // Determine initial filter based on route
  const getInitialTab = () => {
    const path = location.pathname;
    if (path.includes('this-weeks') || path.includes('sunday')) return 'this-week';
    if (category) {
      const c = category.toLowerCase();
      if (c === 'full-menu' || c === 'all' || c === 'frontpage') return 'all';
      if (c.includes('this-week') || c.includes('sunday') || c.includes('drop')) return 'this-week';
      return c;
    }
    return 'all';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    setActiveTab(getInitialTab());
    window.scrollTo(0, 0);
  }, [location.pathname, category]);

  const tabs = [
    { id: 'all', label: 'Full Menu', count: productsData.length },
    { id: 'this-week', label: "This Week's Drop", count: productsData.filter(p => p.isThisWeek).length },
    { id: 'chicken', label: 'Chicken', count: productsData.filter(p => p.proteinType === 'Chicken').length },
    { id: 'beef', label: 'Beef', count: productsData.filter(p => p.proteinType === 'Beef').length },
    { id: 'lamb', label: 'Lamb', count: productsData.filter(p => p.proteinType === 'Lamb').length },
    { id: 'seafood', label: 'Seafood', count: productsData.filter(p => p.proteinType === 'Seafood').length },
    { id: 'breakfast', label: 'Breakfast & Snacks', count: productsData.filter(p => p.proteinType === 'Breakfast' || p.proteinType === 'Snacks').length }
  ];

  // Filter products
  let filtered = productsData.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'this-week') return p.isThisWeek;
    if (activeTab === 'chicken') return p.proteinType === 'Chicken';
    if (activeTab === 'beef') return p.proteinType === 'Beef';
    if (activeTab === 'lamb') return p.proteinType === 'Lamb';
    if (activeTab === 'seafood') return p.proteinType === 'Seafood';
    if (activeTab === 'breakfast') return p.proteinType === 'Breakfast' || p.proteinType === 'Snacks';
    return true;
  });

  // Sort products
  if (sortBy === 'protein-desc') {
    filtered = [...filtered].sort((a, b) => {
      const pA = parseFloat(a.macros?.protein) || 0;
      const pB = parseFloat(b.macros?.protein) || 0;
      return pB - pA;
    });
  } else if (sortBy === 'cal-asc') {
    filtered = [...filtered].sort((a, b) => {
      const cA = parseFloat(a.macros?.calories) || 9999;
      const cB = parseFloat(b.macros?.calories) || 9999;
      return cA - cB;
    });
  } else if (sortBy === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const featuredMeal = filtered.find(p => p.isThisWeek) || filtered[0];
  const remainingMeals = filtered.filter(p => p.id !== (featuredMeal ? featuredMeal.id : null));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Editorial Page Header */}
      <div className="space-y-6 pb-6 border-b border-[#263D30]/15">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C87551]">
            <span>Lunches By Lily</span>
            <span>•</span>
            <span>Sydney Culinary Journal</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#C87551]/10 text-[#C87551] border border-[#C87551]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Orders Close Thursday 7:00 PM</span>
          </div>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#263D30] font-normal tracking-tight">
            {activeTab === 'this-week' ? "This Week's Set Menu" : "The Full Menu"}
          </h1>
          <p className="text-base sm:text-lg text-[#252721]/75 font-normal leading-relaxed">
            Every meal is handcrafted from scratch in Sydney using 100% Halal certified meats and fresh market vegetables. Delivered chilled, never frozen.
          </p>
        </div>

        {/* Ordering Notice Banner */}
        <div className="inline-flex flex-wrap items-center gap-x-6 gap-y-2 p-3.5 sm:px-5 rounded-2xl bg-[#EFE9DC]/80 border border-[#263D30]/10 text-xs sm:text-sm text-[#263D30] font-medium">
          <span className="flex items-center gap-2 font-bold">
            <Clock className="w-4 h-4 text-[#C87551]" />
            Order Cut-off: Thursday 7:00 PM
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#263D30]" />
            Sunday delivery & free Auburn pickup
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-2 text-[#C87551] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            Minimum 5 meals per order
          </span>
        </div>
      </div>

      {/* Tabs & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#263D30] text-[#F7F4EC] shadow-sm'
                    : 'bg-[#EFE9DC]/75 text-[#252721]/80 hover:bg-[#EFE9DC] hover:text-[#252721]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-1.5 text-[11px] ${isActive ? 'text-[#A5AD91]' : 'opacity-60'}`}>
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2.5 self-end md:self-auto shrink-0">
          <ArrowUpDown className="w-4 h-4 text-[#252721]/60" />
          <span className="text-xs text-[#252721]/70 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs bg-[#EFE9DC]/80 border border-[#263D30]/15 rounded-full px-3.5 py-2 text-[#252721] font-medium focus:outline-none focus:ring-1 focus:ring-[#263D30] cursor-pointer"
          >
            <option value="default">Featured / Default</option>
            <option value="protein-desc">Highest Protein</option>
            <option value="cal-asc">Lowest Calories</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + sortBy}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-3xl border border-[#263D30]/10">
              <p className="font-serif text-2xl text-[#263D30]">No meals found in this category.</p>
              <button
                onClick={() => setActiveTab('all')}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#263D30] text-white text-xs font-semibold uppercase tracking-wider"
              >
                View Full Menu
              </button>
            </div>
          ) : (
            <>
              {/* If viewing All or This-Week, hero the first meal */}
              {(activeTab === 'all' || activeTab === 'this-week') && featuredMeal ? (
                <>
                  <div className="mb-6">
                    <ProductCard product={featuredMeal} featured={true} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {remainingMeals.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Guarantee Banner */}
      <div className="mt-16 p-8 rounded-3xl bg-[#263D30] text-[#F7F4EC] grid grid-cols-1 md:grid-cols-3 gap-8 items-center border border-[#263D30]">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C87551]">Fresh Guarantee</p>
          <h3 className="font-serif text-2xl font-normal">Cooked Fresh Every Week</h3>
          <p className="text-xs text-[#EFE9DC]/80">Never frozen or pre-packaged from a warehouse. Made by Lily in small batches.</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C87551]">Halal Certified</p>
          <h3 className="font-serif text-2xl font-normal">100% Halal Meats</h3>
          <p className="text-xs text-[#EFE9DC]/80">Every chicken, beef, and lamb dish is prepared using certified halal meats.</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C87551]">Sydney Wide Delivery</p>
          <h3 className="font-serif text-2xl font-normal">Delivered to Your Door</h3>
          <p className="text-xs text-[#EFE9DC]/80">Chilled courier delivery across Greater Sydney every Sunday. Free delivery on 10+ meals.</p>
        </div>
      </div>
    </div>
  );
}
