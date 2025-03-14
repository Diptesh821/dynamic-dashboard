// frontend/components/ui/button.jsx
import React from "react";
import clsx from "clsx";

export function Button({ children, className, ...props }) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
