import React, { useState } from "react";

function ViewOurWork() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Applications" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "ecommerce", label: "E-Commerce" },
    { id: "hardware", label: "IoT & Hardware" },
  ];

  const projects = [
    {
      id: 1,
      title: "Enterprise E-Commerce Platform",
      category: "ecommerce",
      categoryLabel: "E-Commerce",
      client: "Foodies Inc.",
      duration: "3 months",
      image: "/images/food.png",
      description:
        "Full-scale digital commerce suite with real-time inventory synchronization, automated payment dispatch, and order fulfillment dashboards.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      features: [
        "Interactive Product Catalog",
        "Encrypted Checkout Flow",
        "Vendor Admin Dashboard",
        "Inventory Telemetry",
      ],
      results: [
        "40% Increase in conversion rates",
        "30% Faster page render speeds",
        "99.9% Platform uptime SLA",
      ],
    },
    {
      id: 2,
      title: "Harvest Tracking & Farm Telemetry",
      category: "mobile",
      categoryLabel: "Mobile App",
      client: "RD Agrocare",
      duration: "2 months",
      image: "/images/agrocare.png",
      description:
        "Cross-platform mobile solution for harvesters featuring GPS route mapping, yield recording, and automated receipt printing.",
      technologies: ["Flutter", "Firebase", "GPS Mapping"],
      features: [
        "Land & Acreage Measurement",
        "Instant Receipt Generation",
        "GPS Fleet Tracking",
        "Offline Data Syncing",
      ],
      results: ["10%+ Operational yield increase", "4.8-Star rating on Play Store"],
    },
    {
      id: 3,
      title: "Boolean Logic & Hardware Solver",
      category: "hardware",
      categoryLabel: "Software + Hardware",
      client: "OneTouch Solutions",
      duration: "6 months",
      image: "/images/logic.png",
      description:
        "Specialized hardware testing framework connected to NodeMCU microcontrollers for physical digital logic circuit verification.",
      technologies: ["Electron.js", "NodeMCU", "React", "C++"],
      features: [
        "Boolean Gate Logic Solver",
        "Automated Truth Table Generator",
        "Graphical Circuit Designer",
        "Hardware Board Simulation",
      ],
      results: ["Microsecond execution latency", "Deployed across 11 Technical Institutions"],
    },
    {
      id: 4,
      title: "Agricultural Enterprise Portal",
      category: "web",
      categoryLabel: "Web Platform",
      client: "RD Agrocare",
      duration: "1 month",
      image: "/images/agroacre.png",
      description:
        "Modern corporate portal designed for high accessibility, multi-language localization, and client onboarding.",
      technologies: ["Next.js", "Tailwind CSS", "Vercel"],
      features: [
        "Responsive Grid Layout",
        "Client Portal Access",
        "Lead Management Integration",
      ],
      results: ["200% Increase in web inquiries", "Under 1.2s page load speed"],
    },
    {
      id: 5,
      title: "Food Delivery & Logistics App",
      category: "mobile",
      categoryLabel: "Mobile App",
      client: "Sky Kitchen",
      duration: "6 months",
      image: "/images/diliveryapp.png",
      description:
        "Consumer food ordering app paired with driver dispatch and real-time live map tracking.",
      technologies: ["Flutter", "Node.js", "Google Maps API"],
      features: [
        "Live Driver GPS Tracking",
        "Multi-vendor Restaurant Hub",
        "Push Notification Pipeline",
      ],
      results: ["10,000+ Active Users", "25% Month-over-month growth"],
    },
    {
      id: 6,
      title: "Smart Transport & Ticket Booking",
      category: "mobile",
      categoryLabel: "Mobile App",
      client: "OneTouch Solutions",
      duration: "8 months",
      image: "/images/transport.png",
      description:
        "Comprehensive transit ticketing and fleet dispatch portal linking IoT bus hardware with rider mobile apps.",
      technologies: ["Flutter", "Firebase", "IoT Telemetry"],
      features: [
        "Digital Ticket QR Generation",
        "Driver Fleet Dispatch",
        "Fleet GPS Telemetry",
      ],
      results: ["50% Operational time savings", "99% Dispatch accuracy"],
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-white relative tech-grid-pattern overflow-hidden">
      <div className="container px-4 mx-auto md:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-14 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="fas fa-layer-group mr-2"></i> Case Studies & Projects
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our Engineering <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Browse our delivered software systems, custom web applications, native mobile apps, and IoT hardware projects.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden bg-slate-950">
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

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    <i className="fas fa-clock mr-1 text-blue-400"></i> {project.duration}
                  </span>
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View Details</span>
                    <i className="fas fa-arrow-right text-[10px]"></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-white">
              
              <div className="relative h-72">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center backdrop-blur-md transition-colors"
                >
                  <i className="fas fa-times text-sm"></i>
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                    {selectedProject.categoryLabel}
                  </span>
                  <h2 className="text-3xl font-bold mt-2">{selectedProject.title}</h2>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-slate-300 text-base leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Technologies Implemented
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800 text-blue-300 border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Key Deliverables
                    </h3>
                    <ul className="space-y-1.5">
                      {selectedProject.features.map((f, idx) => (
                        <li key={idx} className="flex items-center text-xs font-medium text-slate-300">
                          <i className="fas fa-check-circle text-emerald-400 mr-2"></i>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Project Outcomes & Impact
                  </h3>
                  <ul className="space-y-1.5">
                    {selectedProject.results.map((r, idx) => (
                      <li key={idx} className="flex items-center text-xs font-semibold text-blue-300">
                        <i className="fas fa-chart-line text-blue-400 mr-2"></i>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-2.5 text-xs font-bold bg-slate-800 text-slate-300 hover:text-white rounded-xl border border-slate-700 transition-colors"
                  >
                    Close Window
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ViewOurWork;
