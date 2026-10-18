import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { RobotHead } from "robot-heads";
import PopupAlert from "../components/Alert";
import ErrorPopup from "../components/ErrorPopup";

function GetQuote() {
  const navigate = useNavigate();
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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const projectTypes = [
    {
      id: "web-dev",
      label: "Web Development",
      desc: "Responsive high-speed corporate & landing websites",
      icon: "fas fa-globe",
    },
    {
      id: "custom-web",
      label: "Custom Web Application",
      desc: "Scalable SaaS portals, dashboards & workflows",
      icon: "fas fa-laptop-code",
    },
    {
      id: "mobile-app",
      label: "Mobile App",
      desc: "Cross-platform iOS & Android mobile applications",
      icon: "fas fa-mobile-alt",
    },
    {
      id: "iot",
      label: "Software + Hardware (IoT)",
      desc: "Embedded systems, microcontrollers & sensor telemetry",
      icon: "fas fa-microchip",
    },
    {
      id: "ecommerce",
      label: "E-commerce Platform",
      desc: "Multi-vendor marketplaces & secure payment gateways",
      icon: "fas fa-shopping-cart",
    },
    {
      id: "custom",
      label: "Custom Solution",
      desc: "Bespoke digital architecture tailored to your needs",
      icon: "fas fa-cogs",
    },
  ];

  const budgetRanges = [
    { label: "$150 - $500", icon: "fas fa-seedling" },
    { label: "$500 - $1,000", icon: "fas fa-layer-group" },
    { label: "$1,000 - $5,000", icon: "fas fa-chart-line" },
    { label: "$5,000+", icon: "fas fa-crown" },
    { label: "Flexible / Custom Scope", icon: "fas fa-infinity" },
  ];

  const timelineOptions = [
    { label: "1-2 weeks (Rapid)", icon: "fas fa-bolt" },
    { label: "1 month", icon: "fas fa-rocket" },
    { label: "2-3 months", icon: "fas fa-calendar-alt" },
    { label: "3-6 months", icon: "fas fa-cubes" },
    { label: "Flexible", icon: "fas fa-sliders-h" },
  ];

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateField = (name, value) => {
    let err = "";
    if (name === "name") {
      if (!value.trim()) err = "Full name is required";
    } else if (name === "email") {
      if (!value.trim()) {
        err = "Email address is required";
      } else if (!emailRegex.test(value.trim())) {
        err = "Please enter a valid email address (e.g. name@example.com)";
      }
    } else if (name === "phone") {
      if (value && value.length !== 10) {
        err = "Phone number must be exactly 10 digits";
      }
    } else if (name === "projectType") {
      if (!value.trim()) err = "Please choose a solution category";
    } else if (name === "description") {
      if (!value.trim()) err = "Please provide project specifications";
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextVal = value;

    if (name === "phone") {
      nextVal = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextVal,
    }));

    if (touched[name]) {
      const fieldErr = validateField(name, nextVal);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErr,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErr = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: fieldErr,
    }));
  };

  const handleSelectProjectType = (typeLabel) => {
    setFormData((prev) => ({ ...prev, projectType: typeLabel }));
    setErrors((prev) => ({ ...prev, projectType: "" }));
  };

  const handleSelectBudget = (budgetVal) => {
    setFormData((prev) => ({ ...prev, budget: budgetVal }));
  };

  const handleSelectTimeline = (timelineVal) => {
    setFormData((prev) => ({ ...prev, timeline: timelineVal }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      const nameErr = validateField("name", formData.name);
      const emailErr = validateField("email", formData.email);
      const phoneErr = validateField("phone", formData.phone);

      setTouched((prev) => ({ ...prev, name: true, email: true, phone: true }));
      setErrors((prev) => ({ ...prev, name: nameErr, email: emailErr, phone: phoneErr }));

      if (nameErr) {
        setErrorMessage("Please enter your full name.");
        setShowError(true);
        return;
      }
      if (emailErr) {
        if (!formData.email.trim()) {
          setErrorMessage("Please enter your email address.");
        } else {
          setErrorMessage("Please enter a valid email address (e.g. name@example.com).");
        }
        setShowError(true);
        return;
      }
      if (phoneErr) {
        setErrorMessage("Phone number must be exactly 10 digits (e.g. 0771234567).");
        setShowError(true);
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.projectType.trim()) {
        setErrors((prev) => ({ ...prev, projectType: "Please select a solution category" }));
        setErrorMessage("Please select a project solution category.");
        setShowError(true);
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

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
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      setShowError(true);
      return;
    }
    if (formData.phone && formData.phone.length !== 10) {
      setErrorMessage("Phone number must be exactly 10 digits.");
      setShowError(true);
      return;
    }
    if (!formData.projectType.trim()) {
      setErrorMessage("Please select a project domain category.");
      setShowError(true);
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage("Please provide project requirements or an overview.");
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE2_ID,
        {
          name: formData.name,
          email: formData.email,
          company: formData.company || "N/A",
          phone: formData.phone || "N/A",
          projectType: formData.projectType,
          budget: formData.budget || "Flexible / Not specified",
          timeline: formData.timeline || "Flexible / Not specified",
          description: formData.description,
          to_email:
            "ishara@onetouchsolutions.lk,namal@onetouchsolutions.lk,dinesh@onetouchsolutions.lk",
          reply_to: formData.email,
        },
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
      setErrors({});
      setTouched({});
      setCurrentStep(1);
    } catch (error) {
      console.error("Email sending failed:", error);
      setErrorMessage(
        error.message ||
          "Unable to send your quote request. Please check your network connection and retry."
      );
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, title: "Client Info", subtitle: "Name & Contact" },
    { num: 2, title: "Scope & Budget", subtitle: "Category & Timeline" },
    { num: 3, title: "Technical Details", subtitle: "Specifications" },
  ];

  return (
    <div className="min-h-screen pt-14 sm:pt-16 md:pt-20 pb-20 sm:pb-24 bg-gradient-to-b from-slate-50 via-white to-blue-50/20 text-slate-900 relative overflow-hidden select-none">
      {/* Floating Home Back Button (Only Arrow with 5s Periodic Nudge Reminder) */}
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label="Back to Home"
        className="ot-back-btn fixed top-5 left-5 sm:top-7 sm:left-7 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_24px_-4px_rgba(37,99,235,0.12)] hover:shadow-lg hover:border-blue-400 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
      >
        {/* Subtle periodic ripple ring that fires with the 5s nudge */}
        <span className="ot-back-ripple absolute inset-0 rounded-full border border-blue-500/40 pointer-events-none" />
        <i className="ot-back-icon fas fa-arrow-left text-sm sm:text-base group-hover:-translate-x-1 transition-transform duration-300 ease-out"></i>
      </button>

      {/* Background Ambient Glows with Organic Float Animations */}
      <div className="ot-ambient-top absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-100/50 via-blue-50/20 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="ot-ambient-left absolute top-96 -left-32 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="ot-ambient-right absolute bottom-20 -right-32 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container px-4 mx-auto md:px-8 relative z-10 max-w-5xl">
        {/* Header Section with Smooth Reveal */}
        <div className="ot-quote-header relative max-w-4xl mx-auto mb-10 sm:mb-12">
          {/* Mobile Mascot (Centered above title on small screens) */}
          <div className="md:hidden flex justify-center mb-2 filter drop-shadow-[0_8px_20px_rgba(37,99,235,0.18)] cursor-pointer select-none">
            <RobotHead
              shape="rectangle"
              state="happy"
              size={75}
            />
          </div>

          <div className="max-w-2xl mx-auto text-center px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-slate-900 leading-tight">
              Request a Detailed{" "}
              <span className="gradient-text font-black">Project Quote</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
              Share your project parameters and our engineering leads will evaluate
              technical requirements and deliver a line-item estimate within 24 hours.
            </p>
          </div>

          {/* Mascot in the Red-Marked Area on the right */}
          <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center justify-center filter drop-shadow-[0_12px_28px_rgba(37,99,235,0.22)] cursor-pointer select-none hover:scale-105 transition-transform duration-300">
            <RobotHead
              shape="rectangle"
              state="happy"
              size={135}
            />
          </div>
        </div>

        {/* Signature OneTouch Curved Card Container with Card Entrance Animation */}
        <div className="ot-quote-card-container relative max-w-4xl mx-auto mb-10">
          {/* Main Card with Seamless Curved SVG Border & Notch Mask */}
          <div
            className="relative z-10 w-full"
            style={{
              filter:
                "drop-shadow(0 20px 45px rgba(37, 99, 235, 0.10)) drop-shadow(0 4px 12px rgba(15, 23, 42, 0.04))",
            }}
          >
            {/* Unified Card SVG Background & Border */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ overflow: "visible" }}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="quoteCardBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#f8faff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <mask id="quoteNotchMask" maskUnits="userSpaceOnUse" x="0" y="0" width="4000" height="4000">
                  <rect x="0" y="0" width="4000" height="4000" fill="white" />
                  {/* Desktop Cutout */}
                  <path
                    className="hidden sm:block"
                    d="M -20,-20 L 220,-20 L 220,1 A 28,28 0 0 0 192,28 A 28,28 0 0 1 164,56 L 28,56 A 28,28 0 0 0 1,84 L -20,84 Z"
                    fill="black"
                  />
                  {/* Mobile Cutout */}
                  <path
                    className="block sm:hidden"
                    d="M -20,-20 L 176,-20 L 176,1 A 24,24 0 0 0 152,24 A 24,24 0 0 1 128,48 L 24,48 A 24,24 0 0 0 1,72 L -20,72 Z"
                    fill="black"
                  />
                </mask>
              </defs>

              {/* Desktop Card */}
              <rect
                className="hidden sm:block"
                x="1"
                y="1"
                style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
                rx="36"
                ry="36"
                fill="url(#quoteCardBgGrad)"
                stroke="#2563eb"
                strokeWidth="2"
                mask="url(#quoteNotchMask)"
              />
              <path
                className="hidden sm:block"
                d="M 1,84 A 28,28 0 0 1 28,56 L 164,56 A 28,28 0 0 0 192,28 A 28,28 0 0 1 220,1"
                stroke="#2563eb"
                strokeWidth="2"
                fill="none"
              />

              {/* Mobile Card */}
              <rect
                className="block sm:hidden"
                x="1"
                y="1"
                style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
                rx="28"
                ry="28"
                fill="url(#quoteCardBgGrad)"
                stroke="#2563eb"
                strokeWidth="2"
                mask="url(#quoteNotchMask)"
              />
              <path
                className="block sm:hidden"
                d="M 1,72 A 24,24 0 0 1 24,48 L 128,48 A 24,24 0 0 0 152,24 A 24,24 0 0 1 176,1"
                stroke="#2563eb"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Inner Content Area with optimal vertical breathing room below notch curve */}
            <div className="relative z-10 p-6 sm:p-10 md:p-12 pt-24 sm:pt-28 md:pt-32">
              {/* Multi-step Progress Stepper (Modern Unified Track UI/UX) */}
              <div className="max-w-xl mx-auto mb-9 sm:mb-11">
                {/* Unified Segmented Pill Track */}
                <div className="bg-slate-100/90 p-1.5 rounded-2xl sm:rounded-full border border-slate-200/90 shadow-inner flex flex-col sm:flex-row items-center gap-1 sm:gap-1.5">
                  {steps.map((s) => {
                    const isActive = currentStep === s.num;
                    const isCompleted = currentStep > s.num;
                    return (
                      <button
                        key={s.num}
                        type="button"
                        onClick={() => {
                          if (isCompleted) setCurrentStep(s.num);
                        }}
                        disabled={!isCompleted && !isActive}
                        className={`w-full sm:flex-1 flex items-center justify-start gap-2.5 py-2 px-3 sm:px-4 rounded-xl sm:rounded-full transition-all duration-300 text-left select-none ${
                          isActive
                            ? "ot-stepper-active bg-white text-slate-900 shadow-sm border border-blue-200/80 ring-2 ring-blue-500/10"
                            : isCompleted
                            ? "text-slate-700 hover:bg-white/80 cursor-pointer"
                            : "text-slate-400 cursor-not-allowed opacity-60"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                            isActive
                              ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                              : isCompleted
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {isCompleted ? <i className="fas fa-check text-[10px]"></i> : s.num}
                        </div>
                        <div className="overflow-hidden min-w-0">
                          <p
                            className={`text-xs sm:text-sm font-bold leading-tight truncate ${
                              isActive
                                ? "text-blue-900"
                                : isCompleted
                                ? "text-slate-800"
                                : "text-slate-400"
                            }`}
                          >
                            {s.title}
                          </p>
                          <p className="hidden md:block text-[10px] text-slate-400 truncate mt-0.5">
                            {s.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Slim Elegant Progress Line & Step Counter */}
                <div className="mt-3 flex items-center justify-between px-2">
                  <div className="flex-1 h-1.5 bg-slate-200/80 rounded-full overflow-hidden mr-3">
                    <div
                      className="ot-progress-fill h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 transition-all duration-500 rounded-full"
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                    Step {currentStep} of 3
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="relative z-10">
            {/* ================= STEP 1: Client Info ================= */}
            {currentStep === 1 && (
              <div key="step-1" className="space-y-6 ot-step-enter">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                    Contact Credentials
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Tell us who you are so we know where to send the formal estimate.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-2">
                  <div className={`ot-field-group ${errors.name ? "has-error" : ""}`}>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Jane Doe"
                      className={`ot-pill-input ${errors.name ? "has-error" : ""}`}
                    />
                    <label className="ot-field-label" htmlFor="name">
                      Full name <span className="text-blue-600">*</span>
                    </label>
                    {errors.name && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1 pl-4 flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-[10px]"></i>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className={`ot-field-group ${errors.email ? "has-error" : ""}`}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="jane@company.com"
                      className={`ot-pill-input ${errors.email ? "has-error" : ""}`}
                    />
                    <label className="ot-field-label" htmlFor="email">
                      Email address <span className="text-blue-600">*</span>
                    </label>
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1 pl-4 flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-[10px]"></i>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div className="ot-field-group">
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Global Inc"
                      className="ot-pill-input"
                    />
                    <label className="ot-field-label" htmlFor="company">
                      Company / Organization
                    </label>
                  </div>

                  <div className={`ot-field-group ${errors.phone ? "has-error" : ""}`}>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="0771234567"
                      className={`ot-pill-input ${errors.phone ? "has-error" : ""}`}
                    />
                    <label className="ot-field-label" htmlFor="phone">
                      Contact number (10 digits)
                    </label>
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 font-medium mt-1 pl-4 flex items-center gap-1">
                        <i className="fas fa-exclamation-circle text-[10px]"></i>
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-5 sm:pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group px-8 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 flex items-center gap-2 active:scale-95"
                  >
                    <span> Project Scope</span>
                    <i className="fas fa-arrow-right text-xs arrow-swipe transition-transform duration-200"></i>
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: Scope & Budget ================= */}
            {currentStep === 2 && (
              <div key="step-2" className="space-y-7 ot-step-enter">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                    Scope & Investment
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Select your project category, expected budget parameters, and desired timeline.
                  </p>
                </div>

                {/* Solution Category Interactive Grid Cards */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Solution Category <span className="text-blue-600">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
                    {projectTypes.map((type) => {
                      const isSelected = formData.projectType === type.label;
                      return (
                        <div
                          key={type.id}
                          onClick={() => handleSelectProjectType(type.label)}
                          className={`ot-category-card group p-4 sm:p-5 rounded-[24px] sm:rounded-[26px] border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between select-none ${
                            isSelected
                              ? "selected bg-gradient-to-br from-blue-50/90 via-white to-blue-50/40 border-blue-600 ring-4 ring-blue-500/15 shadow-xl shadow-blue-500/10 scale-[1.02]"
                              : "bg-white/90 border-slate-200/80 hover:border-blue-400/80 hover:bg-blue-50/25 hover:-translate-y-1 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div
                              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-base sm:text-lg transition-all duration-300 ${
                                isSelected
                                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105"
                                  : "bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                              }`}
                            >
                              <i className={type.icon}></i>
                            </div>
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] transition-all duration-200 ${
                                isSelected
                                  ? "border-blue-600 bg-blue-600 text-white shadow-xs"
                                  : "border-slate-300 bg-white group-hover:border-blue-400"
                              }`}
                            >
                              {isSelected && <i className="fas fa-check"></i>}
                            </div>
                          </div>
                          <div>
                            <h4
                              className={`text-sm sm:text-base font-bold transition-colors ${
                                isSelected ? "text-blue-900" : "text-slate-800 group-hover:text-blue-900"
                              }`}
                            >
                              {type.label}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                              {type.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.projectType && (
                    <p className="text-[11px] text-rose-500 font-medium mt-2 pl-2 flex items-center gap-1.5">
                      <i className="fas fa-exclamation-circle text-[10px]"></i>
                      {errors.projectType}
                    </p>
                  )}
                </div>

                {/* Budget Range Curved Pills */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                    Estimated Budget Range
                  </label>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {budgetRanges.map((range) => {
                      const isSelected = formData.budget === range.label;
                      return (
                        <button
                          key={range.label}
                          type="button"
                          onClick={() => handleSelectBudget(range.label)}
                          className={`ot-choice-pill group px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold border-2 transition-all duration-200 flex items-center gap-2 select-none active:scale-95 ${
                            isSelected
                              ? "selected bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25 ring-4 ring-blue-500/15 scale-105"
                              : "bg-white/90 border-slate-200/90 text-slate-700 hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-700"
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-colors ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                            }`}
                          >
                            <i className={range.icon}></i>
                          </span>
                          <span>{range.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Target Timeline Curved Pills */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
                    Target Delivery Timeline
                  </label>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {timelineOptions.map((time) => {
                      const isSelected = formData.timeline === time.label;
                      return (
                        <button
                          key={time.label}
                          type="button"
                          onClick={() => handleSelectTimeline(time.label)}
                          className={`ot-choice-pill group px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold border-2 transition-all duration-200 flex items-center gap-2 select-none active:scale-95 ${
                            isSelected
                              ? "selected bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/25 ring-4 ring-blue-500/15 scale-105"
                              : "bg-white/90 border-slate-200/90 text-slate-700 hover:border-blue-400 hover:bg-blue-50/30 hover:text-blue-700"
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-colors ${
                              isSelected
                                ? "bg-white/20 text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
                            }`}
                          >
                            <i className={time.icon}></i>
                          </span>
                          <span>{time.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 sm:pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95 flex items-center gap-2"
                  >
                    <i className="fas fa-arrow-left text-xs"></i>
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="group px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 flex items-center gap-2 active:scale-95"
                  >
                    <span> Technical Details</span>
                    <i className="fas fa-arrow-right text-xs arrow-swipe transition-transform duration-200"></i>
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: Technical Details ================= */}
            {currentStep === 3 && (
              <div key="step-3" className="space-y-6 ot-step-enter">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                    Technical Specifications
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Tell us about your core goals, desired integrations, or any reference systems.
                  </p>
                </div>

                {/* Quick Summary Curved Card */}
                <div className="p-5 sm:p-6 rounded-[28px] bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 border-2 border-blue-200/90 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shadow-sm">
                        <i className="fas fa-check"></i>
                      </span>
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900">
                        Selected Configuration Summary
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-300 hover:border-blue-600 transition-all duration-200 flex items-center gap-1.5"
                    >
                      <i className="fas fa-pen text-[10px]"></i>
                      <span>Edit Scope</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-white/90 border border-blue-100 shadow-xs flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                        <i className="fas fa-cube"></i>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Domain</p>
                        <p className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                          {formData.projectType || "Not chosen"}
                        </p>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/90 border border-blue-100 shadow-xs flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                        <i className="fas fa-dollar-sign"></i>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Budget</p>
                        <p className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                          {formData.budget || "Flexible"}
                        </p>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/90 border border-blue-100 shadow-xs flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Timeline</p>
                        <p className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                          {formData.timeline || "Flexible"}
                        </p>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/90 border border-blue-100 shadow-xs flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Client</p>
                        <p className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                          {formData.name || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`ot-field-group ${errors.description ? "has-error" : ""}`}>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows="5"
                    placeholder="Provide details regarding key features, APIs, target users, or hardware modules..."
                    className={`ot-pill-textarea resize-none ${
                      errors.description ? "has-error" : ""
                    }`}
                  ></textarea>
                  <label className="ot-field-label" htmlFor="description">
                    Detailed Project Overview <span className="text-blue-600">*</span>
                  </label>
                  {errors.description && (
                    <p className="text-[11px] text-rose-500 font-medium mt-1 pl-4 flex items-center gap-1">
                      <i className="fas fa-exclamation-circle text-[10px]"></i>
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-5 sm:pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95 flex items-center gap-2"
                  >
                    <i className="fas fa-arrow-left text-xs"></i>
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group px-8 sm:px-9 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 flex items-center gap-2.5 active:scale-95 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin text-xs"></i>
                        <span>Processing Quote Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Quote Request</span>
                        <i className="fas fa-arrow-right text-xs arrow-swipe transition-transform duration-200"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
            </div>
          </div>
        </div>

       
       
      </div>

      {/* Success Alert Popup */}
      {showSuccessAlert && (
        <PopupAlert
          isOpen={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          title="Quote Request Received!"
          message="Thank you! Your requirements have been submitted. Our engineering leads will review the specifications and issue a comprehensive quote within 24 hours."
          type="success"
          confirmButtonText="OK"
          animation="scale"
        />
      )}

      {/* Error & Validation Popup */}
      <ErrorPopup
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Form Verification Notice"
        message={errorMessage}
        type="validation"
        showRetryButton={true}
        onRetry={retrySendFunction}
      />

      <style jsx>{`
        /* Page Elements Entrance & Ambient Animations */
        /* Home Arrow Entrance & Periodic 5-Second Attention Nudge */
        .ot-back-btn {
          animation: backBtnEntrance 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            homeArrowNudge 5s ease-in-out 1.8s infinite;
        }
        @keyframes backBtnEntrance {
          0% {
            opacity: 0;
            transform: translateX(-24px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        @keyframes homeArrowNudge {
          0%,
          100% {
            transform: translateX(0) scale(1);
            box-shadow: 0 8px 24px -4px rgba(37, 99, 235, 0.12);
          }
          /* Quick noticeable wiggle/shake during first ~0.8s */
          3% {
            transform: translateX(-5px) rotate(-4deg) scale(1.06);
            border-color: #93c5fd;
            box-shadow: 0 8px 24px -2px rgba(37, 99, 235, 0.28), 0 0 0 4px rgba(37, 99, 235, 0.15);
          }
          6% {
            transform: translateX(3.5px) rotate(3deg) scale(1.06);
            border-color: #60a5fa;
          }
          9% {
            transform: translateX(-4px) rotate(-2deg) scale(1.05);
            border-color: #3b82f6;
          }
          12% {
            transform: translateX(2px) rotate(1deg) scale(1.03);
          }
          15% {
            transform: translateX(-1px) rotate(0deg) scale(1.01);
          }
          18%,
          99% {
            transform: translateX(0) scale(1);
            box-shadow: 0 8px 24px -4px rgba(37, 99, 235, 0.12);
            border-color: #e2e8f0;
          }
        }

        .ot-back-btn:not(:hover) .ot-back-icon {
          animation: iconNudge 5s ease-in-out 1.8s infinite;
        }
        @keyframes iconNudge {
          0%,
          18%,
          100% {
            transform: translateX(0);
            color: #334155;
          }
          3%,
          9% {
            transform: translateX(-3px);
            color: #2563eb;
          }
          6%,
          12% {
            transform: translateX(1.5px);
            color: #2563eb;
          }
        }

        .ot-back-ripple {
          animation: ripplePulse 5s ease-out 1.8s infinite;
          opacity: 0;
        }
        @keyframes ripplePulse {
          0% {
            transform: scale(1);
            opacity: 0;
          }
          2% {
            opacity: 0.8;
          }
          15% {
            transform: scale(1.55);
            opacity: 0;
          }
          16%,
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        .ot-back-btn:hover {
          animation-play-state: paused;
        }
        .ot-back-btn:hover .ot-back-icon,
        .ot-back-btn:hover .ot-back-ripple {
          animation-play-state: paused;
        }

        .ot-quote-header {
          animation: quoteHeaderIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes quoteHeaderIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ot-quote-card-container {
          animation: quoteCardEntrance 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both;
        }
        @keyframes quoteCardEntrance {
          0% {
            opacity: 0;
            transform: translateY(32px) scale(0.985);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Ethereal Floating Ambient Glows */
        .ot-ambient-top {
          animation: floatAmbientTop 12s ease-in-out infinite alternate;
        }
        .ot-ambient-left {
          animation: floatAmbientLeft 14s ease-in-out infinite alternate;
        }
        .ot-ambient-right {
          animation: floatAmbientRight 16s ease-in-out infinite alternate;
        }
        @keyframes floatAmbientTop {
          0% {
            transform: translate(-50%, 0) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -18px) scale(1.08);
            opacity: 1;
          }
        }
        @keyframes floatAmbientLeft {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(24px, -20px) scale(1.15);
          }
        }
        @keyframes floatAmbientRight {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(-22px, 22px) scale(1.12);
          }
        }

        /* Step Fade & Slide Entrance (Between Steps 1, 2, 3) */
        .ot-step-enter {
          animation: stepEnter 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes stepEnter {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.995);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Active Stepper Glow Pulse */
        .ot-stepper-active {
          animation: stepperPulse 2.8s ease-in-out infinite;
        }
        @keyframes stepperPulse {
          0%,
          100% {
            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.12), 0 0 0 3px rgba(37, 99, 235, 0.1);
          }
          50% {
            box-shadow: 0 6px 18px rgba(37, 99, 235, 0.18), 0 0 0 5px rgba(37, 99, 235, 0.16);
          }
        }

        /* Progress Shimmer Gradient */
        .ot-progress-fill {
          background-size: 200% 100%;
          animation: progressShimmer 3s linear infinite;
        }
        @keyframes progressShimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Category Card Micro-Interactions */
        .ot-category-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.25s ease,
            background 0.25s ease;
        }
        .ot-category-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px -6px rgba(37, 99, 235, 0.12);
        }
        .ot-category-card.selected {
          animation: cardSelectPop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes cardSelectPop {
          0% {
            transform: scale(0.97);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1.02);
          }
        }

        /* Choice Pill Selection Pop */
        .ot-choice-pill {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.25s ease,
            border-color 0.2s ease,
            background-color 0.2s ease;
        }
        .ot-choice-pill:hover {
          transform: translateY(-1.5px);
        }
        .ot-choice-pill.selected {
          animation: choiceSelectPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes choiceSelectPop {
          0% {
            transform: scale(0.96);
          }
          50% {
            transform: scale(1.06);
          }
          100% {
            transform: scale(1.05);
          }
        }

        /* Field Floating Labels & Inputs */
        .ot-field-group {
          position: relative;
          padding-top: 0.5rem;
        }
        .ot-field-label {
          position: absolute;
          left: 1.25rem;
          top: 0;
          background: #ffffff;
          padding: 0 0.45rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
          pointer-events: none;
          transition: color 0.25s cubic-bezier(0.16, 1, 0.3, 1), font-weight 0.2s ease;
          z-index: 10;
        }
        .ot-field-group:focus-within .ot-field-label {
          color: #2563eb;
        }

        .ot-pill-input {
          width: 100%;
          padding: 0.85rem 1.35rem;
          border-radius: 9999px;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #0f172a;
          font-size: 0.925rem;
          outline: none;
          transition: border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ot-pill-input::placeholder {
          color: #94a3b8;
        }
        .ot-pill-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3.5px rgba(37, 99, 235, 0.16);
          background: #ffffff;
        }

        .ot-pill-textarea {
          width: 100%;
          padding: 0.9rem 1.35rem;
          border-radius: 1.5rem;
          background: #ffffff;
          border: 1.5px solid #cbd5e1;
          color: #0f172a;
          font-size: 0.925rem;
          outline: none;
          transition: border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ot-pill-textarea::placeholder {
          color: #94a3b8;
        }
        .ot-pill-textarea:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3.5px rgba(37, 99, 235, 0.16);
          background: #ffffff;
        }

        .ot-pill-input.has-error,
        .ot-pill-textarea.has-error {
          border-color: #ef4444;
        }
        .ot-pill-input.has-error:focus,
        .ot-pill-textarea.has-error:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }
        .ot-field-group.has-error .ot-field-label {
          color: #ef4444 !important;
        }

        @keyframes arrowSwipeRight {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
        .group:hover .arrow-swipe {
          animation: arrowSwipeRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      `}</style>
    </div>
  );
}

export default GetQuote;
