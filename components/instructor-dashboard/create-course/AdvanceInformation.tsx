"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Icon from "@/components/ui/Icon";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const MAX_INPUTS = 8;
const MAX_CHARS = 120;

const formSchema = z.object({
  topics: z.array(z.string().max(MAX_CHARS)).max(MAX_INPUTS),
  targetTopics: z.array(z.string().max(MAX_CHARS)).max(MAX_INPUTS),
  requirementsTopics: z.array(z.string().max(MAX_CHARS)).max(MAX_INPUTS),
  description: z.string().min(10).max(1000),
});

const AdvanceInformation = () => {
  const [topics, setTopics] = useState(["", "", "", ""]);
  const [targetTopics, setTargetTopics] = useState(["", "", "", ""]);
  const [requirementsTopics, setRequirementsTopics] = useState([
    "",
    "",
    "",
    "",
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topics,
      targetTopics,
      requirementsTopics,
      description: "",
    },
  });

  const addField = (type: "topics" | "targetTopics" | "requirementsTopics") => {
    if (type === "topics" && topics.length < MAX_INPUTS) {
      const newTopics = [...topics, ""];
      setTopics(newTopics);
      form.setValue("topics", newTopics);
    } else if (type === "targetTopics" && targetTopics.length < MAX_INPUTS) {
      const newTargetTopics = [...targetTopics, ""];
      setTargetTopics(newTargetTopics);
      form.setValue("targetTopics", newTargetTopics);
    } else if (
      type === "requirementsTopics" &&
      requirementsTopics.length < MAX_INPUTS
    ) {
      const newRequirementsTopics = [...requirementsTopics, ""];
      setRequirementsTopics(newRequirementsTopics);
      form.setValue("requirementsTopics", newRequirementsTopics);
    }
  };

  const handleChange = (
    type: "topics" | "targetTopics" | "requirementsTopics",
    index: number,
    value: string
  ) => {
    const trimmedValue = value.slice(0, MAX_CHARS);

    if (type === "topics") {
      const updated = [...topics];
      updated[index] = trimmedValue;
      setTopics(updated);
      form.setValue("topics", updated);
    } else if (type === "targetTopics") {
      const updated = [...targetTopics];
      updated[index] = trimmedValue;
      setTargetTopics(updated);
      form.setValue("targetTopics", updated);
    } else if (type === "requirementsTopics") {
      const updated = [...requirementsTopics];
      updated[index] = trimmedValue;
      setRequirementsTopics(updated);
      form.setValue("requirementsTopics", updated);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitted:", values);
  };

  return (
    <div>
      <div className="border-base-300 flex flex-row items-center justify-between border-t border-b p-4">
        <h2 className="text-xl font-bold">Advance Information</h2>
        <div>
          <button className="btn btn-primary btn-soft mr-4">Save</button>
          <button className="btn btn-primary btn-soft">Save & Preview</button>
        </div>
      </div>

      <div className="border-base-300 border-b p-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-row gap-4">
            <div className="bg-base-300 flex h-35 min-w-35 items-center justify-center">
              <Icon
                icon="ph:image-duotone"
                className="opacity-50"
                width="72"
                height="72"
              />
            </div>
            <div className="text-base-content/70 flex flex-col items-start justify-between text-sm">
              <p>
                Upload your course Thumbnail here. Important guidelines:
                1200x800 pixels or 12:8 Ratio. Supported format: .jpg, .jpeg, or
                .png
              </p>
              <button className="btn btn-primary btn-soft">
                Upload Image
                <Icon icon="ph:upload-simple" width="24" height="24" />
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="bg-base-300 flex h-35 min-w-35 items-center justify-center">
              <Icon
                icon="ph:play-circle-duotone"
                className="opacity-50"
                width="72"
                height="72"
              />
            </div>
            <div className="text-base-content/70 flex flex-col items-start justify-between text-sm">
              <p>
                students who watch awell-made promo video are 5X more likely to
                enroll in your course. Weve seen that statistic go up to 10X for
                exceptionally awesome videos.
              </p>
              <button className="btn btn-primary btn-soft">
                Upload Video
                <Icon icon="ph:upload-simple" width="24" height="24" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* course description */}
          <div className="border-base-300 border-b p-4">
            <div className="">
              <h3 className="text-lg font-bold">Course Description</h3>
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter you course descriptions"
                        className="border-base-300 mt-4 min-h-32 w-full border p-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* What you will teach in this course */}
          <div className="border-base-300 space-y-4 border-b p-6">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">
                What you will teach in this course ({topics.length}/{MAX_INPUTS}
                )
              </h3>
              <button
                onClick={() => addField("topics")}
                disabled={topics.length >= MAX_INPUTS}
                className="btn btn-soft btn-primary disabled:btn-disabled"
                type="button"
              >
                + Add new
              </button>
            </div>
            {topics.map((value, index) => (
              <FormField
                key={index}
                name={`topics.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>0{index + 1}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          value={value}
                          onChange={(e) =>
                            handleChange("topics", index, e.target.value)
                          }
                          placeholder="What you will teach in this course..."
                        />
                        <span className="text-base-content/70 absolute top-3 right-3 text-xs">
                          {value.length}/{MAX_CHARS}
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
          {/* Target Audience */}
          <div className="border-base-300 space-y-4 border-b p-6">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">
                Target Audience ({targetTopics.length}/{MAX_INPUTS})
              </h3>
              <button
                onClick={() => addField("targetTopics")}
                disabled={targetTopics.length >= MAX_INPUTS}
                className="btn btn-soft btn-primary disabled:btn-disabled"
                type="button"
              >
                + Add new
              </button>
            </div>
            {targetTopics.map((value, index) => (
              <FormField
                key={index}
                name={`targetTopics.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>0{index + 1}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          value={value}
                          onChange={(e) =>
                            handleChange("targetTopics", index, e.target.value)
                          }
                          placeholder="Who this course is for..."
                        />
                        <span className="text-base-content/70 absolute top-3 right-3 text-xs">
                          {value.length}/{MAX_CHARS}
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
          {/* Course requirements */}
          <div className="border-base-300 space-y-4 border-b p-6">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">
                Course requirements ({requirementsTopics.length}/{MAX_INPUTS})
              </h3>
              <button
                onClick={() => addField("requirementsTopics")}
                disabled={requirementsTopics.length >= MAX_INPUTS}
                className="btn btn-soft btn-primary disabled:btn-disabled"
                type="button"
              >
                + Add new
              </button>
            </div>
            {requirementsTopics.map((value, index) => (
              <FormField
                key={index}
                name={`requirementsTopics.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>0{index + 1}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          value={value}
                          onChange={(e) =>
                            handleChange(
                              "requirementsTopics",
                              index,
                              e.target.value
                            )
                          }
                          placeholder="Who this course is for..."
                        />
                        <span className="text-base-content/70 absolute top-3 right-3 text-xs">
                          {value.length}/{MAX_CHARS}
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="mt-6 flex flex-row items-center justify-between p-4">
            <button className="btn btn-outline">Previous</button>
            <button type="submit" className="btn btn-primary">
              Save & Next
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdvanceInformation;
