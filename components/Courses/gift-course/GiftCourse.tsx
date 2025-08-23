import Image from "next/image";

const courses = [
  {
    title: "Graphic Design Masterclass - Learn GREAT Design",
    instructor: "Courtney Henry",
    price: 13.0,
    subtotal: 61.97,
    discount: 8,
    total: 75.0,
    image: "/images/student-dashboard/course-2.jpg",
  },
];

const GiftCourse = () => {
  return (
    <div className="border-base-300 bg-base-100 flex w-full flex-col border">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Course</h2>
        {courses.map((course, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <Image
              src={course.image}
              alt={course.title}
              width={80}
              height={80}
              className="object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-base-content/60 text-xs">
                Course by
                <span className="text-base-content/70 font-medium">
                  {course.instructor}
                </span>
              </p>
              <p className="text-base-content/80 truncate text-sm font-medium">
                {course.title}
              </p>
              <p className="text-primary mt-1 text-sm font-semibold">
                ${course.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="divider divider-base-content/20"></div>

      <div className="p-4">
        <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-base-content/60">Subtotal</span>
          <span className="text-base-content/80 font-medium">
            ${courses[0].subtotal.toFixed(2)} USD
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-base-content/60">Coupon Discount</span>
          <span className="text-base-content/80 font-medium">
            {courses[0].discount}%
          </span>
        </div>

        <div className="divider divider-base-content/20"></div>

        <div className="flex items-center justify-between">
          <span className="text-md text-base-content/70 font-medium">
            Total:
          </span>
          <span className="text-lg font-bold">
            ${courses[0].total.toFixed(2)} USD
          </span>
        </div>

        <button className="btn btn-primary mt-5 w-full py-3 font-medium">
          Complete Payment
        </button>
      </div>
    </div>
  );
};

export default GiftCourse;
