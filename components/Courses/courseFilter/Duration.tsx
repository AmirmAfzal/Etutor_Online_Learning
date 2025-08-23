import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Duration = ({ duration }: { duration: { [key: string]: number } }) => {
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
          {Object.entries(duration).map(
            ([duration, i]) =>
              duration && (
                <div
                  key={duration}
                  className="text-base-content/70 flex items-center justify-between px-2 text-sm"
                >
                  <form className="flex flex-row items-center gap-2 p-2">
                    <input
                      type="checkbox"
                      id={duration}
                      className="checkbox checkbox-primary checkbox-xs"
                    />
                    <span className="text-base-content/80 text-xs font-medium">
                      {duration}
                    </span>
                  </form>
                  <span className="text-base-content/60 text-xs font-medium">
                    {i.toLocaleString()}
                  </span>
                </div>
              )
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Duration;
