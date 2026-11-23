import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { siteBrand } from '../data/siteData';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lbl_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [hasCelebratedFreeShipping, setHasCelebratedFreeShipping] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('lbl_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Total meals count (excluding snack packs/weet-bix if desired, or all items)
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Main meals count (meals with 'meal' or regular/XL protein bowls)
  const mealItemsCount = cart.reduce((sum, item) => {
    const isSnackOrBreakfast = item.title.toLowerCase().includes('protein balls') || item.title.toLowerCase().includes('weet-bix');
    return isSnackOrBreakfast ? sum : sum + item.quantity;
  }, 0);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Free delivery threshold: 10 meals
  const freeDeliveryThreshold = siteBrand.freeDeliveryThreshold; // 10
  const minOrderMeals = siteBrand.minOrderMeals; // 5

  const mealsUntilFreeDelivery = Math.max(0, freeDeliveryThreshold - totalItemsCount);
  const mealsUntilMinimum = Math.max(0, minOrderMeals - totalItemsCount);
  const isFreeDeliveryEligible = totalItemsCount >= freeDeliveryThreshold;
  const isMinimumReached = totalItemsCount >= minOrderMeals;

  // Trigger celebratory confetti once 10 meals are added
  useEffect(() => {
    if (isFreeDeliveryEligible && !hasCelebratedFreeShipping && cart.length > 0) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#263D30', '#C87551', '#A5AD91', '#F7F4EC']
      });
      setHasCelebratedFreeShipping(true);
    } else if (!isFreeDeliveryEligible) {
      setHasCelebratedFreeShipping(false);
    }
  }, [isFreeDeliveryEligible, hasCelebratedFreeShipping, cart.length]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const addToCart = (product, variant, quantity = 1, options = {}) => {
    const itemKey = `${variant.id}-${options.size || ''}-${options.deliveryDay || ''}-${options.base || ''}`;
    
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.key === itemKey);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [
          ...prev,
          {
            key: itemKey,
            productId: product.id,
            variantId: variant.id,
            productHandle: product.handle,
            title: product.title,
            variantTitle: variant.title !== 'Default Title' ? variant.title : '',
            price: variant.price,
            image: product.images[0] || '',
            quantity,
            options
          }
        ];
      }
    });

    showToast(`Added "${product.title}" to your bag`);
  };

  const updateQuantity = (key, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.key === key) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeItem = (key) => {
    setCart(prev => prev.filter(item => item.key !== key));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCheckoutUrl = () => {
    if (cart.length === 0) return '#';
    // Format: https://lunchesbylily.com.au/cart/{variant_id}:{quantity},{variant_id}:{quantity}
    const permalink = cart.map(i => `${i.variantId}:${i.quantity}`).join(',');
    return `https://${siteBrand.shopifyDomain}/cart/${permalink}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalItemsCount,
        mealItemsCount,
        subtotal,
        mealsUntilFreeDelivery,
        mealsUntilMinimum,
        isFreeDeliveryEligible,
        isMinimumReached,
        minOrderMeals,
        freeDeliveryThreshold,
        getCheckoutUrl,
        toastMessage,
        setToastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
