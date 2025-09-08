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
  duration: number[];
  searchParams: {
    query?: string;
    duration?: string;
  };
}

const durationOptions = [
  {
    label: "Less than 6 hours",
    checked: (hours: number) => hours < 6,
  },
  {
    label: "6-12 Hours",
    checked: (hours: number) => hours >= 6 && hours <= 12,
  },
  {
    label: "12-24 Hours",
    checked: (hours: number) => hours >= 12 && hours <= 24,
  },
  {
    label: "24-48 Hours",
    checked: (hours: number) => hours >= 24 && hours <= 48,
  },
  {
    label: "More than 48 Hours",
    checked: (hours: number) => hours > 48,
  },
];

const DurationClient = (props: Props) => {
  const path = usePathname();
  const { searchParams, duration } = props;
  const currentDurationFilter = searchParams.duration;

  const createDurationFilterUrl = (label: string) => {
    const newSearchParams = { ...searchParams };

    if (currentDurationFilter === label) {
      delete newSearchParams.duration;
    } else {
      newSearchParams.duration = label;
    }

    for (const key in newSearchParams) {
      if (newSearchParams[key as keyof typeof newSearchParams] === undefined) {
        delete newSearchParams[key as keyof typeof newSearchParams];
      }
    }

    let queryString = "";
    for (const key in newSearchParams) {
      const value = newSearchParams[key as keyof typeof newSearchParams];
      if (value !== undefined && value !== "") {
        if (queryString !== "") {
          queryString += "&";
        }
        queryString += `${key}=${value}`;
      }
    }

    if (path === "/category")
      return `/category${queryString ? `?${queryString}` : ""}`;
    return `/courses${queryString ? `?${queryString}` : ""}`;
  };

  const getDurationCount = (option: (typeof durationOptions)[0]) => {
    return duration.filter((hours) => option.checked(hours)).length;
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="border-base-300 mt-4 border"
    >
      <AccordionItem value="duration">
        <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
          DURATION
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {durationOptions.map((option) => {
            const count = getDurationCount(option);
            const isActive = currentDurationFilter === option.label;

            return (
              <div
                key={option.label}
                className="text-base-content/70 hover:bg-base-200 flex items-center justify-between px-2 py-1 text-sm"
              >
                <Link
                  href={count > 0 ? createDurationFilterUrl(option.label) : ""}
                  className="flex flex-1 items-center gap-2"
                  scroll={false}
                >
                  <input
                    type="checkbox"
                    id={option.label}
                    className="checkbox checkbox-primary checkbox-xs"
                    checked={isActive}
                    disabled={count === 0}
                    readOnly
                  />
                  <span
                    className={`text-base-content/80 text-xs font-medium ${isActive ? "text-primary font-bold" : ""}`}
                  >
                    {option.label}
                  </span>
                </Link>
                {count > 0 ? (
                  <span className="text-base-content/60 text-xs font-medium">
                    {count.toLocaleString()}
                  </span>
                ) : (
                  "0"
                )}
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DurationClient;
