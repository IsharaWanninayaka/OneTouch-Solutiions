import React, { useState } from "react";

function TechStack() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "web", label: "Web & Cloud" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "iot", label: "IoT & Hardware" },
    { id: "database", label: "Databases & AI" },
  ];

  const technologies = [
    { name: "React.js / Next.js", category: "web", icon: "fab fa-react", level: "Enterprise", desc: "Modern dynamic web frontends & PWAs" },
    { name: "Node.js & Express", category: "web", icon: "fab fa-node-js", level: "Scalable", desc: "High-performance microservices APIs" },
    { name: "TypeScript", category: "web", icon: "fas fa-code", level: "Strict Type", desc: "Type-safe robust application logic" },
    { name: "Flutter / React Native", category: "mobile", icon: "fas fa-mobile-alt", level: "Cross-Platform", desc: "iOS & Android native experience" },
    { name: "Embedded C++ / Arduino", category: "iot", icon: "fas fa-microchip", level: "Hardware", desc: "Microcontroller logic & sensors" },
    { name: "MQTT & IoT Telemetry", category: "iot", icon: "fas fa-network-wired", level: "Real-Time", desc: "Low-latency IoT device messaging" },
    { name: "Python / Fast API", category: "database", icon: "fab fa-python", level: "Backend", desc: "Data processing & AI workflows" },
    { name: "PostgreSQL & MongoDB", category: "database", icon: "fas fa-database", level: "High Availability", desc: "Structured & document databases" },
    { name: "Docker & Cloud AWS", category: "web", icon: "fab fa-aws", level: "DevOps", desc: "Containerized cloud infrastructure" },
  ];

  const filteredTech = activeCategory === "all"
    ? technologies
    : technologies.filter((t) => t.category === activeCategory);

  return (
    <section id="tech-stack" className="py-24 bg-slate-900 text-white relative overflow-hidden tech-grid-pattern">
      {/* Background Orbs */}
      <div className="glow-orb w-96 h-96 bg-blue-600/10 top-0 right-0 -mr-20 -mt-20"></div>
      <div className="glow-orb w-96 h-96 bg-indigo-600/10 bottom-0 left-0 -ml-20 -mb-20"></div>

      <div className="container px-4 mx-auto md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="fas fa-layer-group mr-2"></i> Technical Expertise
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Engineered with Modern <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-slate-400 text-lg">
            We combine industry-standard software frameworks with embedded hardware solutions to build battle-tested products.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTech.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-sm hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <i className={`${item.icon} text-xl`}></i>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-700">
                  {item.level}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                {item.name}
              </h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStack;
