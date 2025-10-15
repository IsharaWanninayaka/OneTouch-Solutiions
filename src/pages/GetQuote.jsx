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
    "IoT",
    "E-commerce Platform",
    "Other",
  ];

  const budgetRanges = [
    "$100 - $500",
    "$500 - $1,000",
    "$1,000 - $5,000",
    "Not sure",
  ];

  const timelineOptions = [
    "1-2 weeks",
    "1 month",
    "2-3 months",
    "3-6 months",
    "6+ months",
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
    // Validate current step before proceeding
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
        setErrorMessage("Please select a project type.");
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

    // Validate all required fields
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
      setErrorMessage("Please select a project type.");
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

      // Reset form
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
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container px-4 py-12 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
            Get Your Project Quote
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Tell us about your project and we'll provide a detailed quote within
            24 hours.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {["Basic Info", "Project Details", "Requirements"].map(
              (label, index) => (
                <div
                  key={label}
                  className={`text-sm font-medium ${
                    currentStep >= index + 1
                      ? "text-indigo-600"
                      : "text-gray-500"
                  }`}
                >
                  {label}
                </div>
              )
            )}
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 transition-all duration-300 bg-indigo-600 rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="max-w-2xl p-8 mx-auto bg-white shadow-lg rounded-xl">
          <form onSubmit={handleSubmit}>
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Next: Project Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                  Project Details
                </h2>

                <div>
                  <label className="block mb-2 text-gray-700">
                    Project Type *
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-gray-700">
                      Estimated Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Next: Requirements
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="mb-6 text-2xl font-bold text-gray-800">
                  Project Requirements
                </h2>

                <div>
                  <label className="block mb-2 text-gray-700">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Please describe your project in detail..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <div className="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        Sending...
                      </span>
                    ) : (
                      "Send My Quote"
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Quick Contact */}
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-gray-600">
            Prefer to talk directly?{" "}
            <a
              href="tel:+94714698430"
              className="font-medium text-indigo-600 hover:text-indigo-700"
            >
              Call us now
            </a>
          </p>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <PopupAlert
          isOpen={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          title="Quote Request Sent!"
          message="Thank you! Your project details were sent successfully. We will contact you within 24 hours with your detailed quote."
          type="success"
          confirmButtonText="OK"
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

export default GetQuote;
