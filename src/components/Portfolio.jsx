import React from "react";
import { useNavigate } from "react-router-dom";

function Portfolio() {
  const navigate = useNavigate();
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "/images/food.png",
    },
    {
      title: "Harvest Tracking App",
      category: "Mobile App",
      image: "/images/agrocare.png",
    },
    {
      title: "Transport Management",
      category: "Web App",
      image: "/images/transport.png",
    },
    {
      title: "Boolian Logic Simulator",
      category: "Software + Hardware",
      image: "/images/logic.png",
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto md:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Our Portfolio
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Explore some of our recent projects that showcase our expertise
            across different domains.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="overflow-hidden transition duration-300 bg-white shadow-md rounded-xl hover:shadow-xl"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="font-medium text-indigo-600">
                  {project.category}
                </span>
                <h3 className="mt-2 mb-4 text-xl font-bold text-gray-800">
                  {project.title}
                </h3>
                <button className="flex items-center font-medium text-gray-700 hover:text-indigo-600">
                  View Case Study
                  <i className="ml-2 fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/our-work")}
            className="px-8 py-3 font-semibold text-white transition duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
