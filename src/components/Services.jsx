import React from "react";

function Services() {
  const services = [
    {
      icon: "fas fa-globe",
      title: "Web Development",
      description:
        "Custom websites with modern designs, responsive layouts, and optimal performance for all devices.",
      features: [
        "Responsive Design",
        "SEO Optimization",
        "Fast Loading",
        "Modern UI/UX",
      ],
    },
    {
      icon: "fas fa-laptop-code",
      title: "Custom Web Apps",
      description:
        "Tailored web applications that solve specific business challenges with scalable architecture.",
      features: [
        "Custom Solutions",
        "Scalable Architecture",
        "API Integration",
        "Cloud Deployment",
      ],
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile Apps",
      description:
        "Native and cross-platform mobile applications for iOS and Android with engaging user experiences.",
      features: [
        "iOS & Android",
        "Cross-Platform",
        "User-Friendly",
        "App Store Ready",
      ],
    },
    {
      icon: "fas fa-microchip",
      title: "Software + Hardware",
      description:
        "Integrated solutions combining custom software with specialized hardware for unique business needs.",
      features: [
        "IoT Solutions",
        "Embedded Systems",
        "Custom Hardware",
        "Full Integration",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive digital solutions to help your business
            thrive in the modern world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300"
            >
              <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-6">
                <i className={`${service.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
