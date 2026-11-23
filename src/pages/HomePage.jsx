import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Truck, ShieldCheck, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  siteBrand,
  heroContent,
  founderStory,
  howItWorks,
  faqList,
  proteinCategories,
  productsData
} from '../data/siteData';
import ProductCard from '../components/ProductCard';
import BrandVideoSection from '../components/BrandVideoSection';
import ReviewsCarousel from '../components/ReviewsCarousel';
import InstagramFeedSection from '../components/InstagramFeedSection';
import { RevealHeader, ClipRevealImage, StaggerContainer } from '../components/MotionReveal';

export default function HomePage() {
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // This Week's Drop meals
  const thisWeekMeals = productsData.filter((p) => p.isThisWeek);
  const featuredHeroMeal = thisWeekMeals[0];
  const remainingMeals = thisWeekMeals.slice(1);

  return (
    <div className="space-y-24 sm:space-y-32 pb-20 sm:pb-28">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2rem] overflow-hidden bg-[#263D30] text-[#F7F4EC] min-h-[620px] lg:min-h-[700px] flex flex-col justify-between shadow-2xl border border-[#263D30]/40">
            {/* Background Photography with atmospheric editorial lighting */}
            <div className="absolute inset-0 z-0">
              <motion.img
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                src={heroContent.bannerImage}
                alt="Lunches By Lily Fresh Meal Prep"
                className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#263D30] via-[#263D30]/45 to-black/30" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#263D30]/20 to-[#263D30]/80" />
            </div>

            {/* Top Masthead Bar: Editorial Issue & Cut-off Notice */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative z-10 p-6 sm:p-10 flex flex-wrap gap-3 items-center justify-between"
            >
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase bg-[#F7F4EC]/95 text-[#263D30] backdrop-blur-md shadow-sm">
                  Sydney, NSW • Handcrafted Fresh
                </span>
                {heroContent.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide bg-black/25 text-[#EFE9DC] backdrop-blur-md border border-white/10"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-[#C87551] text-white shadow-md">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Orders Close: Thursday 7:00 PM</span>
              </div>
            </motion.div>

            {/* Bottom Content / Editorial Headline */}
            <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-3xl space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#A5AD91]">
                  <span className="w-8 h-[1px] bg-[#A5AD91]" />
                  <span>{heroContent.tagline}</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F7F4EC] font-normal leading-[1.08] tracking-tight text-balance">
                  Home-cooked meal prep that <span className="italic font-normal text-[#EFE9DC]">doesn't taste like meal prep.</span>
                </h1>

                <p className="text-sm sm:text-base text-[#EFE9DC]/90 leading-relaxed font-normal max-w-xl">
                  {siteBrand.subhead}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="pt-2 flex flex-wrap gap-4 items-center"
              >
                <Link
                  to="/pages/this-weeks-set-menu"
                  className="px-8 py-4 rounded-full bg-[#C87551] hover:bg-[#B36341] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2.5 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 group"
                >
                  <span>Order This Week's Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/collections/full-menu"
                  className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F4EC] backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold tracking-wider uppercase inline-flex items-center gap-2 transition-all duration-300"
                >
                  <span>Explore Full Menu</span>
                </Link>
              </motion.div>

              {/* Sub-hero micro features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="pt-4 border-t border-white/15 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#EFE9DC]/80 font-medium"
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A5AD91]" />
                  <span>Halal Certified Meats</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A5AD91]" />
                  <span>Never Frozen • Fresh Sunday Delivery</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A5AD91]" />
                  <span>Custom Macro Portions (Reg & Lrg)</span>
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE TICKER */}
      <section className="bg-[#263D30] text-[#F7F4EC] py-3.5 overflow-hidden border-y border-[#263D30]/20 select-none">
        <div className="animate-marquee flex items-center whitespace-nowrap gap-12 text-xs sm:text-sm tracking-widest uppercase font-medium text-[#EFE9DC]">
          {heroContent.marqueeItems.concat(heroContent.marqueeItems).concat(heroContent.marqueeItems).map((item, idx) => (
            <span key={idx} className="flex items-center gap-4">
              <span>{item}</span>
              <span className="text-[#C87551]">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* 3. BEHIND THE SCENES / MEAL PREP DONE DIFFERENTLY (ORIGINAL 1080P VIDEO) */}
      <BrandVideoSection />

      {/* 4. THIS WEEK'S MENU DROP (ASYMMETRIC EDITORIAL GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#263D30]/15">
          <div className="space-y-2">
            <RevealHeader
              eyebrow={
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C87551] animate-ping" />
                  <span>Current Weekly Drop</span>
                </span>
              }
              title="Fresh This Week"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-1 text-xs sm:text-sm text-[#252721]/70 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C87551]" />
                Freshly cooked weekly
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#263D30]" />
                Sunday delivery & Auburn pickup
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#A5AD91]" />
                Macro balanced & portioned
              </span>
            </motion.div>
          </div>

          <Link
            to="/collections/full-menu"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#263D30] hover:text-[#C87551] transition-colors pb-1 border-b-2 border-[#263D30] hover:border-[#C87551] self-start md:self-end"
          >
            <span>View Full Menu ({productsData.length} Meals)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Featured Asymmetrical Layout: Hero Meal Card + Remaining Drop Meals */}
        <div className="space-y-6">
          {featuredHeroMeal && (
            <div className="mb-6">
              <ProductCard product={featuredHeroMeal} featured={true} staggerIndex={0} />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingMeals.map((product, idx) => (
              <ProductCard key={product.id} product={product} staggerIndex={idx + 1} />
            ))}
          </div>
        </div>

        {/* Bottom Menu Notice */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center p-6 rounded-2xl bg-[#EFE9DC]/60 border border-[#263D30]/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-left space-y-0.5">
            <p className="font-serif text-lg text-[#263D30]">
              Looking for our complete catalogue of 20+ meals?
            </p>
            <p className="text-xs text-[#252721]/70">
              Browse Chicken, Beef, Lamb, and Seafood dishes cooked fresh to order every week.
            </p>
          </div>
          <Link
            to="/collections/full-menu"
            className="px-6 py-2.5 rounded-full bg-[#263D30] hover:bg-[#C87551] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <span>See All Meals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </section>

      {/* 5. VERIFIED CUSTOMER REVIEWS (AUTHENTIC JUDGE.ME REVIEWS CAROUSEL) */}
      <ReviewsCarousel />

      {/* 6. FOUNDER STORY / FROM MY KITCHEN (CLIP-PATH EDITORIAL SPREAD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-[#EFE9DC]/60 border border-[#263D30]/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-soft">
          {/* Founder Photography with Clip-Path Reveal */}
          <div className="lg:col-span-5 min-h-[380px] lg:min-h-full relative overflow-hidden bg-[#263D30]">
            <ClipRevealImage
              src={founderStory.image}
              alt={founderStory.imageAlt}
              direction="left"
              className="w-full h-full"
              imgClassName="object-cover object-top filter contrast-[1.03]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#263D30]/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/40 backdrop-blur-md text-white text-[11px] font-medium tracking-wide flex items-center justify-between">
                <span>Lily — Founder & Head Cook</span>
                <span className="text-[#A5AD91]">Auburn, Sydney</span>
              </div>
            </ClipRevealImage>
          </div>

          {/* Story Copy */}
          <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block px-3.5 py-1 text-xs font-semibold tracking-wider uppercase bg-[#263D30] text-[#F7F4EC] rounded-full"
              >
                {founderStory.badge}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#263D30] font-normal tracking-tight"
              >
                {founderStory.heading}
              </motion.h2>
              <motion.blockquote
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg sm:text-xl text-[#263D30]/90 leading-relaxed font-serif italic border-l-2 border-[#C87551] pl-5"
              >
                "{founderStory.quote}"
              </motion.blockquote>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-sm text-[#252721]/80 leading-relaxed font-normal"
              >
                Every meal at Lunches By Lily is prepared with the same intention, care, and quality ingredients I feed my own family. No additives, no mass factory assembly lines—just genuine cooking, generous flavours, and balanced nutrition delivered fresh to your door each Sunday.
              </motion.p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center border-t border-[#263D30]/10">
              <Link
                to="/pages/this-weeks-set-menu"
                className="px-7 py-3.5 rounded-full bg-[#263D30] hover:bg-[#C87551] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-2 shadow-sm transition-all duration-300"
              >
                <span>{founderStory.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/pages/about-us"
                className="px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#263D30] hover:bg-white/60 transition-colors"
              >
                <span>Read Full Story</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ORDERING STEPS (STAGGERED ARCHITECTURAL TRIO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealHeader
          eyebrow="Seamless Weekly Routine"
          title="How It Works"
          align="center"
          className="max-w-xl mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {howItWorks.steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-3xl bg-white/70 border border-[#263D30]/10 hover:border-[#263D30]/25 transition-all duration-300 flex flex-col justify-between group hover:shadow-soft relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-4xl text-[#A5AD91] group-hover:text-[#C87551] transition-colors">
                  {step.number}
                </span>
                <span className="w-2 h-2 rounded-full bg-[#A5AD91]/40 group-hover:bg-[#C87551] transition-colors" />
              </div>
              <div className="space-y-3">
                <h3 className="font-serif text-2xl text-[#263D30] font-normal">
                  {step.title}
                </h3>
                <p className="text-sm text-[#252721]/70 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. SHOP BY PROTEIN (LOOKBOOK SPREAD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <RevealHeader
            eyebrow="Curated Collections"
            title="Shop by Protein"
          />
          <Link
            to="/collections/full-menu"
            className="text-xs font-bold tracking-widest uppercase text-[#263D30] hover:text-[#C87551] transition-colors flex items-center gap-1.5"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {proteinCategories.map((cat, idx) => (
            <motion.div
              key={cat.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={`/collections/${cat.handle}`}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#263D30] flex flex-col justify-end p-5 sm:p-6 text-white shadow-soft hover:shadow-elevated transition-all duration-300 block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.75]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-white">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] text-[#A5AD91] tracking-wider uppercase font-medium">
                      View Meals
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#C87551] transition-colors">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. FOLLOW US ON INSTAGRAM */}
      <InstagramFeedSection />

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealHeader
          eyebrow="Common Queries"
          title="Frequently Asked Questions"
          align="center"
          className="mb-10"
        />

        <div className="divide-y divide-[#263D30]/15 border-y border-[#263D30]/15">
          {faqList.map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 py-2 focus:outline-none group cursor-pointer"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#263D30] group-hover:text-[#C87551] transition-colors">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#263D30] group-hover:text-[#C87551] transition-transform duration-300 ${
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
                      <div className="pt-2 pb-3 text-sm sm:text-base text-[#252721]/80 leading-relaxed font-normal">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/pages/faqs"
            className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#263D30] hover:text-[#C87551] pb-1 border-b border-[#263D30]/30 hover:border-[#C87551] transition-colors"
          >
            <span>Read All Questions & Delivery Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
