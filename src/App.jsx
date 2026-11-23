import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import AmbientParticles from './components/AmbientParticles';
import ChatWidget from './components/ChatWidget';

import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import DeliveryInfoPage from './pages/DeliveryInfoPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import PolicyPage from './pages/PolicyPage';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F7F4EC] text-[#252721] overflow-x-hidden">
      {/* 1. Ambient Organic Particle Environment (Fixed behind content) */}
      <AmbientParticles />

      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      <main className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Menu & Collection Routes */}
          <Route path="/pages/this-weeks-set-menu" element={<MenuPage />} />
          <Route path="/collections/this-weeks-menu-drop" element={<MenuPage />} />
          <Route path="/collections/full-menu" element={<MenuPage />} />
          <Route path="/collections/all" element={<MenuPage />} />
          <Route path="/collections/:category" element={<MenuPage />} />
          
          {/* Individual Product Page */}
          <Route path="/products/:handle" element={<ProductDetailPage />} />
          
          {/* Content Pages */}
          <Route path="/pages/about-us" element={<AboutPage />} />
          <Route path="/pages/delivery-info" element={<DeliveryInfoPage />} />
          <Route path="/pages/faqs" element={<FaqPage />} />
          <Route path="/pages/contact" element={<ContactPage />} />

          {/* Legal & Policy Pages */}
          <Route path="/pages/privacy-policy" element={<PolicyPage />} />
          <Route path="/policies/privacy-policy" element={<PolicyPage />} />
          <Route path="/pages/terms-conditions" element={<PolicyPage />} />
          <Route path="/pages/refund-returns-policy" element={<PolicyPage />} />
          <Route path="/pages/accessibility-statement" element={<PolicyPage />} />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Overlays & Interactive Widgets */}
      <CartDrawer />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <Toast />
      <ScrollToTop />
      
      {/* 2. Original Lunches By Lily Customer Chat Widget */}
      <ChatWidget />
    </div>
  );
}
