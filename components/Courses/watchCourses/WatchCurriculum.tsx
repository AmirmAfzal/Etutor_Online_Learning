"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/Icon";
import { useRouter } from "next/navigation";

type CurriculumItem = {
  title: string;
  lectures: number;
  duration: string;
  content: {
    _id: string; // Added _id for lecture navigation
    title: string;
    info: string;
    type: "video" | "file" | string;
  }[];
};

type WatchCurriculumProps = {
  curriculum: CurriculumItem[];
  completionPercentage?: number;
  courseId: string;
  currentLectureId?: string;
  currentSectionIndex?: number;
};

// TODO : add completionPercentage

const WatchCurriculum = ({
  curriculum,
  completionPercentage = 15,
  courseId,
  currentLectureId,
}: WatchCurriculumProps) => {
  const router = useRouter();

  const handleLectureClick = (sectionIndex: number, lectureId: string) => {
    router.push(
      `/courses/${courseId}/watch?section=${
        sectionIndex + 1
      }&lectureId=${lectureId}`
    );
  };
  return (
    <div className="w-full">
      {/* Progress Section */}
      <div className="mb-6 flex w-full flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base-content/80 text-lg font-semibold md:text-xl lg:text-2xl">
            Course Content
          </h2>
          <span className="text-success text-sm font-semibold md:text-base lg:text-lg">
            {completionPercentage}% complete
          </span>
        </div>
        <Progress
          value={completionPercentage}
          className="bg-base-300 [&>div]:bg-success"
        />
      </div>

      {/* Curriculum Sections */}
      <Accordion type="single" collapsible className="w-full space-y-3">
        {curriculum.map((section, index) => {
          const completedLectures = Math.floor(section.lectures * 0.25); // Example calculation
          const sectionCompletion = Math.floor(
            (completedLectures / section.lectures) * 100
          );

          return (
            <AccordionItem
              key={`section-${index}`}
              value={`section-${index}`}
              className="border-base-content/10 bg-base-100 border transition-all duration-150 hover:shadow-sm"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline sm:px-6 sm:py-4">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start xl:flex-row xl:justify-between">
                  <span className="text-base-content/80 text-base font-medium md:text-lg">
                    {section.title}
                  </span>

                  <div className="text-base-content/60 flex flex-wrap items-center gap-2 text-xs sm:gap-4 sm:text-sm md:text-base">
                    <span className="flex items-center gap-1">
                      <Icon
                        icon="ph:play-circle-duotone"
                        className="text-secondary"
                      />
                      {section.lectures} Lectures
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon icon="ph:clock" className="text-primary" />
                      {section.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon icon="ph:checks" className="text-success" />
                      {`${sectionCompletion}% (${completedLectures}/${section.lectures})`}
                    </span>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-4 py-3 sm:px-6 sm:py-4">
                {section.content.length > 0 ? (
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => {
                      const isActive = item._id === currentLectureId;
                      return (
                        <li
                          key={`item-${index}-${itemIndex}`}
                          className={`flex cursor-pointer items-center justify-between gap-3 py-1 ${
                            isActive ? "text-primary font-semibold" : ""
                          }`}
                          onClick={() => handleLectureClick(index, item._id)}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              className="checkbox checkbox-primary checkbox-sm"
                              checked={isActive} // Assuming active lecture is "completed" for now
                              readOnly
                            />
                            <span className="text-sm md:text-base">
                              {item.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon
                              icon={
                                item.type === "video"
                                  ? "ph:play-fill"
                                  : "ph:file-text"
                              }
                              className="text-base-content/70 text-base"
                            />
                            <span className="text-xs md:text-sm">
                              {item.info}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-base-content/60 py-2 text-sm md:text-base">
                    No content available for this section yet.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default WatchCurriculum;
