import React from "react";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();

  const services = [
    {
      icon: "fas fa-globe",
      title: "Web Development",
      category: "Frontend & Full Stack",
      description:
        "High-performance websites and web applications built with modern frontend frameworks, optimized for SEO, speed, and conversion.",
      features: [
        "Responsive & Pixel-Perfect UI",
        "SEO & Core Web Vitals Optimization",
        "Lightning-Fast Page Speeds",
        "CMS & E-Commerce Integration",
      ],
      tech: ["React", "TailwindCSS", "Next.js", "REST APIs"],
    },
    {
      icon: "fas fa-laptop-code",
      title: "Custom Web Applications",
      category: "Enterprise Software",
      description:
        "Tailored web platforms built to automate complex business workflows, manage data, and scale securely on the cloud.",
      features: [
        "Scalable Cloud Architecture",
        "Secure Role-Based Access",
        "Third-Party API Integration",
        "Real-Time Analytics Dashboards",
      ],
      tech: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile App Development",
      category: "iOS & Android",
      description:
        "Native and cross-platform mobile solutions designed to deliver seamless user experiences and reliable offline functionality.",
      features: [
        "Cross-Platform Performance",
        "Push Notifications & Telemetry",
        "App Store & Play Store Deployment",
        "Intuitive UX/UI Design",
      ],
      tech: ["Flutter", "React Native", "Firebase", "REST"],
    },
    {
      icon: "fas fa-microchip",
      title: "Software + Hardware (IoT)",
      category: "Embedded & Hardware",
      description:
        "End-to-end IoT engineering combining custom firmware, microcontroller design, and cloud software for real-world automation.",
      features: [
        "IoT Sensor Integration",
        "Microcontroller Firmware (C++)",
        "Real-Time Hardware Monitoring",
        "Custom Circuit & Telemetry Design",
      ],
      tech: ["Embedded C++", "MQTT", "ESP32/Arduino", "IoT Cloud"],
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 text-slate-900 relative">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="fas fa-cogs mr-2"></i> Our Core Services
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Comprehensive Digital & <span className="text-blue-600">Hardware Solutions</span>
          </h2>
          <p className="text-slate-600 text-lg">
            We provide end-to-end software engineering and IoT integration to empower businesses with modern technology.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="gradient-border-card rounded-2xl p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Icon Box */}
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600 border border-blue-200 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <i className={`${service.icon} text-2xl`}></i>
                </div>

                {/* Service Tag */}
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {service.category}
                </span>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Bullet Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs font-medium text-slate-700">
                      <i className="fas fa-check-circle text-emerald-500 mt-0.5 mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.tech.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate("/start-project")}
                  className="w-full py-2.5 px-4 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Request Solution</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
