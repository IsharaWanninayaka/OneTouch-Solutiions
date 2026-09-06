import React from "react";

function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery & System Specs",
      desc: "We analyze business requirements, map user flows, and architect full hardware/software blueprints.",
      icon: "fas fa-compass",
    },
    {
      num: "02",
      title: "UI/UX & Hardware Prototype",
      desc: "Interactive visual prototypes, database schema modeling, and hardware circuit validation.",
      icon: "fas fa-drafting-compass",
    },
    {
      num: "03",
      title: "Agile Software & IoT Engineering",
      desc: "Iterative sprints with clean code standards, unit testing, and firmware integration.",
      icon: "fas fa-code-branch",
    },
    {
      num: "04",
      title: "Production Launch & Support",
      desc: "Seamless cloud deployment, store publishing, telemetry monitoring, and ongoing updates.",
      icon: "fas fa-rocket",
    },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative">
      <div className="container px-4 mx-auto md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <i className="fas fa-cogs mr-2"></i> Structured Execution
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Our 4-Step <span className="gradient-text">Engineering Process</span>
          </h2>
          <p className="text-slate-400 text-lg">
            From initial concept to full-scale deployment, we ensure complete transparency, quality assurance, and on-time delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-black text-slate-700 group-hover:text-blue-500 transition-colors">
                  {step.num}
                </span>
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <i className={`${step.icon} text-lg`}></i>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
