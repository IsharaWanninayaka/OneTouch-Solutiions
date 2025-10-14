import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        <div className="flex items-center">
          <img
            className="m-8"
            src="/images/logo3.png"
            alt="Logo"
            width={150}
            height={80}
          />
        </div>
        <p className="mt-2 text-indigo-100">Loading amazing experiences...</p>
      </div>
    </div>
  );
}

export default Loading;
