//
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseLevel = ({
  courseLevel,
}: {
  courseLevel: { [key: string]: number };
}) => {
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
          {Object.entries(courseLevel).map(
            ([level, i]) =>
              level && (
                <div
                  key={level}
                  className="text-base-content/70 flex items-center justify-between px-2 text-sm"
                >
                  <form className="flex flex-row items-center gap-2 p-2">
                    <input
                      type="checkbox"
                      id={level}
                      className="checkbox checkbox-primary checkbox-xs"
                    />
                    <span className="text-base-content/80 text-xs font-medium">
                      {level}
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
export default CourseLevel;
