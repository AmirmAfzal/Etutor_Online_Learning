import Image from "next/image";
import Link from "next/link";

const TopInstructor = () => {
  const instructors = [
    {
      id: 1,
      name: "Devon Lane",
      img: "/images/instructors/instructor-1.png",
      position: "Senior Developer",
      rating: "4.6",
      students: "854",
    },
    {
      id: 2,
      name: "Darrell Steward",
      img: "/images/instructors/instructor-2.png",
      position: "Digital Product Designer",
      rating: "4.9",
      students: "451,444",
    },
    {
      id: 3,
      name: "Jane Cooper",
      img: "/images/instructors/instructor-3.png",
      position: "UI/UX Designer",
      rating: "4.8",
      students: "435,671",
    },
    {
      id: 4,
      name: "Albert Flores",
      img: "/images/instructors/instructor-4.png",
      position: "Adobe Instructor",
      rating: "4.7",
      students: "511,123",
    },
    {
      id: 5,
      name: "Kathryn Murphy",
      img: "/images/instructors/instructor-5.png",
      position: "Lead Developer",
      rating: "4.2",
      students: "2,711",
    },
  ];

  return (
    <section className="bg-base-100 border-base-300 container mx-auto -mt-48 space-y-8 border p-16">
      <h3 className="text-center text-3xl font-bold">
        Top instructor of the month
      </h3>
      <div className="grid grid-cols-5 gap-6">
        {instructors.map((item) => (
          <div key={item.id} className="border-base-300 border">
            <Image
              src={item.img}
              className="w-full"
              alt={item.name}
              width={200}
              height={200}
            />
            <div className="flex flex-col items-center gap-1 p-2">
              <p className="font-semibold">{item.name}</p>
              <p className="text-base-content/50 text-sm">{item.position}</p>
            </div>
            <div className="border-base-300 flex flex-row items-center justify-between border-t p-2">
              <div className="flex flex-row items-center gap-1">
                <Image src="/icons/Star.svg" alt="" width={20} height={20} />
                <p className="text-sm">{item.rating}</p>
              </div>
              <div className="flex flex-row items-center gap-1 text-sm">
                <p className="font-semibold">{item.students}</p>
                <p className="text-base-content/50">students</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center gap-4 text-sm">
        <p className="text-base-content/50">
          Thousands of students waiting for a instructor. Start teaching &
          earning now!
        </p>
        <Link href="" className="text-primary flex flex-row items-center gap-2">
          Become Instructor
          <Image
            src="/icons/ArrowRight.svg"
            alt="arrow-right"
            width={20}
            height={20}
          />
        </Link>
      </div>
    </section>
  );
};

export default TopInstructor;
