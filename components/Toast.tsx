"use client";

import { useEffect, useState } from "react";

import Icon from "@/components/ui/Icon";

interface ToastProps {
  message: string;
  isError?: boolean;
  duration?: number;
}

const Toast = ({ message, isError = false, duration = 2000 }: ToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!show || !message) {
    return null;
  }

  return (
    <div className="toast toast-top toast-end">
      <div
        role="alert"
        className={`alert ${isError ? "alert-error" : "alert-success"}`}
      >
        <Icon
          icon={isError ? "ph:x-circle" : "ph:check-circle"}
          className="text-lg"
        />
        <span className="text-xs">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
