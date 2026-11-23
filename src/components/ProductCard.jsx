import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, Flame, Clock, Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const reviewsCountMap = {
  'beef-ragu-with-mashed-sweet-potato': 6,
  'new-chicken-chipotle-wrap': 6,
  '3-pack-high-protein-milo-overnight-weet-bix': 1,
  'peanut-butter-bliss-protein-balls': 3,
  'cajun-chicken-with-sauteed-veggies-baked-potatoes': 3,
  'slow-cooked-beef-bolognese-with-protein-spaghetti': 2,
  'tuscan-style-chicken-potatoes': 4
};

export default function ProductCard({ product, featured = false, staggerIndex = 0 }) {
  const { addToCart } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [addedRecently, setAddedRecently] = useState(false);

  const variant = product.variants[selectedVariantIdx] || product.variants[0];
  const isAvailable = variant ? variant.available : true;
  const reviewCount = reviewsCountMap[product.handle];

  // Determine tags & badges
  const hasNewTag = product.tags?.some(t => t.toLowerCase().includes('new')) || product.title.toLowerCase().includes('new');
  const hasSundayTag = product.tags?.some(t => t.toLowerCase().includes('sunday'));
  const proteinAmount = product.macros?.protein;
  const caloriesAmount = product.macros?.calories;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    addToCart(product, variant, 1, {
      size: variant.option1 || '',
      deliveryDay: variant.option2 || 'Sunday'
    });
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (staggerIndex % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col bg-[#F7F4EC] rounded-3xl overflow-hidden border border-[#263D30]/10 hover:border-[#263D30]/30 transition-all duration-500 hover:shadow-elevated ${
        featured ? 'md:col-span-2 lg:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Product Image Frame */}
      <Link
        to={`/products/${product.handle}`}
        className={`relative block overflow-hidden bg-[#EFE9DC] ${
          featured ? 'md:w-1/2 aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]'
        }`}
      >
        <img
          src={product.images[0] || 'https://lunchesbylily.com.au/cdn/shop/files/Hero-banner-full-image.png'}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badges Over Image */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 z-10">
          {hasNewTag && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-[#C87551] text-white rounded-full shadow-sm">
              <Flame className="w-3 h-3" />
              New
            </span>
          )}
          {hasSundayTag && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium tracking-wide bg-[#263D30]/90 text-[#F7F4EC] rounded-full backdrop-blur-sm">
              <Clock className="w-3 h-3 text-[#A5AD91]" />
              Sunday Delivery
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-[#F7F4EC]/95 text-[#263D30] rounded-full backdrop-blur-sm shadow-xs">
            {product.proteinType}
          </span>
        </div>

        {/* Macro Pill Floating Over Image */}
        {(proteinAmount || caloriesAmount) && (
          <div className="absolute bottom-3.5 left-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold bg-[#252721]/85 text-[#F7F4EC] rounded-full backdrop-blur-md shadow-sm border border-white/10">
              {proteinAmount && <span className="text-[#A5AD91]">{proteinAmount} Prot</span>}
              {proteinAmount && caloriesAmount && <span className="text-white/40">•</span>}
              {caloriesAmount && <span>{caloriesAmount} Cals</span>}
            </span>
          </div>
        )}
      </Link>

      {/* Product Details & Variant Selection */}
      <div className={`p-5 sm:p-6 flex flex-col justify-between flex-1 bg-white/40 ${featured ? 'md:w-1/2 md:p-8' : ''}`}>
        <div>
          {/* Category Tag & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#A5AD91]">
              Fresh Meal Prep
            </span>

            {/* Social Proof Stars */}
            {reviewCount ? (
              <div className="flex items-center gap-1 text-[11px] text-[#252721]/70 font-medium">
                <Star className="w-3.5 h-3.5 fill-[#C87551] text-[#C87551]" />
                <span className="font-semibold text-[#263D30]">5.0</span>
                <span className="text-[#252721]/40">({reviewCount})</span>
              </div>
            ) : null}
          </div>

          {/* Title */}
          <Link to={`/products/${product.handle}`} className="block group-hover:text-[#C87551] transition-colors">
            <h3 className={`font-serif text-[#263D30] font-normal leading-snug tracking-tight ${
              featured ? 'text-2xl sm:text-3xl' : 'text-xl'
            } line-clamp-2`}>
              {product.title}
            </h3>
          </Link>

          {/* Options / Variants pill selector */}
          {product.variants.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantIdx(idx)}
                  className={`px-3 py-1 text-[11px] rounded-full font-medium transition-all cursor-pointer ${
                    selectedVariantIdx === idx
                      ? 'bg-[#263D30] text-[#F7F4EC] shadow-xs'
                      : 'bg-[#EFE9DC]/80 text-[#252721]/75 hover:bg-[#EFE9DC]'
                  }`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom row: Price & Add Button */}
        <div className="mt-5 pt-3.5 border-t border-[#263D30]/10 flex items-center justify-between gap-3">
          <div>
            <div className="text-lg sm:text-xl font-bold text-[#263D30] tabular-nums leading-none">
              ${variant.price.toFixed(2)} <span className="text-[11px] font-normal text-[#252721]/60">AUD</span>
            </div>
            <span className="text-[10px] text-[#252721]/50 block mt-0.5">Excl. GST</span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!isAvailable}
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer ${
              !isAvailable
                ? 'bg-[#252721]/20 text-[#252721]/50 cursor-not-allowed'
                : addedRecently
                ? 'bg-[#263D30] text-[#F7F4EC] scale-95'
                : 'bg-[#C87551] hover:bg-[#AC5D3C] text-white hover:shadow hover:-translate-y-0.5'
            }`}
          >
            {addedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : !isAvailable ? (
              <span>Sold Out</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
