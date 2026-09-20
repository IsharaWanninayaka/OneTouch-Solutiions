import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const mobileScreens = [
    { id: 1, title: "Transport Fleet App", img: "/images/mobile-slide-1.png" },
    { id: 2, title: "UniFeast Food Delivery", img: "/images/mobile-slide-2.png" },
    { id: 3, title: "UniFeast Menu App", img: "/images/mobile-slide-3.png" }
  ];

  const laptopScreens = [
    { id: 1, title: "UniFeast Web Platform", img: "/images/foodweb.png" },
    { id: 2, title: "Hardware Logic Simulator", img: "/images/logic.png" },
    { id: 3, title: "Enterprise Inventory ERP", img: "/images/inventry.png" }
  ];

  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [activeLaptopIndex, setActiveLaptopIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMobileIndex((prev) => (prev + 1) % mobileScreens.length);
      setActiveLaptopIndex((prev) => (prev + 1) % laptopScreens.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [mobileScreens.length, laptopScreens.length]);

  return (
    <div className="w-full relative">
      <section
        id="home"
        className="relative pt-28 pb-20 md:pt-32 md:pb-28 bg-slate-950 text-white overflow-hidden rounded-tl-[28px] sm:rounded-tl-[36px] md:rounded-tl-[44px] shadow-2xl"
      >
        {/* Background Silk Wave Image from User */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75 pointer-events-none"
          style={{ backgroundImage: `url('/images/hero-wave-bg.png')` }}
        ></div>
        {/* Dark vignette gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/20 to-slate-950 pointer-events-none"></div>

        {/* Background Glowing Ambient Orbs */}
        <div className="glow-orb w-[600px] h-[600px] bg-blue-600/15 top-10 left-1/4 -translate-x-1/2"></div>
        <div className="glow-orb w-[500px] h-[500px] bg-indigo-600/15 bottom-10 right-10"></div>

        <div className="container px-4 sm:px-6 md:px-10 lg:px-12 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Hero Content */}
            <div className="lg:col-span-7 text-left">
              {/* Main Headline - Stacked 3-Line Layout matching Sample Image */}
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] leading-[1.12] mb-5 text-white max-w-2xl">
                Engineering High Performance <span className="gradient-text-animated">Digital Products</span> & Hardware Solutions
              </h1>

              {/* Description */}
              <p className="max-w-xl text-base sm:text-lg text-slate-200/90 font-normal leading-relaxed mb-8">
                OneTouch Solutions builds custom web platforms, mobile applications, enterprise cloud systems, and smart IoT hardware integration tailored for ambitious businesses.
              </p>

              {/* CTAs matching sample pill style */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => navigate("/start-project")}
                  className="px-8 py-3.5 text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-full shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2.5 group"
                >
                  <span>Start Your Project</span>
                  <i className="fas fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1"></i>
                </button>

                <button
                  onClick={() => navigate("/our-work")}
                  className="px-8 py-3.5 text-sm sm:text-base font-medium text-slate-900 bg-white hover:bg-slate-100 rounded-full shadow-lg shadow-black/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center"
                >
                  <span>Explore Portfolio</span>
                </button>
              </div>

              {/* Key Metrics Strip */}
              <div className="pt-6 border-t border-slate-800/70 grid grid-cols-3 gap-6 max-w-xl">
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">50+</div>
                  <div className="text-xs sm:text-sm text-slate-400 font-normal mt-1">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">99.9%</div>
                  <div className="text-xs sm:text-sm text-slate-400 font-normal mt-1">Uptime & Reliability</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">100%</div>
                  <div className="text-xs sm:text-sm text-slate-400 font-normal mt-1">Custom Architecture</div>
                </div>
              </div>
            </div>

            {/* Right Live Device Showcase (Laptop + Mobile Phone) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end lg:-translate-y-6 xl:-translate-y-8">
              <div className="relative w-full max-w-lg">

                {/* Ambient Halo Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/30 via-indigo-600/20 to-cyan-500/25 rounded-3xl blur-2xl opacity-70 pointer-events-none"></div>

                {/* 1. Laptop Mockup Frame (Background) */}
                <div className="relative w-full ml-auto rounded-t-2xl bg-slate-900 border-2 border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-xl">
                  {/* Laptop Minimal Header with traffic lights */}
                  <div className="h-6 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/70 inline-block"></span>
                      <span className="w-2 h-2 rounded-full bg-amber-500/70 inline-block"></span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500/70 inline-block"></span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800/80 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-slate-950"></span>
                    </div>
                    <div className="w-8"></div>
                  </div>

                  {/* Laptop Screen Display with Auto-cycling Content */}
                  <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden group">
                    {laptopScreens.map((screen, idx) => (
                      <div
                        key={screen.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeLaptopIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                          }`}
                      >
                        <img
                          src={screen.img}
                          alt={screen.title}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Laptop Base Stand / Deck */}
                  <div className="h-3 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-xl border-t border-slate-600/50 flex justify-center items-center">
                    <div className="w-16 h-1 bg-slate-900/60 rounded-full"></div>
                  </div>
                </div>

                {/* 2. iPhone Mobile Phone Mockup Frame (Foreground Left Overlapping) */}
                <div className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-5 z-30 w-[135px] sm:w-[160px] md:w-[175px] rounded-[28px] sm:rounded-[34px] bg-slate-950 p-1.5 sm:p-2 border-2 sm:border-[3px] border-slate-700 shadow-2xl shadow-black/90">
                  {/* Phone Screen Container */}
                  <div className="relative aspect-[9/19.5] rounded-[22px] sm:rounded-[26px] bg-slate-950 overflow-hidden border border-slate-800">

                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-3.5 bg-black rounded-full z-30 flex items-center justify-end px-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60"></span>
                    </div>

                    {/* Auto-cycling Mobile Screenshots */}
                    {mobileScreens.map((screen, idx) => (
                      <div
                        key={screen.id}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeMobileIndex === idx ? "opacity-100 z-10" : "opacity-0 z-0"
                          }`}
                      >
                        <img
                          src={screen.img}
                          alt={screen.title}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}

                    {/* Bottom Indicator Bar */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-white/70 rounded-full z-30"></div>
                  </div>
                </div>

                {/* Device Carousel Dots Control */}
                <div className="flex justify-end gap-1.5 mt-4 pr-2">
                  {mobileScreens.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveMobileIndex(idx);
                        setActiveLaptopIndex(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeMobileIndex === idx ? "w-6 bg-blue-500" : "w-1.5 bg-slate-700 hover:bg-slate-500"
                        }`}
                      aria-label={`Slide ${idx + 1}`}
                    ></button>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Bottom Right Organic Concave Transition with Blue 'Scroll >' Notice */}
        <div className="absolute bottom-0 right-0 z-20 pointer-events-auto">
          <div
            onClick={() => {
              const nextSection = document.getElementById("services") || document.getElementById("about");
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth" });
              } else {
                window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
              }
            }}
            className="relative bg-slate-50 hover:bg-white transition-colors duration-200 w-36 sm:w-44 md:w-52 h-8 sm:h-11 md:h-12 rounded-tl-[24px] md:rounded-tl-[32px] flex items-center justify-center cursor-pointer group shadow-sm select-none"
            title="Scroll down"
          >
            {/* Left Concave Inverted Corner (Along bottom edge) */}
            <svg
              className="absolute bottom-0 -left-[28px] w-[28px] h-[28px] pointer-events-none"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path d="M 28,0 C 28,12.5 15.5,28 0,28 L 28,28 Z" fill="#f8fafc" />
            </svg>

            {/* Top Concave Inverted Corner (Along right edge) */}
            <svg
              className="absolute -top-[28px] right-0 w-[28px] h-[28px] pointer-events-none"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path d="M 0,28 C 12.5,28 28,15.5 28,0 L 28,28 Z" fill="#f8fafc" />
            </svg>

            {/* Blue Color User Notice: Scroll > */}
            <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs sm:text-sm tracking-wide group-hover:text-blue-700 transition-colors">
              
              <span className="font-semibold">Scroll more</span>
              <i className="fas fa-chevron-down text-[10px] sm:text-xs transition-transform duration-300 group-hover:translate-x-1 text-blue-600"></i>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
