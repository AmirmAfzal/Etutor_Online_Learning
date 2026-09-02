"use client";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="font-audiowide text-error text-7xl">404</h1>
      <p className="">Page not found</p>
      <Link href={"/"} className="btn btn-primary mt-8 rounded-full px-8">
        Back to Home Page
      </Link>
    </div>
  );
};

export default ErrorPage;
