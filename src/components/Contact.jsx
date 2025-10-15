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
    handleSubmit(); // Retry sending
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // only call preventDefault if event exists

    //  Validate required fields
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
    <section id="contact" className="py-20 gradient-bg">
      <div className="container px-4 mx-auto md:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Get In Touch
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-indigo-100">
            Ready to start your next project? Contact us today and let's discuss
            how we can help your business grow.
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="mb-10 md:w-1/2 md:mb-0 md:pr-10">
            <div className="p-8 text-white bg-white bg-opacity-10 backdrop-blur-lg rounded-xl">
              <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-white rounded-full bg-opacity-20">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold">Our Office</h4>
                    <p>No 27, Halgasthota, Katunayaka</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-white rounded-full bg-opacity-20">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p>+94 71 469 8430</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-white rounded-full bg-opacity-20">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p>+94 71 469 8430</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-white rounded-full bg-opacity-20">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p>ish@onetouchsolution.it.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex items-center justify-center w-10 h-10 mr-4 bg-white rounded-full bg-opacity-20">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p>ish@onetouchsolution.it.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 mb-4">
                <h4 className="mb-4 font-bold">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full bg-opacity-20 hover:bg-opacity-30"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full bg-opacity-20 hover:bg-opacity-30"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full bg-opacity-20 hover:bg-opacity-30"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full bg-opacity-20 hover:bg-opacity-30"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section (Form) */}
          <div className="md:w-1/2">
            <div className="p-8 bg-white shadow-lg rounded-xl">
              <h3 className="mb-6 text-2xl font-bold text-gray-800">
                Send Us a Message
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-gray-700" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-gray-700"
                      htmlFor="contactNo"
                    >
                      Contact No
                    </label>
                    <input
                      type="text"
                      id="contactNo"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-gray-700" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      className="block mb-2 text-gray-700"
                      htmlFor="company"
                    >
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-gray-700" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 font-semibold text-white transition duration-300 rounded-lg shadow-md gradient-bg hover:opacity-90"
                >
                  {loading ? "Sending..." : "Send Message"}
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
          title="Message Sent!"
          message="Thank you! Your project details were sent successfully. We will contact you as soon as possible."
          type="success"
          confirmButtonText="OK"
          animation="scale"
        />
      )}

      {/* Error / Network Popup */}
      <ErrorPopup
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Error"
        message={errorMessage}
        type="validation"
        showRetryButton={true}
        onRetry={retrySendFunction}
      />
    </section>
  );
}

export default Contact;
