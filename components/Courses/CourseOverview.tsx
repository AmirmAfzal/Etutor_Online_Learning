import Icon from "@/components/ui/Icon";

type CourseOverviewProps = {
  courseDescription?: string;
  whatYouWillLearn?: string[];
  thisCourseFor?: string[];
  courseRequirements?: string[];
};

const CourseOverview = ({
  courseDescription,
  whatYouWillLearn,
  thisCourseFor,
  courseRequirements,
}: CourseOverviewProps) => {
  return (
    <>
      <div className="p-4">
        <span className="text-base-content/80 text-2xl font-medium">
          Description
        </span>

        {courseDescription
          ?.split(/\n\s*\n|\n/)
          .filter(Boolean)
          .map((para, i) => (
            <p
              key={i}
              className="text-base-content/70 mt-4 mb-4 text-sm leading-relaxed"
            >
              {para}
            </p>
          ))}
      </div>

      <div className="bg-success/10 w-full p-4 sm:p-6 lg:p-8">
        <span className="text-base-content/80 text-lg font-medium md:text-xl">
          What you will learn in this course
        </span>
        <div className="mt-4">
          <ul className="grid grid-cols-1 gap-4 pl-2 sm:grid-cols-2 sm:gap-6 sm:pl-5">
            {whatYouWillLearn?.map((item, index) => (
              <li
                key={index}
                className="text-base-content/70 flex items-start gap-2 text-sm"
              >
                <Icon
                  icon="ph:check-circle-fill"
                  className="text-success shrink-0 text-lg"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 w-full">
        <span className="text-base-content/80 text-lg font-medium md:text-2xl">
          Who this course is for :
        </span>
        <div className="mt-4">
          <ul className="flex flex-col items-start gap-3 pl-2 sm:pl-5">
            {thisCourseFor?.map((item, index) => (
              <li
                key={index}
                className="text-base-content/70 flex items-start gap-2 text-sm"
              >
                <Icon
                  icon="ph:arrow-right"
                  className="text-primary shrink-0 text-lg"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 w-full">
        <span className="text-base-content/80 text-lg font-medium md:text-2xl">
          Course requirements
        </span>
        <div className="mt-4">
          <ul className="ml-2 flex list-disc flex-col items-start gap-3 pl-5 sm:ml-5">
            {courseRequirements?.map((item, index) => (
              <li
                key={index}
                className="text-base-content/70 text-sm leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseOverview;
