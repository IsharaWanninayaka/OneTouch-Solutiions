import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section id="home" className="pt-32 pb-20 gradient-bg md:pt-40 md:pb-28">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-10 md:w-1/2 md:mb-0">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Transforming Ideas Into{" "}
              <span className="text-indigo-200">Digital Reality</span>
            </h1>
            <p className="max-w-lg mb-8 text-xl text-indigo-100">
              We deliver cutting-edge websites, custom web applications, mobile
              apps, and integrated software + hardware solutions for your
              business.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate("/start-project")}
                className="px-8 py-3 font-semibold text-indigo-600 transition duration-300 bg-white rounded-lg shadow-lg hover:bg-indigo-50"
              >
                Start a Project
              </button>
              <button
                onClick={() => navigate("/our-work")}
                className="px-8 py-3 font-semibold text-white transition duration-300 bg-transparent border-2 border-white rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                View Our Work
              </button>
            </div>
          </div>
          <div className="flex justify-center md:w-1/2">
            <div className="relative">
              <div className="flex items-center justify-center bg-white rounded-full w-80 h-80 bg-opacity-10">
                <div className="flex items-center justify-center w-64 h-64 bg-white rounded-full bg-opacity-20">
                  <div className="flex items-center justify-center w-48 h-48 bg-white rounded-full bg-opacity-30">
                    {/* <i className="text-6xl text-white fas fa-laptop-code"></i> */}
                    <img
                      src="/images/Logo3.png"
                      alt="Logo"
                      width={150}
                      height={80}
                    />
                  </div>
                </div>
              </div>
              <div className="absolute px-4 py-2 font-bold text-gray-800 bg-yellow-400 rounded-lg shadow-lg -top-4 -right-4">
                Web Apps
              </div>
              <div className="absolute px-4 py-2 font-bold text-gray-800 bg-green-400 rounded-lg shadow-lg -bottom-4 -left-4">
                Mobile Apps
              </div>
              <div className="absolute px-4 py-2 font-bold text-gray-800 bg-purple-400 rounded-lg shadow-lg top-1/2 -right-12">
                Software
              </div>
              <div className="absolute px-4 py-2 font-bold text-gray-800 bg-pink-400 rounded-lg shadow-lg top-1/2 -left-12">
                Hardware
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
