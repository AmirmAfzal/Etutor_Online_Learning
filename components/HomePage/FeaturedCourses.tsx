import Image from "next/image";

import Icon from "../ui/Icon";

const FeaturedCourses = () => {
  const courses = [
    {
      id: 1,
      thumbnail: "/images/course-img-1.png",
      name: "Investing In Stocks The Complete Course...",
      category: "Health & Fitness",
      price: 14,
      rating: 5,
      students: 357.914,
      instructor: "Kevin Gilbert",
    },
    {
      id: 2,
      thumbnail: "/images/course-img-2.png",
      name: "Investing In Stocks The Complete Course...",
      category: "Personal Development",
      price: 14,
      rating: 5,
      students: 357.914,
      instructor: "Kevin Gilbert",
    },
    {
      id: 3,
      thumbnail: "/images/course-img-3.png",
      name: "Investing In Stocks The Complete Course...",
      category: "Productivity",
      price: 14,
      rating: 5,
      students: 357.914,
      instructor: "Kevin Gilbert",
    },
    {
      id: 4,
      thumbnail: "/images/course-img-4.png",
      name: "Investing In Stocks The Complete Course...",
      category: "Music",
      price: 14,
      rating: 5,
      students: 357.914,
      instructor: "Kevin Gilbert",
    },
  ];

  return (
    <section className="bg-base-100 border-base-300 container mx-auto -mt-32 border">
      <div className="p-8 md:p-16">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <h3 className="text-2xl font-bold md:text-2xl">
            Our feature courses
          </h3>
          <p className="text-base-content/80 max-w-sm text-center text-sm">
            Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec
            varius purus et eleifend porta.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border-base-300 flex flex-col border text-sm transition-all duration-300 hover:shadow-lg md:flex-row"
            >
              <Image
                src={course.thumbnail}
                alt="course image"
                className="h-50 w-full lg:h-45 lg:w-45"
                width={600}
                height={400}
              />
              <div className="flex w-full flex-col">
                <div className="space-y-2 p-4">
                  <div className="flex flex-row items-center justify-between">
                    <p className="bg-base-300 p-1 text-xs">{course.category}</p>
                    <div className="flex flex-row items-center gap-2">
                      <p>${course.price}</p>
                      <p className="text-base-content/50 line-through">
                        $26.00
                      </p>
                    </div>
                  </div>
                  <p className="font-bold"> {course.name} </p>
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                      <Image
                        src="/images/profile-img.png"
                        alt="profile"
                        width={30}
                        height={30}
                      />
                      <p className="text-base-content/70">
                        {" "}
                        {course.instructor}{" "}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-1 text-xs">
                      <Icon
                        width="20"
                        height="20"
                        className="text-primary"
                        icon="ph:star-fill"
                      />
                      {course.rating}
                      <span className="text-base-content/70 ml-1">
                        (357,914)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border-base-300 flex flex-row items-center justify-between border-t p-4 text-xs">
                  <div className="flex flex-row items-center gap-1">
                    <Icon
                      icon="ph:user"
                      width="20"
                      height="20"
                      className="text-secondary"
                    />
                    {course.students}K
                    <span className="text-base-content/70 ml-1">student</span>
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <Icon
                      icon="ph:chart-bar"
                      width="20"
                      height="20"
                      className="text-error"
                    />
                    Beginner
                  </div>
                  <div className="flex flex-row items-center gap-1">
                    <Icon
                      icon="ph:clock"
                      width="20"
                      height="20"
                      className="text-success"
                    />
                    6 hour
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
