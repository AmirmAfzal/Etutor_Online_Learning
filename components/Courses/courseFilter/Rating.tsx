import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/Icon";

const Rating = ({
  rating,
}: {
  rating: {
    label: string;
    count: number;
  }[];
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="border-base-300 mt-4 border"
    >
      <AccordionItem value="rating">
        <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
          RATING
        </AccordionTrigger>
        <AccordionContent>
          {rating.map((item, i) => (
            <form
              key={i}
              className="flex flex-row items-center justify-between gap-2 p-2"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={item.label}
                  className="checkbox checkbox-primary checkbox-xs"
                />
                <Icon icon="ph:star-fill" className="text-primary" />
                <span className="text-base-content/80 text-xs font-medium">
                  {item.label}
                </span>
              </div>
              <span className="text-base-content/70">
                {item.count.toLocaleString()}
              </span>
            </form>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Rating;
