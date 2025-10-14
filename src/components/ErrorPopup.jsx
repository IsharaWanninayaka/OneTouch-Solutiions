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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className={`${sizeClasses[size]} w-full bg-white rounded-xl shadow-2xl transform transition-all duration-300 ${animationClasses.shake} ring-2 ${config.ring}`}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.gradient} p-6 rounded-t-xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg bg-opacity-20">
                <i className={`${config.icon} text-white text-xl`}></i>
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <p className={`mt-1 text-sm ${config.headerText}`}>
                  {type === "critical"
                    ? "Critical System Error"
                    : type === "network"
                    ? "Connection Issue"
                    : type === "validation"
                    ? "Validation Error"
                    : "Application Error"}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-8 h-8 transition-all duration-200 bg-white rounded-full bg-opacity-20 hover:bg-opacity-30 group hover:scale-110"
            >
              <i className="text-sm text-white fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start mb-4">
            <i
              className={`${config.icon} ${config.iconColor} text-2xl mt-1 mr-4`}
            ></i>
            <div className="flex-1">
              <p className="text-lg font-medium leading-relaxed text-gray-800">
                {message}
              </p>

              {/* Error Details */}
              {errorDetails && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowErrorDetails(!showErrorDetails)}
                    className={`flex items-center text-sm font-medium transition duration-200 hover:${config.text} ${config.lightText}`}
                  >
                    <i
                      className={`fas fa-chevron-${
                        showErrorDetails ? "up" : "down"
                      } mr-2`}
                    ></i>
                    {showErrorDetails ? "Hide" : "Show"} Error Details
                  </button>

                  {showErrorDetails && (
                    <div
                      className={`p-4 mt-3 border rounded-lg ${config.bg} ${config.border}`}
                    >
                      <pre className="p-3 overflow-x-auto font-mono text-xs text-gray-700 whitespace-pre-wrap bg-white bg-opacity-50 border rounded">
                        {typeof errorDetails === "string"
                          ? errorDetails
                          : JSON.stringify(errorDetails, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Suggested Actions */}
          <div className="p-4 mt-6 border border-red-200 rounded-lg bg-red-50">
            <h4 className="flex items-center mb-3 font-semibold text-red-800">
              <i className="mr-2 text-red-500 fas fa-lightbulb"></i>
              Quick Solutions
            </h4>
            <ul className="space-y-2 text-sm text-red-700">
              {type === "network" && (
                <>
                  <li className="flex items-center">
                    <i className="mr-3 text-xs text-red-400 fas fa-plug"></i>
                    Check your internet connection and try again
                  </li>
                  <li className="flex items-center">
                    <i className="mr-3 text-xs text-red-400 fas fa-sync-alt"></i>
                    Refresh the page and retry the operation
                  </li>
                  <li className="flex items-center">
                    <i className="mr-3 text-xs text-red-400 fas fa-clock"></i>
                    Wait a few minutes and try again
                  </li>
                </>
              )}
              {type === "validation" && (
                <>
                  <li className="flex items-center">
                    <i className="mr-3 text-xs text-red-400 fas fa-edit"></i>
                    Review and correct the highlighted fields
                  </li>
                  <li className="flex items-center">
                    <i className="mr-3 text-xs text-red-400 fas fa-check-circle"></i>
                    Ensure all required information is provided
                  </li>
                  <li className="flex items-center">
                    <i className="mr-3 text-xs text-red-400 fas fa-file-alt"></i>
                    Follow the specified format guidelines
                  </li>
                </>
              )}
              {(type === "error" || type === "critical") && (
                <>
                  <li className="flex items-center">
                    <i className="mr-3 text-xs text-red-400 fas fa-redo"></i>
                    Refresh the page and try the action again
                  </li>
                  <li className="flex items-center">
                    <i className="mr-3 text-xs text-red-400 fas fa-broom"></i>
                    Clear your browser cache and cookies
                  </li>
                  <li className="flex items-center">
                    <i className="mr-3 text-xs text-red-400 fas fa-headset"></i>
                    Contact support if the problem continues
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            {showRetryButton && (
              <button
                onClick={handleRetry}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center shadow-lg ${config.button}`}
              >
                <i className="mr-2 fas fa-redo"></i>
                {retryButtonText}
              </button>
            )}

            {showReportButton && (
              <button
                onClick={handleReport}
                className="flex items-center px-6 py-3 font-semibold text-white transition-all duration-200 bg-gray-700 rounded-lg shadow-lg hover:bg-gray-800 hover:scale-105"
              >
                <i className="mr-2 fas fa-bug"></i>
                {reportButtonText}
              </button>
            )}

            <button
              onClick={handleClose}
              className="flex items-center px-6 py-3 font-semibold text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-lg shadow-lg hover:bg-gray-50 hover:scale-105"
            >
              <i className="mr-2 fas fa-times"></i>
              Dismiss
            </button>
          </div>
        </div>

        {/* Progress Bar for Auto Close */}
        {autoClose && (
          <div className="w-full h-1.5 overflow-hidden bg-gray-300 rounded-b-xl">
            <div
              className={`h-full bg-gradient-to-r ${config.gradient} transition-all duration-${closeTimeout}`}
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
