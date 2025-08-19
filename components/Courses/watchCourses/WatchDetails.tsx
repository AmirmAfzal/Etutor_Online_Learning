import Image from "next/image";

interface WatchDetailsProps {
  sectionNumber: number;
  sectionTitle: string;
  watchingStudents: number;
  commentsCount: number;
}

const WatchDetails = ({
  sectionNumber,
  sectionTitle,
  watchingStudents,
  commentsCount,
}: WatchDetailsProps) => {
  const courseStudents = [
    { avatar: "/images/profile-img.png" },
    { avatar: "/images/profile-img.png" },
  ];

  return (
    <div className="mt-12 w-full md:mt-8 lg:w-2/3">
      <h2 className="text-base-content/80 text-lg font-semibold md:text-xl">
        {sectionNumber} . {sectionTitle}
      </h2>

      <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {courseStudents.map((instructor, index) => (
              <Image
                key={index}
                src={instructor.avatar}
                alt={`Student ${index + 1}`}
                width={35}
                height={35}
                className="border-base-100 rounded-full border-2"
              />
            ))}
          </div>
          <div className="flex flex-col items-start">
            <span className="md:text-md text-sm font-medium">
              {watchingStudents}
            </span>
            <span className="text-base-content/60 text-sm">
              student Watching
            </span>
          </div>
        </div>

        <div className="text-base-content/70 flex flex-wrap items-center gap-4 text-xs sm:text-base">
          <span>Last updated: 3 days ago</span>
          <span>Comments: {commentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default WatchDetails;
