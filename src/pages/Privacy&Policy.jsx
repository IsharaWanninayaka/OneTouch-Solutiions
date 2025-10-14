import React from "react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl p-8 mx-auto bg-white shadow-lg rounded-xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">Last updated: December 2023</p>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                1. Introduction
              </h2>
              <p className="mb-4 text-gray-600">
                Welcome to OneTouch Solution ("we," "our," or "us"). We are
                committed to protecting your personal information and your right
                to privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website and use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                2. Information We Collect
              </h2>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Personal Information
              </h3>
              <ul className="mb-6 space-y-2 text-gray-600 list-disc list-inside">
                <li>
                  Name and contact information (email, phone number, company)
                </li>
                <li>Project requirements and business information</li>
                <li>Communication preferences</li>
                <li>Billing and payment information</li>
              </ul>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                Automatically Collected Information
              </h3>
              <ul className="mb-6 space-y-2 text-gray-600 list-disc list-inside">
                <li>IP address and browser type</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website and search terms</li>
                <li>Device information and operating system</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                3. How We Use Your Information
              </h2>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                <li>To provide and maintain our services</li>
                <li>To process your requests and projects</li>
                <li>To communicate with you about updates and offers</li>
                <li>To improve our website and services</li>
                <li>To analyze usage patterns and trends</li>
                <li>To prevent fraud and enhance security</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                4. Information Sharing
              </h2>
              <p className="mb-4 text-gray-600">
                We do not sell, trade, or rent your personal information to
                third parties. We may share information with:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your consent</li>
                <li>Successor entities in case of merger or acquisition</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                5. Data Security
              </h2>
              <p className="mb-4 text-gray-600">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                <li>SSL encryption for data transmission</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage practices</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                6. Your Rights
              </h2>
              <p className="mb-4 text-gray-600">You have the right to:</p>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                <li>Access and receive copies of your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Data portability to transfer your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                7. Contact Us
              </h2>
              <p className="mb-4 text-gray-600">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
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

            {/* Policy Updates */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                8. Policy Updates
              </h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
