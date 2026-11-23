import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, Truck, AlertCircle, CheckCircle2, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { siteBrand } from '../data/siteData';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    totalItemsCount,
    subtotal,
    mealsUntilFreeDelivery,
    mealsUntilMinimum,
    isFreeDeliveryEligible,
    isMinimumReached,
    minOrderMeals,
    freeDeliveryThreshold,
    getCheckoutUrl
  } = useCart();

  const handleCheckoutClick = (e) => {
    if (!isMinimumReached) {
      e.preventDefault();
      return;
    }
    // Proceed to official Shopify checkout permalink
    const checkoutUrl = getCheckoutUrl();
    window.location.href = checkoutUrl;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#252721]/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#F7F4EC] shadow-2xl flex flex-col justify-between border-l border-[#263D30]/15"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-[#263D30]/10 flex items-center justify-between bg-white/60 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-[#263D30]" />
                  <h2 className="font-serif text-2xl text-[#263D30] font-normal">Your Bag</h2>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#263D30] text-[#F7F4EC]">
                    {totalItemsCount}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#252721]/70 hover:text-[#C87551] rounded-full hover:bg-[#EFE9DC] transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery & Minimum Threshold Meters */}
              {cart.length > 0 && (
                <div className="bg-[#EFE9DC]/80 p-4 border-b border-[#263D30]/10 space-y-3">
                  {/* 5-Meal Minimum Tracker */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-[#263D30] mb-1.5">
                      <span className="flex items-center gap-1.5">
                        {isMinimumReached ? (
                          <CheckCircle2 className="w-4 h-4 text-[#263D30]" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-[#C87551]" />
                        )}
                        {isMinimumReached ? (
                          <span className="font-semibold text-[#263D30]">Minimum order reached ({minOrderMeals} meals)</span>
                        ) : (
                          <span>Add <strong className="text-[#C87551]">{mealsUntilMinimum} more</strong> for minimum order (5 meals)</span>
                        )}
                      </span>
                      <span className="font-semibold">{Math.min(totalItemsCount, minOrderMeals)} / {minOrderMeals}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#263D30]/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isMinimumReached ? 'bg-[#263D30]' : 'bg-[#C87551]'
                        }`}
                        style={{ width: `${Math.min(100, (totalItemsCount / minOrderMeals) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* 10-Meal Free Delivery Tracker */}
                  <div className="pt-2 border-t border-[#263D30]/10">
                    <div className="flex items-center justify-between text-xs font-medium text-[#263D30] mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-[#C87551]" />
                        {isFreeDeliveryEligible ? (
                          <span className="font-semibold text-[#263D30]">🎉 FREE Sydney Delivery Unlocked!</span>
                        ) : (
                          <span>Add <strong className="text-[#C87551]">{mealsUntilFreeDelivery} more</strong> for FREE delivery</span>
                        )}
                      </span>
                      <span className="font-semibold">{Math.min(totalItemsCount, freeDeliveryThreshold)} / {freeDeliveryThreshold}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#263D30]/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#A5AD91] transition-all duration-500 rounded-full"
                        style={{ width: `${Math.min(100, (totalItemsCount / freeDeliveryThreshold) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-[#263D30]/10">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#EFE9DC] flex items-center justify-center text-[#263D30] mb-4 shadow-sm">
                      <ShoppingBag className="w-8 h-8 opacity-60" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#263D30] mb-2 font-normal">Your bag is empty</h3>
                    <p className="text-xs text-[#252721]/70 max-w-xs mb-6">
                      Explore this week's drop or full menu to build your fresh Sunday box.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="px-7 py-3 bg-[#263D30] text-[#F7F4EC] rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-[#C87551] transition-colors cursor-pointer shadow-sm"
                    >
                      Start Exploring
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.key} className="pt-4 first:pt-0 flex gap-4">
                        <img
                          src={item.image || 'https://lunchesbylily.com.au/cdn/shop/files/Hero-banner-full-image.png'}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-2xl bg-[#EFE9DC] shrink-0 border border-[#263D30]/10 shadow-sm"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-serif text-base text-[#263D30] leading-snug font-normal line-clamp-1">
                                {item.title}
                              </h4>
                              <button
                                type="button"
                                onClick={() => removeItem(item.key)}
                                className="text-[#252721]/40 hover:text-[#C87551] transition-colors p-1 -mr-1 cursor-pointer"
                                aria-label={`Remove ${item.title}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {item.variantTitle && (
                              <p className="text-[11px] text-[#252721]/70 mt-0.5">
                                {item.variantTitle}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-[#263D30]/20 rounded-full bg-white px-2 py-0.5 shadow-sm">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.key, -1)}
                                className="p-1 text-[#252721]/70 hover:text-[#263D30] transition-colors cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-semibold text-[#263D30]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.key, 1)}
                                className="p-1 text-[#252721]/70 hover:text-[#263D30] transition-colors cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-sm font-serif font-bold text-[#263D30]">
                              ${(item.price * item.quantity).toFixed(2)} AUD
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer / Checkout */}
              {cart.length > 0 && (
                <div className="p-5 sm:p-6 border-t border-[#263D30]/10 bg-white/80 backdrop-blur-md space-y-4">
                  <div className="space-y-1.5 text-xs text-[#252721]/80">
                    <div className="flex justify-between items-center text-sm font-bold text-[#263D30]">
                      <span>Subtotal</span>
                      <span className="font-serif text-lg">${subtotal.toFixed(2)} AUD</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-[#252721]/60">
                      <span>Delivery</span>
                      <span>{isFreeDeliveryEligible ? <strong className="text-[#263D30]">FREE</strong> : 'Calculated at checkout'}</span>
                    </div>
                    <p className="text-[10px] text-[#252721]/60 leading-relaxed pt-1">
                      {siteBrand.gstNotice}
                    </p>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    type="button"
                    onClick={handleCheckoutClick}
                    disabled={!isMinimumReached}
                    className={`w-full py-4 px-6 rounded-full font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-md ${
                      isMinimumReached
                        ? 'bg-[#263D30] hover:bg-[#C87551] text-[#F7F4EC] hover:shadow-xl cursor-pointer'
                        : 'bg-[#252721]/20 text-[#252721]/50 cursor-not-allowed'
                    }`}
                  >
                    <span>
                      {isMinimumReached
                        ? 'Proceed to Checkout'
                        : `Add ${mealsUntilMinimum} more meal${mealsUntilMinimum > 1 ? 's' : ''} to checkout`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#252721]/60 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-[#C87551]" />
                      <span>Delivered chilled every Sunday</span>
                    </span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="hover:text-[#C87551] underline transition-colors cursor-pointer"
                    >
                      Clear bag
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
