import Link from "next/link";

import Icon from "../ui/Icon";

const Category = () => {
  const category = [
    {
      icon: "ph:cpu-duotone",
      label: "Label",
      courseCount: "500",
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
    {
      icon: "ph:handshake-duotone",
      label: "Business",
      courseCount: "600",
      bg: "bg-[#E1F7E3]",
      color: "text-[#23BD33]",
    },
    {
      icon: "ph:credit-card-duotone",
      label: "Finance & Accounting",
      courseCount: "500",
      bg: "bg-[#FFF2E5]",
      color: "text-[#FD8E1F]",
    },
    {
      icon: "ph:chart-bar-horizontal-duotone",
      label: "IT & Software",
      courseCount: "500",
      bg: "bg-[#FFF0F0]",
      color: "text-[#E34444]",
    },
    {
      icon: "ph:bug-droid-duotone",
      label: "Personal Development",
      courseCount: "300",
      bg: "bg-[#FFEEE8]",
      color: "text-[#FD8E1F]",
    },
    {
      icon: "ph:receipt-duotone",
      label: "Office Productivity",
      courseCount: "500",
      bg: "bg-[#F5F7FA]",
      color: "text-[#1D2026]",
    },
    {
      icon: "ph:megaphone-simple-duotone",
      label: "Marketing",
      courseCount: "2,000",
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
    {
      icon: "ph:camera-duotone",
      label: "Photography & Video",
      courseCount: "4,000",
      bg: "bg-[#F5F7FA]",
      color: "text-[#1D2026]",
    },
    {
      icon: "ph:package-duotone",
      label: "Lifestyle",
      courseCount: "500",
      bg: "bg-[#FFF2E5]",
      color: "text-[#FD8E1F]",
    },
    {
      icon: "ph:pen-nib-duotone",
      label: "Design",
      courseCount: "500",
      bg: "bg-[#FFEEE8]",
      color: "text-[#FF6636]",
    },
    {
      icon: "ph:first-aid-kit-duotone",
      label: "Health & Fitness",
      courseCount: "500",
      bg: "bg-[#E1F7E3]",
      color: "text-[#23BD33]",
    },
    {
      icon: "ph:headphones-duotone",
      label: "Music",
      courseCount: "500",
      bg: "bg-[#FFF2E5]",
      color: "text-[#FD8E1F]",
    },
  ];

  return (
    <section className="container mx-auto space-y-8 py-16">
      <h3 className="text-center text-3xl font-bold">Browse top category</h3>
      <div className="grid grid-cols-4 gap-6">
        {category.map((item) => (
          <div
            key={item.label}
            className={`flex flex-row items-center gap-4 p-4 ${item.bg}`}
          >
            <div className="bg-base-100 flex h-16 w-16 items-center justify-center">
              <Icon
                icon={item.icon}
                className={`${item.color}`}
                width="32"
                height="32"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{item.label}</p>
              <p className="text-base-content/80 text-sm">
                {item.courseCount} Courses
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center gap-4">
        <p className="text-base-content/80 text-sm">
          We have more category & subcategory.
        </p>
        <Link href="" className="text-primary flex flex-row items-center gap-2">
          Browse All
          <Icon icon="ph:arrow-right" width="24" height="24" />
        </Link>
      </div>
    </section>
  );
};

export default Category;
