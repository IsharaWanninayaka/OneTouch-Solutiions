import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="py-12 text-white bg-gray-800">
      <div className="container px-4 mx-auto md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center mb-6">
              <img src="/images/Logo3.png" alt="Logo" width={150} height={80} />
            </div>
            <p className="mb-6 text-gray-400">
              Transforming ideas into digital reality with cutting-edge
              technology solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition bg-gray-700 rounded-full hover:bg-indigo-600"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition bg-gray-700 rounded-full hover:bg-indigo-600"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition bg-gray-700 rounded-full hover:bg-indigo-600"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition bg-gray-700 rounded-full hover:bg-indigo-600"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold">Services</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition hover:text-white"
                >
                  Web Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition hover:text-white"
                >
                  Custom Web Apps
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition hover:text-white"
                >
                  Mobile Apps
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 transition hover:text-white"
                >
                  Software + Hardware
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  onClick={() => navigate("/more-about")}
                  className="text-gray-400 transition cursor-pointer hover:text-white"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/more-about")}
                  className="text-gray-400 transition cursor-pointer hover:text-white"
                >
                  Our Team
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/more-about")}
                  className="text-gray-400 transition cursor-pointer hover:text-white"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  onClick={() => navigate("/more-about")}
                  className="text-gray-400 transition cursor-pointer hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-lg font-bold">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <i className="mt-1 mr-3 fas fa-map-marker-alt"></i>
                <span>No 27,Halgasthota,Katunayaka</span>
              </li>
              <li className="flex items-start">
                <i className="mt-1 mr-3 fas fa-phone"></i>
                <span>+94 71 469 8430</span>
              </li>
              <li className="flex items-start">
                <i className="mt-1 mr-3 fas fa-phone"></i>
                <span>+94 77 284 7846</span>
              </li>
              <li className="flex items-start">
                <i className="mt-1 mr-3 fas fa-phone"></i>
                <span>+94 71 604 7249</span>
              </li>
              <li className="flex items-start">
                <i className="mt-1 mr-3 fas fa-envelope"></i>
                <span>info@onetouchsolution.it.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-8 mt-12 border-t border-gray-700 md:flex-row">
          <p className="mb-4 text-gray-400 md:mb-0">
            &copy; 2022 OneTouch Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a
              onClick={() => navigate("/privacy-policy")}
              className="text-gray-400 transition hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              onClick={() => navigate("/terms-of-service")}
              className="text-gray-400 transition hover:text-white"
            >
              Terms of Service
            </a>
            <a
              onClick={() => navigate("/cookie-policy")}
              className="text-gray-400 transition hover:text-white"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
