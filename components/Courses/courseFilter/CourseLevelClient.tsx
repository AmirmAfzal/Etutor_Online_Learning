"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  courseLevel: string[];
  searchParams: { level?: string };
}

const levelOptions = [
  { label: "All Levels", value: "" },
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Expert", value: "Expert" },
];

const CourseLevelClient = ({ courseLevel, searchParams }: Props) => {
  const path = usePathname();
  const levels = courseLevel;
  const currentLevelFilter = searchParams.level || "";

  const createLevelFilterUrl = (levelValue: string) => {
    const newSearchParams = new URLSearchParams(
      searchParams as Record<string, string>
    );

    if (newSearchParams.get("level") === levelValue) {
      newSearchParams.delete("level");
    } else {
      newSearchParams.set("level", levelValue);
    }

    if (path === "/category") return `/category?${newSearchParams.toString()}`;
    return `/courses?${newSearchParams.toString()}`;
  };

  const getLevelCount = (levelValue: string) => {
    if (levelValue === "") {
      return levels.length;
    }
    return levels.filter((level) => level === levelValue).length;
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="border-base-300 mt-4 border"
    >
      <AccordionItem value="course level">
        <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
          COURSE LEVEL
        </AccordionTrigger>
        <AccordionContent>
          {levelOptions.map((option) => (
            <Link
              key={option.label}
              href={createLevelFilterUrl(option.value)}
              className="text-base-content/70 hover:bg-base-200 flex items-center justify-between px-2 text-sm transition-colors duration-200"
            >
              <div className="flex flex-row items-center gap-2 p-2">
                <input
                  type="checkbox"
                  id={option.label}
                  checked={option.value === currentLevelFilter}
                  readOnly
                  disabled={getLevelCount(option.value) === 0}
                  className="checkbox checkbox-primary checkbox-xs pointer-events-none"
                />
                <span className="text-base-content/80 text-xs font-medium">
                  {option.label}
                </span>
              </div>
              <span className="text-base-content/60 text-xs font-medium">
                {getLevelCount(option.value)}
              </span>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseLevelClient;
