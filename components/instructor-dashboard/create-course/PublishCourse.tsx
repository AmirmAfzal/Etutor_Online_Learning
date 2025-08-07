"use client";

import Image from "next/image";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import {
  publishMessageFormData,
  publishMessageSchema,
} from "@/lib/validation/schemas/instructor/create-course";
import { publishCourse } from "@/lib/actions/instructor/create-course/publishCourse";
import {
  findInstructor,
  Instructor,
} from "@/lib/actions/instructor/create-course/findInstructors";

type Props = {
  onBack: () => void;
};

const initialState = {
  message: "",
  errors: [],
};

const PublishCourse = ({ onBack }: Props) => {
  const [state, formAction] = useActionState(publishCourse, initialState);
  const [searchState, formActionSearch] = useActionState(findInstructor, {
    message: "",
    errors: [],
    data: [],
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  const form = useForm<publishMessageFormData>({
    resolver: zodResolver(publishMessageSchema),
    defaultValues: {
      welcomeMessage: "",
      congratulationsMessage: "",
    },
  });

  const searchHandler = () => {
    startTransition(() => {
      if (typeof searchValue === "string") {
        formActionSearch(searchValue);
      }
    });
  };

  const addInstructorHandler = (instructor: Instructor) => {
    if (!instructors.find((ins) => ins.id === instructor.id)) {
      setInstructors((prev) => [...prev, instructor]);
    }
  };

  const removeInstructorHandler = (id: number) => {
    setInstructors((prev) => prev.filter((instructor) => instructor.id !== id));
  };

  const submitHandler = (data: publishMessageFormData) => {
    if (instructors.length === 0) {
      alert("Please select at least one instructor.");
      return;
    }
    startTransition(() => {
      const formData = new FormData();
      formData.append("welcomeMessage", data.welcomeMessage);
      formData.append("congratulationsMessage", data.congratulationsMessage);
      formData.append("instructors", JSON.stringify(instructors));

      console.log(formData);
      formAction(formData);
    });
  };

  return (
    <div>
      <div className="border-base-300 flex flex-row items-center justify-between border-t border-b p-4">
        <h2 className="text-xl font-bold">Publish Course</h2>
        <div>
          <button className="btn btn-primary btn-soft mr-4">Save</button>
          <button className="btn btn-primary btn-soft">Save & Preview</button>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <h3 className="text-xl font-bold">Message</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
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
          </form>
        </Form>

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
                  <div
                    key={instructor.id}
                    className="bg-base-200 flex cursor-pointer flex-row items-center justify-between p-4"
                    onClick={() => addInstructorHandler(instructor)}
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
                  </div>
                ))}
            </div>
          </div>

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
          <button
            type="submit"
            onClick={form.handleSubmit(submitHandler)}
            className="btn btn-primary"
          >
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishCourse;
