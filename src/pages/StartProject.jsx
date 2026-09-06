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
      description: "Perfect for small businesses and startups looking for a rapid digital presence.",
      features: [
        "Responsive Modern Web UI",
        "Up to 5 Pages",
        "Basic SEO & Analytics",
        "Contact Form & Email Setup",
        "1 Month Technical Support",
      ],
      recommended: false,
    },
    {
      id: 2,
      name: "Business",
      price: "$800+",
      description: "Ideal for growing enterprises needing scalable custom applications.",
      features: [
        "Custom Full-Stack Web App",
        "Admin Analytics Dashboard",
        "Database Architecture",
        "REST API Development",
        "3 Months Technical Support",
        "Performance Optimization",
      ],
      recommended: true,
    },
    {
      id: 3,
      name: "Enterprise + IoT",
      price: "$1200+",
      description: "For large-scale platforms & hardware-integrated systems.",
      features: [
        "Full-Stack Web & Mobile App",
        "IoT / Hardware Integration",
        "Cloud Deployment (AWS)",
        "Enterprise Security SLA",
        "6 Months Dedicated Support",
        "Dedicated Solution Architect",
      ],
      recommended: false,
    },
  ];

  const projectTypes = [
    "Website Development",
    "Web Application",
    "Mobile App (iOS/Android)",
    "E-commerce Platform",
    "Software + Hardware (IoT)",
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
    if (e) e.preventDefault();

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

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE2_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

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
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-white relative tech-grid-pattern overflow-hidden">
      <div className="container px-4 mx-auto md:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="fas fa-rocket mr-2"></i> Kickstart Your Vision
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Start Your <span className="gradient-text">Project Today</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Choose a tailored engineering tier or submit custom specifications for immediate project scope estimation.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 bg-slate-900/80 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between ${
                  selectedPackage === pkg.id
                    ? "border-blue-500 ring-2 ring-blue-500/40 bg-slate-900"
                    : pkg.recommended
                    ? "border-blue-500/60 shadow-xl shadow-blue-600/10"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {pkg.recommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-lg uppercase tracking-wider">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-extrabold text-blue-400 mb-4">{pkg.price}</div>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">{pkg.description}</p>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-xs font-medium text-slate-300">
                        <i className="fas fa-check-circle text-emerald-400 mr-2.5 text-sm"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                    selectedPackage === pkg.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {selectedPackage === pkg.id ? "✓ Package Selected" : "Select Tier"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Specification Form */}
        <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
            Project Specifications Form
          </h2>
          <p className="text-slate-400 text-sm text-center mb-10">
            Tell us about your tech stack preferences, deliverables, and timelines.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Full Name <span className="text-blue-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Email Address <span className="text-blue-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Project Domain <span className="text-blue-500">*</span>
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                  required
                >
                  <option value="">Select Domain / Solution Type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Project Overview & Scope <span className="text-blue-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="6"
                placeholder="Outline your project scope, hardware requirements (if IoT), target users, and key deliverables..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm resize-none"
                required
              ></textarea>
            </div>

            {selectedPackage && (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center gap-3">
                <i className="fas fa-check-circle text-blue-400 text-lg"></i>
                <span className="text-sm font-medium text-slate-200">
                  Selected Package: <strong className="text-white">{packages.find((p) => p.id === selectedPackage).name}</strong>
                </span>
              </div>
            )}

            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSending}
                className="w-full md:w-auto px-12 py-4 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all duration-200"
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Submitting Specification...</span>
                  </span>
                ) : (
                  "Transmit Project Specs"
                )}
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <PopupAlert
          isOpen={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          title="Specification Transmitted!"
          message="Thank you! Your project requirements were received. Our solution architect will contact you within 24 hours."
          type="success"
          confirmButtonText="OK"
          animation="scale"
        />
      )}

      {/* Error Popup */}
      <ErrorPopup
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Submission Error"
        message={errorMessage}
        type="validation"
        showRetryButton={true}
        onRetry={retrySendFunction}
      />
    </div>
  );
}

export default StartProject;
