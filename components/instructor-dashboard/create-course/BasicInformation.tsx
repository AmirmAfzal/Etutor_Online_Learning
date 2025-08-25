"use client";

import { startTransition, useActionState, useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  saveBasicInformation,
  // saveAndPreviewBasicInformation,
} from "@/lib/actions/instructor/create-course/basicInformation";
import {
  basicInformationSchema,
  BasicInformationFormData,
} from "@/lib/validation/schemas/instructor/create-course";
import { findCategories } from "@/lib/actions/instructor/create-course/findCategories";
import { findSubCategories } from "@/lib/actions/instructor/create-course/findSubCategories";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/Select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CourseInterface } from "@/lib/db/models/courseModel";
import ErrorMessage from "@/components/ErrorMessage";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Use the imported schema type
type FormField = BasicInformationFormData;

interface Props {
  onNext: () => void;
  course: CourseInterface | null;
}

const BasicInformation = ({ onNext, course }: Props) => {
  const [titleLength, setTitleLength] = useState(course?.title.length || 0);
  const [subTitleLength, setSubTitleLength] = useState(
    course?.subtitle.length || 0
  );
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [subCategories, setSubCategories] = useState<{ name: string }[]>([]);

  const form = useForm<FormField>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      _id: typeof course?._id === "string" ? course._id : "",
      title: course?.title || "",
      subtitle: course?.subtitle || "",
      category: JSON.parse(JSON.stringify(course?.category)).name || "",
      subCategory: JSON.parse(JSON.stringify(course?.subCategory)).name || "",
      topic: course?.topic || "",
      language: course?.language || "",
      subtitleLang: "",
      level: course?.level || "",
      durationValue: course?.duration?.toString() || "",
      durationUnit: course?.durationUnit || "",
    },
  });

  // Initial state for form action
  const initialState = {
    message: "",
    errors: [],
  };

  const [categoryState, searchCategoryFormAction, categoryPending] =
    useActionState(findCategories, { message: "", errors: [], data: [] });

  const [subCategoryState, searchSubCategoryFormAction, subCategoryPending] =
    useActionState(findSubCategories, { message: "", errors: [], data: [] });

  // Use React's useFormState for server action
  const [state, formAction, pending] = useActionState(
    saveBasicInformation,
    initialState
  );
  // TODO: state for "Save & Preview" button
  // const [previewState, previewFormAction] = useActionState(
  //   saveAndPreviewBasicInformation,
  //   initialState
  // );
  const handleSubmit = async (data: BasicInformationFormData) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.message === "SUCCESS") {
      onNext();
    }
  }, [state.message, onNext]);

  useEffect(() => {
    setCategories(categoryState.data);
    setSubCategories(subCategoryState.data);
  }, [categoryState.data, subCategoryState.data]);

  const findCategoriesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      searchCategoryFormAction(e.target.value);
    });
  };
  const findSubCategoriesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      searchSubCategoryFormAction(e.target.value);
    });
  };
  useEffect(() => {
    const initialCategory = form.getValues("category");
    const initialSubCategory = form.getValues("subCategory");

    if (initialCategory && initialCategory.trim() !== "") {
      startTransition(() => {
        searchCategoryFormAction(initialCategory);
      });
    }

    if (initialSubCategory && initialSubCategory.trim() !== "") {
      startTransition(() => {
        searchSubCategoryFormAction(initialSubCategory);
      });
    }
  }, []);

  return (
    <div>
      <div className="border-base-300 flex flex-col items-center justify-between gap-2 border-y p-4 md:flex-row">
        <h2 className="text-xl font-bold">Basic Information</h2>
        <div>
          <button
            className="btn btn-primary btn-soft mr-4"
            type="submit"
            // formAction={formAction}
          >
            Save
          </button>
          <button
            className="btn btn-primary btn-soft"
            type="submit"
            // formAction={previewFormAction}
          >
            Save & Preview
          </button>
        </div>
      </div>

      <div className="p-4">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setTitleLength(e.target.value.length);
                        field.onChange(e);
                      }}
                      placeholder="Your course title"
                      maxLength={80}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-base-content/70 absolute top-8 right-2 text-xs">
                    {titleLength} / 80
                  </p>
                </FormItem>
              )}
            />

            {/* Subtitle */}
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your course subtitle"
                      {...field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setSubTitleLength(e.target.value.length);
                        field.onChange(e);
                      }}
                      maxLength={120}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-base-content/70 absolute top-8 right-2 text-xs">
                    {subTitleLength} / 120
                  </p>
                </FormItem>
              )}
            />

            {/* Category + Subcategory */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <Command>
                            <Input
                              className="w-full border-0"
                              placeholder="Type a command or search..."
                              onChange={findCategoriesHandler}
                            />
                            <CommandList className="w-full">
                              <CommandGroup heading="Categories">
                                {categories &&
                                  categories.map((category, index) => (
                                    <CommandItem key={index}>
                                      <SelectItem value={category.name}>
                                        {category.name}
                                      </SelectItem>
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                              {categoryPending ? (
                                <div className="flex h-full w-full items-center justify-center py-6">
                                  <div className="loading loading-spinner" />
                                </div>
                              ) : (
                                <CommandEmpty>No results found.</CommandEmpty>
                              )}
                            </CommandList>
                          </Command>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Sub-category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <Command>
                            <Input
                              className="w-full border-0"
                              placeholder="Type a command or search..."
                              onChange={findSubCategoriesHandler}
                            />
                            <CommandList className="w-full">
                              <CommandGroup heading="SubCategories">
                                {subCategories &&
                                  subCategories.map((subCategory, index) => (
                                    <CommandItem key={index}>
                                      <SelectItem value={subCategory.name}>
                                        {subCategory.name}
                                      </SelectItem>
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                              {subCategoryPending ? (
                                <div className="flex h-full w-full items-center justify-center py-6">
                                  <div className="loading loading-spinner" />
                                </div>
                              ) : (
                                <CommandEmpty>No results found.</CommandEmpty>
                              )}
                            </CommandList>
                          </Command>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Topic */}
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Topic</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What is primarily taught in your course?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Language, Subtitle Language, Level, Duration */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {/* Course Language */}
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Language</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fa">Farsi</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subtitle Language */}
              <FormField
                control={form.control}
                name="subtitleLang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subtitle Language (Optional)</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fa">Farsi</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Course Level */}
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Level</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Duration */}
              <div className="relative">
                <FormField
                  control={form.control}
                  name="durationValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="Duration" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="durationUnit"
                  render={({ field }) => (
                    <FormItem className="absolute top-6 right-1">
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="border-none shadow-none">
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Day">Day</SelectItem>
                            <SelectItem value="Week">Week</SelectItem>
                            <SelectItem value="Hour">Hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-row items-center justify-between">
              <button className="btn btn-outline" type="button">
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className="btn btn-primary"
              >
                {pending && <div className="loading loading-spinner" />}
                Save & Next
              </button>
            </div>

            {/* Display form submission status */}
            {state.message === "SUCCESS" && (
              <div className="bg-success/10 text-success mt-4 rounded-md p-4">
                <p>Course information saved successfully!</p>
              </div>
            )}

            {state.message === "ERROR" && (
              <div className="p-4">
                <ErrorMessage
                  title="Error saving course information:"
                  errors={state.errors}
                />
              </div>
            )}

            {state.message === "PREVIEW" && (
              <div className="mt-4 rounded-md bg-blue-50 p-4 text-blue-700">
                <p>Course information saved and ready for preview!</p>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BasicInformation;
