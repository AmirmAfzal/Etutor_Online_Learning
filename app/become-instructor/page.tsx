import Link from "next/link";
import { getServerSession } from "next-auth";

import Icon from "@/components/ui/Icon";
import { authOptions } from "@/lib/auth/authOptions";

export const metadata = {
  title: "Become an Instructor | E-Tutor",
  description:
    "Start teaching on E-Tutor, grow your audience, and earn from your courses.",
};

const BecomeInstructorPage = async () => {
  const session = await getServerSession(authOptions);

  const benefits = [
    {
      icon: "ph:chalkboard-teacher-duotone",
      title: "Share your knowledge",
      description:
        "Teach the skills you love and help thousands of students around the world.",
    },
    {
      icon: "ph:trend-up-duotone",
      title: "Grow your audience",
      description:
        "Reach 67k+ students across 71 countries and build your personal brand.",
    },
    {
      icon: "ph:currency-dollar-duotone",
      title: "Earn from your courses",
      description:
        "Monetize your expertise and get paid as your courses get enrolled.",
    },
    {
      icon: "ph:user-circle-gear-duotone",
      title: "Own your dashboard",
      description:
        "Manage courses, track earnings, and connect with students from one place.",
    },
  ];

  return (
    <section className="bg-base-200">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold sm:text-5xl">
            Start teaching with us and inspire others
          </h1>
          <p className="text-base-content/60 mt-6 text-base sm:text-lg">
            Become an instructor and join 26k certified instructors. Create a
            success story with 67.1k students — grow yourself across 71
            countries.
          </p>
          <Link
            href={session ? "/instructor/dashboard" : "/auth/signup"}
            className="btn btn-primary mt-8"
          >
            {session ? "Go to your dashboard" : "Register now"}
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-base-100 border-base-content/10 flex flex-col gap-4 border p-6"
            >
              <Icon icon={benefit.icon} className="text-primary text-4xl" />
              <h3 className="text-lg font-bold">{benefit.title}</h3>
              <p className="text-base-content/60 text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructorPage;
