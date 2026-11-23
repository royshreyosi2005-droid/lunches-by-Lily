import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Heart, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { siteBrand } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="bg-[#263D30] text-[#F7F4EC] pt-16 sm:pt-20 pb-12 border-t border-[#263D30]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 pb-16 border-b border-[#F7F4EC]/12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block group select-none py-1" aria-label="Lunches By Lily - Home">
              <img
                src={siteBrand.logoWhite || "/logo-white.png"}
                alt="Lunches By Lily"
                className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-300 group-hover:opacity-85"
                style={{ aspectRatio: '2975 / 631' }}
                width="170"
                height="36"
              />
            </Link>
            <p className="text-sm text-[#A5AD91] max-w-sm leading-relaxed font-normal">
              {siteBrand.subhead}
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-xs text-[#EFE9DC]/80 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C87551] shrink-0" />
                <span>100% Halal Certified Meats</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A5AD91] shrink-0" />
                <span>Fresh Sunday Deliveries & Free Auburn Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A5AD91] shrink-0" />
                <span>Never Frozen • Cooked Fresh Every Week</span>
              </div>
            </div>
          </div>

          {/* Col 3: Shop */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C87551]">
              Shop
            </p>
            <ul className="space-y-2.5 text-sm text-[#EFE9DC]/80">
              <li>
                <Link to="/" className="hover:text-[#F7F4EC] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/pages/this-weeks-set-menu" className="hover:text-[#F7F4EC] transition-colors">This Week's Set Menu</Link>
              </li>
              <li>
                <Link to="/collections/full-menu" className="hover:text-[#F7F4EC] transition-colors">Full Menu</Link>
              </li>
              <li>
                <Link to="/collections/chicken" className="hover:text-[#F7F4EC] transition-colors">Chicken Meals</Link>
              </li>
              <li>
                <Link to="/collections/beef" className="hover:text-[#F7F4EC] transition-colors">Beef Meals</Link>
              </li>
              <li>
                <Link to="/collections/lamb" className="hover:text-[#F7F4EC] transition-colors">Lamb Meals</Link>
              </li>
              <li>
                <Link to="/collections/seafood" className="hover:text-[#F7F4EC] transition-colors">Seafood Meals</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Information */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C87551]">
              Information
            </p>
            <ul className="space-y-2.5 text-sm text-[#EFE9DC]/80">
              <li>
                <Link to="/pages/about-us" className="hover:text-[#F7F4EC] transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/pages/delivery-info" className="hover:text-[#F7F4EC] transition-colors">Delivery Info</Link>
              </li>
              <li>
                <Link to="/pages/faqs" className="hover:text-[#F7F4EC] transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/pages/contact" className="hover:text-[#F7F4EC] transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/pages/accessibility-statement" className="hover:text-[#F7F4EC] transition-colors">Accessibility</Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Stay Connected & Location */}
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#C87551]">
              Stay Connected
            </p>
            <ul className="space-y-3 text-sm text-[#EFE9DC]/80">
              <li>
                <a
                  href={siteBrand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#C87551] transition-colors group"
                >
                  <InstagramIcon className="w-4 h-4 text-[#C87551]" />
                  <span>Instagram @lunchesbylily</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A5AD91] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteBrand.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#F7F4EC] transition-colors text-xs"
                >
                  <Mail className="w-4 h-4 text-[#A5AD91] shrink-0" />
                  <span>{siteBrand.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteBrand.whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#F7F4EC] transition-colors text-xs"
                >
                  <Phone className="w-4 h-4 text-[#A5AD91] shrink-0" />
                  <span>WhatsApp +61 457 713 394</span>
                </a>
              </li>
              <li className="pt-1">
                <span className="inline-flex items-start gap-2 text-xs text-[#A5AD91]">
                  <MapPin className="w-4 h-4 text-[#C87551] shrink-0 mt-0.5" />
                  <span>Auburn 2144, Sydney NSW (Pickup Sunday 4PM–6PM)</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A5AD91]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
            <span>&copy; {new Date().getFullYear()} Lunches By Lily • Powered by Shopify</span>
            <Link to="/pages/privacy-policy" className="hover:text-[#F7F4EC] transition-colors">Privacy Policy</Link>
            <Link to="/pages/terms-conditions" className="hover:text-[#F7F4EC] transition-colors">Terms & Conditions</Link>
            <Link to="/pages/refund-returns-policy" className="hover:text-[#F7F4EC] transition-colors">Refund & Returns Policy</Link>
            <Link to="/pages/accessibility-statement" className="hover:text-[#F7F4EC] transition-colors">Accessibility Statement</Link>
          </div>
          <div className="flex items-center gap-1.5 text-[#EFE9DC]/70 text-xs">
            <span>Cooked with care in Sydney</span>
            <Heart className="w-3.5 h-3.5 text-[#C87551] fill-[#C87551]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
