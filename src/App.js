import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from './components/Loading'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Services2 from './components/Services2'
import Contact from './components/Contact'
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

  return (
    <Router>
      {isLoading && <Loading duration={3500} onComplete={() => setIsLoading(false)} />}
      <div className="App bg-slate-950 min-h-screen font-sans text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
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
        <Footer />
        <CookieConsent />
        <ScrollToTop />
      </div>
    </Router>
  )
}

export default App