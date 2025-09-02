"use client";

import Icon from "@/components/ui/Icon";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

interface Props {
  searchParams: {
    query?: string;
    minPrice?: string;
    maxPrice?: string;
    level?: string;
    duration?: string;
    tool?: string;
    category?: string;
    subCategories?: string;
    filter?: string;
    priceFree?: string;
    pricePaid?: string;
  };
  children: React.ReactNode;
}

const FilterMobile = ({ searchParams, children }: Props) => {
  const [open, setIsOpen] = useState(false);

  const isFilterPanelVisible = searchParams.filter === "true";

  const filterUrl = new URLSearchParams(searchParams);
  if (isFilterPanelVisible) {
    filterUrl.delete("filter");
  } else {
    filterUrl.set("filter", "true");
  }

  const handleClick = () => {
    setIsOpen(!open);
  };

  return (
    <Sheet open={open} onOpenChange={setIsOpen}>
      <SheetTrigger className="bg-base-100 border-primary text-primary flex w-2/5 flex-row items-center justify-between gap-2 rounded-none border p-2 md:hidden">
        <Icon icon="ph:faders-fill" className="text-xl" />
        <span className="text-sm">Filter</span>
        <span className="text-primary bg-primary/10 px-2">
          {/* FIXME : fix number of filtering */}
          {isFilterPanelVisible ? "1" : "0"}
        </span>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll pl-4">
        <SheetHeader>
          <SheetTitle>Courses Filter</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-center justify-between">
          {children}
          <button
            onClick={handleClick}
            className="btn btn-primary z-50 mt-8 w-full font-bold shadow-lg"
          >
            Done
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterMobile;
