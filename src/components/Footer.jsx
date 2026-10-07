import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const Footer = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNav = (path) => {
    if (path.startsWith("#")) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(path);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={ref}
      className="w-full text-slate-300 relative overflow-hidden select-none"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 0,
        background: "radial-gradient(130% 100% at 50% 0%, #0c1938 0%, #070e22 50%, #020617 100%)",
      }}
    >
      {/* Ambient Top Glow & Blue Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute -top-24 left-1/4 w-96 h-48 bg-blue-600/15 blur-[95px] rounded-full pointer-events-none" />
      <div className="absolute -top-24 right-1/4 w-96 h-48 bg-sky-500/15 blur-[95px] rounded-full pointer-events-none" />

      {/* Main Footer Content Container */}
      <div className="container px-5 sm:px-8 mx-auto pt-14 md:pt-16 pb-10 relative z-10">

        {/* Top Grid: Brand & Info + 3 Menu Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800/80">

          {/* Left Side: Brand Logo, Headline, Paragraph, Demo Button & Socials */}
          <div className="lg:col-span-5 space-y-6">

            {/* Brand Logo & Name with Real Transparent Logo Icon */}
            <div
              onClick={() => handleNav("/")}
              className="inline-flex items-center gap-3.5 cursor-pointer group"
            >
              <img
                src="/images/logo-icon-transparent.png"
                alt="OneTouch Solutions"
                className="w-11 h-11 object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.45)] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tight flex items-center font-sans leading-none">
                  One<span className="text-sky-400">Touch</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.28em] text-slate-300 mt-1.5">
                  Solutions
                </span>
              </div>
            </div>

            {/* Headline matching image */}
            <h3 className="text-xl sm:text-2xl lg:text-[1.65rem] font-bold text-white tracking-tight leading-snug">
              Empowering global growth with modern FinTech & digital systems.
            </h3>

            {/* Subtext description */}
            <p className="text-sm text-slate-300/80 max-w-md leading-relaxed">
              We specialize in custom financial software development, enterprise business modules,
              and high-performance digital platforms tailored for your business success.
            </p>


            {/* Social Icons Row - Large sky-blue icons without circular backgrounds */}
            <div className="flex items-center gap-6 sm:gap-7 pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61582138145189&mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-white transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-2xl sm:text-[1.7rem]"></i>
              </a>
              <a
                href="https://wa.me/94714698430"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-white transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp text-2xl sm:text-[1.85rem]"></i>
              </a>
              <a
                href="https://www.instagram.com/ishar_a675?igsh=MTg2ZnBwemw4dDVuMA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-white transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-2xl sm:text-[1.75rem]"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/oone-touch-solutions/about/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-white transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-2xl sm:text-[1.75rem]"></i>
              </a>
              <a
                href="https://x.com/onetouchso88573?t=2Fmp880ebWi7aKWbXRCulA&s=08"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-white transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                aria-label="Twitter"
              >
                <i className="fab fa-x-twitter text-2xl sm:text-[1.75rem]"></i>
              </a>
            </div>

          </div>

          {/* Right Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6 lg:pl-6">

            {/* Col 1: MENU */}
            <div>
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-5">
                MENU
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => handleNav("/")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("/more-about")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Company
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("#services")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("/our-work")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Careers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("/our-work")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Insights & Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: LEGAL */}
            <div>
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-5">
                LEGAL
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => handleNav("/privacy-policy")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("/privacy-policy")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Security Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("/terms-of-service")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("/cookie-policy")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Legal Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("/start-project")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Admin Sign In
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: MORE PRODUCTS / SOLUTIONS */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-5">
                MORE PRODUCTS
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => handleNav("/our-work")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    OneTouch Cloud
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("#services")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Microfinance Portal
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("#services")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    OneTouch Notify SMS
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("/our-work")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    Pawning Management
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("/our-work")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    HRM System
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav("#services")} className="text-slate-300/80 hover:text-white hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left">
                    CRM Platform
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Legal, Copyright & Built with line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 relative z-20">
          <p>© {new Date().getFullYear()} OneTouch Solutions. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>Built with <span className="text-blue-400">♥</span> by OneTouch Team</span>
          </div>
        </div>

      </div>

      {/* Giant Background Watermark Text "ONETOUCH" */}
      <div
        className="absolute -bottom-4 sm:-bottom-8 md:-bottom-12 lg:-bottom-16 left-0 right-0 text-center pointer-events-none select-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <span className="text-[17vw] sm:text-[16vw] md:text-[14vw] font-black uppercase text-white/[0.035] tracking-widest leading-none font-sans block whitespace-nowrap">
          ONETOUCH
        </span>
      </div>

      {/* Floating Scroll To Top Button (Bottom Right) with Brand Blue Gradient */}


    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
