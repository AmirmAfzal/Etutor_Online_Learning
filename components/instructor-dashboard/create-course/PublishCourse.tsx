"use client";

import { startTransition, useActionState, useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  PublishMessageFormData,
  publishMessageSchema,
} from "@/lib/validation/schemas/instructor/create-course";
import { publishCourse } from "@/lib/actions/instructor/create-course/publishCourse";
import {
  findInstructor,
  Instructor,
} from "@/lib/actions/instructor/create-course/findInstructors";
import { CourseData } from "@/lib/db/models/courseModel";

interface Props {
  onBack: () => void;
  course: CourseData | null;
}

const initialState = {
  message: "",
  errors: [],
};

const PublishCourse = ({ onBack, course }: Props) => {
  const [state, formAction] = useActionState(publishCourse, initialState);
  const [searchState, formActionSearch] = useActionState(findInstructor, {
    message: "",
    errors: [],
    data: [],
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const form = useForm<PublishMessageFormData>({
    resolver: zodResolver(publishMessageSchema),
    defaultValues: {
      welcomeMessage: "",
      congratulationsMessage: "",
      instructors: [],
      courseId: course?._id?.toString() || "",
    },
  });

  useEffect(() => {
    form.setValue("instructors", instructors, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [instructors, form]);

  const searchHandler = () => {
    startTransition(() => {
      if (typeof searchValue === "string") {
        formActionSearch(searchValue);
      }
    });
  };

  const addInstructorHandler = (instructor: Instructor) => {
    setInstructors((prev) => {
      if (prev.find((ins) => ins.id === instructor.id)) return prev;
      return [...prev, instructor];
    });
  };

  const removeInstructorHandler = (id: number) => {
    setInstructors((prev) => prev.filter((ins) => ins.id !== id));
  };

  const submitHandler = (data: PublishMessageFormData) => {
    console.log(data);
    if (!course?._id) {
      console.error("Course ID not found");
      return;
    }

    startTransition(() => {
      // Add courseId to the form data
      const formDataWithCourseId = {
        ...data,
        courseId: course._id.toString(),
      };
      formAction(formDataWithCourseId);
    });
  };

  return (
    <div>
      <div className="border-base-300 flex flex-row items-center justify-between border-t border-b p-4">
        <h2 className="text-xl font-bold">Publish Course</h2>
        <div>
          <button className="btn btn-primary btn-soft mr-4" type="button">
            Save
          </button>
          <button className="btn btn-primary btn-soft" type="button">
            Save & Preview
          </button>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <h3 className="text-xl font-bold">Message</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <input
              type="text"
              hidden
              name="courseId"
              defaultValue={course?._id.toString()}
            />
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="welcomeMessage"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Welcome Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-32"
                        placeholder="Enter course starting message here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="congratulationsMessage"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Congratulations Message</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="min-h-32"
                        placeholder="Enter your course completed message here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold">
                Add Instructor ({instructors.length})
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Icon
                    icon="ph:magnifying-glass"
                    className="absolute top-2 left-2"
                    width="24"
                    height="24"
                  />
                  <Input
                    type="text"
                    placeholder="Search by username"
                    className="pl-12"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchHandler()}
                  />
                  {searchState.message === "SUCCESS" &&
                    searchState.data.map((instructor) => (
                      <button
                        key={instructor.id}
                        // role="button"
                        // tabIndex={0}
                        className="bg-base-200 flex cursor-pointer flex-row items-center justify-between p-4"
                        onClick={() => addInstructorHandler(instructor)}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     addInstructorHandler(instructor);
                        //   }
                        // }}
                      >
                        <div className="flex flex-row items-center gap-4">
                          <Image
                            src={instructor.profile}
                            alt="profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <p className="text-sm font-bold">{instructor.name}</p>
                        </div>
                        <p className="text-base-content/70 ml-8 text-xs">
                          {instructor.skill}
                        </p>
                      </button>
                    ))}
                </div>
              </div>

              {form.formState.errors.instructors?.message && (
                <div className="text-error text-sm">
                  {form.formState.errors.instructors.message}
                </div>
              )}

              <div className="grid grid-cols-4 gap-6">
                {instructors.map((instructor) => (
                  <div
                    key={instructor.id}
                    className="bg-base-200 flex flex-row items-center justify-between gap-2 p-4"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <Image
                        src={instructor.profile}
                        alt="profile"
                        width={45}
                        height={45}
                        className="rounded-full"
                      />
                      <div className="space-y-2">
                        <p className="text-sm font-bold">{instructor.name}</p>
                        <p className="text-base-content/70 text-sm">
                          {instructor.skill}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeInstructorHandler(instructor.id)}
                      className="cursor-pointer"
                    >
                      <Icon icon="ph:x" width="24" height="24" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 flex flex-row items-center justify-between">
              <button className="btn btn-soft" type="button" onClick={onBack}>
                Prev Step
              </button>
              {state.message === "SUCCESS" && (
                <div className="bg-success/10 text-success rounded-md p-4">
                  Course creation completed successfully.
                </div>
              )}
              <button type="submit" className="btn btn-primary">
                Submit for Review
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PublishCourse;
