import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import PopupAlert from "./Alert";
import ErrorPopup from "./ErrorPopup";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    if (!formData.contactNo.trim()) {
      setErrorMessage("Please enter your contact number.");
      setShowError(true);
      return;
    }
    if (!formData.email.trim()) {
      setErrorMessage("Please enter your email.");
      setShowError(true);
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage("Please enter your message.");
      setShowError(true);
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE1_ID,
        {
          name: formData.name,
          contactNo: formData.contactNo,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          to_email:
            "ishara@onetouchsolutions.lk,namal@onetouchsolutions.lk,dinesh@onetouchsolutions.lk",
          reply_to: formData.email,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setShowSuccessAlert(true);

      setFormData({
        name: "",
        contactNo: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Email send failed:", error);
      setErrorMessage(
        error.message ||
          "Unable to send message. Please check your network and try again."
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 text-white relative tech-grid-pattern overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb w-[450px] h-[450px] bg-blue-600/10 top-0 left-0"></div>
      <div className="glow-orb w-[450px] h-[450px] bg-indigo-600/10 bottom-0 right-0"></div>

      <div className="container px-4 mx-auto md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="fas fa-paper-plane mr-2"></i> Initiate Contact
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Let's Build Something <span className="gradient-text">Extraordinary</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Have a project in mind or need technical consultation? Reach out to our engineering team today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Details</h3>
              
              <div className="space-y-6 text-slate-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-lg"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Headquarters</div>
                    <div className="text-base font-semibold text-white mt-0.5">No 27, Halgasthota, Katunayaka</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone-alt text-lg"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Phone Support</div>
                    <div className="text-sm font-medium text-slate-200 mt-1 space-y-0.5">
                      <div>+94 71 469 8430</div>
                      <div>+94 70 604 1212</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-lg"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Official Email</div>
                    <div className="text-sm font-medium text-slate-200 mt-1 space-y-0.5">
                      <div><a href="mailto:contact@onetouchsolutions.lk" className="hover:text-blue-400 transition-colors">contact@onetouchsolutions.lk</a></div>
                      <div><a href="mailto:support@onetouchsolutions.lk" className="hover:text-blue-400 transition-colors">support@onetouchsolutions.lk</a></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Connect With Us</div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://x.com/onetouchso88573?t=2Fmp880ebWi7aKWbXRCulA&s=08"
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white border border-slate-700 flex items-center justify-center transition-all duration-200"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61582138145189&mibextid=LQQJ4d"
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white border border-slate-700 flex items-center justify-center transition-all duration-200"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/oone-touch-solutions/about/?viewAsMember=true"
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white border border-slate-700 flex items-center justify-center transition-all duration-200"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/ishar_a675?igsh=MTg2ZnBwemw4dDVuMA%3D%3D&utm_source=qr"
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white border border-slate-700 flex items-center justify-center transition-all duration-200"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-2">Send Us a Direct Message</h3>
              <p className="text-slate-400 text-sm mb-8">Fill out the form below and our lead engineer will respond within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2" htmlFor="name">
                      Your Name <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2" htmlFor="contactNo">
                      Contact Number <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactNo"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      placeholder="+94 77 123 4567"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2" htmlFor="email">
                      Email Address <span className="text-blue-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2" htmlFor="company">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2" htmlFor="message">
                    Project Overview / Message <span className="text-blue-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us about your project goals, timelines, or technology requirements..."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Project Request</span>
                      <i className="fas fa-arrow-right"></i>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <PopupAlert
          isOpen={showSuccessAlert}
          onClose={() => setShowSuccessAlert(false)}
          title="Message Transmitted!"
          message="Thank you! Your inquiry was sent successfully. Our team will contact you shortly."
          type="success"
          confirmButtonText="OK"
          animation="scale"
        />
      )}

      {/* Error / Network Popup */}
      <ErrorPopup
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Transmission Error"
        message={errorMessage}
        type="validation"
        showRetryButton={true}
        onRetry={retrySendFunction}
      />
    </section>
  );
}

export default Contact;
