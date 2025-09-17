"use client";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProps {
  message: string;
  messageDetail?: string;
  errors?: string[];
  isError?: boolean;
  duration?: number;
}

const Toast = ({
  message,
  messageDetail,
  errors,
  isError = false,
  duration = 2000,
}: ToastProps) => {
  useEffect(() => {
    if (message) {
      if (isError) {
        toast.error(
          <div className="ml-4 flex flex-col gap-2">
            <span className="text-base font-medium">{message}</span>
            <span className="text-sm">{errors}</span>
          </div>,
          {
            position: "top-right",
            autoClose: duration,
            theme: "colored",
          }
        );
      } else {
        toast.success(
          <div className="ml-4 flex flex-col gap-2">
            <span className="text-base font-medium">{message}</span>
            <span className="text-sm">{messageDetail}</span>
          </div>,
          {
            position: "top-right",
            autoClose: duration,
            theme: "colored",
          }
        );
      }
    }
  }, [message, isError, duration,errors, messageDetail]);

  return <ToastContainer />;
};

export default Toast;
