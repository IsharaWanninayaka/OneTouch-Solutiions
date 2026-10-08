import React from "react";
import { useNavigate } from "react-router-dom";

// Rounded-corner "fillets" that blend notches into the card/footer edge.
const R = 28;
const filletPaths = {
  tr: `M0,0 L${R},0 A${R},${R} 0 0 0 0,${R} Z`,
  bl: `M0,0 L0,${R} A${R},${R} 0 0 0 ${R},0 Z`,
  br: `M0,${R} L${R},${R} L${R},0 A${R},${R} 0 0 1 0,${R} Z`,
  tl: `M${R},0 L0,0 L0,${R} A${R},${R} 0 0 1 ${R},0 Z`,
};

function Fillet({ at = "tr", style, fill = "#ffffff" }) {
  return (
    <svg
      className="absolute pointer-events-none"
      width={R}
      height={R}
      viewBox={`0 0 ${R} ${R}`}
      style={style}
      aria-hidden="true"
    >
      <path d={filletPaths[at]} fill={fill} />
    </svg>
  );
}

const linkClass =
  "text-slate-300/80 hover:text-sky-300 hover:translate-x-1 transition-all duration-200 text-left";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582138145189&mibextid=LQQJ4d",
    icon: "fab fa-facebook-f",
    size: "text-2xl sm:text-[1.7rem]",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/94714698430",
    icon: "fab fa-whatsapp",
    size: "text-2xl sm:text-[1.85rem]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ishar_a675?igsh=MTg2ZnBwemw4dDVuMA%3D%3D&utm_source=qr",
    icon: "fab fa-instagram",
    size: "text-2xl sm:text-[1.75rem]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/oone-touch-solutions/about/?viewAsMember=true",
    icon: "fab fa-linkedin-in",
    size: "text-2xl sm:text-[1.75rem]",
  },
  {
    label: "Twitter",
    href: "https://x.com/onetouchso88573?t=2Fmp880ebWi7aKWbXRCulA&s=08",
    icon: "fab fa-x-twitter",
    size: "text-2xl sm:text-[1.75rem]",
  },
];

const menuLinks = [
  { label: "Home", path: "/" },
  { label: "Company", path: "/more-about" },
  { label: "Services", path: "#services" },
  { label: "Careers", path: "/our-work" },
  { label: "Insights & Blog", path: "/our-work" },
];

const legalLinks = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Security Policy", path: "/privacy-policy" },
  { label: "Terms of Service", path: "/terms-of-service" },
  { label: "Legal Policy", path: "/cookie-policy" },
  { label: "Admin Sign In", path: "/start-project" },
];

const productLinks = [
  { label: "OneTouch Cloud", path: "/our-work" },
  { label: "Microfinance Portal", path: "#services" },
  { label: "OneTouch Notify SMS", path: "#services" },
  { label: "Pawning Management", path: "/our-work" },
  { label: "HRM System", path: "/our-work" },
  { label: "CRM Platform", path: "#services" },
];

const Footer = () => {
  const navigate = useNavigate();

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

  const renderLinks = (links) => (
    <ul className="space-y-3 text-sm">
      {links.map((item) => (
        <li key={item.label}>
          <button onClick={() => handleNav(item.path)} className={linkClass}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="w-full text-slate-300 relative select-none bg-white pl-3 sm:pl-5 md:pl-7 lg:pl-8 pr-0 pt-2 sm:pt-3 md:pt-4 pb-3 sm:pb-5">
      {/* Framed footer card (extends fully to the right edge, no right white gap) */}
      <div
        className="relative w-full rounded-l-[28px] sm:rounded-l-[36px] rounded-r-none overflow-hidden"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 0%, #0c1938 0%, #070e22 50%, #020617 100%)",
        }}
      >
        {/* Ambient top glow & neon line (starts after notch on desktop) */}
        <div className="absolute top-0 left-0 lg:left-[42%] right-0 h-[1.5px] bg-gradient-to-r from-transparent via-sky-400/60 to-transparent shadow-[0_0_15px_rgba(56,189,248,0.4)] z-10" />
        <div className="absolute -top-24 left-[55%] w-96 h-48 bg-blue-600/10 blur-[95px] rounded-full pointer-events-none" />
        <div className="absolute -top-24 right-1/4 w-96 h-48 bg-sky-500/10 blur-[95px] rounded-full pointer-events-none" />

        {/* Top-left notch: pure white matching review section white */}
        <div
          className="hidden lg:block absolute top-0 left-0 z-30 pointer-events-none select-none"
          style={{ width: "42%", height: "56px" }}
        >
          <div
            className="w-full h-full relative rounded-br-[28px]"
            style={{ backgroundColor: "#ffffff" }}
          >
            {/* Where the notch meets the top edge (right side) */}
            <Fillet
              style={{ position: "absolute", left: "calc(100% - 1px)", top: 0 }}
              fill="#ffffff"
            />
            {/* Where the notch meets the card's left edge (below) */}
            <Fillet
              style={{ position: "absolute", left: 0, top: "calc(100% - 1px)" }}
              fill="#ffffff"
            />
          </div>
        </div>

        {/* Luminous ridge line – only along the flat part of the notch bottom */}
        <div
          className="hidden lg:block absolute z-10 pointer-events-none"
          style={{
            top: "56px",
            left: "28px",
            width: "calc(42% - 56px)",
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(56,189,248,0) 0%, rgba(56,189,248,0.5) 40%, rgba(56,189,248,0.6) 100%)",
            boxShadow: "0 0 10px rgba(56,189,248,0.4)",
          }}
        />



        {/* Main footer content */}
        <div className="container px-5 sm:px-8 md:px-10 mx-auto pt-16 sm:pt-20 lg:pt-24 pb-24 sm:pb-12 md:pb-10 relative z-10">
          {/* Top grid: brand + 3 menu columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-slate-800/80">
            {/* Left: headline, text, socials */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xl sm:text-2xl lg:text-[1.65rem] font-semisemibold  text-white tracking-tight leading-snug">
                Empowering global growth with modern FinTech & digital systems.
              </h3>

              <p className="text-sm text-slate-300/80 max-w-md leading-relaxed">
                We specialize in custom financial software development, enterprise
                business modules, and high-performance digital platforms tailored
                for your business success.
              </p>

              <div className="flex items-center gap-6 sm:gap-7 pt-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-white transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                    aria-label={s.label}
                  >
                    <i className={`${s.icon} ${s.size}`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: navigation columns */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6 lg:pl-6">
              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-5">
                  MENU
                </h4>
                {renderLinks(menuLinks)}
              </div>

              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-5">
                  LEGAL
                </h4>
                {renderLinks(legalLinks)}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-5">
                  MORE PRODUCTS
                </h4>
                {renderLinks(productLinks)}
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 relative z-20 pr-0 sm:pr-80">
            <p>© {new Date().getFullYear()} OneTouch Solutions. All rights reserved.</p>
            <div className="flex items-center gap-6">
              
            </div>
          </div>
        </div>

        {/* Bottom-Right Curved Notch with Official OneTouch Logo (Matches User Design Drawing) */}
        <div
          className="absolute bottom-0 right-0 z-30 select-none pointer-events-auto"
        >
          <div
            className="h-[68px] sm:h-[74px] md:h-[78px] relative rounded-tl-[32px] sm:rounded-tl-[36px] flex items-center px-6 sm:px-8 md:px-10"
            style={{ backgroundColor: "#ffffff" }}
          >
            {/* Inverted fillet at the bottom-left where notch meets the card bottom edge */}
            <Fillet
              at="br"
              style={{ position: "absolute", left: "-28px", bottom: 0 }}
              fill="#ffffff"
            />

            {/* Official OneTouch Logo inside the Notch */}
            <button
              onClick={() => handleNav("/")}
              className="inline-flex items-center cursor-pointer group focus:outline-none"
              title="OneTouch Solutions"
              aria-label="OneTouch Solutions Home"
            >
              <img
                src="/images/onetouch-logo-transparent.png"
                alt="OneTouch Solutions"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.src = "/images/logo7.jpg";
                }}
              />
            </button>
          </div>
        </div>

        {/* Giant background watermark */}
        <div
          className="absolute -bottom-3 sm:-bottom-6 md:-bottom-8 lg:-bottom-10 left-0 right-0 text-center pointer-events-none select-none overflow-hidden z-0"
          aria-hidden="true"
        >
          <span className="text-[13vw] sm:text-[12vw] md:text-[10.5vw] font-black uppercase text-white/[0.035] tracking-widest leading-none font-sans block whitespace-nowrap">
            ONETOUCH
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;