import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PriceRange from "./PriceRange";
import Link from "next/link";

type PriceSelectProps = {
  price: { [key: string]: number };
  currentPriceFilters: { Free: boolean; Paid: boolean };
  searchParams: Promise<{
    query?: string;
    filter?: string;
    priceFree?: string;
    pricePaid?: string;
  }>;
};

const PriceSelect = async ({
  price,
  currentPriceFilters,
  searchParams,
}: PriceSelectProps) => {
  const createPriceFilterUrl = async (priceType: "Free" | "Paid") => {
    const newSearchParams = { ...(await searchParams) };

    if (currentPriceFilters[priceType]) {
      delete newSearchParams[`price${priceType}`];
    } else {
      newSearchParams[`price${priceType}`] = "true";
    }

    const queryString = Object.entries(newSearchParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

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
            <PriceRange min={0} max={100} step={1} defaultValue={[20, 80]} />
            <div className="text-base-content/70 flex flex-col items-start gap-2 text-xs font-medium">
              {/* Filter for Free courses using daisyUI checkbox */}
              <div
                key="Free"
                className="text-base-content/70 flex w-full items-center justify-between px-2 text-sm"
              >
                <div className="flex flex-row items-center gap-2 p-2">
                  <Link
                    href={await createPriceFilterUrl("Free")}
                    className="flex items-center gap-2"
                  >
                    <label className="label flex cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs"
                        checked={currentPriceFilters["Free"]}
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

              {/* Filter for Paid courses using daisyUI checkbox */}
              <div
                key="Paid"
                className="text-base-content/70 flex w-full items-center justify-between px-2 text-sm"
              >
                <div className="flex flex-row items-center gap-2 p-2">
                  <Link
                    href={await createPriceFilterUrl("Paid")}
                    className="flex items-center gap-2"
                  >
                    <label className="label flex cursor-pointer gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-xs"
                        checked={currentPriceFilters["Paid"]}
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

export default PriceSelect;
