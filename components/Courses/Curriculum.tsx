import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icon } from "@iconify/react";

interface CurriculumProps {
  curriculum: {
    title: string;
    lectures: number;
    duration: string;
    content: { title: string; info: string; type: "video" | "file" }[];
  }[];
}

const Curriculum: React.FC<CurriculumProps> = ({ curriculum }) => {
  return (
    <div className="mt-12 w-full">
      <div className="flex-rew flex items-center justify-between">
        <span className="text-base-content/80 mb-4 block text-2xl font-semibold">
          Curriculum
        </span>

        <div className="flex flex-row items-center gap-4">
          <span className="text-base-content/60 flex items-center text-sm">
            <Icon icon="ph:folder-open" className="text-primary mx-2 text-lg" />
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
            {/* TODO : Add course time */}
          </span>
        </div>
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
                <span className="text-base-content/80 font-semibold">
                  {section.title}
                </span>
                <div className="flex flex-wrap gap-5">
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
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="px-4">
                {section.content.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 py-1 text-sm"
                  >
                    <Icon
                      icon={
                        item.type === "video"
                          ? "ph:play-circle"
                          : "ph:file-text"
                      }
                      className="text-primary text-lg"
                    />
                    {item.title}
                    <span className="ml-auto text-xs">{item.info}</span>
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
