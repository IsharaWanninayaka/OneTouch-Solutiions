import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: "fas fa-users-cog",
      title: "Senior Engineering Talent",
      desc: "Our team consists of veteran full-stack engineers, hardware architects, and product designers dedicated to excellence.",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Enterprise Reliability & Security",
      desc: "We build with bank-grade security protocols, robust cloud backups, and automated CI/CD pipelines.",
    },
    {
      icon: "fas fa-microchip",
      title: "Full-Stack + Hardware Capabilities",
      desc: "Unlike standard web agencies, we natively bridge software code with embedded hardware & IoT microcontrollers.",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white text-slate-900 relative overflow-hidden">
      <div className="container px-4 mx-auto md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <i className="fas fa-building mr-2"></i> Why OneTouch Solutions
            </div>
            
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              We Build Software & Hardware That <span className="text-blue-600">Drives Innovation</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              OneTouch Solutions is a technology firm specializing in custom software development, mobile apps, and IoT hardware integration. We transform complex client challenges into streamlined, scalable digital solutions.
            </p>

            <div className="space-y-6 mb-8">
              {values.map((v, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className={`${v.icon} text-base`}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">{v.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/more-about")}
              className="px-8 py-3.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all duration-200"
            >
              Learn More About Our Team
            </button>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg">
              
              {/* Main Visual Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900">
                <img
                  src="/images/iot.png"
                  alt="IoT Hardware & Software"
                  className="w-full h-80 object-cover object-center opacity-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600">
                    IoT Hardware & Firmware
                  </span>
                  <p className="text-sm font-bold mt-2">
                    Integrated hardware telemetry & smart cloud management
                  </p>
                </div>
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -top-6 -right-6 p-5 bg-white rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
                  <i className="fas fa-trophy"></i>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">50+</div>
                  <div className="text-xs text-slate-500 font-medium">Successful Projects</div>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -bottom-6 -left-6 p-5 bg-white rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
                  <i className="fas fa-face-smile"></i>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900">98%</div>
                  <div className="text-xs text-slate-500 font-medium">Client Satisfaction</div>
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
