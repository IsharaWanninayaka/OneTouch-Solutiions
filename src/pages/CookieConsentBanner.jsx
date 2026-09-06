import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed z-50 bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md p-6 rounded-2xl bg-slate-900/95 border border-slate-800 backdrop-blur-xl shadow-2xl text-white">
      <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
        <i className="fas fa-cookie-bite"></i> Cookie Preferences
      </div>
      <h3 className="text-lg font-bold text-white mb-2">We value your privacy</h3>
      <p className="text-xs text-slate-300 mb-5 leading-relaxed">
        We use essential cookies to deliver high performance, analyze site interactions, and improve our engineering platform experience.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={acceptCookies}
          className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all"
        >
          Accept All
        </button>
        <button
          onClick={rejectCookies}
          className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
        >
          Essential Only
        </button>
        <button
          onClick={() => navigate("/cookie-policy")}
          className="text-xs text-slate-400 hover:text-blue-400 underline underline-offset-4 transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;
