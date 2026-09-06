import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative pt-32 pb-24 md:pt-44 md:pb-36 hero-gradient-bg text-white overflow-hidden tech-grid-pattern"
    >
      {/* Background Glowing Ambient Orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-blue-600/20 top-10 left-1/4 -translate-x-1/2"></div>
      <div className="glow-orb w-[400px] h-[400px] bg-indigo-600/20 bottom-10 right-10"></div>

      <div className="container px-4 mx-auto md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-semibold mb-6 shadow-lg shadow-blue-500/10">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
              <span className="flex h-2 w-2 rounded-full bg-blue-400 -ml-4"></span>
              <span>Next-Gen Software & IoT Development Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Engineering High-Performance{" "}
              <span className="gradient-text">Digital Products</span> & Hardware Solutions
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-8">
              OneTouch Solutions builds custom web platforms, mobile applications, enterprise cloud systems, and smart IoT hardware integration tailored for ambitious businesses.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <button
                onClick={() => navigate("/start-project")}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-blue-600 rounded-xl shadow-xl shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
              >
                <span>Start Your Project</span>
                <i className="fas fa-arrow-right ml-3 text-sm"></i>
              </button>
              
              <button
                onClick={() => navigate("/our-work")}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-200 bg-slate-900/80 border border-slate-700/80 rounded-xl hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all duration-200 flex items-center justify-center"
              >
                <i className="fas fa-play text-blue-400 mr-3 text-xs"></i>
                <span>Explore Portfolio</span>
              </button>
            </div>

            {/* Key Metrics Strip */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0">
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-white">50+</div>
                <div className="text-xs text-slate-400 font-medium">Projects Delivered</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-blue-400">99.9%</div>
                <div className="text-xs text-slate-400 font-medium">Uptime & Reliability</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-extrabold text-indigo-400">100%</div>
                <div className="text-xs text-slate-400 font-medium">Custom Architecture</div>
              </div>
            </div>
          </div>

          {/* Right Interactive Tech Card / Visual Dashboard */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-40 animate-pulse-slow"></div>

              {/* Glassmorphic Panel */}
              <div className="relative rounded-3xl bg-slate-900/90 border border-slate-700/70 p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Header Card Bar */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <Logo variant="light" size="sm" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    <span className="text-xs font-semibold text-emerald-400">Live Telemetry</span>
                  </div>
                </div>

                {/* Dashboard Stats Grid */}
                <div className="space-y-4">
                  {/* Service Card 1 */}
                  <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/50 flex items-center justify-between hover:border-blue-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                        <i className="fas fa-globe text-lg"></i>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Web Applications</div>
                        <div className="text-xs text-slate-400">React • Node.js • Cloud</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-500/20 text-blue-300">
                      Active
                    </span>
                  </div>

                  {/* Service Card 2 */}
                  <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/50 flex items-center justify-between hover:border-blue-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                        <i className="fas fa-mobile-alt text-lg"></i>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Mobile Apps</div>
                        <div className="text-xs text-slate-400">iOS & Android Solutions</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-500/20 text-indigo-300">
                      Ready
                    </span>
                  </div>

                  {/* Service Card 3 */}
                  <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/50 flex items-center justify-between hover:border-blue-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                        <i className="fas fa-microchip text-lg"></i>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">IoT + Hardware</div>
                        <div className="text-xs text-slate-400">Embedded Systems & Sensors</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-cyan-500/20 text-cyan-300">
                      Connected
                    </span>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <i className="fas fa-shield-alt text-blue-400"></i> Enterprise Grade
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="fas fa-bolt text-amber-400"></i> High Speed
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
