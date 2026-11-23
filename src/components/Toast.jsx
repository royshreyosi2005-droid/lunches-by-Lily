import React from 'react';
import { Check, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage, setToastMessage, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#263D30] text-[#F7F4EC] shadow-modal border border-[#A5AD91]/30 max-w-sm">
        <div className="w-7 h-7 rounded-full bg-[#C87551] flex items-center justify-center text-white flex-shrink-0">
          <Check className="w-4 h-4" />
        </div>
        <p className="text-xs font-medium text-[#F7F4EC] flex-1 line-clamp-1">
          {toastMessage}
        </p>
        <button
          type="button"
          onClick={() => {
            setToastMessage(null);
            setIsCartOpen(true);
          }}
          className="text-xs font-bold text-[#C87551] hover:underline uppercase tracking-wider flex items-center gap-1"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Bag</span>
        </button>
        <button
          type="button"
          onClick={() => setToastMessage(null)}
          className="text-white/60 hover:text-white p-1"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
