import TeacherCard from "@/components/Student/TeacherCard";

type Instructor = {
  name: string;
  title: string;
  image: string;
  rating: number;
  students: number;
};

type PopularInstructorsProps = {
  title: string;
  instructors: Instructor[];
};

const PopularInstructors = ({
  title,
  instructors,
}: PopularInstructorsProps) => {
  return (
    <div className="bg-base-200 mb-12 flex w-full justify-center py-16">
      <div className="w-full max-w-6xl px-4">
        <h2 className="mb-6 text-2xl font-semibold sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {instructors.map((instructor) => (
            <TeacherCard
              key={instructor.name}
              {...instructor}
              sendMessage={false}
              className="!bg-base-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularInstructors;
