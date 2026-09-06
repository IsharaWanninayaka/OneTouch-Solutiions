import React from "react";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-white relative tech-grid-pattern overflow-hidden">
      <div className="container px-4 mx-auto md:px-8 relative z-10">
        <div className="max-w-4xl p-8 md:p-12 mx-auto bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl md:text-5xl font-extrabold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-slate-400 text-sm">Last updated: September 2026</p>
          </div>

          <div className="space-y-10 text-slate-300 text-sm leading-relaxed">
            <section>
              <h2 className="mb-3 text-xl font-bold text-white">1. Introduction</h2>
              <p>
                Welcome to OneTouch Solutions ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and engage our software and hardware engineering services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-white">2. Information We Collect</h2>
              <h3 className="mb-2 text-base font-semibold text-blue-400">Personal Information</h3>
              <ul className="mb-4 space-y-1.5 list-disc list-inside text-slate-300">
                <li>Name, professional email address, phone number, and organization</li>
                <li>Project scope specifications and hardware telemetry requirements</li>
                <li>Communication history and preferences</li>
              </ul>
              <h3 className="mb-2 text-base font-semibold text-blue-400">Automatically Collected Data</h3>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                <li>IP address, browser specification, and OS metrics</li>
                <li>Session duration and telemetry navigation</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-white">3. How We Use Your Information</h2>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                <li>To evaluate project specifications and issue architectural quotes</li>
                <li>To execute custom software and hardware engineering contracts</li>
                <li>To maintain cloud infrastructure security and prevent data fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-white">4. Data Security & Storage</h2>
              <p>
                We implement industry-standard encryption protocols (TLS/SSL) for all data transmissions, role-based access restrictions, and routine security audits to protect client intellectual property.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-bold text-white">5. Contact Our Privacy Lead</h2>
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

export default PrivacyPolicy;
