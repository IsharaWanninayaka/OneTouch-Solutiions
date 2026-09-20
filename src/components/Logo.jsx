import React from "react";

function Logo({ className = "", size = "normal" }) {
  // size options: "sm" (h-8/h-9), "normal" (h-11/h-14), "lg" (h-14/h-18)
  const logoHeights = {
    sm: "h-8 md:h-9",
    normal: "h-11 sm:h-12 md:h-14",
    lg: "h-14 md:h-16 lg:h-20",
  };

  return (
    <div className={`inline-flex items-center select-none cursor-pointer group py-1 ${className}`}>
      <img
        src="/images/logo7.jpg"
        alt="OneTouch Solutions"
        className={`${logoHeights[size] || logoHeights.normal} w-auto object-contain transition-all duration-300 group-hover:scale-[1.03] rounded-md`}
        onError={(e) => {
          // Fallback to Logo3.png if logo7 fails to load
          e.target.src = "/images/Logo3.png";
        }}
      />
    </div>
  );
}

export default Logo;
