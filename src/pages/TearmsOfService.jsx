import React from "react";

function TermsOfService() {
  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl p-8 mx-auto bg-white shadow-lg rounded-xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600">
              Effective date: December 2022
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            {/* Agreement */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                1. Agreement to Terms
              </h2>
              <p className="mb-4 text-gray-600">
                By accessing and using OneTouch Solution's services, you accept
                and agree to be bound by the terms and provision of this
                agreement.
              </p>
            </section>

            {/* Services */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                2. Services Provided
              </h2>
              <p className="mb-4 text-gray-600">
                OneTouch Solution provides the following services:
              </p>
              <ul className="space-y-2 text-gray-600 list-disc list-inside">
                <li>Custom web development and design</li>
                <li>Mobile application development</li>
                <li>Software and hardware integration solutions</li>
                <li>E-commerce platform development</li>
                <li>Technical consulting and support</li>
              </ul>
            </section>

            {/* Project Terms */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                3. Project Terms
              </h2>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                3.1 Project Scope
              </h3>
              <p className="mb-4 text-gray-600">
                Each project will be defined in a separate Statement of Work
                (SOW) that outlines:
              </p>
              <ul className="mb-6 space-y-2 text-gray-600 list-disc list-inside">
                <li>Project objectives and deliverables</li>
                <li>Timeline and milestones</li>
                <li>Pricing and payment schedule</li>
                <li>Technical specifications</li>
              </ul>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                3.2 Changes and Revisions
              </h3>
              <p className="mb-4 text-gray-600">
                Additional features or changes outside the original scope may
                incur additional charges and require a change order agreement.
              </p>
            </section>

            {/* Payment Terms */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                4. Payment Terms
              </h2>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                4.1 Pricing
              </h3>
              <p className="mb-4 text-gray-600">
                All prices are quoted in USD and are subject to change until a
                project agreement is signed.
              </p>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                4.2 Payment Schedule
              </h3>
              <ul className="mb-6 space-y-2 text-gray-600 list-disc list-inside">
                <li>50% deposit upon project initiation</li>
                <li>25% upon milestone completion</li>
                <li>25% upon project delivery</li>
              </ul>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                4.3 Late Payments
              </h3>
              <p className="mb-4 text-gray-600">
                Late payments may be subject to interest charges of 1.5% per
                month on the outstanding balance.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                5. Intellectual Property
              </h2>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                5.1 Client Materials
              </h3>
              <p className="mb-4 text-gray-600">
                The client retains ownership of all materials provided to
                OneTouch Solution for the project.
              </p>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                5.2 Deliverables
              </h3>
              <p className="mb-4 text-gray-600">
                Upon full payment, the client receives full ownership of the
                final deliverables, excluding third-party components and
                OneTouch Solution's proprietary tools.
              </p>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                5.3 Portfolio Rights
              </h3>
              <p className="mb-4 text-gray-600">
                OneTouch Solution retains the right to display completed work in
                our portfolio and marketing materials, unless otherwise agreed
                in writing.
              </p>
            </section>

            {/* Warranties and Liabilities */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                6. Warranties and Liabilities
              </h2>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                6.1 Service Warranty
              </h3>
              <p className="mb-4 text-gray-600">
                We warrant that our services will be performed in a professional
                manner consistent with industry standards.
              </p>

              <h3 className="mb-3 text-xl font-semibold text-gray-800">
                6.2 Limitation of Liability
              </h3>
              <p className="mb-4 text-gray-600">
                Our total liability for any claim shall not exceed the total
                amount paid by the client for the specific project.
              </p>
            </section>

            {/* Confidentiality */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                7. Confidentiality
              </h2>
              <p className="mb-4 text-gray-600">
                Both parties agree to maintain the confidentiality of
                proprietary information received during the project and not to
                disclose such information to any third party.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                8. Termination
              </h2>
              <p className="mb-4 text-gray-600">
                Either party may terminate a project with written notice. Upon
                termination, the client will pay for all work completed up to
                the termination date.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                9. Governing Law
              </h2>
              <p className="mb-4 text-gray-600">
                These terms shall be governed by and construed in accordance
                with the laws of the state where OneTouch Solution is
                registered.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                10. Contact Information
              </h2>
              <div className="p-6 rounded-lg bg-gray-50">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@onetouchsolution.com
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

export default TermsOfService;
