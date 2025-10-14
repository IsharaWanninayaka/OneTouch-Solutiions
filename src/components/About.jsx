import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container px-4 mx-auto md:px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="mb-10 md:w-1/2 md:mb-0">
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
              Why Choose OneTouch Solution?
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              We are a team of passionate developers, designers, and engineers
              dedicated to creating digital solutions that drive business growth
              and innovation.
            </p>

            <div className="mb-8 space-y-4">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 mt-1 mr-4 bg-indigo-100 rounded-full">
                  <i className="text-indigo-600 fas fa-check"></i>
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-gray-800">Expert Team</h4>
                  <p className="text-gray-600">
                    Our team consists of industry experts with years of
                    experience in their respective fields.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 mt-1 mr-4 bg-indigo-100 rounded-full">
                  <i className="text-indigo-600 fas fa-check"></i>
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-gray-800">
                    Cutting-Edge Technology
                  </h4>
                  <p className="text-gray-600">
                    We use the latest technologies and frameworks to build
                    modern, scalable solutions.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 mt-1 mr-4 bg-indigo-100 rounded-full">
                  <i className="text-indigo-600 fas fa-check"></i>
                </div>
                <div>
                  <h4 className="mb-1 font-bold text-gray-800">
                    End-to-End Solutions
                  </h4>
                  <p className="text-gray-600">
                    From concept to deployment and maintenance, we handle every
                    aspect of your project.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/more-about")}
              className="px-8 py-3 font-semibold text-white transition duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Learn More About Us
            </button>
          </div>

          <div className="flex justify-center md:w-1/2">
            <div className="relative">
              <div className="flex items-center justify-center overflow-hidden bg-indigo-100 rounded-full w-80 h-80">
                <img
                  src="/images/iot.png"
                  className="mb-2"
                  alt="IOT"
                  width={300}
                  height={150}
                />
              </div>
              <div className="absolute p-4 bg-white shadow-lg -bottom-6 -left-6 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full gradient-bg">
                    <i className="text-white fas fa-trophy"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">50+</h4>
                    <p className="text-gray-600">Projects Completed</p>
                  </div>
                </div>
              </div>
              <div className="absolute p-4 bg-white shadow-lg -top-6 -right-6 rounded-xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full gradient-bg">
                    <i className="text-white fas fa-smile"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">98%</h4>
                    <p className="text-gray-600">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
