//
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/Icon";

type Props = {
  categories: {
    name: string;
    icon: string;
    subcategories: { [key: string]: number };
  }[];
};

const Categories = ({ categories }: Props) => {
  return (
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
  );
};

export default Categories;
