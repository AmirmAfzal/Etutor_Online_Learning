"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CldImage,
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

import Icon from "@/components/ui/Icon";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AdvanceInformationFormData,
  advanceInformationSchema,
} from "@/lib/validation/schemas/instructor/create-course";
import { saveAdvanceInformation } from "@/lib/actions/instructor/create-course/advanceInformation";
import { CourseData } from "@/lib/db/models/courseModel";
import ErrorMessage from "@/components/ErrorMessage";

const MAX_INPUTS = 8;
const MAX_CHARS = 120;

interface Props {
  onNext: () => void;
  onBack: () => void;
  course: CourseData | null;
}

const initialState = {
  message: "",
  errors: [],
};

const AdvanceInformation = ({ onNext, onBack, course }: Props) => {
  const [learningOutcomes, setLearningOutcomes] = useState(["", "", "", ""]);
  const [targetAudience, setTargetAudience] = useState(["", "", "", ""]);
  const [requirements, setRequirements] = useState(["", "", "", ""]);

  const [state, formAction, pending] = useActionState(
    saveAdvanceInformation,
    initialState
  );

  const form = useForm<AdvanceInformationFormData>({
    resolver: zodResolver(advanceInformationSchema),
    defaultValues: {
      _id: typeof course?._id === "string" ? course._id : "",
      learningOutcomes,
      targetAudience,
      requirements,
      description: "",
      thumbnail: "",
      video: "",
    },
  });

  const addField = (
    type: "learningOutcomes" | "targetAudience" | "requirements"
  ) => {
    if (type === "learningOutcomes" && learningOutcomes.length < MAX_INPUTS) {
      const newLearningOutcomes = [...learningOutcomes, ""];
      setLearningOutcomes(newLearningOutcomes);
      form.setValue("learningOutcomes", newLearningOutcomes);
    } else if (
      type === "targetAudience" &&
      targetAudience.length < MAX_INPUTS
    ) {
      const newTargetAudience = [...targetAudience, ""];
      setTargetAudience(newTargetAudience);
      form.setValue("targetAudience", newTargetAudience);
    } else if (type === "requirements" && requirements.length < MAX_INPUTS) {
      const newRequirements = [...requirements, ""];
      setRequirements(newRequirements);
      form.setValue("requirements", newRequirements);
    }
  };

  const handleChange = (
    type: "learningOutcomes" | "targetAudience" | "requirements",
    index: number,
    value: string
  ) => {
    const trimmedValue = value.slice(0, MAX_CHARS);

    if (type === "learningOutcomes") {
      const updated = [...learningOutcomes];
      updated[index] = trimmedValue;
      setLearningOutcomes(updated);
      form.setValue("learningOutcomes", updated);
    } else if (type === "targetAudience") {
      const updated = [...targetAudience];
      updated[index] = trimmedValue;
      setTargetAudience(updated);
      form.setValue("targetAudience", updated);
    } else if (type === "requirements") {
      const updated = [...requirements];
      updated[index] = trimmedValue;
      setRequirements(updated);
      form.setValue("requirements", updated);
    }
  };

  const handleSubmit = (data: AdvanceInformationFormData) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.message === "SUCCESS") {
      onNext();
    }
  }, [state.message, onNext]);

  return (
    <div>
      <div className="border-base-300 flex flex-col items-center justify-between gap-2 border-y p-4 md:flex-row">
        <h2 className="text-xl font-bold">Advance Information</h2>
        <div>
          <button className="btn btn-primary btn-soft mr-4">Save</button>
          <button className="btn btn-primary btn-soft">Save & Preview</button>
        </div>
      </div>

      {/* Upload Form */}
      <div className="border-base-300 border-b p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2">Course Thumbnail</p>
            <div className="flex flex-col gap-4 md:flex-row">
              {form.watch("thumbnail") ? (
                <CldImage
                  src={form.watch("thumbnail") || ""}
                  width="500"
                  height="500"
                  className="w-45 rounded-lg"
                  alt="uploaded image"
                  crop={{
                    type: "auto",
                    source: true,
                  }}
                />
              ) : (
                <div className="bg-base-300 flex h-35 min-w-45 items-center justify-center">
                  <Icon
                    icon="ph:image-duotone"
                    className="opacity-50"
                    width="72"
                    height="72"
                  />
                </div>
              )}
              <div className="text-base-content/70 flex flex-col items-start justify-between gap-2 text-sm">
                <p>
                  Upload your course Thumbnail here. Important guidelines:
                  1200x800 pixels or 12:8 Ratio. Supported format: .jpg, .jpeg,
                  or .png
                </p>
                <CldUploadButton
                  uploadPreset="course"
                  className="btn btn-primary btn-soft"
                  options={{
                    sources: ["local"],
                    multiple: false,
                    resourceType: "image",
                  }}
                  onSuccess={(result: CloudinaryUploadWidgetResults) => {
                    if (
                      result.event === "success" &&
                      typeof result.info === "object" &&
                      "secure_url" in result.info
                    ) {
                      form.setValue(
                        "thumbnail",
                        (result.info as { secure_url: string }).secure_url
                      );
                    }
                  }}
                >
                  <span className="flex flex-row items-center gap-2">
                    Upload Image
                    <Icon icon="ph:upload-simple" width="24" height="24" />
                  </span>
                </CldUploadButton>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-2">Course Trailer</p>
            <div className="flex flex-col gap-4 md:flex-row">
              {form.watch("video") ? (
                <video controls className="w-45 rounded-lg">
                  <source src={form.watch("video")} />
                  <track kind="captions" />
                </video>
              ) : (
                <div className="bg-base-300 flex h-35 min-w-45 items-center justify-center">
                  <Icon
                    icon="ph:play-circle-duotone"
                    className="opacity-50"
                    width="72"
                    height="72"
                  />
                </div>
              )}

              <div className="text-base-content/70 flex flex-col items-start justify-between gap-2 text-sm">
                <p>
                  students who watch awell-made promo video are 5X more likely
                  to enroll in your course. Weve seen that statistic go up to
                  10X for exceptionally awesome videos.
                </p>
                <CldUploadButton
                  uploadPreset="course"
                  className="btn btn-primary btn-soft"
                  options={{
                    sources: ["local"],
                    multiple: false,
                    resourceType: "video",
                  }}
                  onSuccess={(result: CloudinaryUploadWidgetResults) => {
                    if (
                      result.event === "success" &&
                      typeof result.info === "object" &&
                      "secure_url" in result.info
                    ) {
                      form.setValue(
                        "video",
                        (result.info as { secure_url: string }).secure_url
                      );
                    }
                  }}
                >
                  <span className="flex flex-row items-center gap-2">
                    Upload video
                    <Icon icon="ph:upload-simple" width="24" height="24" />
                  </span>
                </CldUploadButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <input type="text" hidden {...form.register("_id")} />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* What you will teach in this course */}
          <div className="border-base-300 space-y-4 border-b p-6">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">
                What you will teach in this course ({learningOutcomes.length}/
                {MAX_INPUTS})
              </h3>
              <button
                onClick={() => addField("learningOutcomes")}
                disabled={learningOutcomes.length >= MAX_INPUTS}
                className="btn btn-soft btn-primary disabled:btn-disabled"
                type="button"
              >
                + Add new
              </button>
            </div>
            {learningOutcomes.map((value, index) => (
              <FormField
                key={index}
                name={`learningOutcomes.${index}`}
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
                              "learningOutcomes",
                              index,
                              e.target.value
                            )
                          }
                          placeholder="What you will teach in this course..."
                        />
                        <span className="text-base-content/70 absolute top-3 right-3 text-xs">
                          {value.length}/{MAX_CHARS}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          {/* Target Audience */}
          <div className="border-base-300 space-y-4 border-b p-6">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">
                Target Audience ({targetAudience.length}/{MAX_INPUTS})
              </h3>
              <button
                onClick={() => addField("targetAudience")}
                disabled={targetAudience.length >= MAX_INPUTS}
                className="btn btn-soft btn-primary disabled:btn-disabled"
                type="button"
              >
                + Add new
              </button>
            </div>
            {targetAudience.map((value, index) => (
              <FormField
                key={index}
                name={`targetAudience.${index}`}
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
                              "targetAudience",
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          {/* Course requirements */}
          <div className="border-base-300 space-y-4 border-b p-6">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">
                Course requirements ({requirements.length}/{MAX_INPUTS})
              </h3>
              <button
                onClick={() => addField("requirements")}
                disabled={requirements.length >= MAX_INPUTS}
                className="btn btn-soft btn-primary disabled:btn-disabled"
                type="button"
              >
                + Add new
              </button>
            </div>
            {requirements.map((value, index) => (
              <FormField
                key={index}
                name={`requirements.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>0{index + 1}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          value={value}
                          onChange={(e) =>
                            handleChange("requirements", index, e.target.value)
                          }
                          placeholder="What is you course requirements..."
                        />
                        <span className="text-base-content/70 absolute top-3 right-3 text-xs">
                          {value.length}/{MAX_CHARS}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="flex flex-row items-center justify-between p-4">
            <button className="btn btn-outline" type="button" onClick={onBack}>
              Previous
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
          {state.message === "ERROR" && (
            <div className="p-4">
              <ErrorMessage
                title="Error saving advance information:"
                errors={state.errors}
              />
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AdvanceInformation;
