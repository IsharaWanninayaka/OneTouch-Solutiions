import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Services() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ampOffset, setAmpOffset] = useState(0);

  // Scroll Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Smooth Scroll-Linked Zig-Zag Parallax & Real-Time '&' Down Motion
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in or near viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate progress from 0 (entering) to 1 (leaving)
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        // Amplified parallax travel range (+/- 80px)
        const offset = (progress - 0.5) * 160;
        setScrollProgress(offset);

        // Real-time scroll-driven down movement for '&'
        const startPoint = windowHeight * 0.92;
        const endPoint = windowHeight * 0.45;
        const currentProgress = (startPoint - rect.top) / (startPoint - endPoint);
        const clamped = Math.max(0, Math.min(1, currentProgress));
        setAmpOffset(clamped);
      } else if (rect.top >= windowHeight) {
        setAmpOffset(0);
      } else if (rect.bottom <= 0) {
        setAmpOffset(1);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      id: "web-dev",
      code: "01",
      icon: "fas fa-globe",
      title: "Web Development",
      category: "Frontend & Full Stack",
      image: "/images/service-web.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      description:
        "High-performance websites and web applications built with modern frontend frameworks, optimized for SEO, speed, and conversion.",
      tech: ["React", "Next.js", "TailwindCSS"],
    },
    {
      id: "custom-web",
      code: "02",
      icon: "fas fa-laptop-code",
      title: "Custom Web Applications",
      category: "Enterprise Software",
      image: "/images/service-erp.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      description:
        "Tailored enterprise platforms built to automate business workflows, manage data, and scale securely on modern cloud infrastructure.",
      tech: ["Node.js", "MongoDB", "PostgreSQL"],
    },
    {
      id: "mobile-apps",
      code: "03",
      icon: "fas fa-mobile-alt",
      title: "Mobile App Development",
      category: "iOS & Android",
      image: "/images/service-mobile.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      description:
        "Native and cross-platform mobile solutions designed to deliver seamless user experiences, fluid animations, and reliable offline capabilities.",
      tech: ["Flutter", "React Native", "Firebase"],
    },
    {
      id: "iot-hardware",
      code: "04",
      icon: "fas fa-microchip",
      title: "Software + Hardware (IoT)",
      category: "Embedded & Hardware",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
      fallbackImage: "/images/iot.png",
      description:
        "End-to-end IoT engineering combining custom firmware, microcontroller sensors, and cloud software for real-world automation.",
      tech: ["ESP32", "Embedded C++", "MQTT"],
    },
  ];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="pt-16 pb-20 md:pt-20 md:pb-24 bg-white text-slate-900 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div
          className={`text-center max-w-4xl mx-auto mb-12 md:mb-16 transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-5 leading-[1.15]">
            Comprehensive Digital{" "}
            <span
              style={{
                transform: `translateY(calc(${ampOffset} * clamp(18px, 2.5vw, 26px)))`,
                willChange: "transform",
                transition: "transform 0.1s ease-out",
              }}
              className="inline-block text-slate-900 font-extrabold select-none"
            >
              &
            </span>{" "}
            <span className="gradient-text font-black">Hardware Solutions</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We engineer bespoke software architectures and smart IoT hardware solutions tailored to accelerate your business growth.
          </p>
        </div>

        {/* Dynamic Zig-Zag Scroll Parallax Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-7 pb-16 pt-6">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            // Card 1 & 3 (isEven): Move DOWN (+scrollProgress) as user scrolls down
            // Card 2 & 4 (!isEven): Move UP (-scrollProgress) as user scrolls down
            const dynamicOffset = isEven
              ? scrollProgress - 20
              : -scrollProgress + 20;

            return (
              <div
                key={service.id}
                style={{
                  transform: isVisible ? `translateY(${dynamicOffset}px)` : "translateY(40px)",
                  opacity: isVisible ? 1 : 0,
                  transition: "transform 0.12s ease-out, opacity 0.7s ease-out",
                  willChange: "transform, opacity",
                }}
                className="select-none"
              >
                <article
                  onClick={() => navigate("/start-project")}
                  className="bedim__article group cursor-pointer select-none"
                >
                  {/* Card Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    onError={(e) => {
                      if (service.fallbackImage && e.target.src !== service.fallbackImage) {
                        e.target.src = service.fallbackImage;
                      }
                    }}
                    className="bedim__img"
                  />

                  {/* Gradient Vignette Overlay on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-black/10 group-hover:from-slate-950/90 transition-all duration-500 pointer-events-none" />

                  {/* Default Resting State Title on Image (Fades out smoothly when hovered) */}
                  <div className="absolute bottom-6 left-5 right-5 z-10 transition-all duration-400 ease-out group-hover:opacity-0 group-hover:translate-y-4 pointer-events-none">
                    <span className="inline-block text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-1 drop-shadow-sm">
                      {service.category}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-tight drop-shadow-md">
                      {service.title}
                    </h3>
                  </div>

                  {/* Hover Pop-up White Card with Full Service Details (Bedimcode Animation) */}
                  <div className="bedim__data">
                    <span className="bedim__description">{service.category}</span>
                    <h3 className="bedim__title">{service.title}</h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {service.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {service.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Button: Let's Work */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="bedim__button">
                        Let's Work <i className="fas fa-arrow-right text-[10px]"></i>
                      </span>
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        <i className="fas fa-chevron-right"></i>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Services;
