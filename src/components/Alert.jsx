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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className={`${sizeClasses[size]} w-full bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ${animationClasses[animation]} ring-4 ${config.ring}`}
      >
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${config.gradient} p-6 rounded-t-2xl`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full bg-opacity-20">
                <i className={`${config.icon} text-white text-xl`}></i>
              </div>
              <h2 className="ml-4 text-xl font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-8 h-8 transition duration-200 bg-white rounded-full bg-opacity-20 hover:bg-opacity-30 group"
            >
              <i className="text-white transition-transform fas fa-times group-hover:scale-110"></i>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start mb-6">
            <i
              className={`${config.icon} ${config.iconColor} text-2xl mt-1 mr-4`}
            ></i>
            <div className="flex-1">
              <p className="text-lg leading-relaxed text-gray-700">{message}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            {showCancelButton && (
              <button
                onClick={handleClose}
                className="px-6 py-3 font-semibold text-gray-600 transition duration-200 transform bg-gray-100 rounded-lg hover:bg-gray-200 hover:scale-105"
              >
                {cancelButtonText}
              </button>
            )}
            {showConfirmButton && (
              <button
                onClick={handleConfirm}
                className={`px-6 py-3 text-white rounded-lg font-semibold transition duration-200 transform hover:scale-105 ${config.button}`}
              >
                {confirmButtonText}
              </button>
            )}
          </div>
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
