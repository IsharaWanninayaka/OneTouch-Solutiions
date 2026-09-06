import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      <div className="container px-4 mx-auto md:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div onClick={() => navigate("/")}>
              <Logo variant="light" size="normal" />
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Engineering high-performance web applications, mobile platforms, enterprise software, and integrated IoT hardware systems for global innovation.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com/onetouchso88573?t=2Fmp880ebWi7aKWbXRCulA&s=08"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 text-slate-300 hover:bg-blue-600 hover:text-white border border-slate-800 flex items-center justify-center transition-all"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61582138145189&mibextid=LQQJ4d"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 text-slate-300 hover:bg-blue-600 hover:text-white border border-slate-800 flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/oone-touch-solutions/about/?viewAsMember=true"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 text-slate-300 hover:bg-blue-600 hover:text-white border border-slate-800 flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
              <a
                href="https://www.instagram.com/ishar_a675?igsh=MTg2ZnBwemw4dDVuMA%3D%3D&utm_source=qr"
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 text-slate-300 hover:bg-blue-600 hover:text-white border border-slate-800 flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-sm"></i>
              </a>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">Web Development</a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">Custom Web Apps</a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">Mobile Applications</a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">IoT & Hardware</a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-blue-400 transition-colors">Cloud Architecture</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate("/more-about")} className="hover:text-blue-400 transition-colors text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/our-work")} className="hover:text-blue-400 transition-colors text-left">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/get-quote")} className="hover:text-blue-400 transition-colors text-left">
                  Request Quote
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/start-project")} className="hover:text-blue-400 transition-colors text-left">
                  Start Project
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Office & Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <i className="fas fa-map-marker-alt text-blue-400 mt-1"></i>
                <span>Katunayaka, Sri Lanka</span>
              </li>
              <li className="flex items-start gap-2.5">
                <i className="fas fa-phone-alt text-blue-400 mt-1"></i>
                <span>+94 71 469 8430</span>
              </li>
              <li className="flex items-start gap-2.5">
                <i className="fas fa-envelope text-blue-400 mt-1"></i>
                <a href="mailto:contact@onetouchsolutions.lk" className="hover:text-blue-400 transition-colors">
                  contact@onetouchsolutions.lk
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} OneTouch Solutions. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/privacy-policy")} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate("/terms-of-service")} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <button onClick={() => navigate("/cookie-policy")} className="hover:text-white transition-colors">
              Cookie Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
