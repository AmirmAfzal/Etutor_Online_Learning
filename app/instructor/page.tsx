import React from "react";
import Icon from "@/components/ui/Icon";
import Image from "next/image";
import Link from "next/link";

const InstractorPage = () => {
  return (
    <div className="w-full">
      <div className="bg-primary/10 h-64"></div>
      <div className="bg-base-100 container mx-auto -mt-48 w-full">
        <div className="border-primary/20 flex w-full flex-row items-center justify-between gap-4 border-1 p-12">
          <div className="flex flex-row items-center gap-6">
            <Image
              className="h-50 w-50 rounded-full"
              src={"/images/instructors/instructor-4.png"}
              alt="instractor"
              width={512}
              height={512}
            />
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-4">
                <h1 className="text-3xl font-semibold">Vako Shvili</h1>
                <button className="btn btn-primary btn-soft">
                  <Icon width={20} className="" icon="ph:crown-simple-bold" />
                  Top Rated
                </button>
              </div>
              <p className="text-base-content/60 mt-2">
                Web Designer & Best-Selling Instructor
              </p>
              <div className="mt-4 flex flex-row gap-4">
                <div className="flex flex-row items-center gap-2">
                  <Icon
                    icon="ph:star-fill"
                    width={24}
                    className="text-primary"
                  />
                  <span className="font-medium">4.8</span>
                  <span className="text-base-content/60">
                    {" "}
                    (134,633 review)
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ph:users" width={24} className="text-secondary" />
                  <span className="font-medium">430,117</span>
                  <span className="text-base-content/60"> students</span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Icon
                    icon="ph:play-circle-fill"
                    width={24}
                    className="text-primary"
                  />
                  <span className="font-medium">7</span>
                  <span className="text-base-content/60"> courses</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-4">
            <div className="flex flex-row items-center justify-end gap-2">
              <Icon
                icon="ph:globe-simple"
                width={24}
                className="text-secondary"
              />
              <Link className="link link-secondary font-medium text-sm" href={"/"}>
                https://www.vakoshvili.com
              </Link>
            </div>
            <div className="flex flex-row gap-2">
              <Link href={"/"} className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center">
              <Icon
                className="text-neutral"
                icon="ph:facebook-logo-bold"
                width={24}
              />
            </Link>
            <Link href={"/"} className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center">
              <Icon
                className="text-neutral"
                icon="ph:twitter-logo-fill"
                width={24}
              />
            </Link>
            <Link href={"/"} className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center">
              <Icon
                className="text-neutral"
                icon="ph:instagram-logo"
                width={24}
              />
            </Link>
            <Link href={"/"} className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center">
              <Icon
                className="text-neutral"
                icon="ph:youtube-logo"
                width={24}
              />
            </Link>
            <Link href={"/"} className="bg-base-200 flex h-12 w-12 flex-row items-center justify-center">
              <Icon
                className="text-neutral"
                icon="ph:whatsapp-logo"
                width={24}
              />
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstractorPage;
