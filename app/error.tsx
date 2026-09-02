"use client";
import React from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ reset }: Props) => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="font-audiowide text-error text-7xl">Error</h1>
      <p className="">An error occurred while loading the page</p>
      <button
        className="btn btn-primary mt-8 rounded-full px-8"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorPage;
