import React from "react";

function CookiePolicy() {
  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl p-8 mx-auto bg-white shadow-lg rounded-xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-600">Last updated: December 2022</p>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                1. What Are Cookies?
              </h2>
              <p className="mb-4 text-gray-600">
                Cookies are small text files that are placed on your computer or
                mobile device when you visit our website. They help us provide
                you with a better experience and allow us to improve our
                services.
              </p>
            </section>

            {/* How We Use Cookies */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                2. How We Use Cookies
              </h2>

              <div className="p-6 mb-6 rounded-lg bg-gray-50">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  Essential Cookies
                </h3>
                <p className="mb-2 text-gray-600">
                  These cookies are necessary for the website to function
                  properly.
                </p>
                <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                  <li>Session management and security</li>
                  <li>Load balancing and performance</li>
                  <li>Remembering your consent preferences</li>
                </ul>
              </div>

              <div className="p-6 mb-6 rounded-lg bg-gray-50">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  Analytics Cookies
                </h3>
                <p className="mb-2 text-gray-600">
                  These cookies help us understand how visitors interact with
                  our website.
                </p>
                <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                  <li>Page visits and navigation patterns</li>
                  <li>Time spent on pages</li>
                  <li>Error tracking and performance monitoring</li>
                </ul>
              </div>

              <div className="p-6 rounded-lg bg-gray-50">
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  Marketing Cookies
                </h3>
                <p className="mb-2 text-gray-600">
                  These cookies are used to track visitors across websites and
                  display relevant ads.
                </p>
                <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                  <li>Remarketing campaigns</li>
                  <li>Conversion tracking</li>
                  <li>Audience segmentation</li>
                </ul>
              </div>
            </section>

            {/* Types of Cookies We Use */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                3. Types of Cookies We Use
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border border-collapse border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 font-semibold text-left border border-gray-300">
                        Cookie Name
                      </th>
                      <th className="px-4 py-3 font-semibold text-left border border-gray-300">
                        Purpose
                      </th>
                      <th className="px-4 py-3 font-semibold text-left border border-gray-300">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 font-mono text-sm border border-gray-300">
                        session_id
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        Maintain user session
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        Session
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-sm border border-gray-300">
                        _ga
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        Google Analytics tracking
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        2 years
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-sm border border-gray-300">
                        cookie_consent
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        Remember cookie preferences
                      </td>
                      <td className="px-4 py-3 border border-gray-300">
                        1 year
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                4. Third-Party Cookies
              </h2>
              <p className="mb-4 text-gray-600">
                We may use services from third parties that place cookies on
                your device. These include:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                <li>
                  <strong>Google Analytics:</strong> Website analytics and
                  performance tracking
                </li>
                <li>
                  <strong>Google Ads:</strong> Advertising and conversion
                  tracking
                </li>
                <li>
                  <strong>Social Media Platforms:</strong> Social sharing and
                  engagement tracking
                </li>
                <li>
                  <strong>Payment Processors:</strong> Secure payment processing
                </li>
              </ul>
            </section>

            {/* Managing Cookies */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                5. Managing Cookies
              </h2>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Browser Settings
              </h3>
              <p className="mb-4 text-gray-600">
                You can control and manage cookies through your browser
                settings. Most browsers allow you to:
              </p>
              <ul className="mb-6 space-y-2 text-gray-600 list-disc list-inside">
                <li>View and delete existing cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all third-party cookies</li>
                <li>Browse in private/incognito mode</li>
              </ul>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Opt-Out Tools
              </h3>
              <p className="mb-4 text-gray-600">
                You can opt-out of specific cookie types:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                <li>
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Google Analytics Opt-out
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youronlinechoices.com/"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Your Online Choices (EU)
                  </a>
                </li>
                <li>
                  <a
                    href="https://optout.networkadvertising.org/"
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Network Advertising Initiative
                  </a>
                </li>
              </ul>
            </section>

            {/* Cookie Consent */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                6. Cookie Consent
              </h2>
              <p className="mb-4 text-gray-600">
                When you first visit our website, we will ask for your consent
                to use non-essential cookies. You can change your preferences at
                any time by clicking the "Cookie Settings" link in our footer.
              </p>
            </section>

            {/* Updates to Policy */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                7. Updates to This Policy
              </h2>
              <p className="mb-4 text-gray-600">
                We may update this Cookie Policy from time to time. We will
                notify you of any changes by updating the "Last updated" date
                and, where appropriate, seeking your consent again.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                8. Contact Us
              </h2>
              <div className="p-6 rounded-lg bg-gray-50">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@onetouchsolution.com
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +94 71 469 8430
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> No 27,Halgasthota,Katunayaka
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CookiePolicy;
