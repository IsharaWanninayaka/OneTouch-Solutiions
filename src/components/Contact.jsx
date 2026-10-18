import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import PopupAlert from "./Alert";
import ErrorPopup from "./ErrorPopup";

/*
  Light mode contact section:
  Two panels with crisp 2px blue outline borders and smooth continuous curves
*/

const styles = `
  .ot-panel {
    position: relative;
    border-radius: 2.25rem;
    color: #0f172a;
    transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
  }
  .ot-panel.details {
    border: none;
    border-radius: 2.25rem;
    background: transparent;
    filter: drop-shadow(0 20px 40px rgba(37, 99, 235, 0.08)) drop-shadow(0 2px 6px rgba(15, 23, 42, 0.03));
  }
  .ot-panel.details:hover {
    filter: drop-shadow(0 25px 50px rgba(37, 99, 235, 0.13)) drop-shadow(0 4px 10px rgba(15, 23, 42, 0.04));
    transform: translateY(-2px);
  }
  .ot-panel.form {
    border: 2px solid #2563eb;
    border-radius: 2.25rem;
    overflow: hidden;
    background: linear-gradient(145deg, #ffffff 0%, rgba(239, 246, 255, 0.4) 50%, #ffffff 100%);
    box-shadow: 0 20px 50px -15px rgba(37, 99, 235, 0.07), 0 2px 8px rgba(15, 23, 42, 0.02);
  }
  .ot-panel.form:hover {
    box-shadow: 0 25px 60px -15px rgba(37, 99, 235, 0.12), 0 4px 12px rgba(15, 23, 42, 0.03);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    .ot-panel.details {
      border-top-right-radius: 1.75rem;
      border-bottom-right-radius: 1.75rem;
      border-bottom-left-radius: 1.75rem;
    }
    .ot-panel.form { border-radius: 1.75rem; }
  }

  .ot-pill-input {
    width: 100%;
    padding: 0.85rem 1.35rem;
    border-radius: 9999px;
    background: #ffffff;
    border: 1.5px solid #cbd5e1;
    color: #0f172a;
    font-size: 0.925rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ot-pill-input::placeholder { color: #94a3b8; }
  .ot-pill-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    background: #ffffff;
  }

  .ot-pill-textarea {
    width: 100%;
    padding: 0.9rem 1.35rem;
    border-radius: 1.5rem;
    background: #ffffff;
    border: 1.5px solid #cbd5e1;
    color: #0f172a;
    font-size: 0.925rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .ot-pill-textarea::placeholder { color: #94a3b8; }
  .ot-pill-textarea:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    background: #ffffff;
  }

  .ot-field-group {
    position: relative;
    padding-top: 0.5rem;
  }
  .ot-field-label {
    position: absolute;
    left: 1.25rem;
    top: 0;
    background: #ffffff;
    padding: 0 0.45rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #475569;
    pointer-events: none;
    transition: color 0.2s ease, font-weight 0.2s ease;
    z-index: 10;
  }
  .ot-field-group:focus-within .ot-field-label {
    color: #2563eb;
  }

  @keyframes arrowSwipeRight {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(5px);
    }
  }
  .group:hover .arrow-swipe {
    animation: arrowSwipeRight 0.8s ease-in-out infinite;
  }
`;

function Contact() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const hasAnimatedRef = useRef(false);

  // 1. Scroll detection for section arrival (matching About Us pattern)
  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // Section enters viewport
      const inView = rect.top <= vh * 0.82 && rect.bottom > 100;
      setIsVisible(inView);
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

  // 2. Typing animation triggered when section enters view (matching About Us)
  useEffect(() => {
    let intervalId = null;

    if (isVisible) {
      if (!hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        let i = 0;
        const fullText = "Get in touch";
        setTypedText("");
        setIsTyping(true);

        intervalId = setInterval(() => {
          i++;
          setTypedText(fullText.slice(0, i));
          if (i >= fullText.length) {
            clearInterval(intervalId);
            setIsTyping(false);
          }
        }, 85);
      }
    } else {
      hasAnimatedRef.current = false;
      setTypedText("");
      setIsTyping(false);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isVisible]);

  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const retrySendFunction = () => {
    setShowError(false);
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      setShowError(true);
      return;
    }
    if (!formData.contactNo.trim()) {
      setErrorMessage("Please enter your contact number.");
      setShowError(true);
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email.");
      setShowError(true);
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      setShowError(true);
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE1_ID,
        {
          name: formData.name,
          contactNo: formData.contactNo,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          to_email:
            "ishara@onetouchsolutions.lk,namal@onetouchsolutions.lk,dinesh@onetouchsolutions.lk",
          reply_to: formData.email,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setShowSuccessAlert(true);

      setFormData({
        name: "",
        contactNo: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Email send failed:", error);
      setErrorMessage(
        error.message ||
        "Unable to send message. Please check your network and try again."
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    { href: "https://x.com/onetouchso88573?t=2Fmp880ebWi7aKWbXRCulA&s=08", icon: "fab fa-twitter", label: "Twitter" },
    { href: "https://www.facebook.com/profile.php?id=61582138145189&mibextid=LQQJ4d", icon: "fab fa-facebook-f", label: "Facebook" },
    { href: "https://www.linkedin.com/company/oone-touch-solutions/about/?viewAsMember=true", icon: "fab fa-linkedin-in", label: "LinkedIn" },
    { href: "https://www.instagram.com/ishar_a675?igsh=MTg2ZnBwemw4dDVuMA%3D%3D&utm_source=qr", icon: "fab fa-instagram", label: "Instagram" },
  ];

  const labelClass = "block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5";
  const iconBox =
    "w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center flex-shrink-0 text-sm";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-10 md:py-14 lg:py-16 select-none"
    >
      <style>{styles}</style>

      {/* Layered Ambient Mesh Depth (Soft Lighting behind cards) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[360px] bg-gradient-to-tr from-blue-100/35 via-indigo-50/25 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-blue-50/45 rounded-full blur-2xl pointer-events-none -z-0" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-blue-50/35 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
        {/* Heading on white with scroll animation */}
        <div
          className={`max-w-3xl mb-6 md:mb-8 transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900 mb-2.5">
            Let's Build Something{" "}
            <span className="gradient-text font-black">Extraordinary</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Have a project in mind or need technical consultation? Reach out to
            our engineering team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* ---------- Details panel with scroll animation ---------- */}
          <div
            className={`lg:col-span-5 flex flex-col transition-all duration-700 ease-out delay-150 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="ot-panel details h-full flex flex-col relative">
              {/* Unified Details Card SVG: Background + Seamless Blue Border + Curve Art */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                style={{ overflow: "visible" }}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="detailsCardBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="50%" stopColor="#eff6ff" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                  <mask id="notchCutoutMask" maskUnits="userSpaceOnUse" x="0" y="0" width="4000" height="4000">
                    <rect x="0" y="0" width="4000" height="4000" fill="white" />
                    {/* Desktop Cutout (Precisely bounds from (208,1) along S-curve to (1,84)) */}
                    <path
                      className="hidden sm:block"
                      d="M -20,-20 L 208,-20 L 208,1 A 28,28 0 0 0 180,28 A 28,28 0 0 1 152,56 L 28,56 A 28,28 0 0 0 1,84 L -20,84 Z"
                      fill="black"
                    />
                    {/* Mobile Cutout (Precisely bounds from (174,1) along S-curve to (1,72)) */}
                    <path
                      className="block sm:hidden"
                      d="M -20,-20 L 174,-20 L 174,1 A 24,24 0 0 0 150,24 A 24,24 0 0 1 126,48 L 24,48 A 24,24 0 0 0 1,72 L -20,72 Z"
                      fill="black"
                    />
                  </mask>
                </defs>

                {/* Desktop Card (Background + Seamless Blue Outline with perfect 36px rounded corners) */}
                <rect
                  className="hidden sm:block"
                  x="1"
                  y="1"
                  style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
                  rx="36"
                  ry="36"
                  fill="url(#detailsCardBgGrad)"
                  stroke="#2563eb"
                  strokeWidth="2"
                  mask="url(#notchCutoutMask)"
                />

                {/* Mobile Card (Background + Seamless Blue Outline with perfect 28px rounded corners) */}
                <rect
                  className="block sm:hidden"
                  x="1"
                  y="1"
                  style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
                  rx="28"
                  ry="28"
                  fill="url(#detailsCardBgGrad)"
                  stroke="#2563eb"
                  strokeWidth="2"
                  mask="url(#notchCutoutMask)"
                />

                {/* Desktop Notch S-Curve Border (Seamlessly connects to rect at (1,84) and (208,1)) */}
                <path
                  className="hidden sm:block"
                  d="M 1,84 A 28,28 0 0 1 28,56 L 152,56 A 28,28 0 0 0 180,28 A 28,28 0 0 1 208,1"
                  stroke="#2563eb"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Mobile Notch S-Curve Border (Seamlessly connects to rect at (1,72) and (174,1)) */}
                <path
                  className="block sm:hidden"
                  d="M 1,72 A 24,24 0 0 1 24,48 L 126,48 A 24,24 0 0 0 150,24 A 24,24 0 0 1 174,1"
                  stroke="#2563eb"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              {/* "Get in touch" label inside the transparent notch with typing animation */}
              <div className="absolute top-0 left-0 w-[174px] sm:w-[208px] h-[48px] sm:h-[56px] flex items-center justify-center z-10 pointer-events-none">
                <div className="flex items-center">
                  <span className="text-slate-900 font-bold text-sm sm:text-base tracking-wide">
                    {typedText}
                  </span>
                  {/* Blinking typing cursor (matching dark text) */}
                  {(isTyping || (isVisible && typedText.length > 0)) && (
                    <span
                      className={`inline-block w-[2px] sm:w-[2.5px] h-[1.15em] bg-slate-900 ml-1 align-middle transition-opacity duration-150 ${isTyping ? "opacity-100" : "animate-pulse"
                        }`}
                    />
                  )}
                </div>
              </div>

              <div className="relative z-10 p-6 sm:p-7 md:p-8 pt-20 sm:pt-22 md:pt-24 flex flex-col flex-grow justify-between">
                <div>
                  <div className="space-y-4 sm:space-y-5">
                    <div className="flex items-start gap-3.5">
                      <div className={iconBox}><i className="fas fa-map-marker-alt"></i></div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Headquarters</div>
                        <div className="text-sm sm:text-base font-semibold mt-0.5 text-slate-900">No 27, Halgasthota, Katunayaka</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className={iconBox}><i className="fas fa-phone-alt"></i></div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Phone support</div>
                        <div className="text-sm sm:text-base font-semibold mt-0.5 space-y-0.5 text-slate-900">
                          <div>+94 71 469 8430</div>
                          <div>+94 70 604 1212</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className={iconBox}><i className="fas fa-envelope"></i></div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Official email</div>
                        <div className="text-xs sm:text-sm md:text-base font-semibold mt-0.5 space-y-0.5 break-all sm:break-normal text-slate-900">
                          <div>
                            <a href="mailto:contact@onetouchsolutions.lk" className="hover:text-blue-600 transition-colors">
                              contact@onetouchsolutions.lk
                            </a>
                          </div>
                          <div>
                            <a href="mailto:support@onetouchsolutions.lk" className="hover:text-blue-600 transition-colors">
                              support@onetouchsolutions.lk
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200">
                  <div className="text-xs font-medium text-slate-400 mb-3">Connect with us</div>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                      >
                        <i className={s.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---------- Form panel with scroll animation ---------- */}
          <div
            className={`lg:col-span-7 flex flex-col transition-all duration-700 ease-out delay-300 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            <div className="ot-panel form h-full flex flex-col bg-gradient-to-br from-white via-blue-50/20 to-white shadow-[0_20px_50px_-15px_rgba(37,99,235,0.07)]">
              <div className="relative z-10 p-6 sm:p-7 md:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 text-slate-900">Send us a direct message</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mb-5 md:mb-6">
                    Fill out the form below and our lead engineer will respond within 24 hours.
                  </p>
                </div>

                <form id="contact-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-4 sm:space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="ot-field-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="ot-pill-input"
                        />
                        <label className="ot-field-label" htmlFor="name">
                          Your name <span className="text-blue-600">*</span>
                        </label>
                      </div>
                      <div className="ot-field-group">
                        <input
                          type="text"
                          id="contactNo"
                          name="contactNo"
                          value={formData.contactNo}
                          onChange={handleChange}
                          placeholder="+94 77 123 4567"
                          className="ot-pill-input"
                        />
                        <label className="ot-field-label" htmlFor="contactNo">
                          Contact number <span className="text-blue-600">*</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <div className="ot-field-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@company.com"
                          className="ot-pill-input"
                        />
                        <label className="ot-field-label" htmlFor="email">
                          Email address <span className="text-blue-600">*</span>
                        </label>
                      </div>
                      <div className="ot-field-group">
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Corp"
                          className="ot-pill-input"
                        />
                        <label className="ot-field-label" htmlFor="company">
                          Company / organization
                        </label>
                      </div>
                    </div>

                    <div className="ot-field-group">
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Tell us about your project goals, timelines, or technology requirements..."
                        className="ot-pill-textarea resize-none"
                      ></textarea>
                      <label className="ot-field-label" htmlFor="message">
                        Project overview / message <span className="text-blue-600">*</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3 sm:pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group py-3 px-7 sm:px-8 text-xs sm:text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 disabled:opacity-70 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 flex items-center justify-center gap-2.5 whitespace-nowrap active:scale-[0.98]"
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin text-xs"></i>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send project request</span>
                          <i className="fas fa-arrow-right text-xs arrow-swipe transition-transform duration-200"></i>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <PopupAlert
          isOpen={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          title="Message Sent!"
          message="Thank you! Your inquiry was sent successfully. Our team will contact you shortly."
          type="success"
          confirmButtonText="OK"
          animation="scale"
        />
      )}

      {/* Error / Network Popup */}
      <ErrorPopup
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Could not send message"
        message={errorMessage}
        type="validation"
        showRetryButton={true}
        onRetry={retrySendFunction}
      />
    </section>
  );
}

export default Contact;