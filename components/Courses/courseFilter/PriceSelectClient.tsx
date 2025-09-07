"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import PriceRange from "./PriceRange";

type Props = {
  price: { [key: string]: number };
  currentPriceFilters: { Free: boolean; Paid: boolean };
  searchParams: {
    query?: string;
    minPrice?: string;
    maxPrice?: string;
  };
};

const PriceSelectClient = (props: Props) => {
  const path = usePathname();
  const searchParams = props.searchParams;
  const newSearchParams = { ...searchParams };
  const currentPriceFilters = props.currentPriceFilters;
  const price = props.price;

  const createPriceFilterUrl = (
    priceType: "Free" | "Paid" | "Range",
    min?: number,
    max?: number
  ) => {
    if (priceType === "Free") {
      if (currentPriceFilters.Free) {
        delete newSearchParams.minPrice;
        delete newSearchParams.maxPrice;
      } else {
        newSearchParams.minPrice = "0";
        newSearchParams.maxPrice = "0";
      }
    } else if (priceType === "Paid") {
      if (currentPriceFilters.Paid) {
        delete newSearchParams.minPrice;
        delete newSearchParams.maxPrice;
      } else {
        newSearchParams.minPrice = "1";
        delete newSearchParams.maxPrice;
      }
    } else if (priceType === "Range") {
      if (min !== undefined) {
        newSearchParams.minPrice = min.toString();
      } else {
        delete newSearchParams.minPrice;
      }
      if (max !== undefined) {
        newSearchParams.maxPrice = max.toString();
      } else {
        delete newSearchParams.maxPrice;
      }
    }

    const queryString = Object.entries(newSearchParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    if (path === "/category")
      return `/category${queryString ? `?${queryString}` : ""}`;
    return `/courses${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="border-base-300 mt-4 border"
    >
      <AccordionItem value="price">
        <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
          PRICE
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 px-2 py-4">
            <PriceRange min={0} max={100} step={1} />
            <div className="text-base-content/70 flex flex-col items-start gap-2 text-xs font-medium">
              <div
                key="Free"
                className="text-base-content/70 flex w-full items-center justify-between px-2 text-sm"
              >
                <div className="flex flex-row items-center gap-2 p-2">
                  <Link
                    href={createPriceFilterUrl("Free")}
                    className="flex items-center gap-2"
                  >
                    <label className="label flex cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs"
                        checked={currentPriceFilters.Free}
                        readOnly
                      />
                      <span className="text-base-content/80 text-xs font-medium">
                        Free
                      </span>
                    </label>
                  </Link>
                </div>
                <span className="text-base-content/60 text-xs font-medium">
                  {price["Free"]?.toLocaleString() || "0"}
                </span>
              </div>

              <div
                key="Paid"
                className="text-base-content/70 flex w-full items-center justify-between px-2 text-sm"
              >
                <div className="flex flex-row items-center gap-2 p-2">
                  <Link
                    href={createPriceFilterUrl("Paid")}
                    className="flex items-center gap-2"
                  >
                    <label className="label flex cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs"
                        checked={currentPriceFilters.Paid}
                        readOnly
                      />
                      <span className="text-base-content/80 text-xs font-medium">
                        Paid
                      </span>
                    </label>
                  </Link>
                </div>
                <span className="text-base-content/60 text-xs font-medium">
                  {price["Paid"]?.toLocaleString() || "0"}
                </span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSelectClient;
