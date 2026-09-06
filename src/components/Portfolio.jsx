import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Portfolio() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "AgroCare Harvest & Farm Tracking",
      category: "mobile",
      categoryLabel: "Mobile Application",
      image: "/images/agrocare.png",
      description: "Smart agricultural tracking system for real-time crop growth monitoring and yield analytics.",
      metrics: "30% Yield Increase • Real-time Sync",
      tech: ["Flutter", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "Transport & Logistics Management",
      category: "web",
      categoryLabel: "Web Platform",
      image: "/images/transport.png",
      description: "Fleet management system with GPS vehicle tracking, route optimization, and driver dispatch.",
      metrics: "25% Fleet Efficiency • Live GPS",
      tech: ["React", "Express", "Maps API"],
    },
    {
      id: 3,
      title: "Boolean Logic & Hardware Simulator",
      category: "iot",
      categoryLabel: "Software + Hardware",
      image: "/images/logic.png",
      description: "Interactive digital circuit simulator linked with physical microcontroller testing boards.",
      metrics: "Microsecond Latency • Hardware Linked",
      tech: ["C++", "React", "Embedded Systems"],
    },
    {
      id: 4,
      title: "Enterprise E-Commerce Platform",
      category: "web",
      categoryLabel: "Web App",
      image: "/images/food.png",
      description: "High-scale multi-vendor marketplace with integrated payment gateway and order management.",
      metrics: "99.9% Uptime • Instant Checkout",
      tech: ["React", "Tailwind", "Stripe API"],
    },
  ];

  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-slate-900 text-white relative tech-grid-pattern">
      <div className="container px-4 mx-auto md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="fas fa-briefcase mr-2"></i> Featured Works
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our Proven <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Explore recent projects engineered for our clients across web platforms, mobile apps, and hardware solutions.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${
                filter === "all" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("web")}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${
                filter === "web" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Web Applications
            </button>
            <button
              onClick={() => setFilter("mobile")}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${
                filter === "mobile" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Mobile Apps
            </button>
            <button
              onClick={() => setFilter("iot")}
              className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${
                filter === "iot" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Hardware & IoT
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl bg-slate-800/60 border border-slate-700/60 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Box */}
              <div className="relative h-64 overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-blue-400 border border-slate-700 backdrop-blur-md">
                  {project.categoryLabel}
                </span>
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Metrics Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-300 text-xs font-medium mb-4">
                  <i className="fas fa-chart-line text-blue-400"></i>
                  <span>{project.metrics}</span>
                </div>

                {/* Tech Badges & Link */}
                <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-900 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate("/our-work")}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
                  >
                    <span>View Case Study</span>
                    <i className="fas fa-arrow-right text-[10px] transition-transform group-hover:translate-x-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => navigate("/our-work")}
            className="px-8 py-3.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all duration-200"
          >
            Explore All Case Studies
          </button>
        </div>

      </div>
    </section>
  );
}

export default Portfolio;
