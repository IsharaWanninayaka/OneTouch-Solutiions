import React from "react";
import Logo from "./Logo";

function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center flex flex-col items-center">
        <div className="mb-6">
          <Logo size="lg" />
        </div>
        <div className="w-10 h-10 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-slate-400 uppercase tracking-widest">Loading OneTouch Experience...</p>
      </div>
    </div>
  );
}

export default Loading;
