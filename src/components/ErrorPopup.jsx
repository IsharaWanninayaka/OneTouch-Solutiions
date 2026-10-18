import React, { useEffect, useState } from "react";

function ErrorPopup({
  isOpen = false,
  onClose,
  title = "Error!",
  message = "Something went wrong. Please try again.",
  errorDetails = null,
  showRetryButton = false,
  retryButtonText = "Try Again",
  showReportButton = false,
  reportButtonText = "Report Issue",
  onRetry,
  onReport,
  showDetails = false,
  autoClose = false,
  closeTimeout = 5000,
  type = "error", // error, warning, critical, network, validation
  size = "md",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [showErrorDetails, setShowErrorDetails] = useState(showDetails);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";

      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, closeTimeout);
        return () => clearTimeout(timer);
      }
    } else {
      handleClose();
    }

    return () => {
      document.body.style.overflow = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, autoClose, closeTimeout]);

  const handleClose = () => {
    if (!isVisible) return;

    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsLeaving(false);
      setShowErrorDetails(false);
      if (onClose) onClose();
    }, 300);
  };

  const handleRetry = () => {
    if (onRetry) onRetry();
    handleClose();
  };

  const handleReport = () => {
    if (onReport) onReport();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  const errorConfig = {
    error: {
      icon: "fas fa-exclamation-circle",
      iconColor: "text-red-500",
      gradient: "from-red-500 to-rose-600",
      button: "bg-red-600 hover:bg-red-700 text-white",
      ring: "ring-red-200",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      lightText: "text-red-600",
      headerText: "text-red-100",
    },
    warning: {
      icon: "fas fa-exclamation-triangle",
      iconColor: "text-orange-500",
      gradient: "from-orange-500 to-amber-600",
      button: "bg-orange-600 hover:bg-orange-700 text-white",
      ring: "ring-orange-200",
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-800",
      lightText: "text-orange-600",
      headerText: "text-orange-100",
    },
    critical: {
      icon: "fas fa-radiation",
      iconColor: "text-red-600",
      gradient: "from-red-600 to-rose-800",
      button: "bg-red-700 hover:bg-red-800 text-white",
      ring: "ring-red-300",
      bg: "bg-red-100",
      border: "border-red-300",
      text: "text-red-900",
      lightText: "text-red-700",
      headerText: "text-red-100",
    },
    network: {
      icon: "fas fa-wifi",
      iconColor: "text-red-500",
      gradient: "from-red-600 to-rose-700",
      button: "bg-red-600 hover:bg-red-700 text-white",
      ring: "ring-red-200",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      lightText: "text-red-600",
      headerText: "text-red-100",
    },
    validation: {
      icon: "fas fa-clipboard-check",
      iconColor: "text-red-500",
      gradient: "from-red-500 to-pink-600",
      button: "bg-red-600 hover:bg-red-700 text-white",
      ring: "ring-red-200",
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      lightText: "text-red-600",
      headerText: "text-red-100",
    },
  };

  const config = errorConfig[type] || errorConfig.error;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  const animationClasses = {
    fade: isLeaving ? "animate-fade-out" : "animate-fade-in",
    slide: isLeaving ? "animate-slide-out" : "animate-slide-in",
    shake: isLeaving ? "animate-fade-out" : "animate-shake-in",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md"
      onClick={handleOverlayClick}
    >
      <div
        className={`${sizeClasses[size]} relative w-full bg-white rounded-3xl shadow-2xl shadow-rose-500/10 border-2 border-rose-500/80 p-6 sm:p-8 overflow-hidden transform transition-all duration-300 ${animationClasses.shake}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-all duration-200 z-10"
          aria-label="Close"
        >
          <i className="fas fa-times text-xs"></i>
        </button>

        {/* Brand Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center mx-auto text-2xl mb-4 shadow-sm">
          <i className={config.icon}></i>
        </div>

        {/* Title & Type */}
        <div className="text-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-rose-600">
            {type === "critical"
              ? "Critical System Error"
              : type === "network"
              ? "Connection Issue"
              : type === "validation"
              ? "Validation Notice"
              : "Application Notice"}
          </p>
        </div>

        {/* Message */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-center mb-5">
          {message}
        </p>

        {/* Error Details Accordion */}
        {errorDetails && (
          <div className="mb-5 text-left">
            <button
              onClick={() => setShowErrorDetails(!showErrorDetails)}
              className="flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <i className={`fas fa-chevron-${showErrorDetails ? "up" : "down"} mr-1.5`}></i>
              {showErrorDetails ? "Hide" : "Show"} Error Details
            </button>

            {showErrorDetails && (
              <div className="p-3 mt-2 border border-slate-200 rounded-xl bg-slate-50">
                <pre className="overflow-x-auto font-mono text-xs text-slate-700 whitespace-pre-wrap">
                  {typeof errorDetails === "string"
                    ? errorDetails
                    : JSON.stringify(errorDetails, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Suggested Quick Solutions */}
        <div className="p-4 mb-6 border border-slate-200 rounded-2xl bg-slate-50 text-left">
          <h4 className="flex items-center mb-2.5 text-xs font-bold uppercase tracking-wider text-slate-700">
            <i className="mr-2 text-rose-500 fas fa-lightbulb"></i>
            Quick Suggestions
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {type === "network" && (
              <>
                <li className="flex items-center">
                  <i className="mr-2 text-xs text-slate-400 fas fa-plug"></i>
                  Check your internet connection and try again
                </li>
                <li className="flex items-center">
                  <i className="mr-2 text-xs text-slate-400 fas fa-sync-alt"></i>
                  Refresh the page and retry the operation
                </li>
              </>
            )}
            {type === "validation" && (
              <>
                <li className="flex items-center">
                  <i className="mr-2 text-xs text-blue-500 fas fa-edit"></i>
                  Please fill in all required fields marked with an asterisk (*)
                </li>
                <li className="flex items-center">
                  <i className="mr-2 text-xs text-blue-500 fas fa-check-circle"></i>
                  Verify that your email address and phone number are formatted correctly
                </li>
              </>
            )}
            {(type === "error" || type === "critical") && (
              <>
                <li className="flex items-center">
                  <i className="mr-2 text-xs text-slate-400 fas fa-redo"></i>
                  Refresh the page and try submitting again
                </li>
                <li className="flex items-center">
                  <i className="mr-2 text-xs text-slate-400 fas fa-envelope"></i>
                  Or reach out directly via contact@onetouchsolutions.lk
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Action Buttons (Pill buttons matching website) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {showRetryButton && (
            <button
              onClick={handleRetry}
              className="px-7 py-2.5 sm:py-3 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all duration-200 text-xs sm:text-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fas fa-redo text-xs"></i>
              {retryButtonText}
            </button>
          )}

          {showReportButton && (
            <button
              onClick={handleReport}
              className="px-6 py-2.5 sm:py-3 rounded-full font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all duration-200 text-xs sm:text-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fas fa-bug text-xs"></i>
              {reportButtonText}
            </button>
          )}

          <button
            onClick={handleClose}
            className="px-7 py-2.5 sm:py-3 rounded-full font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all duration-200 text-xs sm:text-sm active:scale-95 flex items-center justify-center gap-2"
          >
            <i className="fas fa-times text-xs"></i>
            Dismiss
          </button>
        </div>

        {/* Progress Bar for Auto Close */}
        {autoClose && (
          <div className="w-full h-1.5 overflow-hidden bg-slate-100 rounded-full mt-6">
            <div
              className="h-full bg-rose-500 rounded-full"
              style={{
                width: isLeaving ? "0%" : "100%",
                transition: `width ${closeTimeout}ms linear`,
              }}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shake-in {
          0% {
            transform: translateX(0) scale(0.95);
            opacity: 0;
          }
          20% {
            transform: translateX(-10px) scale(1);
            opacity: 1;
          }
          40% {
            transform: translateX(10px) scale(1);
          }
          60% {
            transform: translateX(-8px) scale(1);
          }
          80% {
            transform: translateX(8px) scale(1);
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        .animate-shake-in {
          animation: shake-in 0.6s ease-out;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fade-out {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to {
            opacity: 0;
            transform: scale(0.9) translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-fade-out {
          animation: fade-out 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ErrorPopup;
