import React, { useState, useEffect, useRef, memo } from "react";
import { useNavigate } from "react-router-dom";

// Rounded-corner "fillets" that blend the white notches into the card edge
const R = 24;
const filletPaths = {
  tr: `M0,0 L${R},0 L${R},${R} A${R},${R} 0 0 0 0,0 Z`,
  tl: `M${R},0 L0,0 L0,${R} A${R},${R} 0 0 1 ${R},0 Z`,
  br: `M0,${R} L${R},${R} L${R},0 A${R},${R} 0 0 1 0,${R} Z`,
  bl: `M${R},${R} L0,${R} L0,0 A${R},${R} 0 0 0 ${R},${R} Z`,
};

function Fillet({ at, style }) {
  return (
    <svg
      className="absolute pointer-events-none"
      width={R}
      height={R}
      viewBox={`0 0 ${R} ${R}`}
      style={style}
    >
      <path d={filletPaths[at]} fill="#ffffff" />
    </svg>
  );
}

// Fires once when an element scrolls into view
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

// Scroll reveal: fade + rise (+ soft blur)
function Reveal({ children, delay = 0, threshold = 0.15, noBlur = false, className = "", ...rest }) {
  const [ref, seen] = useInView(threshold);
  const hidden = `opacity-0 translate-y-10 ${noBlur ? "" : "blur-[4px]"}`;
  return (
    <div
      ref={ref}
      {...rest}
      style={{ transitionDelay: seen ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:blur-0 ${seen ? "opacity-100 translate-y-0 blur-0" : hidden
        } ${className}`}
    >
      {children}
    </div>
  );
}

// "OneTouch" starts in the headline's normal dark colour. As you scroll, each
// letter is inked in left-to-right with the logo colours (navy "One", blue "Touch").
const INK_BASE = "#0f172a";
const INK_LETTERS = [
  ["O", "#101c44"], ["n", "#101c44"], ["e", "#101c44"],
  ["T", "#1d6fe0"], ["o", "#1d6fe0"], ["u", "#1d6fe0"], ["c", "#1d6fe0"], ["h", "#1d6fe0"],
];

const InkWord = memo(function InkWord() {
  const wrapRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let current = reduce ? 1 : 0; // smoothed progress
    let target = current;

    const paint = () => {
      lettersRef.current.forEach((node, i) => {
        if (!node) return;
        const p = Math.min(1, Math.max(0, (current - i * 0.09) / 0.3));
        node.style.backgroundPosition = `${100 - p * 100}% 0`;
      });
    };

    // Scroll position -> target progress (full draw takes ~70% of a screen of scrolling)
    const measure = () => {
      const el = wrapRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      target = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.7)));
    };

    // Ease toward the target so the colour glides in slowly instead of snapping
    const tick = () => {
      current += (target - current) * 0.06;
      if (Math.abs(target - current) < 0.001) current = target;
      paint();
      raf = current !== target ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    measure();
    if (reduce) current = target;
    paint();
    if (!raf) raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span ref={wrapRef} aria-label="OneTouch">
      {INK_LETTERS.map(([ch, color], i) => (
        <span
          key={i}
          aria-hidden="true"
          ref={(n) => (lettersRef.current[i] = n)}
          style={{
            display: "inline-block",
            backgroundImage: `linear-gradient(90deg, ${color} 0%, ${color} 42%, ${INK_BASE} 58%, ${INK_BASE} 100%)`,
            backgroundSize: "300% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "100% 0",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
});

const PAD = "px-6 sm:px-10 lg:px-[7.5%]";

function Services2() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [isIdleInView, setIsIdleInView] = useState(false);
  const splineRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Reliable viewport check function: active ONLY when user has scrolled past / crossed the top border of this card
  const checkIfInViewport = () => {
    const el = sectionRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    // Loads ONLY after user scrolls past the top border (rect.top <= 100) and card is in view (rect.bottom > 200)
    return rect.top <= 100 && rect.bottom > 200;
  };

  useEffect(() => {
    const updateVisibility = () => {
      const inView = checkIfInViewport();
      setIsIdleInView(inView);
    };

    const handleScroll = () => {
      // Hide immediately as soon as active scrolling begins
      setIsIdleInView(false);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Wait a few seconds (1.3s idle delay) after stopping scroll to show/load
      scrollTimeoutRef.current = setTimeout(() => {
        updateVisibility();
      }, 1300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial check on load: wait idle delay before showing if already in view
    const initTimer = setTimeout(updateVisibility, 1300);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      clearTimeout(initTimer);
    };
  }, []);

  // 100% Complete Watermark Elimination: MutationObserver + ShadowRoot style injection + Element deletion
  useEffect(() => {
    let observer = null;

    const purgeWatermark = () => {
      const viewer = splineRef.current;
      if (!viewer || !viewer.shadowRoot) return;
      const shadow = viewer.shadowRoot;

      // 1. Remove all logo / watermark / anchor elements immediately
      const targets = shadow.querySelectorAll(
        '#logo, a[href*="spline"], [id*="logo"], [class*="logo"], [class*="watermark"], [id*="watermark"], [aria-label*="Spline"]'
      );
      targets.forEach((el) => {
        try {
          el.remove();
        } catch {
          el.style.display = "none";
        }
      });

      // 2. Inject overriding stylesheet into ShadowRoot
      if (!shadow.querySelector("#spline-permanent-hide-style")) {
        const style = document.createElement("style");
        style.id = "spline-permanent-hide-style";
        style.textContent = `
          #logo,
          a,
          a[href*="spline"],
          .watermark,
          [class*="watermark"],
          [id*="watermark"],
          #spline-watermark,
          [aria-label*="Spline"] {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            transform: scale(0) !important;
            position: absolute !important;
            bottom: -9999px !important;
            right: -9999px !important;
            width: 0 !important;
            height: 0 !important;
            clip-path: inset(100%) !important;
          }
        `;
        shadow.appendChild(style);
      }

      // 3. Attach MutationObserver to immediately destroy any dynamically re-added elements
      if (!observer && shadow) {
        observer = new MutationObserver(() => {
          const freshTargets = shadow.querySelectorAll(
            '#logo, a[href*="spline"], [id*="logo"], [class*="logo"], [class*="watermark"]'
          );
          freshTargets.forEach((el) => el.remove());
        });
        observer.observe(shadow, { childList: true, subtree: true });
      }
    };

    purgeWatermark();
    const interval = setInterval(purgeWatermark, 100);
    const timeout = setTimeout(() => clearInterval(interval), 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      if (observer) observer.disconnect();
    };
  }, []);

  const features = [
    {
      id: "custom-software",
      title: "Customized Software Solutions",
      description:
        "We develop robust web-based applications tailored to your specific workflows. Whether you're building internal tools or launching client-facing platforms, we design scalable, secure, and high-performance solutions...",
      icon: (
        <svg width="42" height="42" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gearGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8b5cf6" />
              <stop offset="0.5" stopColor="#ec4899" />
              <stop offset="1" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <path
            d="M16 6h8l1 4 3.5 1.5 3.5-2 5.5 5.5-2 3.5 1.5 3.5 4 1v8l-4 1-1.5 3.5 2 3.5-5.5 5.5-3.5-2-3.5 1.5-1 4h-8l-1-4-3.5-1.5-3.5 2-5.5-5.5 2-3.5-1.5-3.5-4-1v-8l4-1 1.5-3.5-2-3.5 5.5-5.5 3.5 2 3.5-1.5 1-4z"
            stroke="url(#gearGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="5.5" stroke="url(#gearGrad)" strokeWidth="2.2" />
          <path d="M20 14.5v-3M20 28.5v-3M14.5 20h-3M28.5 20h-3" stroke="url(#gearGrad)" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "ai-solutions",
      title: "AI Solutions",
      description:
        "We build AI tools that transform how businesses operate—unlocking insights, reducing manual work, and enhancing customer engagement across secure, modern cloud architectures...",
      icon: (
        <svg width="42" height="42" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="aiGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f43f5e" />
              <stop offset="0.5" stopColor="#a855f7" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <path
            d="M8 8h24a3 3 0 013 3v12a3 3 0 01-3 3H16l-6 5v-5H8a3 3 0 01-3-3V11a3 3 0 013-3z"
            stroke="url(#aiGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="17" r="1.8" fill="url(#aiGrad)" />
          <circle cx="26" cy="17" r="1.8" fill="url(#aiGrad)" />
          <path d="M18 21h4" stroke="url(#aiGrad)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "mobile-apps",
      title: "Mobile App Development",
      description:
        "Native and cross-platform mobile apps for iOS and Android, built with Flutter and React Native for fluid 60fps performance, offline capability, and smooth user experiences...",
      icon: (
        <svg width="42" height="42" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mobGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1" />
              <stop offset="0.5" stopColor="#a855f7" />
              <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <rect x="11" y="6" width="18" height="28" rx="4.5" stroke="url(#mobGrad)" strokeWidth="2.2" />
          <path d="M17 10h6" stroke="url(#mobGrad)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="20" cy="29" r="1.5" fill="url(#mobGrad)" />
          <path d="M6 18c0-3 3-5 5-4M34 18c0-3-3-5-5-4" stroke="url(#mobGrad)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "iot-hardware",
      title: "Smart IoT & Hardware Solutions",
      description:
        "We engineer custom microcontroller firmware, sensor networks, and IoT cloud platforms that bridge the physical and digital worlds—unlocking real-time telemetry and automation...",
      icon: (
        <svg width="42" height="42" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="iotGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="0.5" stopColor="#06b6d4" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <rect x="9" y="9" width="22" height="22" rx="5" stroke="url(#iotGrad)" strokeWidth="2.2" />
          <rect x="15" y="15" width="10" height="10" rx="2.5" fill="url(#iotGrad)" fillOpacity="0.12" stroke="url(#iotGrad)" strokeWidth="1.8" />
          <path d="M15 5v4M25 5v4M15 31v4M25 31v4M5 15h4M5 25h4M31 15h4M31 25h4" stroke="url(#iotGrad)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  // Show 2 features at a time, rotating through all 4
  const pages = [features.slice(0, 2), features.slice(2, 4)];

  // Automatically cycle through service pages every 5 seconds (no manual buttons needed)
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % pages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [pages.length]);

  return (
    <section
      id="services2"
      ref={sectionRef}
      className="py-6 md:py-10 px-3 sm:px-4 bg-white text-slate-900 relative overflow-hidden"
    >
      {/* Full-width pale-blue card */}
      <Reveal noBlur threshold={0.08} className="relative bg-[#f2f6ff] rounded-[28px] overflow-hidden">

        {/* Top tab notch */}
        <div className="absolute top-0 inset-x-0 z-10 select-none pointer-events-none">
          <div className={PAD}>
            <div className="relative inline-flex items-center h-[60px] sm:h-[80px] px-7 sm:px-10 bg-white rounded-b-[24px]">
              <span className="text-blue-600 font-medium text-sm sm:text-base">Our Services</span>
              <Fillet at="tr" style={{ left: -R, top: 0 }} />
              <Fillet at="tl" style={{ left: "100%", top: 0 }} />
            </div>
          </div>
        </div>

        {/* Bottom-right notch */}
        <div className="absolute bottom-0 inset-x-0 z-10 hidden sm:block select-none pointer-events-none">
          <div className={`${PAD} flex justify-end`}>
            <div className="relative flex items-center justify-center h-[50px] w-[32%] min-w-[260px] bg-white rounded-t-[24px]">

              <Fillet at="br" style={{ left: -R, bottom: 0 }} />
              <Fillet at="bl" style={{ left: "100%", bottom: 0 }} />
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className={`${PAD} pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-28`}>

          {/* Headline row + Spline 3D Scene */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 mb-12 lg:mb-16">
            <Reveal delay={150} className="lg:col-span-7 xl:col-span-7">
              <h2 className="max-w-[700px] text-3xl sm:text-4xl md:text-5xl lg:text-[40px] xl:text-[46px] font-normal sm:font-medium text-slate-900 leading-[1.38] sm:leading-[1.42] lg:leading-[1.44] tracking-[-0.01em]">
                At <InkWord /> Solutions, we <br className="hidden lg:block" />
                build smart software, AI, <br className="hidden lg:block" />
                mobile apps, and IoT systems <br className="hidden lg:block" />
                that help your business <br className="hidden lg:block" />
                grow with confidence.
              </h2>
            </Reveal>

            {/* Spline 3D Scene in top right area: shows ONLY when stopped inside Our Services for a few seconds, hides while scrolling, controllable when visible */}
            <div className="lg:col-span-5 xl:col-span-5 flex justify-center items-center">
              <div
                className={`relative w-full h-[300px] sm:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden flex items-center justify-center select-none ${isIdleInView ? "pointer-events-auto" : "pointer-events-none"
                  }`}
              >
                {/* Subtle soft backdrop radial glow */}
                <div
                  className={`absolute w-60 h-60 rounded-full bg-gradient-to-tr from-blue-400/20 via-indigo-300/20 to-sky-300/20 blur-2xl transition-all duration-1000 ease-out pointer-events-none ${isIdleInView ? "opacity-100 scale-100" : "opacity-0 scale-75"
                    }`}
                />

                {/* 3D Model wrapper with responsive smooth fade in/out and user interaction controls */}
                <div
                  className={`w-full h-full flex items-center justify-center transition-all ${isIdleInView
                      ? "opacity-100 scale-100 blur-0 translate-y-0 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-grab active:cursor-grabbing"
                      : "opacity-0 scale-90 blur-[6px] translate-y-3 duration-300 ease-in pointer-events-none"
                    }`}
                >
                  <div className="w-[108%] h-[108%] flex items-center justify-center -translate-x-[2%] -translate-y-[2%]">
                    <spline-viewer
                      ref={splineRef}
                      url="https://prod.spline.design/crgVw-ZWyyl7KZwf/scene.splinecode"
                      style={{ width: "100%", height: "100%", outline: "none" }}
                    ></spline-viewer>
                  </div>
                </div>

                {/* Seamless Bottom-Right Watermark Mask matching card background #f2f6ff */}
                <div className="absolute bottom-0 right-0 w-48 h-16 bg-[#f2f6ff] pointer-events-none z-30" />
              </div>
            </div>
          </div>

          {/* Bottom Row: Offset Paragraph, Buttons & Rotating Features */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <Reveal delay={250} className="lg:col-start-4 lg:col-span-8 flex flex-col">
              <p className="text-slate-800 text-base sm:text-[17px] md:text-lg lg:text-[20px] font-normal leading-[1.65] mb-6">
                Our core services include Custom Software Development, AI Solutions, Mobile App Development, and Smart IoT & Hardware Solutions. Whether you're launching a new product, streamlining internal operations, or connecting devices to the cloud, our team delivers secure, scalable solutions tailored to your business goals. With a client-focused approach and a commitment to quality, we help organizations turn ideas into working products.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate("/start-project")}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow active:scale-95"
                >
                  Get Started <i className="fas fa-arrow-right text-[11px]"></i>
                </button>

                <button
                  onClick={() => navigate("/more-about")}
                  className="bg-white border border-blue-600/40 text-slate-900 hover:bg-blue-50 hover:border-blue-600 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm"
                >
                  How It Works
                </button>
              </div>
            </Reveal>

            {/* Rotating features: 2 visible at a time, aligned under the paragraph, automated transition */}
            <Reveal
              delay={150}
              className="lg:col-start-4 lg:col-end-13 mt-16 lg:mt-24"
            >
              <style>{`@keyframes aboutFill { from { width: 0%; } to { width: 100%; } }`}</style>

              <div className="grid">
                {pages.map((pair, pi) => {
                  const active = pi === page;
                  const hiddenShift = pi < page ? "-translate-y-5" : "translate-y-5";
                  return (
                    <div
                      key={pi}
                      aria-hidden={!active}
                      className={`col-start-1 row-start-1 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 ${active ? "" : "pointer-events-none"
                        }`}
                    >
                      {pair.map((item, i) => (
                        <div
                          key={item.id}
                          style={{ transitionDelay: active ? `${200 + i * 150}ms` : `${i * 60}ms` }}
                          className={`flex flex-col group transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${active ? "opacity-100 translate-y-0 blur-0" : `opacity-0 blur-[3px] ${hiddenShift}`
                            }`}
                        >
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-normal text-slate-900 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-[15px] sm:text-base lg:text-[17px] text-slate-500 leading-relaxed mb-5 max-w-[500px]">
                            {item.description}
                          </p>
                          <div className="transform group-hover:scale-110 transition-transform duration-300 origin-left">
                            {item.icon}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Automated Progress Indicator Bars (Visual progress, no manual buttons) */}
              <div className="flex items-center gap-2 mt-10 pointer-events-none select-none">
                {pages.map((_, i) => (
                  <div
                    key={i}
                    aria-label={`Service slide ${i + 1}`}
                    className="relative h-[3px] w-12 rounded-full bg-blue-600/15 overflow-hidden"
                  >
                    {i === page && (
                      <span
                        key={page}
                        style={{
                          animation: "aboutFill 5s linear forwards",
                        }}
                        className="absolute inset-y-0 left-0 rounded-full bg-blue-600"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default Services2;
