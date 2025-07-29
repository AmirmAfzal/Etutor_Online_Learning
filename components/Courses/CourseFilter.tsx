// TODO: change checkbox to daisy ui checkbox - DONE

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "../ui/Icon";
import { Slider } from "@/components/ui/slider";

const CourseFilter = ({
  categories,
  tools,
  rating,
  courseLevel,
}: {
  categories: {
    name: string;
    icon: string;
    subcategories: { [key: string]: number }[];
  }[];
  tools: string[];
  courseLevel: string[];
  rating: {
    label: string;
    count: number;
  }[];
}) => {
  return (
    <aside className="border-base-300 bg-base-100 w-7/12 border-r p-4">
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
                          <Icon
                            icon={category.icon}
                            // TODO: active and not active color
                            className="text-primary text-xl"
                          />
                          <span className="ml-2 text-xs font-medium">
                            {category.name}
                            <span className="text-base-content/70 ml-2">
                              {Object.values(category.subcategories).reduce(
                                (a, b) => a + b,
                                0
                              )}
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
                                    className="checkbox checkbox-primary checkbox-xs"
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

        {/* tools */}
        <Accordion
          type="single"
          collapsible
          className="border-base-300 mt-8 border"
        >
          <AccordionItem value="tools">
            <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
              TOOLS
            </AccordionTrigger>
            <AccordionContent>
              {tools.map((item, i) => (
                <form key={i} className="flex flex-row items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    id={item}
                    className="checkbox checkbox-primary checkbox-xs"
                  />
                  <span className="text-base-content/70 text-xs font-medium">
                    {item}
                  </span>
                </form>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* rating */}
        <Accordion
          type="single"
          collapsible
          className="border-base-300 mt-8 border"
        >
          <AccordionItem value="rating">
            <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
              RATING
            </AccordionTrigger>
            <AccordionContent>
              {rating.map((item, i) => (
                <form key={i} className="flex flex-row items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    id={item.label}
                    className="checkbox checkbox-primary checkbox-xs"
                  />
                  <Icon icon="ph:star-fill" className="text-primary" />
                  <span className="text-base-content/70 text-xs font-medium">
                    {item.label}
                  </span>
                </form>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* course level */}
        <Accordion
          type="single"
          collapsible
          className="border-base-300 mt-8 border"
        >
          <AccordionItem value="course level">
            <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
              COURSE LEVEL
            </AccordionTrigger>
            <AccordionContent>
              {courseLevel.map((item, i) => (
                <form key={i} className="flex flex-row items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    id={item}
                    className="checkbox checkbox-primary checkbox-xs"
                  />
                  <span className="text-base-content/70 text-xs font-medium">
                    {item}
                  </span>
                </form>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* price */}
        <Accordion
          type="single"
          collapsible
          className="border-base-300 mt-8 border"
        >
          <AccordionItem value="price">
            <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
              PRICE
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 px-2 py-4">
                <Slider
                  defaultValue={[20, 80]}
                  max={100}
                  step={1}
                  className="w-full"
                >
                  {/* change class name in ui/slider component */}
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                  <Slider.Thumb />
                </Slider>
                <div className="text-base-content/70 text-xs font-medium">
                  Price range: ${20} - ${80}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};

export default CourseFilter;
