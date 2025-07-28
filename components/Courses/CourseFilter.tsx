// TODO: change checkbox to daisy ui checkbox

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CourseFilter = ({
  categories,
}: {
  categories: {
    name: string;
    subcategories: string;
  }[];
}) => {
  return (
    <aside className="border-base-300 bg-base-100 w-1/2 border-r p-4">
      <div>
        <Accordion type="single" collapsible className="border-base-300 border">
          <AccordionItem value="categories">
            <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
              CATEGORY
            </AccordionTrigger>
            <AccordionContent>
              {categories.map((category) => (
                <div key={category.name}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="subcategories">
                      <AccordionTrigger className="border-base-300 rounded-none border-t px-2 py-3">
                        <div className="flex items-center">
                          {/* TODO: add icon here */}
                          <span className="text-xs font-medium">
                            {category.name}
                            <span className="text-base-content/70 ml-2">
                              {Object.values(category.subcategories)[0] || 0}
                            </span>
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2">
                        {Object.entries(category.subcategories).map(
                          ([sub, i]) =>
                            sub && (
                              <div
                                key={sub}
                                className="text-base-content/70 ml-2 flex items-center justify-between px-2 text-sm"
                              >
                                <form className="flex flex-row items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id={sub}
                                    className="accent-primary"
                                  />
                                  <span className="text-base-content/80 text-xs font-medium">
                                    {sub}
                                  </span>
                                </form>
                                <span className="text-base-content/60 text-xs font-medium">
                                  {i}
                                </span>
                              </div>
                            )
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <span className="mb-2 text-lg font-semibold">CATEGORY</span>
         */}
      </div>
    </aside>
  );
};

export default CourseFilter;
