import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/Select";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Fake data for demonstration
const fakeTeachers = [
  {
    name: "Wade Warren",
    title: "Frontend Developer",
    image: "/images/profile-student.jpg",
    rating: 4.8,
    students: 230984,
  },
  {
    name: "Bessie Cooper",
    title: "JavaScript Instructor",
    image: "/images/profile-student.jpg",
    rating: 4.7,
    students: 271488,
  },
  {
    name: "Floyd Miles",
    title: "Python Instructor",
    image: "/images/profile-student.jpg",
    rating: 4.9,
    students: 198234,
  },
  {
    name: "Ronald Richards",
    title: "Math Instructor",
    image: "/images/profile-student.jpg",
    rating: 4.6,
    students: 139876,
  },
  // ... add more teachers as needed
];

function TeacherCard({
  name,
  title,
  image,
  rating,
  students,
}: (typeof fakeTeachers)[0]) {
  return (
    <div className="bg-base-100 border-base-content/20 flex flex-col items-center rounded-lg border p-4 transition-all duration-300 hover:shadow-md">
      <Image
        src={image}
        alt={name}
        width={96}
        height={96}
        className="mb-3 h-24 w-24 rounded-full border object-cover"
      />
      <div className="text-base-content/90 mb-1 text-lg font-semibold">
        {name}
      </div>
      <div className="text-base-content/60 mb-2 text-sm">{title}</div>
      <div className="text-base-content/70 mb-2 flex flex-row items-center gap-2 text-xs">
        <span>⭐ {rating}</span>
        <span>·</span>
        <span>{students.toLocaleString()} students</span>
      </div>
      <Button size="sm" className="mt-2 w-full">
        Send Message
      </Button>
    </div>
  );
}

export default function TeachersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search =
    typeof searchParams?.search === "string" ? searchParams.search : "";
  const sort =
    typeof searchParams?.sort === "string" ? searchParams.sort : "Latest";

  // Filter logic
  let filteredTeachers = fakeTeachers.filter((teacher) => {
    const matchesSearch =
      !search ||
      teacher.name.toLowerCase().includes(search.toLowerCase()) ||
      teacher.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  // Sort logic
  if (sort === "Latest") {
    filteredTeachers = filteredTeachers.slice().reverse();
  } else if (sort === "Oldest") {
    // do nothing, keep original order
  } else if (sort === "Most Students") {
    filteredTeachers = filteredTeachers
      .slice()
      .sort((a, b) => b.students - a.students);
  }

  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        {/* title */}
        <div className="text-base-content/80 mb-4 text-xl font-semibold">
          Instructors
          <span className="text-base-content/80">{`(${filteredTeachers.length})`}</span>
        </div>
        <div className="flex flex-row gap-2">
          {/* search */}
          <div className="flex flex-1 items-center gap-2">
            <form
              className="flex w-full max-w-md flex-col items-start gap-2"
              method="GET"
            >
              <label htmlFor="search" className="text-base-content/60 text-xs">
                Search:
              </label>
              <div className="relative w-full">
                <Input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search instructors..."
                  defaultValue={search}
                  className="bg-base-100 border-base-content/10 focus:border-primary focus:ring-primary/20 placeholder:text-base-content/40 w-full border py-2 pr-4 pl-4 text-base transition-all focus:ring-0"
                />
              </div>
              <button type="submit" className="hidden" />
            </form>
          </div>
          {/* filter */}
          <form className="flex flex-row gap-2" method="GET">
            {/* sorted by */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <label htmlFor="sort" className="text-base-content/60 text-xs">
                  Sort by:
                </label>
              </div>
              <Select name="sort" defaultValue={sort}>
                <SelectItem value="Latest">Latest</SelectItem>
                <SelectItem value="Oldest">Oldest</SelectItem>
                <SelectItem value="Most Students">Most Students</SelectItem>
              </Select>
            </div>
            <button type="submit" className="hidden" />
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredTeachers.map((teacher, idx) => (
          <TeacherCard key={idx} {...teacher} />
        ))}
      </div>
    </>
  );
}
