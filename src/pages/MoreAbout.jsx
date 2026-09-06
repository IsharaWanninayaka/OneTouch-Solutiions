import React from "react";
import { useNavigate } from "react-router-dom";

function LearnMoreAboutUs() {
  const navigate = useNavigate();

  const values = [
    {
      icon: "fas fa-handshake",
      title: "Client Partnership",
      description: "We build long-term enterprise relationships rooted in transparency and execution.",
    },
    {
      icon: "fas fa-lightbulb",
      title: "Pioneering Innovation",
      description: "Continuously leveraging modern frameworks and IoT hardware standards.",
    },
    {
      icon: "fas fa-chart-line",
      title: "Measurable Growth",
      description: "Committed to delivering quantifiable business efficiency and ROI.",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Uncompromising Quality",
      description: "Adhering strictly to security, automated testing, and zero-downtime standards.",
    },
  ];

  const milestones = [
    {
      year: "2022",
      event: "Company Founded",
      description: "Established to deliver high-end digital engineering and custom software.",
    },
    {
      year: "2023",
      event: "Key Milestones",
      description: "Delivered first 10 enterprise platforms across web and mobile ecosystems.",
    },
    {
      year: "2024",
      event: "Engineering Team Expansion",
      description: "Scaled internal full-stack, mobile, and QA engineering talent.",
    },
    {
      year: "2025",
      event: "IoT & Embedded Division",
      description: "Pioneered specialized software + hardware microcontroller integration.",
    },
    {
      year: "2026",
      event: "50+ Global Deployments",
      description: "Successfully shipped over 50 client products across diverse industries.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-white relative tech-grid-pattern overflow-hidden">
      
      {/* Hero Header */}
      <section className="pb-16 text-center">
        <div className="container px-4 mx-auto md:px-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="fas fa-building mr-2"></i> About OneTouch Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Engineering the Next Generation of <span className="gradient-text">Digital Products</span>
          </h1>
          <p className="max-w-3xl mx-auto text-slate-300 text-lg md:text-xl leading-relaxed">
            We are a technology development firm engineering web platforms, mobile applications, custom cloud architectures, and embedded IoT hardware systems.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="container px-4 mx-auto md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl font-bold text-white">Our Engineering Journey</h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Founded with a mission to bridge complex software logic with physical hardware, OneTouch Solutions has grown from a specialized development studio into a full-spectrum digital solution partner.
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                We combine modern web stacks (React, Next.js, Node.js) with mobile solutions (Flutter) and microcontroller electronics (Embedded C++, MQTT telemetry) to deliver end-to-end reliability.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-2xl font-extrabold text-blue-400">3+</div>
                  <div className="text-xs text-slate-400">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">50+</div>
                  <div className="text-xs text-slate-400">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-emerald-400">98%</div>
                  <div className="text-xs text-slate-400">Client Satisfaction</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-indigo-400">15+</div>
                  <div className="text-xs text-slate-400">Tech Team</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
                  <img
                    src="/images/iot.png"
                    alt="IoT Systems"
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6 bg-slate-900">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                      Software + Hardware Integration
                    </span>
                    <p className="text-sm font-bold text-white mt-1">
                      Real-time device monitoring & enterprise telemetry
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container px-4 mx-auto md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-3">Our Core Principles</h2>
            <p className="text-slate-400 text-sm">Guided by engineering rigor and long-term client commitment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-4 text-xl">
                  <i className={v.icon}></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-800">
        <div className="container px-4 mx-auto md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-3">Milestones & History</h2>
            <p className="text-slate-400 text-sm">Key progress highlights across our development timeline.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-6">
                <span className="px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 text-sm font-black">
                  {m.year}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{m.event}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pt-10 text-center">
        <div className="container px-4 mx-auto">
          <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-500/30 shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Partner with OneTouch Solutions?</h2>
            <p className="text-slate-300 text-base mb-8 max-w-xl mx-auto">
              Discuss your software or hardware requirements with our technical team today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate("/start-project")}
                className="px-8 py-3.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all"
              >
                Start a Project
              </button>
              <button
                onClick={() => navigate("/get-quote")}
                className="px-8 py-3.5 text-sm font-bold text-slate-200 bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all"
              >
                Get a Custom Quote
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default LearnMoreAboutUs;
