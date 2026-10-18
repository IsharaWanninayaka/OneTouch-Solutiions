import React, { useEffect, useState } from "react";

function PopupAlert({
  isOpen = false,
  onClose,
  title = "Success!",
  message = "Operation completed successfully.",
  type = "success",
  showConfirmButton = true,
  confirmButtonText = "OK",
  showCancelButton = false,
  cancelButtonText = "Cancel",
  onConfirm,
  overlayClose = true,
  animation = "fade",
  size = "md",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      handleClose();
    }

    return () => {
      document.body.style.overflow = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleClose = () => {
    if (!isVisible) return;

    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsLeaving(false);
      if (onClose) onClose();
    }, 300);
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    handleClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && overlayClose) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  const alertConfig = {
    success: {
      icon: "fas fa-check-circle",
      iconColor: "text-green-500",
      gradient: "from-green-500 to-emerald-600",
      button: "bg-green-500 hover:bg-green-600",
      ring: "ring-green-200",
    },
    error: {
      icon: "fas fa-times-circle",
      iconColor: "text-red-500",
      gradient: "from-red-500 to-rose-600",
      button: "bg-red-500 hover:bg-red-600",
      ring: "ring-red-200",
    },
    warning: {
      icon: "fas fa-exclamation-triangle",
      iconColor: "text-yellow-500",
      gradient: "from-yellow-500 to-amber-600",
      button: "bg-yellow-500 hover:bg-yellow-600",
      ring: "ring-yellow-200",
    },
    info: {
      icon: "fas fa-info-circle",
      iconColor: "text-blue-500",
      gradient: "from-blue-500 to-cyan-600",
      button: "bg-blue-500 hover:bg-blue-600",
      ring: "ring-blue-200",
    },
    question: {
      icon: "fas fa-question-circle",
      iconColor: "text-purple-500",
      gradient: "from-purple-500 to-indigo-600",
      button: "bg-purple-500 hover:bg-purple-600",
      ring: "ring-purple-200",
    },
  };

  const config = alertConfig[type] || alertConfig.success;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const animationClasses = {
    fade: isLeaving ? "animate-fade-out" : "animate-fade-in",
    slide: isLeaving ? "animate-slide-out" : "animate-slide-in",
    bounce: isLeaving ? "animate-bounce-out" : "animate-bounce-in",
    scale: isLeaving ? "animate-scale-out" : "animate-scale-in",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md"
      onClick={handleOverlayClick}
    >
      <div
        className={`relative bg-white rounded-3xl shadow-2xl shadow-blue-600/10 border-2 border-blue-600 ${sizeClasses[size] || "max-w-md"} w-full p-6 sm:p-8 text-center overflow-hidden transform transition-all duration-300 ${animationClasses[animation]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-all duration-200"
          aria-label="Close"
        >
          <i className="fas fa-times text-xs"></i>
        </button>

        {/* Brand Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center mx-auto text-2xl mb-4 shadow-sm">
          <i className={config.icon || "fas fa-check"}></i>
        </div>

        {/* Title & Message */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{title}</h2>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">{message}</p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3">
          {showCancelButton && (
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-full font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all duration-200 text-xs sm:text-sm"
            >
              {cancelButtonText}
            </button>
          )}
          {showConfirmButton && (
            <button
              onClick={handleConfirm}
              className="px-8 py-2.5 sm:py-3 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 text-xs sm:text-sm active:scale-95"
            >
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes slide-in {
          from {
            transform: translateY(-50px) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes slide-out {
          from {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          to {
            transform: translateY(-50px) scale(0.9);
            opacity: 0;
          }
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes bounce-out {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.3);
            opacity: 0;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.5);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes scale-out {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.5);
            opacity: 0;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-fade-out {
          animation: fade-out 0.3s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
        .animate-slide-out {
          animation: slide-out 0.4s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        .animate-bounce-out {
          animation: bounce-out 0.6s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-scale-out {
          animation: scale-out 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default PopupAlert;
