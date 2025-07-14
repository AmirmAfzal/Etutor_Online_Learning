import React from "react";

const Footer = () => {
  return (
    <>
      <div className="divider mt-64"></div>
      <div className="container mx-auto flex flex-row justify-center pb-8">
        <p className="text-center opacity-40">
          © {new Date().getFullYear()} Amirreza Mohammadi Afzal. All rights
          reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
