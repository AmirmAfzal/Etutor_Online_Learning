import Image from "next/image";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex h-screen w-full flex-row items-center justify-center">
      <div className="ml-52 flex w-1/2 flex-col items-start gap-4">
        <h1 className="font-audiowide text-base-content/20 text-7xl font-bold">
          Error 404
        </h1>
        <span className="text-3xl font-bold">Oops! Page not found</span>
        <p className="text-base-content/60">
          Something went wrong. It’s look that your requested <br /> could not
          be found. It's look like the link is broken or the <br /> page is
          removed.
        </p>

        <Link href={"/"} className="btn btn-primary mt-8 px-8">
          Back to Home Page
        </Link>
      </div>
      <div className="1/2">
        <Image
          src={"/images/notFound.png"}
          alt="not found"
          width={1024}
          height={900}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
