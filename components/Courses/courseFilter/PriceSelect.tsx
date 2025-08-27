import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import PriceRange from "./PriceRange";

const PriceSelect = ({ price }: { price: { [key: string]: number } }) => {
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
            <form className="text-base-content/70 flex flex-col items-start gap-2 text-xs font-medium">
              {Object.entries(price).map(
                ([item, i]) =>
                  item && (
                    <div
                      key={item}
                      className="text-base-content/70 flex items-center justify-between px-2 text-sm"
                    >
                      <form className="flex flex-row items-center gap-2 p-2">
                        <input
                          type="checkbox"
                          id={item}
                          className="checkbox checkbox-primary checkbox-xs"
                        />
                        <span className="text-base-content/80 text-xs font-medium">
                          {item}
                        </span>
                      </form>
                      <span className="text-base-content/60 text-xs font-medium">
                        {i.toLocaleString()}
                      </span>
                    </div>
                  )
              )}
            </form>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default PriceSelect;
