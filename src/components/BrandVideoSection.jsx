import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BrandVideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#263D30]/10 pb-5">
          <div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C87551] block mb-2">
              Behind The Scenes • Sydney NSW
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#263D30] font-normal tracking-tight">
              Meal Prep Done Differently
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#263D30]/70">
            <span className="w-2 h-2 rounded-full bg-[#C87551] animate-pulse" />
            <span>Small-batch cooking in motion</span>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative rounded-3xl overflow-hidden bg-[#263D30] aspect-[16/9] sm:aspect-[16/9] lg:aspect-[21/9] shadow-elevated border border-[#263D30]/15 group">
          <video
            ref={videoRef}
            src="https://lunchesbylily.com.au/cdn/shop/videos/c/vp/998a1c5defed4e78b4f46cb02e5cb11b/998a1c5defed4e78b4f46cb02e5cb11b.HD-1080p-7.2Mbps-85477302.mp4?v=0"
            poster="https://lunchesbylily.com.au/cdn/shop/files/preview_images/998a1c5defed4e78b4f46cb02e5cb11b.thumbnail.0000000000_2500x.jpg?v=1780365761"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-1000 ease-out"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Interactive Controls Overlay */}
          <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-10 flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="p-3 sm:p-3.5 rounded-full bg-[#F7F4EC]/90 hover:bg-white text-[#263D30] backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="p-3 sm:p-3.5 rounded-full bg-[#F7F4EC]/90 hover:bg-white text-[#263D30] backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
