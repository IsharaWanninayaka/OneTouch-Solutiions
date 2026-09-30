import React, { useState, useEffect } from "react";

function Loading({ onComplete, duration = 3500 }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 600); // smooth fade out transition
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  const wordOne = "One".split("");
  const wordTouch = "Touch".split("");
  const wordSolutions = "Solutions".split("");

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white select-none transition-opacity duration-700 ease-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Central Minimalist Brand & Rolling Text Animation */}
      <div className="flex flex-col items-center justify-center px-6">
        
        {/* Main Logo & Brand Text Row */}
        <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
          
          {/* Fixed Static OneTouch Power Emblem directly from cropped logo-icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative flex-shrink-0 flex items-center justify-center">
            <img
              src="/images/logo-icon.png"
              alt="OneTouch Logo Icon"
              className="w-full h-full object-contain select-none pointer-events-none"
            />
          </div>

          {/* Typography Container with Rolling Letters */}
          <div className="flex flex-col justify-center">
            
            {/* Top Row: "One" (Navy) + "Touch" (Electric Blue) */}
            <div className="flex items-center text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-none select-none">
              
              {/* "One" - Rolling Letters */}
              <div className="flex items-center text-[#0B132B]">
                {wordOne.map((char, index) => (
                  <span
                    key={`one-${index}`}
                    className="inline-block overflow-hidden h-[1.18em] align-top relative"
                  >
                    <span
                      className="flex flex-col letter-roll-reel"
                      style={{ animationDelay: `${index * 0.08}s` }}
                    >
                      <span className="h-[1.18em] flex items-center justify-center leading-none">{char}</span>
                      <span className="h-[1.18em] flex items-center justify-center leading-none">{char}</span>
                      <span className="h-[1.18em] flex items-center justify-center leading-none">{char}</span>
                      <span className="h-[1.18em] flex items-center justify-center leading-none">{char}</span>
                    </span>
                  </span>
                ))}
              </div>

              {/* "Touch" - Rolling Letters in Electric Blue */}
              <div className="flex items-center text-[#0066FF] ml-[2px]">
                {wordTouch.map((char, index) => (
                  <span
                    key={`touch-${index}`}
                    className="inline-block overflow-hidden h-[1.18em] align-top relative"
                  >
                    <span
                      className="flex flex-col letter-roll-reel"
                      style={{ animationDelay: `${(index + wordOne.length) * 0.08}s` }}
                    >
                      <span className="h-[1.18em] flex items-center justify-center leading-none">{char}</span>
                      <span className="h-[1.18em] flex items-center justify-center leading-none">{char}</span>
                      <span className="h-[1.18em] flex items-center justify-center leading-none">{char}</span>
                      <span className="h-[1.18em] flex items-center justify-center leading-none">{char}</span>
                    </span>
                  </span>
                ))}
              </div>

            </div>

            {/* Bottom Row: "Solutions" with Wide Tracking & Rolling Letters */}
            <div className="flex items-center text-sm sm:text-base md:text-lg font-semibold text-[#0F172A] tracking-[0.25em] sm:tracking-[0.3em] uppercase mt-1 sm:mt-1.5 opacity-90 select-none">
              {wordSolutions.map((char, index) => (
                <span
                  key={`solutions-${index}`}
                  className="inline-block overflow-hidden h-[1.25em] align-top relative"
                >
                  <span
                    className="flex flex-col letter-roll-reel"
                    style={{ animationDelay: `${(index + 2) * 0.06}s` }}
                  >
                    <span className="h-[1.25em] flex items-center justify-center leading-none">{char}</span>
                    <span className="h-[1.25em] flex items-center justify-center leading-none">{char}</span>
                    <span className="h-[1.25em] flex items-center justify-center leading-none">{char}</span>
                    <span className="h-[1.25em] flex items-center justify-center leading-none">{char}</span>
                  </span>
                </span>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Loading;
