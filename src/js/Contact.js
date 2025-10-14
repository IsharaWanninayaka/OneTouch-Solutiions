import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });
      } catch (error) {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
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
            Ready to start your next project? Contact us today and let's discuss how we can help your business grow.
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="mb-10 md:w-1/2 md:mb-0 md:pr-10">
            {/* Contact Information remains the same */}
            {/* ... */}
          </div>

          <div className="md:w-1/2">
            <div className="p-8 bg-white shadow-lg rounded-xl">
              <h3 className="mb-6 text-2xl font-bold text-gray-800">
                Send Us a Message
              </h3>

              {submitStatus === "success" && (
                <div className="px-4 py-3 mb-6 text-green-700 bg-green-100 border border-green-400 rounded">
                  Thank you for your message! We will get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="px-4 py-3 mb-6 text-red-700 bg-red-100 border border-red-400 rounded">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-gray-700" htmlFor="name">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2 text-gray-700" htmlFor="company">
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

                <div className="mb-6">
                  <label className="block mb-2 text-gray-700" htmlFor="message">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 font-semibold text-white transition duration-300 rounded-lg shadow-md gradient-bg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="w-5 h-5 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;