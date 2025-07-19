import Image from "next/image";
import Icon from "../ui/Icon";

const BecomeInstructor = () => {
  const steps = [
    {
      id: 1,
      title: "Apply to become instructor",
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
    {
      id: 2,
      title: "Build & edit your profile",
      bg: "bg-[#FFF0F0]",
      color: "text-[#FF6636]",
    },
    {
      id: 3,
      title: "Create your new course",
      bg: "bg-[#FFF0F0]",
      color: "text-[#E34444]",
    },
    {
      id: 4,
      title: "Start teaching & earning",
      bg: "bg-[#E1F7E3]",
      color: "text-[#23BD33]",
    },
  ];

  return (
    <section className="bg-base-300 mt-16 w-full pt-16 pb-64">
      <div className="container mx-auto grid grid-cols-2 gap-6">
        <div className="from-primary flex h-full w-full flex-row items-center justify-between bg-gradient-to-l to-[#CC522B]">
          <div className="space-y-8 p-8 pr-0">
            <h3 className="text-base-100 text-3xl font-bold">
              Become an Instructor
            </h3>
            <p className="text-base-100 text-sm">
              Instructors from around the world teach millions of students on
              Udemy. We provide the tools and skills to teach what you love.
            </p>
            <button className="btn btn-primary btn-soft">
              Start Teaching
              <Icon icon="ph:arrow-right" width="24" height="24" />
            </button>
          </div>
          <Image
            src="/images/Become-an-Instructor.png"
            alt="Become an Instructor"
            width={600}
            height={700}
          />
        </div>
        <div className="bg-base-100 p-8">
          <h3 className="text-3xl font-bold">Your teaching & earning steps</h3>
          <div className="mt-8 grid grid-cols-2 gap-2 gap-y-6">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-row items-center gap-2">
                <div
                  className={`flex h-13 w-13 items-center justify-center rounded-full ${step.bg} ${step.color} text-xl font-bold`}
                >
                  {step.id}
                </div>
                <p className="">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;
