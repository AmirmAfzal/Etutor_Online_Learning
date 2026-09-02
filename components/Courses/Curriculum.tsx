import { Icon } from "@iconify/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import sectionModel from "@/lib/db/models/sectionModel";
import { connectDB } from "@/lib/db/db";

interface TransformedSection {
  title: string;
  lecturesCount: number;
  duration: string;
  content: { title: string; info: string; type: "video" | "file" | string }[];
}

interface Lecture {
  title?: string;
  duration?: number;
  video?: string;
}

interface Props {
  courseId: string;
}

const convertMinutesToHoursAndMinutes = (totalMinutes: number): string => {
  if (typeof totalMinutes !== "number" || totalMinutes < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  let output = "";

  if (hours > 0) output += `${hours}h`;
  if (minutes > 0) output += (output ? ", " : "") + `${minutes}min`;

  return output || "0min";
};

const Curriculum = async ({ courseId }: Props) => {
  try {
    await connectDB();

    const foundSections = await sectionModel
      .find({ course: courseId })
      .populate("lectures");

    const curriculumData: TransformedSection[] = foundSections.map(
      (section) => {
        const totalSectionDurationMinutes = section.lectures.reduce(
          (sum: number, lecture: Lecture) => sum + (lecture.duration || 0),
          0
        );

        return {
          title: section.title,
          lecturesCount: section.lectures.length,
          duration: convertMinutesToHoursAndMinutes(
            totalSectionDurationMinutes
          ),
          content: section.lectures.map((lecture: Lecture) => ({
            title: lecture.title,
            info: convertMinutesToHoursAndMinutes(lecture.duration || 0),
            type: lecture.video ? "video" : "file",
          })),
        };
      }
    );

    const allLecturesDurations = foundSections.flatMap((section) =>
      section.lectures.map((lecture: Lecture) => lecture.duration || 0)
    );

    const totalCourseDurationMinutes = allLecturesDurations.reduce(
      (sum, duration) => sum + duration,
      0
    );
    const totalCourseDuration = convertMinutesToHoursAndMinutes(
      totalCourseDurationMinutes
    );

    const totalLectures = curriculumData.reduce(
      (acc, section) => acc + section.lecturesCount,
      0
    );

    return (
      <div className="mt-12 w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-base-content/80 block text-xl font-semibold sm:text-2xl">
            Curriculum
          </span>

          <div className="flex flex-row gap-3 sm:items-center sm:gap-6">
            <span className="text-base-content/60 flex items-center text-sm">
              <Icon
                icon="ph:folder-open"
                className="text-primary mr-2 text-lg"
              />
              {curriculumData.length} Sections
            </span>
            <span className="text-base-content/60 flex items-center gap-2 text-sm">
              <Icon
                icon="ph:play-circle-duotone"
                className="text-secondary text-lg"
              />
              {totalLectures} Lectures
            </span>
            <span className="text-base-content/60 flex items-center gap-2 text-sm">
              <Icon icon="ph:clock" className="text-primary text-lg" />
              {totalCourseDuration}
            </span>
          </div>
        </div>

        <Accordion type="single" collapsible className="mt-6 w-full">
          {curriculumData.map((section, index) => (
            <AccordionItem
              key={index}
              value={`section-${index + 1}`}
              className="border-base-content/10 bg-base-100 border transition-all duration-150 hover:-translate-y-[1px]"
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
                      {section.lecturesCount} Lectures
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
  } catch (error) {
    console.error("Error fetching curriculum data:", error);
    return (
      <div className="text-error mt-12 w-full text-center">
        Failed to load curriculum. Please try again later.
      </div>
    );
  }
};

export default Curriculum;
