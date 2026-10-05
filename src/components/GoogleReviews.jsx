import React, { useState, useEffect, useRef } from "react";

// 10 Curated Reviews with Spaced Constellation Coordinates
const reviewsData = [
  {
    id: 0,
    name: "Becky Nelson",
    role: "Product Director, CloudFlow",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    fallbackInitials: "BN",
    avatarBg: "from-purple-500 to-indigo-600",
    rating: 5,
    date: "2 weeks ago",
    quote:
      "OneTouch Solutions engineered our entire cloud platform from scratch. Their team delivered scalable architecture, real-time telemetry, and an exceptional user experience right on schedule. Truly exceptional engineering.",
    pos: { left: "1%", top: "12%", size: "w-12 h-12", delay: "0s", parallax: 0.25 },
  },
  {
    id: 1,
    name: "David Miller",
    role: "Director of Logistics, GlobalTrans",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    fallbackInitials: "DM",
    avatarBg: "from-blue-500 to-cyan-600",
    rating: 5,
    date: "3 weeks ago",
    quote:
      "Their team built our enterprise fleet tracking and route dispatch system. We achieved 100% uptime, zero latency, and our delivery efficiency jumped by over 30%. They are true engineering masters.",
    pos: { left: "18%", top: "25%", size: "w-14 h-14", delay: "1.2s", parallax: -0.2 },
  },
  {
    id: 2,
    name: "Dr. Asanka Wijesinghe",
    role: "Agritech Lead, AgroCare",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    fallbackInitials: "AW",
    avatarBg: "from-emerald-500 to-teal-700",
    rating: 5,
    date: "1 month ago",
    quote:
      "Revolutionary IoT sensors and mobile crop tracking app! The offline data collection and hardware sync work seamlessly in remote agricultural fields. Highest recommendation for smart IoT systems.",
    pos: { left: "1%", top: "58%", size: "w-11 h-11", delay: "2.4s", parallax: 0.18 },
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "VP of Product, SwiftFood",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    fallbackInitials: "ER",
    avatarBg: "from-amber-500 to-rose-600",
    rating: 5,
    date: "1 month ago",
    quote:
      "Working with OneTouch Solutions was a game-changer for our multi-vendor food platform. High-speed checkout, flawless payment processing, clean code, and stellar post-launch support.",
    pos: { left: "19%", top: "45%", size: "w-7 h-7", delay: "1.8s", parallax: -0.15 },
  },
  {
    id: 4,
    name: "Nuwan Perera",
    role: "CTO, RetailNexus Global",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    fallbackInitials: "NP",
    avatarBg: "from-indigo-500 to-blue-700",
    rating: 5,
    date: "2 months ago",
    quote:
      "Incredible full-stack capability! They transformed our legacy inventory system into a modern, lightning-fast cloud ERP within weeks. Clear communication and rock-solid architecture.",
    pos: { left: "10%", top: "82%", size: "w-10 h-10", delay: "0.6s", parallax: 0.22 },
  },
  {
    id: 5,
    name: "Marcus Vance",
    role: "IoT Systems Engineer, SmartGrid",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    fallbackInitials: "MV",
    avatarBg: "from-teal-500 to-emerald-700",
    rating: 5,
    date: "2 months ago",
    quote:
      "Top-tier embedded IoT and firmware engineering. They bridged our microcontroller boards with real-time cloud telemetry dashboards with zero packet loss. One of the best tech studios we've partnered with.",
    pos: { right: "1%", top: "14%", size: "w-14 h-14", delay: "0.9s", parallax: -0.25 },
  },
  {
    id: 6,
    name: "Kavinda Jayasuriya",
    role: "Co-Founder, SimLogic Labs",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
    fallbackInitials: "KJ",
    avatarBg: "from-sky-500 to-indigo-700",
    rating: 5,
    date: "3 months ago",
    quote:
      "The interactive digital circuit and boolean logic simulator they developed exceeded all our expectations. Exceptional UI/UX, intuitive design, and microsecond hardware response latency.",
    pos: { right: "19%", top: "28%", size: "w-7 h-7", delay: "2.1s", parallax: 0.16 },
  },
  {
    id: 7,
    name: "Sanduni Fernando",
    role: "Operations Lead, Ceylon Delivery",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    fallbackInitials: "SF",
    avatarBg: "from-fuchsia-500 to-purple-700",
    rating: 5,
    date: "3 months ago",
    quote:
      "From initial UI/UX wireframes to Google Play Store & iOS App Store deployment, their execution was flawless. Fluid animations, rock-solid security, and an enthusiastic engineering team.",
    pos: { right: "1%", top: "52%", size: "w-12 h-12", delay: "1.5s", parallax: -0.18 },
  },
  {
    id: 8,
    name: "Michael Thorne",
    role: "Head of Innovation, Vertex Digital",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
    fallbackInitials: "MT",
    avatarBg: "from-rose-500 to-pink-700",
    rating: 5,
    date: "4 months ago",
    quote:
      "Super responsive team with deep technical mastery in React, Node.js, and cloud ecosystems. They act like true strategic partners and innovative problem solvers, not just contractors.",
    pos: { right: "19%", top: "60%", size: "w-8 h-8", delay: "2.7s" },
  },
  {
    id: 9,
    name: "Sarah Jenkins",
    role: "Engineering Director, Apex Automations",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    fallbackInitials: "SJ",
    avatarBg: "from-violet-500 to-indigo-800",
    rating: 5,
    date: "5 months ago",
    quote:
      "Exceptional code quality, comprehensive architectural documentation, and robust cyber-security standards. OneTouch Solutions is our trusted studio for mission-critical software ecosystems.",
    pos: { right: "10%", top: "82%", size: "w-10 h-10", delay: "1.8s", parallax: -0.2 },
  },
];

// 5 Golden Stars with Micro-Animation
function StarRating() {
  return (
    <div className="flex items-center justify-center space-x-1 mt-2" aria-label="5 out of 5 stars">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5 text-amber-400 fill-current drop-shadow-[0_1px_3px_rgba(251,191,36,0.3)] transition-transform duration-200 hover:scale-125"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Real-time Scroll-Driven Bloom State (0.0 = tucked, 1.0 = blossomed in orbit)
  const [scrollBloom, setScrollBloom] = useState(0);
  const [scrollParallax, setScrollParallax] = useState(0);

  // Google Logo Animation Phase: 'idle' | 'spelling' | 'docked'
  const [googlePhase, setGooglePhase] = useState("idle");
  const [animKey, setAnimKey] = useState(0);
  const animTriggeredRef = useRef(false);
  const morphTimeoutRef = useRef(null);

  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  const triggerGoogleAnimation = () => {
    if (morphTimeoutRef.current) clearTimeout(morphTimeoutRef.current);
    setAnimKey((k) => k + 1);
    setGooglePhase("spelling");

    // Keep full 'Google' logo visible for ~1.2s then smoothly morph into the docked 'G' icon badge
    morphTimeoutRef.current = setTimeout(() => {
      setGooglePhase("docked");
    }, 2100);
  };

  // High-Performance 120FPS Real-Time Scroll Observer
  useEffect(() => {
    let rafId = 0;

    const measureScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // Dynamic Scroll Bloom calculation:
      // Starts expanding when section top reaches 90% of screen height
      // Reaches 100% full bloom when section is comfortably in center (45% of screen height)
      const enterThreshold = vh * 0.90;
      const fullThreshold = vh * 0.45;
      const rawProgress = (enterThreshold - rect.top) / (enterThreshold - fullThreshold);
      const progress = Math.min(1, Math.max(0, rawProgress));

      setScrollBloom(progress);

      // Trigger animation every time section enters visible range
      const isVisible = rect.top < vh * 0.85 && rect.bottom > vh * 0.15;
      if (isVisible && progress >= 0.35) {
        if (!animTriggeredRef.current) {
          animTriggeredRef.current = true;
          triggerGoogleAnimation();
        }
      } else if (rect.top > vh * 0.95 || rect.bottom < 0) {
        // Reset when user scrolls away, so it triggers fresh every time they scroll back
        animTriggeredRef.current = false;
        if (morphTimeoutRef.current) clearTimeout(morphTimeoutRef.current);
        setGooglePhase("idle");
      }

      // Parallax delta calculation (-1 to 1)
      const centerDelta = (rect.top + rect.height / 2 - vh / 2) / (vh / 2);
      setScrollParallax(centerDelta);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measureScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    measureScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (morphTimeoutRef.current) clearTimeout(morphTimeoutRef.current);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Auto-switch to next review every 4.8 seconds if not hovered
  useEffect(() => {
    if (isHovered) return;

    timerRef.current = setInterval(() => {
      handleSelectReview((prev) => (prev + 1) % reviewsData.length);
    }, 4800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, activeIndex]);

  const handleSelectReview = (indexOrFn) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(indexOrFn);
      setIsTransitioning(false);
    }, 200);
  };

  const currentReview = reviewsData[activeIndex];

  // Authentic Google Brand Colors for Letter-by-Letter Animation
  const googleLetters = [
    { char: "G", color: "#4285F4", delay: "0ms" },
    { char: "o", color: "#EA4335", delay: "120ms" },
    { char: "o", color: "#FBBC05", delay: "240ms" },
    { char: "g", color: "#4285F4", delay: "360ms" },
    { char: "l", color: "#34A853", delay: "480ms" },
    { char: "e", color: "#EA4335", delay: "600ms" },
  ];

  return (
    <section
      ref={sectionRef}
      id="reviews"
      aria-label="Customer Testimonials"
      className="relative w-full bg-white text-slate-900 py-20 md:py-24 px-4 sm:px-6 overflow-hidden select-none border-t border-slate-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Centered Constellation Container (Matches exact Dribbble proportions on all screens) */}
      <div className="max-w-6xl mx-auto relative min-h-[580px] md:min-h-[620px] flex flex-col items-center justify-between px-2">

        {/* TOP HEADER (Scroll-Driven Real-time Fade & Slide) */}
        <div
          className="text-center max-w-xl mx-auto mb-6 z-20 transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, scrollBloom * 1.4),
            transform: `translateY(${(1 - scrollBloom) * 28}px)`,
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0e1638] tracking-tight mb-2 font-sans">
            What Our Clients Say
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-normal max-w-md mx-auto leading-relaxed">
            Our Clients send us bunch of smilies with our services and we love them
          </p>
        </div>

        {/* FLOATING SATELLITE AVATARS (Real-time Scroll Bloom & Spatial Parallax) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-10">
          {reviewsData.map((rev, idx) => {
            const isActive = idx === activeIndex;
            const parallaxShift = (rev.pos.parallax || 0) * scrollParallax * 30;
            const avatarScale = 0.3 + scrollBloom * 0.7; // Expands from 30% to 100% as you scroll into view
            const avatarOpacity = Math.min(1, scrollBloom * 1.5);

            return (
              <div
                key={rev.id}
                className="absolute pointer-events-auto transition-all duration-500 ease-out group cursor-default"
                style={{
                  left: rev.pos.left,
                  right: rev.pos.right,
                  top: rev.pos.top,
                  opacity: avatarOpacity,
                  transform: `translateY(${parallaxShift}px) scale(${avatarScale})`,
                  willChange: "transform, opacity",
                }}
                onClick={() => handleSelectReview(idx)}
              >
                <div
                  className={`relative rounded-full aspect-square overflow-hidden flex-shrink-0 transition-all duration-300 ${rev.pos.size
                    } ${isActive
                      ? "ring-3 ring-indigo-600 ring-offset-2 ring-offset-white shadow-lg shadow-indigo-500/20 scale-110 z-30"
                      : "ring-2 ring-white/95 shadow-md hover:scale-115 hover:shadow-xl hover:ring-indigo-400 z-10 opacity-85 hover:opacity-100"
                    }`}
                  style={{
                    animation: `floatOrb 5.5s ease-in-out infinite`,
                    animationDelay: rev.pos.delay,
                  }}
                >
                  <img
                    src={rev.image}
                    alt={rev.name}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${rev.avatarBg} text-white font-bold text-xs hidden items-center justify-center`}
                  >
                    {rev.fallbackInitials}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CENTER SPOTLIGHT AVATAR (Concentric Disc Frame with Scroll Reveal) */}
        <div
          className="relative z-20 my-auto flex flex-col items-center transition-all duration-700 ease-out"
          style={{
            opacity: Math.min(1, scrollBloom * 1.5),
            transform: `scale(${0.8 + scrollBloom * 0.2}) translateY(${(1 - scrollBloom) * 20}px)`,
          }}
        >
          {/* Mobile Avatar Thumbnails (only on small screens) */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-6 overflow-x-auto py-1 max-w-full no-scrollbar">
            {reviewsData.map((rev, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={rev.id}
                  onClick={() => handleSelectReview(idx)}
                  className={`w-9 h-9 rounded-full flex-shrink-0 transition-all duration-300 ${isActive
                      ? "ring-2 ring-indigo-600 scale-110 shadow-md"
                      : "opacity-60 hover:opacity-100"
                    }`}
                >
                  <img
                    src={rev.image}
                    alt={rev.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </button>
              );
            })}
          </div>

          {/* Large Central Avatar Circle with Google 4-Color Arc & Letter-by-Letter Morphing Badge */}
          <div className="relative mb-4 flex items-center justify-center">
            
            {/* Google 4-Color Dashed Arc Trail (Sweeps around the bottom-half rim into the 'G' logo) */}
            <svg
              className="absolute -inset-3 sm:-inset-4 w-[calc(100%+24px)] sm:w-[calc(100%+32px)] h-[calc(100%+24px)] sm:h-[calc(100%+32px)] pointer-events-none z-10 overflow-visible"
              viewBox="0 0 170 170"
            >
              <defs>
                <linearGradient id="googleArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4285F4" />
                  <stop offset="30%" stopColor="#EA4335" />
                  <stop offset="65%" stopColor="#FBBC05" />
                  <stop offset="100%" stopColor="#34A853" />
                </linearGradient>
              </defs>
              <path
                d="M 24 82 A 64 64 0 0 0 140 120"
                fill="none"
                stroke="url(#googleArcGradient)"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
                className="opacity-90"
              />
            </svg>

            {/* Central White Disc Frame */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-white p-1.5 shadow-[0_16px_40px_rgba(15,23,42,0.10)] ring-8 ring-indigo-50/80 relative flex items-center justify-center z-20">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img
                  src={currentReview.image}
                  alt={currentReview.name}
                  className={`w-full h-full object-cover rounded-full transition-all duration-300 ease-out transform ${
                    isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-br ${currentReview.avatarBg} text-white font-extrabold text-2xl hidden items-center justify-center`}
                >
                  {currentReview.fallbackInitials}
                </div>
              </div>
            </div>

            {/* GOOGLE ANIMATION BADGE (Animates 'Google' Letter-by-Letter then morphs into circular 'G' badge) */}
            <div
              key={animKey}
              onClick={() => triggerGoogleAnimation()}
              
              className={`absolute -bottom-1 -right-2 sm:bottom-0.5 sm:right-0 z-30 bg-white rounded-full shadow-[0_8px_25px_rgba(66,133,244,0.22)] ring-2 ring-slate-100/90 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                googlePhase === "spelling"
                  ? "w-32 sm:w-36 h-9 sm:h-10 px-3.5 shadow-blue-500/25"
                  : "w-9 h-9 sm:w-10 sm:h-10 px-0 hover:scale-115"
              }`}
            >
              {/* 1. Letter-by-Letter "Google" Wordmark View */}
              {googlePhase === "spelling" && (
                <div className="flex items-center justify-center tracking-tight font-sans font-black select-none text-base sm:text-lg animate-fadeIn">
                  {googleLetters.map((item, idx) => (
                    <span
                      key={`${animKey}-${idx}`}
                      className="inline-block transform transition-all duration-300 animate-googlePop"
                      style={{
                        color: item.color,
                        animationDelay: item.delay,
                        marginRight: idx === 0 ? "1px" : idx === 4 ? "0.5px" : "1px",
                      }}
                    >
                      {item.char}
                    </span>
                  ))}
                </div>
              )}

              {/* 2. Docked 4-Color Google 'G' Icon Badge View */}
              {googlePhase !== "spelling" && (
                <div className="w-full h-full flex items-center justify-center animate-scaleIn">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>
              )}
            </div>

          </div>

          {/* Testimonial Quote Speech Area */}
          <div
            className={`relative max-w-lg sm:max-w-xl mx-auto px-4 sm:px-6 text-center transition-all duration-300 ease-out transform ${isTransitioning
                ? "opacity-0 translate-y-2"
                : "opacity-100 translate-y-0"
              }`}
          >
            {/* Top Left Brand Gradient Quote Mark */}
            <div className="text-left -mb-3 sm:-mb-4 pl-3 sm:pl-6">
              <span className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent text-5xl sm:text-6xl md:text-7xl font-serif font-black leading-none select-none inline-block drop-shadow-[0_2px_10px_rgba(37,99,235,0.18)]">
                “
              </span>
            </div>

            {/* Quote Body */}
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-normal leading-relaxed mb-3 px-2 sm:px-4">
              {currentReview.quote}
              <span className="bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent text-xl sm:text-2xl font-serif font-black ml-1.5 select-none inline-block">
                ”
              </span>
            </p>

            {/* Author Name */}
            <h3 className="text-base sm:text-lg font-bold text-[#0e1638] tracking-tight">
              {currentReview.name}
            </h3>

            {/* Golden Star Rating */}
            <StarRating />
          </div>

        </div>

      </div>

      {/* Custom CSS Keyframes for Letter Pop, Morph & Float */}
      <style>{`
        @keyframes floatOrb {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes googlePop {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.4);
          }
          60% {
            opacity: 1;
            transform: translateY(-3px) scale(1.18);
          }
          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.4) rotate(-25deg);
          }
          70% {
            opacity: 1;
            transform: scale(1.15) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-googlePop {
          animation: googlePop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

export default GoogleReviews;
