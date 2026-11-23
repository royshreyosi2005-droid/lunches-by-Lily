import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { reviewsData } from '../data/siteData';

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = reviewsData.reviews;
  const total = reviews.length;

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section className="bg-[#EFE9DC]/70 py-16 sm:py-20 border-y border-[#263D30]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with 5-star summary matching original Judge.me bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#263D30] font-normal tracking-tight">
            {reviewsData.title}
          </h2>

          {/* Social Proof Badge: 5.00 ★ ( 79 ) Verified */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-[#263D30]/10 text-xs sm:text-sm font-semibold text-[#263D30] self-start sm:self-auto">
            <div className="flex text-[#C87551]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#C87551]" />
              ))}
            </div>
            <span>{reviewsData.averageRating.toFixed(2)} ★</span>
            <span className="text-[#252721]/50">( {reviewsData.reviewsCount} )</span>
            <span className="text-[#263D30] flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#263D30]" />
              {reviewsData.verifiedText}
            </span>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="relative">
          {/* Grid of 3 visible cards on desktop, 1 on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const reviewIdx = (currentIndex + offset) % total;
              const rev = reviews[reviewIdx];
              return (
                <div
                  key={`${reviewIdx}-${rev.reviewer}`}
                  className={`p-6 sm:p-7 rounded-2xl bg-[#F7F4EC] border border-[#263D30]/12 shadow-sm flex flex-col justify-between space-y-5 ${
                    offset === 0 ? 'flex' : offset === 1 ? 'hidden md:flex' : 'hidden lg:flex'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex text-[#C87551]">
                      {[...Array(Math.min(5, rev.rating))].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C87551]" />
                      ))}
                    </div>

                    {/* Review Body */}
                    <p className="text-sm text-[#252721]/80 leading-relaxed italic">
                      "{rev.body}"
                    </p>
                  </div>

                  {/* Reviewer Details */}
                  <div className="pt-3 border-t border-[#263D30]/10 flex items-center justify-between text-xs text-[#252721]/60">
                    <span className="font-semibold text-[#263D30]">
                      {rev.reviewer}
                    </span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Navigation Buttons & Pagination */}
          <div className="mt-8 flex items-center justify-between">
            {/* Pagination indicator dots */}
            <div className="flex items-center gap-1.5">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-5 bg-[#263D30]' : 'w-2 bg-[#263D30]/20 hover:bg-[#263D30]/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next / Prev Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevReview}
                className="p-2.5 rounded-full bg-white hover:bg-[#263D30] hover:text-[#F7F4EC] text-[#263D30] border border-[#263D30]/15 shadow-sm transition-all duration-200 focus:outline-none cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextReview}
                className="p-2.5 rounded-full bg-white hover:bg-[#263D30] hover:text-[#F7F4EC] text-[#263D30] border border-[#263D30]/15 shadow-sm transition-all duration-200 focus:outline-none cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
