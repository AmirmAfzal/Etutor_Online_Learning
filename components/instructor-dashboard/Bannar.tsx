"use client";

import { useState } from "react";
import Image from "next/image";

import Icon from "../ui/Icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const compeleted = [
  {
    id: 1,
    title: "Verify your email & phone number",
    subTitle:
      "Donec laoreet dapibus lectus nec efficitur. Etiam tincidunt, ex nec euismod varius, libero lorem dictum diam.",
    isCompelet: true,
  },
  {
    id: 2,
    title: "Add your biography & social proof",
    subTitle:
      "Mauris sagittis hendrerit malesuada. Pellentesque id ipsum nulla. Mauris feugiat nibh vitae eros lacinia, quis rhoncus eros accumsan. ",
    isCompelet: false,
  },
  {
    id: 3,
    title: "Add your education & experience",
    subTitle:
      "Vivamus sit amet eleifend nisi, id pretium dui. In sit amet gravida lacus. Pellentesque ultricies mi eget lorem varius, ac pharetra nisi eleifend. ",
    isCompelet: false,
  },
  {
    id: 4,
    title: "Create your first course",
    subTitle:
      "Vivamus et rhoncus lacus, nec cursus neque. Ut leo arcu, blandit non ligula sit amet, ullamcorper laoreet augue. ",
    isCompelet: false,
  },
];
const Bannar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <div className="container mx-auto bg-[#111033] p-6">
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
                  <p className="text-base-100/60 text-xs">
                    vako.shvili@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <p className="text-base-100/60 text-xs">1/4 Steps</p>
                <div className="bg-base-300 h-4 w-75">
                  <div
                    className="bg-success h-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <p className="text-base-100 font-bold">25% Completed</p>
              </div>
              <div className="flex flex-row items-center gap-4">
                <button className="btn btn-primary">Edit Biography</button>
                <AccordionTrigger
                  onClick={() => setIsOpen(!isOpen)}
                  className="btn btn-soft flex items-center justify-center rounded-none"
                >
                  <Icon
                    icon="ph:arrow-down"
                    className={`duration-100 ${isOpen && "text-primary rotate-180"}`}
                    width="24"
                    height="24"
                  />
                </AccordionTrigger>
              </div>
            </div>
          </div>
          <AccordionContent>
            <div className="border-base-300/60 container mx-auto grid grid-cols-2 gap-6 border-t bg-[#111033] p-6">
              {compeleted.map((item) => (
                <div key={item.id} className="flex flex-row items-center gap-4">
                  {item.isCompelet ? (
                    <div className="bg-success flex h-12 w-12 flex-row items-center justify-center rounded-full p-6">
                      <Icon
                        icon="ph:checks"
                        className="text-base-100"
                        width="24"
                        height="24"
                      />
                    </div>
                  ) : (
                    <div className="bg-base-100/10 text-base-100 flex h-12 w-12 flex-row items-center justify-center rounded-full p-6">
                      {item.id}
                    </div>
                  )}
                  <div className={`flex flex-col gap-2`}>
                    <p
                      className={`text-base-100 text-sm font-bold ${item.isCompelet && "text-base-100/40"}`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={`text-base-100/60 text-xs ${item.isCompelet && "text-base-100/40"}`}
                    >
                      {item.subTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Bannar;
