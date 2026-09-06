import React from "react";

function TermsOfService() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-white relative tech-grid-pattern overflow-hidden">
      <div className="container px-4 mx-auto md:px-8 relative z-10">
        <div className="max-w-4xl p-8 md:p-12 mx-auto bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl md:text-5xl font-extrabold tracking-tight">
              Terms of Service
            </h1>
            <p className="text-slate-400 text-sm">Effective date: September 2026</p>
          </div>

          <div className="space-y-10 text-slate-300 text-sm leading-relaxed">
            <section>
              <h2 className="mb-3 text-xl font-bold text-white">1. Agreement to Terms</h2>
              <p>
                By accessing services offered by OneTouch Solutions, clients agree to be bound by these Terms of Service and any associated Statement of Work (SOW) or engineering contracts.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-white">2. Scope of Services</h2>
              <p className="mb-3">OneTouch Solutions delivers software engineering & hardware services including:</p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                <li>Custom web and cloud software application engineering</li>
                <li>Native iOS and Android mobile app development</li>
                <li>Embedded hardware & IoT telemetry systems</li>
                <li>API microservice integration and DevOps deployment</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-white">3. Intellectual Property Rights</h2>
              <p>
                Upon complete receipt of project milestone payments, the client receives full ownership rights to all final custom code deliverables, excluding third-party open-source libraries and OneTouch core utility modules.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-white">4. Confidentiality & Non-Disclosure</h2>
              <p>
                Both parties agree to treat all technical specifications, database schemas, and proprietary hardware logic as strictly confidential during and after the project engagement.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-white">5. Legal Inquiries</h2>
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <p><strong>Email:</strong> legal@onetouchsolutions.lk</p>
                <p><strong>Hotline:</strong> +94 71 469 8430</p>
                <p><strong>Address:</strong> No 27, Halgasthota, Katunayaka, Sri Lanka</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;
