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
      <div className="bg-base-200 flex w-screen flex-col items-center justify-center gap-4 py-8">
        <h3 className="text-xl font-semibold">Gift Course</h3>
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
      <div className="flex w-full flex-col items-center gap-4">
        <GiftCourseForm />
        <GiftCoursePayment />
      </div>
    </section>
  );
};

export default GiftCoursePage;
