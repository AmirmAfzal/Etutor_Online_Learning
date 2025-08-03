/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Icon } from "@iconify/react";

interface Props {
  curriculum: {
    title: string;
    lectures: number;
    duration: string;
    content: { title: string; info: string; type: "video" | "file" | string }[];
  }[];
}

const WatchCurriculum: React.FC<Props> = ({ curriculum }) => {
  return (
    <div className="mt-12 w-full">
      <div className="mb-6 flex w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-base-content/80 mb-4 block text-xl font-semibold">
            course Content
          </span>
          <span className="text-success mb-4 block text-lg font-semibold">
            {/* FIXME */}
            15% complete
          </span>
        </div>
        {/* TODO: change value */}
        <Progress value={33} className="!bg-base-300 !text-success" />
      </div>
      <Accordion type="single" collapsible className="w-full">
        {curriculum.map((section, index) => (
          <AccordionItem
            key={index}
            value={`section-${index + 1}`}
            className="bg-base-100 border-base-content/10 border transition-all duration-150 hover:translate-y-[-1px]"
          >
            <AccordionTrigger className="min-h-[72px] px-6">
              <div className="flex w-full flex-row items-start justify-between gap-3">
                <span className="text-base-content/80 text-base font-medium">
                  {section.title}
                </span>
                <div className="flex flex-row gap-2 text-nowrap">
                  <span className="text-base-content/60 flex items-center gap-2 text-sm">
                    <Icon
                      icon="ph:play-circle-duotone"
                      className="text-secondary"
                    />
                    {section.lectures} Lectures
                  </span>
                  <span className="text-base-content/60 flex items-center gap-2 text-sm">
                    <Icon icon="ph:clock" className="text-primary text-lg" />
                    {section.duration}
                  </span>
                  <span className="text-base-content/60 flex items-center gap-2 text-sm">
                    <Icon icon="ph:checks" className="text-success text-lg" />
                    {/* FIXME */}
                    {`25% finish (1/4)`}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="px-4">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 py-1 text-sm">
                    <form
                      action=""
                      className="flex w-full flex-row items-center justify-between gap-2"
                    >
                      <div className="flex gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                        <span>{item.title}</span>
                      </div>
                      <div className="flex gap-2">
                        {/* TODO : video play => change icon  */}
                        <Icon
                          icon="ph:play-fill"
                          className="text-base-content/70 text-md"
                        />
                        <span className="text-xs">{item.info}</span>
                      </div>
                    </form>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default WatchCurriculum;
