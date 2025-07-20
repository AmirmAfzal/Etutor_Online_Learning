import CourseCard from "../CourseCard";

const TopCourse = () => {
  const courses = [
    {
      thumbnail: "/images/course-images-1.png",
      name: "Machine Learning A-Z™: Hands-On Python & R In Data...",
      category: "Design",
      price: 57,
      rating: 5,
      students: 265.7,
    },
    {
      thumbnail: "/images/course-images-2.png",
      name: "The Complete 2021 Web Development Bootcamp",
      category: "Developments",
      price: 57,
      rating: 5,
      students: 265.7,
    },
    {
      thumbnail: "/images/course-images-3.png",
      name: "Learn Python Programming Masterclass",
      category: "Business",
      price: 57,
      rating: 5,
      students: 265.7,
    },
    {
      thumbnail: "/images/course-images-4.png",
      name: "The Complete Digital Marketing Course - 12 Courses in 1",
      category: "Marketing",
      price: 57,
      rating: 5,
      students: 265.7,
    },
    {
      thumbnail: "/images/course-images-5.png",
      name: "Reiki Level I, II and Master/Teacher Program",
      category: "IT & Software",
      price: 57,
      rating: 5,
      students: 265.7,
    },
    {
      thumbnail: "/images/course-images-6.png",
      name: "The Complete Foundation Stock Trading Course",
      category: "Music",
      price: 57,
      rating: 5,
      students: 265.7,
    },
    {
      thumbnail: "/images/course-images-7.png",
      name: "Beginner to Pro in Excel: Financial Modeling and Valuati...",
      category: "Marketing",
      price: 57,
      rating: 5,
      students: 265.7,
    },
    {
      thumbnail: "/images/course-images-8.png",
      name: "The Python Mega Course: Build 10 Real World Applications",
      category: "Health & Fitness",
      price: 57,
      rating: 5,
      students: 265.7,
    },
    {
      thumbnail: "/images/course-images-9.png",
      name: "Copywriting - Become a Freelance Copywriter, your ow...",
      category: "Design",
      price: 57,
      rating: 5,
      students: 265.7,
    },
    {
      thumbnail: "/images/course-images-10.png",
      name: "Google Analytics Certification - Learn How To Pass The Exam",
      category: "Lifestyle",
      price: 57,
      rating: 5,
      students: 265.7,
    },
  ];

  return (
    <section className="bg-base-200 w-full pt-16 pb-48">
      <div className="container mx-auto space-y-8">
        <h3 className="text-center text-3xl font-bold">Best selling courses</h3>
        <div className="grid grid-cols-5 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.name} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCourse;
