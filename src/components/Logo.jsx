import React from "react";

function Logo({ className = "", size = "normal" }) {
  // size options: "sm" (h-7/h-8), "normal" (h-9/h-11), "lg" (h-12/h-14)
  const logoHeights = {
    sm: "h-7 md:h-8",
    normal: "h-9 md:h-11",
    lg: "h-12 md:h-14",
  };

  return (
    <div className={`inline-flex items-center select-none cursor-pointer group py-1 ${className}`}>
      <img
        src="/images/real-onetouch-logo.svg"
        alt="OneTouch Solutions"
        className={`${logoHeights[size] || logoHeights.normal} w-auto object-contain transition-all duration-300 group-hover:scale-[1.03]`}
        onError={(e) => {
          // Fallback to Logo3.png if SVG fails to load
          e.target.src = "/images/Logo3.png";
        }}
      />
    </div>
  );
}

export default Logo;
