import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Editorial Motion Primitives for Lunches By Lily.
 * High-performance, GPU-friendly scroll-triggered reveals using Framer Motion.
 * Triggered once (viewport: { once: true, margin: '-60px' }) to avoid repetitive distraction.
 */

// 1. Eyebrow & Heading Staggered Reveal
export function RevealHeader({ eyebrow, title, subtitle, align = 'left', className = '' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left';

  return (
    <div className={`space-y-3 ${alignClass} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C87551]"
        >
          {eyebrow}
        </motion.div>
      )}

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#263D30] font-normal tracking-tight text-balance"
        >
          {title}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base text-[#252721]/75 leading-relaxed font-normal max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// 2. Elegant Clip-Path Reveal for Photography
export function ClipRevealImage({
  src,
  alt,
  direction = 'left', // 'left' | 'right' | 'up'
  className = '',
  imgClassName = '',
  children
}) {
  const initialClip =
    direction === 'left'
      ? 'inset(0% 100% 0% 0%)'
      : direction === 'right'
      ? 'inset(0% 0% 0% 100%)'
      : 'inset(20% 0% 20% 0%)';

  return (
    <motion.div
      initial={{ clipPath: initialClip, opacity: 0.7 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden ${className}`}
    >
      <motion.img
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
      {children}
    </motion.div>
  );
}

// 3. Gentle Parallax Wrapper for Large Hero / Editorial Photos
export function ParallaxImage({ src, alt, className = '', offset = 30 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        className="w-full h-[115%] object-cover -mt-[7.5%]"
      />
    </div>
  );
}

// 4. Stagger Container for Grids
export function StaggerContainer({ children, className = '', delayStep = 0.08 }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: delayStep
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
