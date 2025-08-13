import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/Icon";

const fakePurchases = [
  {
    id: 1,
    date: "1st September, 2021 at 11:30 PM",
    summary: { courses: 3, price: 75.0, method: "Credit Card" },
    details: [
      {
        title: "Learn Ethical Hacking From Scratch",
        price: 13.99,
        image: "/images/student-dashboard/course-1.jpg",
        teacher: "Marvin McKinney",
        rating: 4.7,
        reviews: 151444,
      },
      {
        title: "Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates",
        price: 49.0,
        image: "/images/student-dashboard/course-2.jpg",
        teacher: "Esther Howard",
        rating: 4.7,
        reviews: 151444,
      },
    ],
    user: {
      name: "Kevin Gilbert",
      card: "4142 **** **** ****",
      exp: "04/24",
    },
    summaryCourses: 2,
  },
  {
    id: 2,
    date: "31st August, 2021 at 11:30 PM",
    summary: { courses: 52, price: 507, method: "Credit Card" },
    details: null,
  },
  {
    id: 3,
    date: "24th August, 2021 at 6:34 PM",
    summary: { courses: 1, price: 9, method: "Credit Card" },
    details: null,
  },
  {
    id: 4,
    date: "1st September, 2021 at 8:47 PM",
    summary: { courses: 1, price: 25, method: "Credit Card" },
    details: null,
  },
  {
    id: 5,
    date: "1st September, 2021 at 11:30 PM",
    summary: { courses: 5, price: 89, method: "Credit Card" },
    details: null,
  },
  {
    id: 6,
    date: "17th July, 2021 at 10:51 AM",
    summary: { courses: 7, price: 140, method: "Credit Card" },
    details: null,
  },
];

export default async function PurchaseHistoryPage() {
  return (
    <div className="max-w-5xl px-2 pb-8">
      <h2 className="text-base-content/80 mb-6 text-xl font-bold">
        Purchase History
      </h2>
      <Accordion type="single" collapsible className="w-full space-y-3">
        {fakePurchases.map((purchase) => (
          <AccordionItem
            key={purchase.id}
            value={purchase.id.toString()}
            className="bg-base-100 border-base-content/10 border transition-all hover:translate-y-[-2px]"
          >
            <AccordionTrigger className="min-h-[72px] px-6">
              <div className="flex w-full flex-col items-start justify-between gap-3">
                <span className="text-base-content/80 text-md font-medium md:text-lg">
                  {purchase.date}
                </span>
                <div className="flex flex-wrap gap-5">
                  <span className="text-base-content/60 flex items-center gap-2 text-xs">
                    <Icon
                      icon="ph:play-circle-duotone"
                      className="text-secondary text-lg"
                    />
                    {purchase.summary.courses} Courses
                  </span>
                  <span className="text-base-content/60 flex items-center gap-2 text-xs">
                    <Icon
                      icon="ph:currency-dollar"
                      className="text-primary text-lg"
                    />
                    ${purchase.summary.price.toFixed(2)} USD
                  </span>
                  <span className="text-base-content/60 flex items-center gap-2 text-xs">
                    <Icon
                      icon="ph:credit-card"
                      className="text-success text-lg"
                    />
                    {purchase.summary.method}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {purchase.details ? (
                <div className="flex flex-col gap-6 p-3 md:flex-row md:gap-8">
                  <div className="flex w-full flex-col gap-4 md:w-3/5">
                    {purchase.details.map((course, i) => (
                      <div
                        key={i}
                        className="border-base-content/10 bg-base-100 flex flex-col gap-1.5 border p-3 transition hover:shadow md:flex-row md:items-center md:gap-3"
                      >
                        <div className="relative h-48 w-full flex-shrink-0 overflow-hidden md:h-24 md:w-32">
                          <Image
                            src={course.image}
                            alt={course.title}
                            width={300}
                            height={256}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between gap-1 md:pl-4">
                          <div className="text-base-content/80 flex items-center gap-2 text-xs md:text-sm">
                            <Icon
                              icon="ph:star-fill"
                              className="text-primary md:text-md text-sm"
                            />
                            <span>{course.rating}</span>
                            <span className="text-base-content/50">
                              ({course.reviews.toLocaleString()} Review)
                            </span>
                          </div>
                          <div className="md:text-md text-base-content/90 text-base font-semibold">
                            {course.title}
                          </div>
                          <div className="text-base-content/60 text-xs md:text-sm">
                            <span className="text-base-content/50">
                              Course by:
                            </span>
                            {course.teacher}
                          </div>
                        </div>

                        <div className="text-primary mt-1 flex-shrink-0 text-lg font-bold md:mt-0 md:w-20 md:text-right">
                          ${course.price.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-base-content/10 flex w-full flex-col items-center gap-6 border-t pt-4 md:w-2/5 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                    <div className="flex w-11/12 flex-col items-center gap-2 md:w-full">
                      <div className="text-base-content/80 text-md text-center font-medium md:text-lg">
                        {purchase.date}
                      </div>
                      <div className="text-base-content/60 flex flex-wrap justify-center gap-3 text-xs md:justify-start">
                        <span className="flex items-center gap-1">
                          <Icon
                            icon="ph:play-circle-duotone"
                            className="text-secondary text-md"
                          />
                          {purchase.summaryCourses} Courses
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon
                            icon="ph:currency-dollar"
                            className="text-primary text-md"
                          />
                          ${purchase.summary.price.toFixed(2)} USD
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon
                            icon="ph:credit-card"
                            className="text-success text-md"
                          />
                          {purchase.summary.method}
                        </span>
                      </div>
                    </div>

                    <div className="text-base-content/80 flex w-11/12 justify-between text-xs md:text-sm">
                      <span className="font-medium">{purchase.user.name}</span>
                      <span>{purchase.user.card}</span>
                      <span>{purchase.user.exp}</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="text-base-content/60 mt-8 text-center text-xs opacity-80 md:text-sm">
        Yay! You have seen all your purchase history.
        {/* TODO : add a emoji here */}
      </div>
    </div>
  );
}
