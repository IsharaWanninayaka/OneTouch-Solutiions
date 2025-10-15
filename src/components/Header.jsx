import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                onClick={() => navigate("/")}
                src="/logo3.png"
                alt="Logo"
                width={150}
                height={80}
              />

              <span
                className={`text-xl font-bold ${
                  isScrolled ? "text-gray-800" : "text-white"
                }`}
              ></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 md:flex">
            <a
              onClick={() => {
                navigate("/"); // go to homepage
                setTimeout(() => {
                  const section = document.querySelector("#home");
                  section?.scrollIntoView({ behavior: "smooth" });
                }, 100); // small delay to wait for page render
              }}
              className={`nav-link font-medium cursor-pointer ${
                isScrolled
                  ? "text-gray-700 hover:text-indigo-600"
                  : "text-white hover:text-indigo-200"
              }`}
            >
              Home
            </a>
            <a
              onClick={() => {
                navigate("/"); // go to homepage
                setTimeout(() => {
                  const section = document.querySelector("#services");
                  section?.scrollIntoView({ behavior: "smooth" });
                }, 100); // small delay to wait for page render
              }}
              className={`nav-link font-medium cursor-pointer ${
                isScrolled
                  ? "text-gray-700 hover:text-indigo-600"
                  : "text-white hover:text-indigo-200"
              }`}
            >
              Services
            </a>
            <a
              onClick={() => {
                navigate("/"); // go to homepage
                setTimeout(() => {
                  const section = document.querySelector("#portfolio");
                  section?.scrollIntoView({ behavior: "smooth" });
                }, 100); // small delay to wait for page render
              }}
              className={`nav-link font-medium cursor-pointer ${
                isScrolled
                  ? "text-gray-700 hover:text-indigo-600"
                  : "text-white hover:text-indigo-200"
              }`}
            >
              Portfolio
            </a>
            <a
              onClick={() => {
                navigate("/"); // go to homepage
                setTimeout(() => {
                  const section = document.querySelector("#about");
                  section?.scrollIntoView({ behavior: "smooth" });
                }, 100); // small delay to wait for page render
              }}
              className={`nav-link font-medium cursor-pointer ${
                isScrolled
                  ? "text-gray-700 hover:text-indigo-600"
                  : "text-white hover:text-indigo-200"
              }`}
            >
              About
            </a>
            <a
              onClick={() => {
                navigate("/"); // go to homepage
                setTimeout(() => {
                  const section = document.querySelector("#contact");
                  section?.scrollIntoView({ behavior: "smooth" });
                }, 100); // small delay to wait for page render
              }}
              className={`nav-link font-medium cursor-pointer ${
                isScrolled
                  ? "text-gray-700 hover:text-indigo-600"
                  : "text-white hover:text-indigo-200"
              }`}
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:block">
            <button
              onClick={() => navigate("/get-quote")}
              className="px-6 py-2 font-medium text-indigo-600 transition duration-300 bg-white rounded-lg hover:bg-indigo-50"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i
              className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}
            ></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="pb-4 mt-4 bg-white rounded-lg shadow-lg md:hidden">
            <div className="flex flex-col px-4 space-y-3">
              <a
                href="#home"
                className="py-2 font-medium text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="py-2 font-medium text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#portfolio"
                className="py-2 font-medium text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </a>
              <a
                href="#about"
                className="py-2 font-medium text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="py-2 font-medium text-gray-700 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <button className="px-4 py-2 mt-2 font-medium text-white transition duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                Get Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
