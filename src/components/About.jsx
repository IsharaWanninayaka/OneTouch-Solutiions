import React, { useRef, useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";

// "OneTouch" starts in the headline's normal dark colour. As you scroll, each
// letter is inked in left-to-right with the logo colours (navy "One", blue "Touch").
const INK_BASE = "#0f172a";
const INK_LETTERS = [
  ["O", "#101c44"], ["n", "#101c44"], ["e", "#101c44"],
  ["T", "#1d6fe0"], ["o", "#1d6fe0"], ["u", "#1d6fe0"], ["c", "#1d6fe0"], ["h", "#1d6fe0"],
];

const InkWord = memo(function InkWord({ baseColor = INK_BASE }) {
  const wrapRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let current = reduce ? 1 : 0;
    let target = current;

    const paint = () => {
      lettersRef.current.forEach((node, i) => {
        if (!node) return;
        const p = Math.min(1, Math.max(0, (current - i * 0.09) / 0.3));
        node.style.backgroundPosition = `${100 - p * 100}% 0`;
      });
    };

    const measure = () => {
      const el = wrapRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      target = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.85 - top) / (vh * 0.6)));
    };

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
    <span ref={wrapRef} aria-label="OneTouch" className="inline-block">
      {INK_LETTERS.map(([ch, color], i) => (
        <span
          key={i}
          aria-hidden="true"
          ref={(n) => (lettersRef.current[i] = n)}
          style={{
            display: "inline-block",
            backgroundImage: `linear-gradient(90deg, ${color} 0%, ${color} 42%, ${baseColor} 58%, ${baseColor} 100%)`,
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

const CountUpNumber = memo(function CountUpNumber({ end, decimals = 0, suffix = "", isVisible }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isVisible || startedRef.current) return;
    startedRef.current = true;

    let startTimestamp = null;
    const duration = 2000;
    let rafId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * end;
      setCount(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible, end]);

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
});

function About() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const statsRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // 1. Scroll detection for section arrival, stats entrance, action buttons, & delayed line reveal on lock
  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // Section enters view
      const inView = rect.top <= vh * 0.75 && rect.bottom > 120;

      // Delayed line reveal: ONLY triggers when image reaches near its lock position (top <= 140px)
      const lineActive = rect.top <= 140 && rect.bottom > 150;
      setIsLineVisible(lineActive);

      // Scrolled down towards the action buttons area (slightly above buttons)
      let scrolledDown = false;
      if (triggerRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        scrolledDown = triggerRect.top < vh * 0.78;
      } else {
        scrolledDown = rect.top < -650;
      }

      // Trigger count once when stats row enters into viewport (does not reset when scrolling up)
      if (statsRef.current) {
        const statsRect = statsRef.current.getBoundingClientRect();
        if (statsRect.top <= vh * 0.90 && statsRect.bottom >= 0) {
          setStatsInView(true);
        }
      }

      setIsInView(inView);
      setIsScrolledPast(scrolledDown);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    checkScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const hasAnimatedRef = useRef(false);

  // 2. Typing animation triggered when section enters view
  useEffect(() => {
    let intervalId = null;

    if (isInView) {
      if (!hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        let i = 0;
        const fullText = "ABOUT US";
        setTypedText("");
        setIsTyping(true);

        intervalId = setInterval(() => {
          i++;
          setTypedText(fullText.slice(0, i));
          if (i >= fullText.length) {
            clearInterval(intervalId);
            setIsTyping(false);
          }
        }, 80);
      }
    } else {
      hasAnimatedRef.current = false;
      setTypedText("");
      setIsTyping(false);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView]);

  const principles = [
    {
      step: "01",
      icon: "fas fa-cubes",
      title: "Precision Engineering",
      desc: "Zero-defect clean architecture, modular microservices, automated CI/CD pipelines, and high-concurrency performance benchmarks.",
    },
    {
      step: "02",
      icon: "fas fa-shield-alt",
      title: "Security by Design",
      desc: "Zero-trust protocols, end-to-end data encryption, and OWASP-compliant enterprise hardening integrated into every layer.",
    },
    {
      step: "03",
      icon: "fas fa-bolt",
      title: "Agile Speed & Transparency",
      desc: "Bi-weekly milestone sprints, real-time collaboration dashboards, and rapid time-to-market without accumulating technical debt.",
    },
    {
      step: "04",
      icon: "fas fa-users-cog",
      title: "100% In-House Squads",
      desc: "Dedicated senior software architects and engineers with zero third-party outsourcing and 100% client intellectual property ownership.",
    },
  ];

  const highlights = [
    {
      category: "EXECUTION",
      title: "Concept to Scale",
      desc: "Accelerated execution from architectural blueprints and system modeling to high-performance, production-grade deployment.",
    },
    {
      category: "RELIABILITY",
      title: "Guaranteed 99.9% SLA",
      desc: "High-availability multi-region cloud infrastructure backed by proactive 24/7 monitoring, automated failover, and dedicated support.",
    },
    {
      category: "GOVERNANCE",
      title: "100% IP Ownership",
      desc: "Full transfer of all proprietary source code, database schemas, and documentation with complete technical freedom and zero vendor lock-in.",
    },
  ];

  const stats = [
    { value: 3, suffix: "+", label: "Years Experience" },
    { value: 50, suffix: "+", label: "Projects Shipped" },
    { value: 99.9, decimals: 1, suffix: "%", label: "Uptime Standard" },
    { value: 100, suffix: "%", label: "In-House Tech" },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-white text-slate-900 relative">
      {/* Premium silhouette: two inverted-corner pockets (774 x 699 grid) */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="aboutShapeMask" clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.00129199 0.00143062)"
              d="M 202 0 L 738 0 A 36 36 0 0 1 774 36 L 774 547 A 32 32 0 0 1 742 579 L 606 579 A 32 32 0 0 0 574 611 L 574 667 A 32 32 0 0 1 542 699 L 36 699 A 36 36 0 0 1 0 663 L 0 152 A 32 32 0 0 1 32 120 L 138 120 A 32 32 0 0 0 170 88 L 170 32 A 32 32 0 0 1 202 0 Z"
            />
          </clipPath>
        </defs>
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start">

          {/* LEFT COLUMN: STICKY SHAPED IMAGE */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 lg:self-start z-10">
            <div className="relative w-full max-w-xl mx-auto lg:max-w-none pr-4 pb-4">
              <div
                className="relative w-full"
                style={{ aspectRatio: "774 / 699" }}
              >
                {/* Offset outline frame that slides out from under the image */}
                <svg
                  viewBox="0 0 774 699"
                  preserveAspectRatio="none"
                  className={`absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isLineVisible
                      ? "translate-x-4 translate-y-4 opacity-100"
                      : "translate-x-0 translate-y-0 opacity-0"
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M 202 0 L 738 0 A 36 36 0 0 1 774 36 L 774 547 A 32 32 0 0 1 742 579 L 606 579 A 32 32 0 0 0 574 611 L 574 667 A 32 32 0 0 1 542 699 L 36 699 A 36 36 0 0 1 0 663 L 0 152 A 32 32 0 0 1 32 120 L 138 120 A 32 32 0 0 0 170 88 L 170 32 A 32 32 0 0 1 202 0 Z"
                    fill="none"
                    stroke="#2563eb"
                    strokeOpacity="0.55"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Pure Typing Text in Top-Left Pocket (Layered BEHIND the Photo) */}
                <div
                  className="absolute z-0 pointer-events-none flex items-center select-none"
                  style={{
                    left: "-6%",
                    top: "3.5%",
                    height: "12%",
                  }}
                  aria-label="About Us"
                >
                  <div
                    className={`flex items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${isInView && !isScrolledPast
                      ? "translate-x-0 opacity-100 scale-100"
                      : "translate-x-24 sm:translate-x-32 md:translate-x-40 opacity-0 scale-95"
                      }`}
                  >
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl font-black tracking-[0.16em] text-slate-950 uppercase font-sans">
                      {typedText}
                    </span>
                    {/* Typing cursor */}
                    {(isTyping || (isInView && !isScrolledPast && typedText.length > 0)) && (
                      <span
                        className={`inline-block w-[2.5px] sm:w-[3px] h-[1.15em] bg-slate-950 ml-1.5 align-middle transition-opacity duration-150 ${isTyping ? "opacity-100" : "animate-pulse"
                          }`}
                      />
                    )}
                  </div>
                </div>

                {/* Shaped image with copy/drag protection (Layered in FRONT of the text) */}
                <div
                  className="absolute inset-0 z-10 select-none"
                  style={{ filter: "drop-shadow(0 24px 40px rgba(15, 23, 42, 0.18))" }}
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <div
                    className="w-full h-full overflow-hidden bg-slate-100 select-none pointer-events-none"
                    style={{
                      clipPath: "url(#aboutShapeMask)",
                      WebkitClipPath: "url(#aboutShapeMask)",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                    }}
                  >
                    <img
                      src="/images/about-office.jpg"
                      alt="OneTouch Solutions Office"
                      className="w-full h-full object-cover object-center pointer-events-none select-none"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      style={{
                        userSelect: "none",
                        WebkitUserSelect: "none",
                        WebkitUserDrag: "none",
                        pointerEvents: "none",
                      }}
                      onError={(e) => {
                        e.target.src = "/images/about-office-team.jpg";
                      }}
                    />
                  </div>
                  {/* Invisible shield layer preventing right-click or drag */}
                  <div
                    className="absolute inset-0 pointer-events-auto"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ userSelect: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTENT */}
          <div className="lg:col-span-6 flex flex-col space-y-8">

            {/* Top Bold Headline */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-5">
                WE ENGINEER <br />
                INTELLIGENT <br />
                ENTERPRISE SYSTEMS.
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Simplifying complex operations through scalable digital innovation  delivering advanced Web, Mobile, Cloud, and Embedded IoT ecosystems for modern organizations globally.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 w-full" />

            {/* Company Overview Section */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                <InkWord /> Solutions
              </h3>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                OneTouch Solutions is a next generation enterprise technology company specializing in the design, development, and modernization of intelligent business platforms, mobile applications, cloud infrastructures, and embedded IoT hardware ecosystems.
              </p>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                With operations strategically focused on digital excellence and engineering precision, we deliver secure, scalable, and performance-driven digital ecosystems that transform how organizations operate, collaborate, and grow.
              </p>
            </div>

            {/* Core Engineering Principles - Minimalist Spec List (Option 1) */}
            <div className="pt-2">
              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                The Architectural Standards We Live By
              </h4>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Our commitment to engineering rigor, verifiable security, and enterprise delivery velocity.
              </p>

              {/* Minimalist Spec List */}
              <div className="divide-y divide-slate-200/80 border-y border-slate-200/80">
                {principles.map((item, idx) => (
                  <div
                    key={idx}
                    className="group py-5 sm:py-6 transition-all duration-300 hover:bg-slate-50/80 -mx-3 sm:-mx-4 px-3 sm:px-4 rounded-xl flex items-start gap-3.5 sm:gap-5 cursor-default"
                  >
                    {/* Monospace Step Number */}
                    <div className="pt-0.5">
                      <span className="font-mono text-xs sm:text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors inline-block w-6">
                        {item.step}
                      </span>
                    </div>

                    {/* Spec Content */}
                    <div className="space-y-1.5 flex-1">
                      <h5 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h5>
                      <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed max-w-2xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Value Highlights - Line-by-Line Spec Rows */}
              <div className="pt-6 pb-6 border-b border-slate-200/80 divide-y divide-slate-200/60">
                {highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="py-4.5 sm:py-5 first:pt-2 last:pb-2 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline transition-all duration-200 group"
                  >
                    {/* Left: Category + Title */}
                    <div className="sm:col-span-5 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        <span className="text-[11px] font-mono font-bold tracking-wider text-blue-600 uppercase">
                          {hl.category}
                        </span>
                      </div>
                      <h6 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                        {hl.title}
                      </h6>
                    </div>

                    {/* Right: Rich Descriptive Copy */}
                    <div className="sm:col-span-7">
                      <p className="text-[14px] sm:text-[14.5px] text-slate-700 leading-relaxed">
                        {hl.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Stats Bar - Minimalist Open Layout with Smooth Counting & Black Typography */}
            <div ref={statsRef} className="pt-6 pb-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-none mb-1.5 font-sans">
                      <CountUpNumber
                        end={stat.value}
                        decimals={stat.decimals || 0}
                        suffix={stat.suffix}
                        isVisible={statsInView}
                      />
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 tracking-normal">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div ref={triggerRef} className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/start-project")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 flex items-center gap-2"
              >
                <span>Start a Project</span>
                <i className="fas fa-arrow-right text-xs"></i>
              </button>

              <button
                onClick={() => navigate("/more-about")}
                className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-slate-400 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm active:scale-95"
              >
                Learn More About Us
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default About;