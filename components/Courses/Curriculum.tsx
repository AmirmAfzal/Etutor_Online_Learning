/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CurriculumProps {
  curriculum: {
    title: string;
    lectures: number;
    duration: string;
    content: { title: string; info: string; type: "video" | "file" | string }[];
  }[];
}

const Curriculum: React.FC<CurriculumProps> = ({ curriculum }) => {
  return (
    <div className="mt-12 w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-base-content/80 block text-xl font-semibold sm:text-2xl">
          Curriculum
        </span>

        <div className="flex flex-row gap-3 sm:items-center sm:gap-6">
          <span className="text-base-content/60 flex items-center text-sm">
            <Icon icon="ph:folder-open" className="text-primary mr-2 text-lg" />
            {curriculum.length} Sections
          </span>
          <span className="text-base-content/60 flex items-center gap-2 text-sm">
            <Icon
              icon="ph:play-circle-duotone"
              className="text-secondary text-lg"
            />
            {curriculum.reduce((acc, section) => acc + section.lectures, 0)}
            Lectures
          </span>
          <span className="text-base-content/60 flex items-center gap-2 text-sm">
            {/* TODO: Add total course time */}
          </span>
        </div>
      </div>

      {/* Accordion */}
      <Accordion type="single" collapsible className="mt-6 w-full">
        {curriculum.map((section, index) => (
          <AccordionItem
            key={index}
            value={`section-${index + 1}`}
            className="bg-base-100 border-base-content/10 border transition-all duration-150 hover:translate-y-[-1px]"
          >
            <AccordionTrigger className="min-h-[72px] p-2 sm:px-4 md:px-6 md:py-4">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <span className="text-base-content/80 text-sm font-semibold sm:text-base">
                  {section.title}
                </span>
                <div className="flex flex-wrap gap-3 sm:gap-5">
                  <span className="text-base-content/60 flex items-center gap-2 text-xs sm:text-sm">
                    <Icon
                      icon="ph:play-circle-duotone"
                      className="text-secondary shrink-0"
                    />
                    {section.lectures} Lectures
                  </span>
                  <span className="text-base-content/60 flex items-center gap-2 text-xs sm:text-sm">
                    <Icon
                      icon="ph:clock"
                      className="text-primary shrink-0 text-lg"
                    />
                    {section.duration}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="px-3 sm:px-6">
                {section.content.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 py-2 text-xs sm:text-sm"
                  >
                    <Icon
                      icon={
                        item.type === "video"
                          ? "ph:play-circle"
                          : "ph:file-text"
                      }
                      className="text-primary shrink-0 text-lg"
                    />
                    <span className="truncate">{item.title}</span>
                    <span className="text-base-content/60 ml-auto text-xs">
                      {item.info}
                    </span>
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

export default Curriculum;
