import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhiteMenuOpen, setIsWhiteMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollDirection, setScrollDirection] = useState("idle");
  const [isAtTop, setIsAtTop] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Track scroll position for active section & scroll direction / top status
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Detect if at top of page (Home Hero state: 0 to 120px threshold)
      if (currentScrollY < 120) {
        setIsAtTop(true);
        setScrollDirection("idle");
      } else {
        setIsAtTop(false);
        // Scroll direction with threshold to prevent micro-jitter
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          if (currentScrollY > lastScrollY) {
            setScrollDirection("down");
          } else {
            setScrollDirection("up");
          }
        }
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;

      // 2. Active Section detection for home page with anchor intersection
      if (location.pathname === "/") {
        if (currentScrollY < 180) {
          setActiveSection("");
        } else {
          const vh = window.innerHeight || document.documentElement.clientHeight || 800;
          const anchor = vh * 0.35;

          const sectionList = [
            { id: "services", target: "#services" },
            { id: "services2", target: "#services" },
            { id: "about", target: "#about" },
            { id: "portfolio", target: "#portfolio" },
            { id: "contact", target: "#contact" },
          ];

          let matched = "";
          for (let i = 0; i < sectionList.length; i++) {
            const el = document.getElementById(sectionList[i].id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= anchor && rect.bottom > anchor) {
                matched = sectionList[i].target;
                break;
              }
            }
          }

          // Safety check near page bottom (e.g. contact section at the end of page)
          if (
            !matched &&
            window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 60
          ) {
            matched = "#contact";
          }

          setActiveSection(matched);
        }
      } else {
        setActiveSection("");
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    setIsWhiteMenuOpen(false);
    setActiveSection(sectionId);
    const findTarget = (id) => document.querySelector(id);

    const performScroll = () => {
      const section = findTarget(sectionId);
      if (section) {
        const y = section.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(performScroll, 150);
    } else {
      performScroll();
    }
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    setIsWhiteMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Visibility states
  // Mode 1 (Hero Tab & Glass Pill): Visible ONLY when at the very top (isAtTop)
  // Mode 2 (Full-Width White Navbar): Visible ONLY when NOT at top and scrolling UP (!isAtTop && scrollDirection === "up")
  const showWhiteNavbar = !isAtTop && scrollDirection === "up";

  return (
    <>
      {/* =========================================================================
          MODE 1: UNIFIED HERO TOP BAR, FRAME & BRAND TAB
          (Grouped in one single container to transition seamlessly as one solid piece)
          ========================================================================= */}
      <div
        className={`fixed inset-0 pointer-events-none z-40 transition-opacity duration-1000 ease-in-out ${
          isAtTop ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Fixed Top White Bar */}
        <div className="absolute top-0 left-0 right-0 h-3 sm:h-4 md:h-4 bg-white pointer-events-none"></div>

        {/* Fixed Left White Frame (Full Height of Screen) */}
        <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-6 md:w-8 bg-white pointer-events-none"></div>

        {/* Top Left Brand Tab with Organic Concave Curves */}
        <div className="absolute top-0 left-0 pointer-events-auto">
          <div className="relative bg-white text-slate-900 pt-3.5 pb-4 px-6 sm:pt-4 sm:pb-5 sm:px-8 md:pt-5 md:pb-6 md:px-10 rounded-br-[34px] md:rounded-br-[44px] flex flex-col cursor-pointer transition-all duration-200">
            {/* Brand Logo */}
            <div onClick={handleLogoClick} className="flex items-center">
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
              className="absolute -bottom-[28px] left-4 sm:left-6 md:left-8 lg:left-10 w-[28px] h-[28px] pointer-events-none"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path d="M 0,0 L 0,28 C 0,12.5 12.5,0 28,0 Z" fill="#ffffff" />
            </svg>
          </div>
        </div>

        {/* Top Right Floating Glassy Pill Capsule */}
        <div className="absolute top-6 md:top-7 lg:top-8 right-4 md:right-8 lg:right-10 pointer-events-auto">
          {/* Desktop Pill Menu */}
          <nav className="hidden lg:flex items-center gap-6 bg-white/[0.08] backdrop-blur-xl px-6 py-2.5 rounded-full shadow-xl shadow-black/20 border border-white/25">
            <button
              onClick={() => handleNavClick("#services")}
              className={`relative text-xs md:text-sm font-semibold transition-colors py-1 group ${
                activeSection === "#services" ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              <span>Services</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out rounded-full ${
                  activeSection === "#services" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
            <button
              onClick={() => handleNavClick("#about")}
              className={`relative text-xs md:text-sm font-semibold transition-colors py-1 group ${
                activeSection === "#about" ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              <span>About Us</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out rounded-full ${
                  activeSection === "#about" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
            <button
              onClick={() => handleNavClick("#portfolio")}
              className={`relative text-xs md:text-sm font-semibold transition-colors py-1 group ${
                activeSection === "#portfolio" ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              <span>Portfolio</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out rounded-full ${
                  activeSection === "#portfolio" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className={`relative text-xs md:text-sm font-semibold transition-colors py-1 group ${
                activeSection === "#contact" ? "text-white" : "text-white/80 hover:text-white"
              }`}
            >
              <span>Contact</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ease-out rounded-full ${
                  activeSection === "#contact" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>

            {/* Blue Border Get a Quote CTA Button */}
            <button
              onClick={() => navigate("/get-quote")}
              className="px-4 py-1.5 text-xs md:text-sm font-semibold text-white bg-blue-600/20 hover:bg-blue-600 border border-blue-500 hover:border-blue-400 rounded-full shadow-md shadow-blue-500/20 transition-colors duration-200"
            >
              Get a Quote
            </button>
          </nav>

          {/* Mobile Menu Button for Mode 1 */}
          <button
            className="lg:hidden p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-2xl shadow-xl border border-white/25 focus:outline-none transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Mode 1 - Dark Glass) */}
      {isAtTop && isMenuOpen && (
        <div className="fixed top-24 right-4 left-4 z-50 pointer-events-auto max-w-md ml-auto">
          <div className="p-6 bg-slate-900/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl lg:hidden transition-all duration-300">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => handleNavClick("#services")}
                className={`text-left font-semibold py-2.5 border-b border-slate-800 transition-colors ${
                  activeSection === "#services" ? "text-blue-400" : "text-slate-200 hover:text-blue-400"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick("#about")}
                className={`text-left font-semibold py-2.5 border-b border-slate-800 transition-colors ${
                  activeSection === "#about" ? "text-blue-400" : "text-slate-200 hover:text-blue-400"
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => handleNavClick("#portfolio")}
                className={`text-left font-semibold py-2.5 border-b border-slate-800 transition-colors ${
                  activeSection === "#portfolio" ? "text-blue-400" : "text-slate-200 hover:text-blue-400"
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => handleNavClick("#contact")}
                className={`text-left font-semibold py-2.5 border-b border-slate-800 transition-colors ${
                  activeSection === "#contact" ? "text-blue-400" : "text-slate-200 hover:text-blue-400"
                }`}
              >
                Contact
              </button>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/get-quote");
                  }}
                  className="w-full py-3 font-semibold text-sm text-white bg-blue-600/20 hover:bg-blue-600 border border-blue-500 hover:border-blue-400 rounded-full shadow-lg shadow-blue-500/20 transition-colors duration-200 text-center"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 2: 2ND IMAGE STYLE (FULL-WIDTH CLEAN WHITE STICKY NAVBAR ON SCROLL-UP)
          ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${
          showWhiteNavbar
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 md:h-20 py-1.5 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <div onClick={handleLogoClick} className="flex items-center cursor-pointer select-none">
            <Logo size="normal" />
          </div>

          {/* Center: Navigation Links with Underline Animation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <button
              onClick={() => handleNavClick("#services")}
              className={`relative text-xs md:text-sm font-semibold transition-colors py-1 group ${
                activeSection === "#services" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              <span>Services</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ease-out rounded-full ${
                  activeSection === "#services" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
            <button
              onClick={() => handleNavClick("#about")}
              className={`relative text-xs md:text-sm font-semibold transition-colors py-1 group ${
                activeSection === "#about" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              <span>About Us</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ease-out rounded-full ${
                  activeSection === "#about" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
            <button
              onClick={() => handleNavClick("#portfolio")}
              className={`relative text-xs md:text-sm font-semibold transition-colors py-1 group ${
                activeSection === "#portfolio" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              <span>Portfolio</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ease-out rounded-full ${
                  activeSection === "#portfolio" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className={`relative text-xs md:text-sm font-semibold transition-colors py-1 group ${
                activeSection === "#contact" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              <span>Contact</span>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all duration-300 ease-out rounded-full ${
                  activeSection === "#contact" ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </button>
          </nav>

          {/* Right: CTA Button (White Background + Blue Border) & Mobile Hamburger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/get-quote")}
              className="px-5 py-2 text-xs md:text-sm font-semibold text-slate-900 bg-white hover:bg-blue-600 hover:text-white border-2 border-blue-500 hover:border-blue-600 rounded-full shadow-sm transition-all duration-200 active:scale-95"
            >
              Get a Quote
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
              onClick={() => setIsWhiteMenuOpen(!isWhiteMenuOpen)}
              aria-label="Toggle navigation"
            >
              <i className={`fas ${isWhiteMenuOpen ? "fa-times" : "fa-bars"} text-lg`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown for White Sticky Header */}
        {isWhiteMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 shadow-xl transition-all">
            <div className="flex flex-col space-y-2.5">
              <button
                onClick={() => handleNavClick("#services")}
                className={`text-left font-semibold py-2 border-b border-slate-100 transition-colors ${
                  activeSection === "#services" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                }`}
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick("#about")}
                className={`text-left font-semibold py-2 border-b border-slate-100 transition-colors ${
                  activeSection === "#about" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => handleNavClick("#portfolio")}
                className={`text-left font-semibold py-2 border-b border-slate-100 transition-colors ${
                  activeSection === "#portfolio" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                }`}
              >
                Portfolio
              </button>
              <button
                onClick={() => handleNavClick("#contact")}
                className={`text-left font-semibold py-2 border-b border-slate-100 transition-colors ${
                  activeSection === "#contact" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                }`}
              >
                Contact
              </button>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsWhiteMenuOpen(false);
                    navigate("/get-quote");
                  }}
                  className="w-full py-3 font-semibold text-sm text-slate-900 bg-white hover:bg-blue-600 hover:text-white border-2 border-blue-500 hover:border-blue-600 rounded-full shadow-md transition-all duration-200 text-center"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
