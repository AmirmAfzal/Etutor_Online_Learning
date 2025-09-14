"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Icon from "./Icon";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="bg-neutral">
      {pathname === "/" || pathname === "/category" ? (
        <div className="border-base-300/60 border-b">
          <div className="text-base-100/80 container mx-auto flex flex-col items-center gap-32 px-8 py-16 md:flex-row md:px-0">
            <div className="flex flex-col gap-6">
              <h3 className="max-w-md text-2xl font-bold">
                Start learning with 67.1k students around the world.
              </h3>
              <span className="flex flex-col gap-2 md:flex-row">
                <Link href="/auth/signup" className="btn btn-primary">
                  Join The Family
                </Link>
                <Link href="/courses" className="btn btn-soft">
                  Browse All Course
                </Link>
              </span>
            </div>
            <div className="flex flex-row items-center justify-center gap-8 md:gap-16">
              <span>
                <p className="text-base-100 text-3xl font-bold">6.3K</p>
                <p className="text-base-300/60 text-sm">Online Courses</p>
              </span>
              <span>
                <p className="text-base-100 text-3xl font-bold">26K</p>
                <p className="text-base-300/60 text-sm">Certified Instructor</p>
              </span>
              <span>
                <p className="text-base-100 text-3xl font-bold">99.0%</p>
                <p className="text-base-300/60 text-sm">Success Rate</p>
              </span>
            </div>
          </div>
        </div>
      ) : null}
      {pathname === "/become-instructor" && (
        <div className="border-base-300/60 border-b">
          <div className="text-base-100 container mx-auto grid grid-cols-1 gap-16 px-8 py-16 md:grid-cols-2 md:gap-32 md:px-0">
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-3xl font-bold">
                Start teaching with us and inspire others
              </h3>
              <p className="text-base-300/60">
                Become an instructor & start teaching with 26k certified
                instructors. Create a success story with 67.1k Students — Grow
                yourself with 71 countries.
              </p>
              <button className="btn btn-primary">Register Now</button>
            </div>
            <div>
              <Image
                src="/images/Union-footer.png"
                alt="union footer"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      )}
      <div className="border-base-300/60 border-b">
        <div className="text-base-100/80 container mx-auto grid grid-cols-1 gap-8 px-8 py-16 md:grid-cols-4 md:px-0">
          <div className="col-span-1 space-y-4">
            <span className="flex flex-row items-center gap-2">
              <Icon
                icon="ph:graduation-cap"
                className="text-primary"
                width="48"
                height="48"
              />
              <p className="text-3xl font-bold">E-tutor</p>
            </span>
            <p className="text-base-300/60 text-xs">
              Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec
              mattis odio at.
            </p>
            <span className="flex flex-row items-center gap-2">
              <Link
                href=""
                className="bg-base-300/10 flex items-center justify-center p-2"
              >
                <Icon icon="ph:facebook-logo" width="24" height="24" />
              </Link>
              <Link
                href=""
                className="bg-base-300/10 flex items-center justify-center p-2"
              >
                <Icon icon="ph:instagram-logo" width="24" height="24" />
              </Link>
              <Link
                href=""
                className="bg-base-300/10 flex items-center justify-center p-2"
              >
                <Icon icon="ph:linkedin-logo" width="24" height="24" />
              </Link>
              <Link
                href=""
                className="bg-base-300/10 flex items-center justify-center p-2"
              >
                <Icon icon="ph:twitter-logo-fill" width="24" height="24" />
              </Link>
              <Link
                href=""
                className="bg-base-300/10 flex items-center justify-center p-2"
              >
                <Icon icon="ph:youtube-logo-fill" width="24" height="24" />
              </Link>
            </span>
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="flex flex-col gap-4">
                <p className="text-base-100 mb-2 text-sm">TOP 4 CATEGORY</p>
                <Link href="" className="text-base-300/60 text-xs">
                  Development
                </Link>
                <Link href="" className="text-base-300/60 text-xs">
                  Finance & Accounting
                </Link>
                <Link href="" className="text-base-300/60 text-xs">
                  Design
                </Link>
                <Link href="" className="text-base-300/60 text-xs">
                  Business
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base-100 mb-2 text-sm">QUICK LINKS</p>
                <Link href="" className="text-base-300/60 text-xs">
                  About
                </Link>
                <Link href="" className="text-base-300/60 text-xs">
                  Become Instructor
                </Link>
                <Link href="" className="text-base-300/60 text-xs">
                  Contact
                </Link>
                <Link href="" className="text-base-300/60 text-xs">
                  Career
                </Link>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-base-100 mb-2 text-sm">SUPPORT</p>
                <Link href="" className="text-base-300/60 text-xs">
                  Help Center
                </Link>
                <Link href="" className="text-base-300/60 text-xs">
                  FAQs
                </Link>
                <Link href="" className="text-base-300/60 text-xs">
                  Terms & Condition
                </Link>
                <Link href="" className="text-base-300/60 text-xs">
                  Privacy Policy
                </Link>
              </div>
              <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
                <p className="text-base-100 text-center text-sm">
                  DOWNLOAD OUR APP
                </p>
                <Link href="" className="btn btn-neutral">
                  <Image
                    src="/icons/apple-store.svg"
                    alt="apple store"
                    width={40}
                    height={40}
                  />
                  <span className="ml-2">
                    <p className="text-base-300/60 text-xs">Download now</p>
                    <p className="text-lg">Apple Store</p>
                  </span>
                </Link>
                <Link href="" className="btn btn-neutral">
                  <Image
                    src="/icons/play-store.svg"
                    alt="apple store"
                    width={40}
                    height={40}
                  />
                  <span className="ml-2">
                    <p className="text-base-300/60 text-xs">Download now</p>
                    <p className="text-lg">Play Store</p>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-base-100/80 container mx-auto flex flex-row justify-center py-8">
        <p className="text-center opacity-40">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
