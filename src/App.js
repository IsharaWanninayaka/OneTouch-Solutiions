import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
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


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <Portfolio />
              <About />
              <Contact />
            </>
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
      </div>
    </Router>
  )
}

export default App