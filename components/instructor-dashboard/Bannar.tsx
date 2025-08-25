import Image from "next/image";
import React from "react";

import Icon from "../ui/Icon";

const Bannar = () => {
  return (
    <div className="bg-secondary container mx-auto p-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Image
            src="/images/dashboard-profile.png"
            className="h-16 w-16"
            alt="bannar"
            width={100}
            height={100}
          />
          <div className="flex flex-col gap-1">
            <p className="text-base-100 font-bold">Vako Shvili</p>
            <p className="text-base-content/70 text-xs">
              vako.shvili@gmail.com
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <p className="text-base-content/70 text-xs">1/4 Steps</p>
          <div className="bg-base-300 h-4 w-75">
            <div className="bg-success h-full" style={{ width: "25%" }}></div>
          </div>
          <p className="text-base-100 font-bold">25% Completed</p>
        </div>
        <div className="">
          <button className="btn btn-primary mr-4">Edit Biography</button>
          <button className="btn btn-soft">
            <Icon icon="ph:arrow-down" width="24" height="24" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bannar;
