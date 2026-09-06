import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import PopupAlert from "../components/Alert";
import ErrorPopup from "../components/ErrorPopup";

function GetQuote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const projectTypes = [
    "Web Development",
    "Custom Web Application",
    "Mobile App",
    "Software + Hardware (IoT)",
    "E-commerce Platform",
    "Custom Solution",
  ];

  const budgetRanges = [
    "$150 - $500",
    "$500 - $1,000",
    "$1,000 - $5,000",
    "$5,000+",
    "Flexible / Custom Scope",
  ];

  const timelineOptions = [
    "1-2 weeks (Rapid)",
    "1 month",
    "2-3 months",
    "3-6 months",
    "Flexible",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.name.trim()) {
        setErrorMessage("Please enter your full name.");
        setShowError(true);
        return;
      }
      if (!formData.email.trim()) {
        setErrorMessage("Please enter your email address.");
        setShowError(true);
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.projectType.trim()) {
        setErrorMessage("Please select a project domain.");
        setShowError(true);
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const retrySendFunction = () => {
    setShowError(false);
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMessage("Please enter your full name.");
      setShowError(true);
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email address.");
      setShowError(true);
      return;
    }
    if (!formData.projectType.trim()) {
      setErrorMessage("Please select a project domain.");
      setShowError(true);
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage("Please provide a project description.");
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE2_ID,
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setShowSuccessAlert(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Email sending failed:", error);
      setErrorMessage(
        error.message ||
          "Unable to send your quote request. Please check your network connection and try again."
      );
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-white relative tech-grid-pattern overflow-hidden">
      <div className="container px-4 mx-auto md:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="fas fa-calculator mr-2"></i> Immediate Scope & Cost Estimate
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Request a Detailed <span className="gradient-text">Project Quote</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Share your project parameters and our engineering lead will evaluate technical requirements and return a line-item estimate within 24 hours.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider">
            {["1. Client Info", "2. Project Scope", "3. Requirements"].map(
              (label, index) => (
                <div
                  key={label}
                  className={currentStep >= index + 1 ? "text-blue-400" : "text-slate-500"}
                >
                  {label}
                </div>
              )
            )}
          </div>
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto p-8 md:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleSubmit}>
            
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Credentials</h2>

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
                      placeholder="Jane Doe"
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
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Tech"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 71 123 4567"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <span>Next: Project Scope</span>
                    <i className="fas fa-arrow-right ml-2 text-xs"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Scope & Budget</h2>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Solution Category <span className="text-blue-500">*</span>
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    required
                  >
                    <option value="">Select Domain Category</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Estimated Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Select Budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Target Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    >
                      <option value="">Select Timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3.5 text-xs font-bold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/30"
                  >
                    <span>Next: Technical Details</span>
                    <i className="fas fa-arrow-right ml-2 text-xs"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Technical Specifications</h2>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Detailed Project Overview <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Provide details regarding core features, third-party integrations, target platforms, or hardware specs..."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3.5 text-xs font-bold text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Processing Quote Request...</span>
                      </span>
                    ) : (
                      "Submit Quote Request"
                    )}
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

        {/* Quick Contact */}
        <div className="max-w-2xl mx-auto mt-10 text-center text-sm text-slate-400">
          Need immediate consultation?{" "}
          <a
            href="tel:+94714698430"
            className="font-bold text-blue-400 hover:text-blue-300 underline underline-offset-4 ml-1"
          >
            Direct Hotline: +94 71 469 8430
          </a>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <PopupAlert
          isOpen={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          title="Quote Request Received!"
          message="Thank you! Your requirements were submitted. Our team will review the specifications and issue a comprehensive quote within 24 hours."
          type="success"
          confirmButtonText="OK"
          animation="scale"
        />
      )}

      {/* Error Popup */}
      <ErrorPopup
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Form Error"
        message={errorMessage}
        type="validation"
        showRetryButton={true}
        onRetry={retrySendFunction}
      />
    </div>
  );
}

export default GetQuote;
