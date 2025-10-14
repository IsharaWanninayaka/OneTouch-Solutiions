import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import PopupAlert from "../components/Alert";
import ErrorPopup from "../components/ErrorPopup";

function StartProject() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    description: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const packages = [
    {
      id: 1,
      name: "Starter",
      price: "$150+",
      description: "Perfect for small businesses and startups",
      features: [
        "Responsive Website",
        "Up to 5 pages",
        "Basic SEO Setup",
        "Contact Form",
        "1 Month Support",
      ],
      recommended: false,
    },
    {
      id: 2,
      name: "Business",
      price: "$800+",
      description: "Ideal for growing businesses",
      features: [
        "Custom Web Application",
        "Admin Dashboard",
        "Database Integration",
        "API Development",
        "3 Months Support",
        "Performance Optimization",
      ],
      recommended: true,
    },
    {
      id: 3,
      name: "Enterprise",
      price: "$1200+",
      description: "For large-scale solutions",
      features: [
        "Full-stack Development",
        "Mobile App Included",
        "Cloud Deployment",
        "Advanced Security",
        "6 Months Support",
        "Dedicated Project Manager",
      ],
      recommended: false,
    },
  ];

  const projectTypes = [
    "Website Development",
    "Web Application",
    "Mobile App (iOS/Android)",
    "E-commerce Platform",
    "Software + Hardware",
    "Custom Solution",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const retrySendFunction = () => {
    setShowError(false);
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim()) {
      setErrorMessage("Please enter your name.");
      setShowError(true);
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address.");
      setShowError(true);
      return;
    }
    if (!formData.projectType.trim()) {
      setErrorMessage("Please select a project type.");
      setShowError(true);
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage("Please provide a project description.");
      setShowError(true);
      return;
    }

    setIsSending(true);

    // EmailJS configuration
    const serviceId = "service_c2sxrda";
    const templateId = "template_309z6ld";
    const publicKey = "PF0NG5gw1-9hWgZP1";

    const templateParams = {
      name: formData.name,
      email: formData.email,
      company: formData.company || "N/A",
      projectType: formData.projectType,
      description: formData.description,
      selectedPackage: selectedPackage
        ? packages.find((p) => p.id === selectedPackage).name
        : "Not selected",
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setShowSuccessAlert(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "",
        description: "",
      });
      setSelectedPackage(null);
    } catch (error) {
      console.error("Email send failed:", error);
      setErrorMessage(
        error.message ||
          "Unable to send your project details. Please check your network connection and try again."
      );
      setShowError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container px-4 py-12 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
            Start Your Project
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Choose a package that fits your needs or describe your custom
            requirements. Let's build something amazing together!
          </p>
        </div>

        {/* Packages Section */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">
            Choose Your Package
          </h2>
          <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 ${
                  selectedPackage === pkg.id
                    ? "border-indigo-500 ring-4 ring-indigo-100"
                    : pkg.recommended
                    ? "border-yellow-400"
                    : "border-gray-200"
                } ${pkg.recommended ? "transform scale-105" : ""}`}
              >
                {pkg.recommended && (
                  <div className="py-2 font-bold text-center text-gray-800 bg-yellow-400 rounded-t-xl">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="mb-2 text-2xl font-bold text-gray-800">
                    {pkg.name}
                  </h3>
                  <div className="mb-4 text-3xl font-bold text-indigo-600">
                    {pkg.price}
                  </div>
                  <p className="mb-6 text-gray-600">{pkg.description}</p>

                  <ul className="mb-8 space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-700"
                      >
                        <i className="mr-3 text-green-500 fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-300 ${
                      selectedPackage === pkg.id
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {selectedPackage === pkg.id ? "Selected" : "Select Package"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Project Form */}
        <div className="max-w-4xl p-8 mx-auto bg-white shadow-lg rounded-xl">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
            Tell Us About Your Project
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-gray-700">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-gray-700">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-700">
                  Project Type *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-gray-700">
                Project Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe your project goals, target audience, key features, and any specific requirements..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>

            {selectedPackage && (
              <div className="p-4 rounded-lg bg-green-50">
                <p className="font-medium text-green-700">
                  Selected Package:{" "}
                  <span className="font-bold">
                    {packages.find((p) => p.id === selectedPackage).name}
                  </span>
                </p>
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={isSending}
                className="px-12 py-4 text-lg font-semibold text-white transition duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSending ? (
                  <span className="flex items-center justify-center">
                    <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  "Start My Project"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Process Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="mb-12 text-3xl font-bold text-center text-gray-800">
            Our Development Process
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              {
                icon: "fas fa-comments",
                title: "Consultation",
                desc: "We discuss your requirements and goals",
              },
              {
                icon: "fas fa-pencil-alt",
                title: "Planning",
                desc: "Detailed project planning and wireframing",
              },
              {
                icon: "fas fa-code",
                title: "Development",
                desc: "Agile development with regular updates",
              },
              {
                icon: "fas fa-rocket",
                title: "Launch",
                desc: "Deployment and ongoing support",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full">
                  <i className={`${step.icon} text-indigo-600 text-xl`}></i>
                </div>
                <h3 className="mb-2 font-bold text-gray-800">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <PopupAlert
          isOpen={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          title="Project Request Sent!"
          message="Thank you! Your project details were sent successfully. We will contact you within 24 hours to discuss your project requirements."
          type="success"
          confirmButtonText="Great!"
          animation="scale"
        />
      )}

      {/* Error Popup */}
      <ErrorPopup
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Error"
        message={errorMessage}
        type="validation"
        showRetryButton={true}
        onRetry={retrySendFunction}
      />
    </div>
  );
}

export default StartProject;
