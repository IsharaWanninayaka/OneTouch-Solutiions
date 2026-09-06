import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800/80 py-3"
          : "bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent py-5"
      }`}
    >
      <div className="container px-4 mx-auto md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div onClick={() => navigate("/")}>
            <Logo variant="light" size="normal" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden space-x-8 lg:flex items-center">
            <button
              onClick={() => handleNavClick("#home")}
              className="text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick("#services")}
              className="text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick("#portfolio")}
              className="text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              Portfolio
            </button>
            <button
              onClick={() => handleNavClick("#tech-stack")}
              className="text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              Capabilities
            </button>
            <button
              onClick={() => handleNavClick("#about")}
              className="text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("#contact")}
              className="text-sm font-medium text-slate-200 hover:text-blue-400 transition-colors py-1"
            >
              Contact
            </button>
          </nav>

          {/* CTA Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => navigate("/get-quote")}
              className="relative group inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-500 shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get a Quote</span>
              <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <button
            className="p-2 text-slate-200 lg:hidden focus:outline-none rounded-lg hover:bg-slate-800/60"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="mt-4 p-5 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl lg:hidden transition-all duration-300">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavClick("#home")}
                className="text-left font-medium text-slate-200 hover:text-blue-400 py-2 border-b border-slate-800/60"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("#services")}
                className="text-left font-medium text-slate-200 hover:text-blue-400 py-2 border-b border-slate-800/60"
              >
                Services
              </button>
              <button
                onClick={() => handleNavClick("#portfolio")}
                className="text-left font-medium text-slate-200 hover:text-blue-400 py-2 border-b border-slate-800/60"
              >
                Portfolio
              </button>
              <button
                onClick={() => handleNavClick("#tech-stack")}
                className="text-left font-medium text-slate-200 hover:text-blue-400 py-2 border-b border-slate-800/60"
              >
                Capabilities & Stack
              </button>
              <button
                onClick={() => handleNavClick("#about")}
                className="text-left font-medium text-slate-200 hover:text-blue-400 py-2 border-b border-slate-800/60"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick("#contact")}
                className="text-left font-medium text-slate-200 hover:text-blue-400 py-2 border-b border-slate-800/60"
              >
                Contact
              </button>
              
              <div className="pt-2 flex flex-col space-y-3">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/get-quote");
                  }}
                  className="w-full py-3 font-semibold text-center text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/30"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
