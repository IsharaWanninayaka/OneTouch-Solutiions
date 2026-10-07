import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from './components/Loading'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Services2 from './components/Services2'
import Contact from './components/Contact'
import GoogleReviews from './components/GoogleReviews'
import Footer from './components/Footer'
import StartProject from './pages/StartProject'
import ViewOurWork from './pages/ViewOurWork'
import GetQuote from './pages/GetQuote'
import MoreAbout from './pages/MoreAbout'
import PrivacyPolicy from './pages/Privacy&Policy'
import TermsOfService from './pages/TearmsOfService'
import CookiePolicy from './pages/CookiePolicy'
import CookieConsent from './pages/CookieConsentBanner'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef(null);

  // Measure Footer height accurately for Elementor-style Sticky Footer Reveal on Scroll
  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateHeight();

    let ro;
    if (footerRef.current && window.ResizeObserver) {
      ro = new ResizeObserver(() => updateHeight());
      ro.observe(footerRef.current);
    }

    window.addEventListener("resize", updateHeight);
    const timer = setTimeout(updateHeight, 400);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", updateHeight);
      clearTimeout(timer);
    };
  }, [isLoading]);

  return (
    <Router>
      {isLoading && <Loading duration={3500} onComplete={() => setIsLoading(false)} />}
      <div className="App bg-slate-950 min-h-screen font-sans text-slate-100 antialiased selection:bg-blue-600 selection:text-white">

        {/* Main Content Wrapper - Sits ON TOP of the fixed footer (z-10) with marginBottom equal to footer height */}
        <div
          className="relative z-10 bg-slate-950 transition-[margin] duration-150 ease-out"
          style={{
            marginBottom: `${footerHeight}px`,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.9)",
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={
              <main>
                <Hero isLoaded={!isLoading} />
                <Services />
                <Services2 />
                <About />
                <Portfolio />
                <Contact />
                <GoogleReviews />
              </main>
            } />
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/more-about" element={<MoreAbout />} />
            <Route path="/start-project" element={<StartProject />} />
            <Route path="/our-work" element={<ViewOurWork />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>
          <CookieConsent />
        </div>

        {/* Fixed Sticky Footer Underneath (z-0) - Revealed seamlessly as content scrolls past */}
        <Footer ref={footerRef} />

        {/* Global floating scroll button */}
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
