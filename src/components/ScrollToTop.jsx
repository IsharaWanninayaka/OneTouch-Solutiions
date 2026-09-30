import React, { useState, useEffect } from "react";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show when scrolling UP and past the initial hero section threshold (> 220px)
      // Hide when at the top (< 160px) or when scrolling downwards
      if (currentScrollY > 220 && currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY <= 160 || currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-7 right-6 sm:right-8 z-50 transition-all duration-400 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group relative w-[40px] h-[58px] sm:w-[42px] sm:h-[62px] rounded-full flex items-center justify-center shadow-lg shadow-blue-950/40 border border-white/25 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-xl hover:shadow-blue-600/40"
        style={{
          background: "linear-gradient(145deg, #38bdf8 0%, #2563eb 40%, #6366f1 70%, #090d16 100%)",
          backgroundSize: "220% 220%",
          backgroundPosition: "0% 0%",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundPosition = "100% 100%";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundPosition = "0% 0%";
        }}
      >
        {/* Subtle Ambient Shimmer Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        {/* Exact '↑' Straight Stem Arrow Icon */}
        <svg
          className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white stroke-[2.6] transition-transform duration-300 group-hover:-translate-y-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19V5M5 12l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}

export default ScrollToTop;
