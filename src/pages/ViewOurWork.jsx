import React, { useState } from "react";

function ViewOurWork() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ["all", "web", "mobile", "ecommerce", "hardware"];

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "ecommerce",
      client: "Foodies Inc.",
      duration: "3 months",
      budget: "$500",
      image: "./images/food.png",
      description:
        "A full-featured e-commerce platform with inventory management, payment processing, and customer analytics.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      features: [
        "Product Catalog",
        "Shopping Cart",
        "Payment Gateway",
        "Admin Dashboard",
        "Inventory Management",
      ],
      results: [
        "40% increase in sales",
        "30% faster load times",
        "99.9% uptime",
      ],
    },
    {
      id: 2,
      title: "Harvest Tracking Mobile App",
      category: "mobile",
      client: "RD Agrocare",
      duration: "2 months",
      budget: "$350",
      image: "./images/agrocare.png",
      description:
        "Cross-platform mobile app for Harvesters monitoring with real-time gps data sync .",
      technologies: ["Flutter", "Firebase", "Redux"],
      features: [
        "Land Messuring",
        "Generate Bills",
        "GPS Tracking",
        "Generate Reports",
        "User Profiles",
      ],
      results: ["10%+ income increase", "4.8-star rating"],
    },
    {
      id: 3,
      title: "Boolean logic solver System",
      category: "hardware",
      client: "OneTouch Solutions",
      duration: "6 months",
      budget: "$800",
      image: "./images/logic.png",
      description:
        "Integrated software and hardware solution for realtime harware simulation Boolean logic circuits.",
      technologies: ["Electronjs", "Nodemcu", "React", "Python", "C++"],
      features: [
        "Boolean logic solving",
        "Generate Truth Tables",
        "Graphical Circuit Design",
        "Generate karnaugh Maps",
        "Hardware Simulation",
      ],
      results: ["95% accuracy", "20% faster processing", "Used in 11 Colleges"],
    },
    {
      id: 4,
      title: "Corporate Website Redesign",
      category: "web",
      client: "RD Agrocare",
      duration: "1 months",
      budget: "$150",
      image: "./images/agroacre.png",
      description:
        "Complete website redesign with modern UI/UX, improved performance, and enhanced accessibility.",
      technologies: ["Next.js", "Tailwind CSS", "GraphQL", "Vercel"],
      features: [
        "Responsive Design",
        "Advanced Analytics",
        "Advanced Administration",
        "Contact Management",
      ],
      results: ["200% more traffic", "60% Acuracy"],
    },
    {
      id: 5,
      title: "Food Delivery App",
      category: "mobile",
      client: "Sky kitchen",
      duration: "6 months",
      budget: "$450",
      image: "./images/diliveryapp.png",
      description:
        "Feature-rich food delivery application with real-time tracking, multiple payment options, and restaurant management.",
      technologies: ["Flutter", "Node.js", "MongoDB", "Google Maps API"],
      features: [
        "Restaurant Listings",
        "Real-time Tracking",
        "Multiple Payments",
        "Order History",
        "Ratings & Reviews",
      ],
      results: [
        "10,000+ active users",
        "25% monthly growth",
        "Top 10 in Food category",
      ],
    },
    {
      id: 6,
      title: "Transport Management System",
      category: "mobile",
      client: "OneTouch  Solutions.",
      duration: "8 months",
      budget: "$1300",
      image: "./images/transport.png",
      description:
        "Transport management system with ticket booking, real-time tracking, and fleet management features.",
      technologies: ["Flutter", "Firebase", "IoT", "WebSocket"],
      features: [
        "Ticket Booking",
        "Driver Management",
        "Admin Dashboard",
        "Status Notifications",
        "Real-time Tracking",
      ],
      results: ["50% time savings", "99% accuracy", "Better Tranport control"],
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container px-4 py-12 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
            Our Portfolio
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Explore our successful projects across various industries and
            technologies. Each project represents our commitment to quality and
            innovation.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category === "all"
                ? "All Projects"
                : category === "web"
                ? "Web Development"
                : category === "mobile"
                ? "Mobile Apps"
                : category === "ecommerce"
                ? "E-commerce"
                : "Software + Hardware"}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden transition duration-300 bg-white shadow-lg cursor-pointer rounded-xl hover:shadow-xl"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 text-sm text-indigo-600 bg-indigo-100 rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="mb-4 text-gray-600 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{project.duration}</span>
                  <span>{project.budget}</span>
                </div>
                <button className="flex items-center justify-center w-full mt-4 font-medium text-indigo-600 hover:text-indigo-700">
                  View Case Study
                  <i className="ml-2 fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="object-cover w-full h-64"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-lg top-4 right-4"
                >
                  <i className="text-gray-600 fas fa-times"></i>
                </button>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-4 mb-6">
                  <span className="px-3 py-1 text-indigo-600 bg-indigo-100 rounded-full">
                    {selectedProject.category}
                  </span>
                  <span className="px-3 py-1 text-green-600 bg-green-100 rounded-full">
                    {selectedProject.duration}
                  </span>
                  <span className="px-3 py-1 text-purple-600 bg-purple-100 rounded-full">
                    {selectedProject.budget}
                  </span>
                </div>

                <h2 className="mb-4 text-3xl font-bold text-gray-800">
                  {selectedProject.title}
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 text-xl font-bold text-gray-800">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm text-gray-700 bg-gray-100 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold text-gray-800">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center text-gray-600"
                        >
                          <i className="mr-3 text-green-500 fas fa-check"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-bold text-gray-800">
                    Results & Impact
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <i className="mr-3 text-blue-500 fas fa-chart-line"></i>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-6 py-3 text-gray-600 transition duration-300 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="p-8 text-center bg-white shadow-lg rounded-xl">
          <h2 className="mb-8 text-3xl font-bold text-gray-800">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "20+", label: "Technologies Used" },
              { number: "1M+", label: "Users Reached" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="mb-2 text-3xl font-bold text-indigo-600 md:text-4xl">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOurWork;
