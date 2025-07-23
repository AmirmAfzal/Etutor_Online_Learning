import Image from "next/image";

// Fake data that would come from a database

const fakeCourses = {
  breadcrumb: ["Home", "Development", "Web Development", "Webflow"],
  title:
    "Complete Website Responsive Design: from Figma to Webflow to Website Design",
  description:
    "Learn how to design beautiful websites using Figma, Adobe XD or Sketch, and code them into responsive websites that work on all devices.",
  instructors: [
    {
      name: "Dianne Russell",
      avatar: "/images/profile-img.png",
    },
    {
      name: "Kristin Watson",
      avatar: "/images/profile-img.png",
    },
  ],
  createdBy: "Dianne Russell , Kristin Watson",
  rating: 4.8,
  reviews: 244455,
};

export default function CoursePage() {
  return (
    <section className="container mx-auto py-8">
      <div className="bg-base-200 max-w-screen">
        <div className="flex max-w-7xl items-center justify-center">
          <div className="mt-12 mb-6 w-2/3">
            <span className="text-base-content/70 mb-4 flex items-center gap-2 text-sm">
              {fakeCourses.breadcrumb.join(" > ")}
            </span>
            <h1 className="mb-4 text-3xl font-bold">{fakeCourses.title}</h1>
            <p className="text-base-content/70 mb-6 font-medium">
              {fakeCourses.description}
            </p>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <div className="flex -space-x-2">
                    {fakeCourses.instructors.map((instructor, index) => (
                      <Image
                        key={index}
                        src={instructor.avatar}
                        alt={instructor.name}
                        width={40}
                        height={40}
                        className="border-base-100 rounded-full border-2"
                      />
                    ))}
                  </div>
                  <p className="text-base-content/60 flex flex-col text-sm">
                    Created by:
                    <span className="text-base-content/80 font-medium">
                      {fakeCourses.createdBy}
                    </span>
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="flex items-center gap-1">
                    {/* TODO:reting icon */}
                    {fakeCourses.rating}
                  </span>
                  <span className="text-sm">
                    ({fakeCourses.reviews.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
