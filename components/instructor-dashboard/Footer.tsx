import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-base-200 w-full">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 py-8 md:flex-row">
        <p className="text-base-content/70">
          © {new Date().getFullYear()} All rights reserved.
        </p>
        <div className="text-base-content/70 flex flex-row items-center gap-6">
          <Link href="">FAQs</Link>
          <Link href="">Privacy Policy</Link>
          <Link href="">Terms & Condition</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
