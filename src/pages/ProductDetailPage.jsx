import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check, Clock, Truck, ShieldCheck, Flame, ChevronDown, ArrowLeft, ArrowRight, Share2, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { productsData, siteBrand, faqList } from '../data/siteData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const reviewsCountMap = {
  'beef-ragu-with-mashed-sweet-potato': 6,
  'new-chicken-chipotle-wrap': 6,
  '3-pack-high-protein-milo-overnight-weet-bix': 1,
  'peanut-butter-bliss-protein-balls': 3,
  'cajun-chicken-with-sauteed-veggies-baked-potatoes': 3,
  'slow-cooked-beef-bolognese-with-protein-spaghetti': 2,
  'tuscan-style-chicken-potatoes': 4
};

export default function ProductDetailPage() {
  const { handle } = useParams();
  const { addToCart } = useCart();

  const product = productsData.find((p) => p.handle === handle) || productsData[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  useEffect(() => {
    setActiveImageIdx(0);
    setSelectedVariantIdx(0);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [handle]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl text-[#263D30]">Product not found</h2>
        <Link to="/collections/full-menu" className="mt-4 inline-block text-sm underline text-[#C87551]">
          Back to Menu
        </Link>
      </div>
    );
  }

  const variant = product.variants[selectedVariantIdx] || product.variants[0];
  const isAvailable = variant ? variant.available : true;

  const handleAddToCart = () => {
    addToCart(product, variant, quantity, {
      size: variant.option1 || '',
      deliveryDay: variant.option2 || 'Sunday'
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedMeals = productsData
    .filter((p) => p.id !== product.id && (p.proteinType === product.proteinType || p.isThisWeek))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
      {/* Editorial Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#252721]/60">
        <Link to="/" className="hover:text-[#263D30] transition-colors">Home</Link>
        <span>/</span>
        <Link to="/collections/full-menu" className="hover:text-[#263D30] transition-colors">Menu</Link>
        <span>/</span>
        <span className="text-[#263D30] font-medium truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Product Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Image Gallery with Editorial Framing */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#EFE9DC] border border-[#263D30]/10 shadow-soft">
            <motion.img
              key={activeImageIdx}
              initial={{ opacity: 0.7, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-center"
            />
            {product.isThisWeek && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#C87551] text-white shadow-md backdrop-blur-md">
                <Flame className="w-3.5 h-3.5" />
                This Week's Menu Drop
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    activeImageIdx === idx
                      ? 'border-[#263D30] scale-95 shadow-sm'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Variant Selection (Sticky on desktop) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C87551]">
              <span>{product.proteinType}</span>
              <span>•</span>
              <span>Fresh Sydney Delivery</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#263D30] font-normal leading-tight">
              {product.title}
            </h1>

            {/* Social Proof Star Rating - only for products with verified Judge.me reviews */}
            {reviewsCountMap[product.handle] ? (
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-[#C87551]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C87551]" />
                  ))}
                </div>
                <span className="font-semibold text-xs sm:text-sm text-[#263D30]">5.00 ★</span>
                <span className="text-[#252721]/40">•</span>
                <span className="text-xs text-[#252721]/70 underline decoration-[#A5AD91]">
                  {reviewsCountMap[product.handle]} verified customer reviews
                </span>
              </div>
            ) : null}
          </div>

          {/* Pricing & GST Notice */}
          <div className="pt-2 border-t border-[#263D30]/10">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-serif text-[#263D30]">
                ${variant.price.toFixed(2)} AUD
              </span>
              <span className="text-xs text-[#252721]/60 font-medium">Excl. GST</span>
            </div>
            <p className="text-[11px] text-[#252721]/60 mt-1">
              {siteBrand.gstNotice}
            </p>
          </div>

          {/* Variants Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-2.5 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#263D30]">
                Select Option / Portion:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                      selectedVariantIdx === idx
                        ? 'bg-[#263D30] text-[#F7F4EC] border-[#263D30] shadow-sm'
                        : 'bg-white text-[#252721] border-[#263D30]/20 hover:border-[#263D30]/40'
                    }`}
                  >
                    <span>{v.title}</span>
                    <span className="ml-2 opacity-70">${v.price.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-3 pt-4 border-t border-[#263D30]/10">
            <div className="flex items-center gap-3.5">
              {/* Quantity */}
              <div className="flex items-center border border-[#263D30]/25 rounded-full bg-white px-3 py-1.5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-[#252721]/70 hover:text-[#263D30] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-[#263D30]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-[#252721]/70 hover:text-[#263D30] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!isAvailable}
                className={`flex-1 py-3.5 px-6 rounded-full font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  !isAvailable
                    ? 'bg-[#252721]/20 text-[#252721]/50 cursor-not-allowed'
                    : added
                    ? 'bg-[#263D30] text-[#F7F4EC]'
                    : 'bg-[#C87551] hover:bg-[#B36341] text-white hover:shadow-lg'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : !isAvailable ? (
                  <span>Sold Out</span>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Bag • ${(variant.price * quantity).toFixed(2)} AUD</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-[#252721]/60 text-center font-medium">
              Minimum 5 meals required per weekly order.
            </p>
          </div>

          {/* Delivery Assurance Badges */}
          <div className="p-4 rounded-2xl bg-[#EFE9DC]/75 border border-[#263D30]/10 space-y-2 text-xs text-[#252721]/80 font-medium">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C87551] shrink-0" />
              <span>Order by Thursday 7:00 PM for Sunday Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#263D30] shrink-0" />
              <span>Free Delivery on 10+ meals across Greater Sydney</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A5AD91] shrink-0" />
              <span>100% Halal certified meats • Small batch cooking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Nutritional Macros Breakdown Banner */}
      {product.macros && (product.macros.calories || product.macros.protein) && (
        <div className="p-8 sm:p-10 rounded-3xl bg-[#263D30] text-[#F7F4EC] space-y-6 shadow-xl border border-[#263D30]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F7F4EC]/15 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#C87551]">Macro Profile</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal">Approximate Nutritional Breakdown</h3>
            </div>
            <span className="text-xs text-[#A5AD91] font-medium">Values per serving (~300-350g)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {product.macros.calories && (
              <div className="p-5 rounded-2xl bg-[#F7F4EC]/10 border border-[#F7F4EC]/10 text-center">
                <span className="block text-xs uppercase tracking-wider text-[#A5AD91] mb-1 font-semibold">Calories</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4EC]">{product.macros.calories}</span>
                <span className="block text-[11px] text-[#A5AD91] mt-0.5">kcal</span>
              </div>
            )}
            {product.macros.protein && (
              <div className="p-5 rounded-2xl bg-[#C87551]/20 border border-[#C87551]/30 text-center">
                <span className="block text-xs uppercase tracking-wider text-[#C87551] mb-1 font-bold">Protein</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-white">{product.macros.protein}</span>
                <span className="block text-[11px] text-[#EFE9DC] mt-0.5">High protein</span>
              </div>
            )}
            {product.macros.fats && (
              <div className="p-5 rounded-2xl bg-[#F7F4EC]/10 border border-[#F7F4EC]/10 text-center">
                <span className="block text-xs uppercase tracking-wider text-[#A5AD91] mb-1 font-semibold">Fats</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4EC]">{product.macros.fats}</span>
                <span className="block text-[11px] text-[#A5AD91] mt-0.5">Healthy fats</span>
              </div>
            )}
            {product.macros.carbs && (
              <div className="p-5 rounded-2xl bg-[#F7F4EC]/10 border border-[#F7F4EC]/10 text-center">
                <span className="block text-xs uppercase tracking-wider text-[#A5AD91] mb-1 font-semibold">Carbs</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4EC]">{product.macros.carbs}</span>
                <span className="block text-[11px] text-[#A5AD91] mt-0.5">Complex carbs</span>
              </div>
            )}
            {product.macros.fibre && (
              <div className="p-5 rounded-2xl bg-[#F7F4EC]/10 border border-[#F7F4EC]/10 text-center col-span-2 sm:col-span-1">
                <span className="block text-xs uppercase tracking-wider text-[#A5AD91] mb-1 font-semibold">Fibre</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4EC]">{product.macros.fibre}</span>
                <span className="block text-[11px] text-[#A5AD91] mt-0.5">Dietary fibre</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Description, Ingredients & Allergens */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-4">
        {/* Full Original Description */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#263D30]">About This Meal</h3>
          <div
            className="prose prose-sm sm:prose-base max-w-none text-[#252721]/80 leading-relaxed space-y-3"
            dangerouslySetInnerHTML={{ __html: product.body_html }}
          />
        </div>

        {/* Sidebar: Allergens, Ingredients, Storage */}
        <div className="lg:col-span-4 space-y-6">
          {product.allergens && (
            <div className="p-6 rounded-2xl bg-[#EFE9DC]/75 border border-[#263D30]/10 space-y-2">
              <h4 className="font-serif text-lg text-[#263D30]">Allergens</h4>
              <p className="text-xs sm:text-sm text-[#252721]/80 leading-relaxed font-medium">
                {product.allergens}
              </p>
            </div>
          )}

          {product.ingredients && (
            <div className="p-6 rounded-2xl bg-[#EFE9DC]/75 border border-[#263D30]/10 space-y-2">
              <h4 className="font-serif text-lg text-[#263D30]">Ingredients</h4>
              <p className="text-xs sm:text-sm text-[#252721]/80 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}

          <div className="p-6 rounded-2xl bg-white border border-[#263D30]/10 space-y-2 text-xs sm:text-sm text-[#252721]/75">
            <h4 className="font-serif text-lg text-[#263D30]">Fresh Storage & Heating</h4>
            <p className="leading-relaxed">Keep refrigerated under 5°C. Enjoy fresh within 7 days from delivery date. Microwave lid loosely ajar on high for 2–3 minutes or until piping hot.</p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="pt-10 border-t border-[#263D30]/10 max-w-3xl">
        <h3 className="font-serif text-2xl sm:text-3xl text-[#263D30] mb-6">Frequently Asked Questions</h3>
        <div className="divide-y divide-[#263D30]/15">
          {faqList.slice(0, 5).map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 py-1.5 focus:outline-none group cursor-pointer"
                >
                  <span className="font-serif text-lg text-[#263D30] group-hover:text-[#C87551] transition-colors">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#263D30] transition-transform duration-300 ${
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
                      <p className="pt-2 text-sm text-[#252721]/80 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Related Meals Grid */}
      {relatedMeals.length > 0 && (
        <div className="pt-12 border-t border-[#263D30]/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#263D30]">You Might Also Like</h3>
            <Link to="/collections/full-menu" className="text-xs font-semibold text-[#C87551] hover:underline uppercase tracking-wider">
              View All Meals
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedMeals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
