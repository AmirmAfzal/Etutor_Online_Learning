"use client";
import React, { useEffect, useRef } from "react";

import gsap from "gsap";

export default function Loading() {
  const spinnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinnerRef.current) {
      gsap.fromTo(
        spinnerRef.current,
        { rotate: 0 },
        {
          rotate: 360,
          repeat: -1,
          duration: 1.2,
          ease: "power1.inOut",
        }
      );
    }
  }, []);

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center">
      <div className="relative h-20 w-20">
        <div
          ref={spinnerRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#6366f1"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="44 88"
            />
          </svg>
        </div>
        <span className="text-base-content/60 mt-8 block text-center text-lg font-semibold">
          Loading...
        </span>
      </div>
    </div>
  );
}
