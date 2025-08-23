import GiftCourse from "@/components/Courses/gift-course/GiftCourse";
import GiftCourseForm from "@/components/Courses/gift-course/GiftCourseForm";
import GiftCoursePayment from "@/components/Courses/gift-course/GiftCoursePayment";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";

const GiftCoursePage = () => {
  return (
    <section>
      <div className="bg-base-200 flex w-full flex-col items-center justify-center gap-4 py-6 sm:py-8">
        <h3 className="text-lg font-semibold sm:text-xl">Gift Course</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>Complete web...</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/courses/gift"
                className="text-base-content/80"
              >
                Gift Courses
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col items-start justify-center gap-6 px-4 py-6 sm:px-8 md:flex-row">
        <div className="flex w-full flex-col gap-6 md:w-2/3">
          <GiftCourseForm />
          <GiftCoursePayment />
        </div>

        <div className="w-full md:w-1/3">
          <GiftCourse />
        </div>
      </div>
    </section>
  );
};

export default GiftCoursePage;
