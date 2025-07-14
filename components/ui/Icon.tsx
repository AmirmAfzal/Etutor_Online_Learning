"use client";
import React from "react";
import { Icon as Iconify } from "@iconify-icon/react";
interface Props {
  icon: string;
  className?: string;
  inline?: boolean;
  width?: string | number;
  height?: string | number;
}

const Icon = (props: Props) => {
  return <Iconify {...props} />;
};

export default Icon;
