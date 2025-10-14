import React, { useState, useEffect } from "react";

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

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
    <div className="fixed z-50 p-6 text-white bg-gray-800 shadow-2xl bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md rounded-xl">
      <h3 className="mb-2 text-lg font-bold">Cookie Consent</h3>
      <p className="mb-4 text-sm text-gray-300">
        We use cookies to enhance your experience and analyze our traffic. By
        clicking "Accept All", you consent to our use of cookies.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={acceptCookies}
          className="px-4 py-2 text-white transition duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Accept All
        </button>
        <button
          onClick={rejectCookies}
          className="px-4 py-2 text-white transition duration-300 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          Reject Non-Essential
        </button>
        <a
          href="/cookie-policy"
          className="py-2 text-sm text-center text-indigo-300 transition duration-300 hover:text-indigo-100"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

export default CookieConsent;
