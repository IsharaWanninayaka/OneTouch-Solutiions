import React from "react";

function CookiePolicy() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-white relative tech-grid-pattern overflow-hidden">
      <div className="container px-4 mx-auto md:px-8 relative z-10">
        <div className="max-w-4xl p-8 md:p-12 mx-auto bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl md:text-5xl font-extrabold tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-slate-400 text-sm">Last updated: September 2026</p>
          </div>

          <div className="space-y-10 text-slate-300 text-sm leading-relaxed">
            <section>
              <h2 className="mb-3 text-xl font-bold text-white">1. What Are Cookies?</h2>
              <p>
                Cookies are small telemetry text files saved on your device when visiting OneTouch Solutions. They enable secure session persistence, performance analytics, and preference retention.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-white">2. Categorization of Cookies Used</h2>
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <h3 className="text-base font-semibold text-blue-400 mb-1">Essential Telemetry Cookies</h3>
                  <p className="text-slate-300 text-xs">Required for basic site navigation, form security tokens, and consent tracking.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                  <h3 className="text-base font-semibold text-blue-400 mb-1">Analytics & Performance</h3>
                  <p className="text-slate-300 text-xs">Measures page load metrics, session durations, and interface optimization opportunities.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-white">3. Direct Contact</h2>
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <p><strong>Email:</strong> privacy@onetouchsolutions.lk</p>
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

export default CookiePolicy;
