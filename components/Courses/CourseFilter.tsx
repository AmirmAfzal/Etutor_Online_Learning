import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "../ui/Icon";
import { Slider } from "@/components/ui/slider";
import { Input } from "../ui/input";

type Props = {
  categories: {
    name: string;
    icon: string;
    subcategories: { [key: string]: number };
  }[];
  tools: { [key: string]: number };
  duration: { [key: string]: number };
  courseLevel: { [key: string]: number };
  price: { [key: string]: number };
  rating: {
    label: string;
    count: number;
  }[];
};

const CourseFilter = ({
  categories,
  tools,
  rating,
  courseLevel,
  duration,
  price,
}: Props) => {
  return (
    <aside className="border-base-300 bg-base-100 w-5/12 border-r p-4">
      <div>
        {/* Categories */}
        <Accordion type="single" collapsible className="border-base-300 border">
          <AccordionItem value="categories">
            <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
              CATEGORY
            </AccordionTrigger>
            <AccordionContent>
              {categories.map((category) => (
                <div key={category.name}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`subcategories-${category.name}`}>
                      <AccordionTrigger className="border-base-300 rounded-none border-t px-2 py-3">
                        <div className="flex items-center">
                          <Icon
                            icon={category.icon}
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

        {/* Tools */}
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
              {Object.entries(tools).map(
                ([tool, i]) =>
                  tool && (
                    <div
                      key={tool}
                      className="text-base-content/70 flex items-center justify-between px-2 text-sm"
                    >
                      <form className="flex flex-row items-center gap-2 p-2">
                        <input
                          type="checkbox"
                          id={tool}
                          className="checkbox checkbox-primary checkbox-xs"
                        />
                        <span className="text-base-content/80 text-xs font-medium">
                          {tool}
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

        {/* Rating */}
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

        {/* Course Level */}
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

        {/* Price */}
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
                  <Slider.Track>
                    <Slider.Range />
                  </Slider.Track>
                  <Slider.Thumb />
                  <Slider.Thumb />
                </Slider>
                <form className="text-base-content/70 flex flex-col items-start gap-2 text-xs font-medium">
                  <div className="flex flex-row items-center gap-2">
                    <Input type="text" placeholder="$ min:" />
                    <Input type="text" placeholder="$ max:" />
                  </div>
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

        {/* Duration */}
        <Accordion
          type="single"
          collapsible
          className="border-base-300 mt-8 border"
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
      </div>
    </aside>
  );
};

export default CourseFilter;
