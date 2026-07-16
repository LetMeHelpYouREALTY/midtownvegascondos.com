"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import RealScoutSimpleSearch from "@/components/realscout/RealScoutSimpleSearch";
import { agentInfo } from "@/lib/site-config";
import { Phone } from "lucide-react";

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  const images = [
    "/images/hero/home-strip-dusk.webp",
    "/images/hero/home-skyline-day.webp",
    "/images/hero/condo-balconies.webp",
  ];

  useEffect(() => {
    // Don't animate if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${
              prefersReducedMotion 
                ? '' 
                : 'transition-opacity duration-1000'
            } ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Hero image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Find Your Dream Home in
          <br />
          <span className="text-blue-400">Las Vegas & Henderson</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Expert real estate services with personalized attention. Your trusted partner for buying,
          selling, and investing in Southern Nevada.
        </p>

        <div className="mb-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={agentInfo.phoneTel}
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3.5 text-lg font-bold text-white transition-colors hover:bg-blue-700"
          >
            <Phone className="mr-2 h-5 w-5" aria-hidden />
            Call {agentInfo.phone}
          </a>
          <Link
            href="/listings"
            className="inline-flex items-center justify-center rounded-md border-2 border-white/80 bg-white/10 px-8 py-3.5 text-lg font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Browse Listings
          </Link>
        </div>

        <div className="realscout-wrapper mb-4 w-full max-w-xl">
          <RealScoutSimpleSearch agentEncodedId="QWdlbnQtMjI1MDUw" />
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/90 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">500+</span>
            <span>Properties Sold</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Since 2008</span>
            <span>Serving Las Vegas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">4.9★</span>
            <span>Average Rating</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 ${
          prefersReducedMotion ? '' : 'animate-bounce'
        }`}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </div>
  );
}
