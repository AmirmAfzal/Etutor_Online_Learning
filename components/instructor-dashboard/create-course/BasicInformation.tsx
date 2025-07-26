"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useState } from "react";
import { useFormState } from "react-dom";

import {
  saveBasicInformation,
  saveAndPreviewBasicInformation,
} from "@/lib/actions/instructor/create-course/basicInformation";
import {
  basicInformationSchema,
  BasicInformationFormData,
} from "@/lib/validation/schemas/instructor/create-course";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

// Use the imported schema type
type FormField = BasicInformationFormData;

const BasicInformation = () => {
  const [titleLength, setTitleLength] = useState(0);
  const [subTitleLength, setSubTitleLength] = useState(0);

  const form = useForm<FormField>({
    resolver: zodResolver(basicInformationSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      category: "",
      subcategory: "",
      topic: "",
      language: "",
      subtitleLang: "",
      level: "",
      durationValue: "",
      durationUnit: "",
    },
  });

  // Initial state for form action
  const initialState = {
    message: "",
    errors: [],
  };

  // Use React's useFormState for server action
  const [state, formAction] = useActionState(
    saveBasicInformation,
    initialState
  );
  const [previewState, previewFormAction] = useActionState(
    saveAndPreviewBasicInformation,
    initialState
  );
  const handleSubmit = async (data: z.infer<typeof basicInformationSchema>) => {
    startTransition(() => {
      // Convert data to FormData
      const formData = new FormData();
      
      // Add each field to the FormData object
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });
      
      formAction(formData);
    });
  };
  return (
    <div>
      <div className="border-base-300 flex flex-row items-center justify-between border-t border-b p-4">
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
                      onChange={(e) => {
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
                      onChange={(e) => {
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
                          <SelectItem value="development">
                            Development
                          </SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subcategory"
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
                          <SelectItem value="web">Web</SelectItem>
                          <SelectItem value="mobile">Mobile</SelectItem>
                          <SelectItem value="ai">AI</SelectItem>
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
                            <SelectItem value="Hour">Month</SelectItem>
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
              <button type="submit" className="btn btn-primary">
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
              <div className="bg-error/10 text-error mt-4 rounded-md p-4">
                <p>Error saving course information:</p>
                <ul className="ml-4 list-disc">
                  {state.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
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
