import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PriceRange from "./PriceRange";
import { useState, useEffect } from "react";

type PriceSelectProps = {
  price: { [key: string]: number };
  onPriceFilterChange?: (filters: { Free: boolean; Paid: boolean }) => void;
  initialFilters?: { Free: boolean; Paid: boolean };
};

const PriceSelect = ({
  price,
  onPriceFilterChange,
  initialFilters,
}: PriceSelectProps) => {
  const [priceFilters, setPriceFilters] = useState<{
    Free: boolean;
    Paid: boolean;
  }>(initialFilters || { Free: false, Paid: false });

  const handleCheckboxChange = (priceType: "Free" | "Paid") => {
    const newFilters = {
      ...priceFilters,
      [priceType]: !priceFilters[priceType],
    };
    setPriceFilters(newFilters);

    if (onPriceFilterChange) {
      onPriceFilterChange(newFilters);
    }
  };

  // Update local state when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setPriceFilters(initialFilters);
    }
  }, [initialFilters]);

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
            <PriceRange min={0} max={100} step={1} defaultValue={[20, 80]} />
            <div className="text-base-content/70 flex flex-col items-start gap-2 text-xs font-medium">
              {Object.entries(price).map(
                ([item, count]) =>
                  item && (
                    <div
                      key={item}
                      className="text-base-content/70 flex items-center justify-between px-2 text-sm"
                    >
                      <div className="flex flex-row items-center gap-2 p-2">
                        <input
                          type="checkbox"
                          id={item}
                          checked={
                            priceFilters[item as "Free" | "Paid"] || false
                          }
                          onChange={() =>
                            handleCheckboxChange(item as "Free" | "Paid")
                          }
                          className="checkbox checkbox-primary checkbox-xs"
                        />
                        <span className="text-base-content/80 text-xs font-medium">
                          {item}
                        </span>
                      </div>
                      <span className="text-base-content/60 text-xs font-medium">
                        {count.toLocaleString()}
                      </span>
                    </div>
                  )
              )}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSelect;
