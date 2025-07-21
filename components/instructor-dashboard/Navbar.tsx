import React from "react";
import Image from "next/image";

import { Input } from "../ui/input";
import Icon from "../ui/Icon";

type Props = {
  children: React.ReactNode;
};

const Navbar = ({ children }: Props) => {
  return (
    <nav className="w-full p-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-row items-start gap-4">
          {children}
          <div>
            <p className="text-base-content/70 text-xs">Good Morning</p>
            <h2 className="text-lg font-bold">Dashboart</h2>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
          <div className="relative">
            <Icon
              icon="ph:magnifying-glass"
              width="20"
              height="20"
              className="absolute top-2 left-2 z-10"
            />
            <Input
              type="text"
              className="bg-base-300 w-96 rounded-none pl-8"
              placeholder="Search"
            />
          </div>
          <div className="bg-base-300 flex items-center justify-center p-2">
            <Icon icon="ph:bell" width="20" height="20" />
          </div>
          <div>
            <Image
              src="/images/dashboard-profile.png"
              alt="dashboard profile"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
