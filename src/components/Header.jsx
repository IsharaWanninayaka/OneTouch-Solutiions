import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.querySelector(sectionId);
        section?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const section = document.querySelector(sectionId);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Fixed Top White Bar */}
      <div className="fixed top-0 left-0 right-0 h-3 sm:h-4 md:h-4 bg-white z-40 pointer-events-none"></div>

      {/* Fixed Left White Frame (Full Height of Screen) */}
      <div className="fixed top-0 bottom-0 left-0 w-4 sm:w-6 md:w-8 bg-white z-40 pointer-events-none"></div>

      {/* Top Left CoLabs Style Brand Tab with Organic Concave Curves */}
      <div className="fixed top-0 left-0 z-50 pointer-events-auto">
        <div className="relative bg-white text-slate-900 pt-3.5 pb-4 px-6 sm:pt-4 sm:pb-5 sm:px-8 md:pt-5 md:pb-6 md:px-10 rounded-br-[34px] md:rounded-br-[44px] flex flex-col cursor-pointer transition-all duration-200">
          {/* Brand Logo */}
          <div onClick={() => navigate("/")} className="flex items-center">
            <Logo size="normal" />
          </div>

          {/* Concave Inverted Corner (Right Side along top edge) */}
          <svg
            className="absolute top-3 sm:top-4 md:top-4 -right-[28px] w-[28px] h-[28px] pointer-events-none"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path d="M 0,0 L 28,0 C 12.5,0 0,12.5 0,28 Z" fill="#ffffff" />
          </svg>

          {/* Concave Inverted Corner (Bottom Side along left edge) */}
          <svg
            className="absolute -bottom-[28px] left-4 sm:left-6 md:left-8 w-[28px] h-[28px] pointer-events-none"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path d="M 0,0 L 0,28 C 0,12.5 12.5,0 28,0 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* Top Right Floating Glassy Pill Capsule */}
      <div className="fixed top-6 md:top-7 lg:top-8 right-4 md:right-8 lg:right-10 z-50 pointer-events-auto">
        {/* Desktop Pill Menu */}
        <nav className="hidden lg:flex items-center gap-6 bg-white/[0.08] hover:bg-white/[0.14] backdrop-blur-xl px-6 py-2.5 rounded-full shadow-xl shadow-black/20 border border-white/25 transition-all duration-300">
          <button
            onClick={() => handleNavClick("#services")}
            className="text-xs md:text-sm font-semibold text-white/90 hover:text-white transition-colors py-1"
          >
            Services
          </button>
          <button
            onClick={() => handleNavClick("#about")}
            className="text-xs md:text-sm font-semibold text-white/90 hover:text-white transition-colors py-1"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick("#tech-stack")}
            className="text-xs md:text-sm font-semibold text-white/90 hover:text-white transition-colors py-1"
          >
            Our Principles
          </button>
          <button
            onClick={() => handleNavClick("#portfolio")}
            className="text-xs md:text-sm font-semibold text-white/90 hover:text-white transition-colors py-1"
          >
            Portfolio
          </button>
          <button
            onClick={() => handleNavClick("#contact")}
            className="text-xs md:text-sm font-semibold text-white/90 hover:text-white transition-colors py-1"
          >
            Contact
          </button>

          {/* Animated Hover-Draw Get a Quote CTA Button */}
          <button
            onClick={() => navigate("/get-quote")}
            className="relative group inline-flex items-center justify-center px-4 py-1.5 text-xs md:text-sm font-semibold text-white/90 hover:text-white transition-all duration-300 bg-transparent hover:bg-blue-600/20 border-2 border-transparent hover:border-blue-500 rounded-full hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get a Quote</span>
            <span className="inline-flex items-center max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-1.5 transition-all duration-300 ease-out overflow-hidden">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-2xl shadow-xl border border-white/25 focus:outline-none transition-all"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation"
        >
          <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
        </button>
      </div>

      {/* Mobile Drawer (Floating Glass Card) */}
      {isMenuOpen && (
        <div className="fixed top-24 right-4 left-4 z-50 pointer-events-auto max-w-md ml-auto">
          <div className="p-6 bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl lg:hidden transition-all duration-300">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleNavClick("#services")}
                className="text-left font-semibold text-slate-200 hover:text-blue-400 py-2.5 border-b border-slate-800 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick("#about")}
                className="text-left font-semibold text-slate-200 hover:text-blue-400 py-2.5 border-b border-slate-800 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick("#tech-stack")}
                className="text-left font-semibold text-slate-200 hover:text-blue-400 py-2.5 border-b border-slate-800 transition-colors"
              >
                Our Principles & Stack
              </button>
              <button
                onClick={() => handleNavClick("#portfolio")}
                className="text-left font-semibold text-slate-200 hover:text-blue-400 py-2.5 border-b border-slate-800 transition-colors"
              >
                Portfolio
              </button>
              <button
                onClick={() => handleNavClick("#contact")}
                className="text-left font-semibold text-slate-200 hover:text-blue-400 py-2.5 border-b border-slate-800 transition-colors"
              >
                Contact
              </button>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/get-quote");
                  }}
                  className="w-full py-3 font-semibold text-sm text-white/90 hover:text-white bg-transparent hover:bg-blue-600/20 border-2 border-transparent hover:border-blue-500 rounded-full shadow-lg hover:shadow-blue-500/20 flex items-center justify-center group transition-all duration-300"
                >
                  <span>Get a Quote</span>
                  <span className="inline-flex items-center max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[24px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-1.5 transition-all duration-300 ease-out overflow-hidden">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
