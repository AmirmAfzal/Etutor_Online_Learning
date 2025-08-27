"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import {
  CldImage,
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/Icon";
import {
  AccountSettingFormData,
  accountSettingSchema,
} from "@/lib/validation/schemas/instructor/settings/accountSettings";
import { saveAccountSettings } from "@/lib/actions/instructor/settings/accountSettings";

const initialState = {
  message: "",
  errors: [],
};

const AccountSettings = () => {
  const [title, setTitle] = useState<string>("");

  const [state, formAction] = useActionState(saveAccountSettings, initialState);

  const form = useForm<AccountSettingFormData>({
    resolver: zodResolver(accountSettingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      phoneCode: undefined,
      phoneNumber: "",
      title: "",
      biography: "",
      profile: "",
    },
  });

  const submitHandler = (data: AccountSettingFormData) => {
    startTransition(() => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formAction(formData);
    });
  };

  useEffect(() => {
    if (state.message === "SUCCESS") {
      form.reset();
      setTitle("");
    }
  }, [state.message, form]);

  return (
    <section className="bg-base-100 container mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
          <div className="flex flex-row gap-4">
            <div className="w-full space-y-6">
              <h3 className="text-2xl font-bold">Account Settings</h3>
              <div className="flex flex-row items-end gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="First name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input {...field} placeholder="Last name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative">
                <FormField
                  control={form.control}
                  name="phoneCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="text-primary absolute top-6 left-0 w-24 border-0">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+87">+87</SelectItem>
                            <SelectItem value="+880">+880</SelectItem>
                            <SelectItem value="+98">+98</SelectItem>
                            <SelectItem value="+95">+95</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your Phone number..."
                          className="pl-26"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="bg-base-300 flex w-69 flex-col gap-4 p-4">
              <div className="relative">
                <div className="bg-base-100 h-48 w-full">
                  {form.watch("profile") && (
                    <CldImage
                      src={form.watch("profile") || ""}
                      width="500"
                      height="500"
                      className="h-48 w-full object-cover"
                      alt="uploaded image"
                      crop={{
                        type: "auto",
                        source: true,
                      }}
                    />
                  )}
                </div>
                <CldUploadButton
                  uploadPreset="course"
                  className="btn btn-soft btn-block absolute bottom-0"
                  options={{
                    sources: ["local"],
                    multiple: false,
                    resourceType: "image",
                    maxFileSize: 1048576, // 1MB
                    clientAllowedFormats: ["jpg", "jpeg", "png"],
                    maxImageWidth: 500,
                    maxImageHeight: 500,
                  }}
                  onSuccess={(result: CloudinaryUploadWidgetResults) => {
                    if (
                      result.event === "success" &&
                      typeof result.info === "object" &&
                      "secure_url" in result.info
                    ) {
                      form.setValue(
                        "profile",
                        (result.info as { secure_url: string }).secure_url
                      );
                    }
                  }}
                  onError={(error) => {
                    console.error("Upload error:", error);
                  }}
                >
                  <span className="flex flex-row items-center gap-4">
                    <Icon icon="ph:upload-simple" width="24" height="24" />
                    Upload Photo
                  </span>
                </CldUploadButton>
              </div>
              <p className="text-base-content/60 text-xs">
                Image size should be under 1MB and image ratio needs to be 1:1
              </p>
            </div>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      placeholder="Your title, profession or small biography"
                      maxLength={50}
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        form.setValue("title", e.target.value);
                      }}
                    />
                    <span className="text-base-content/60 absolute top-2 right-2">
                      {title.length}/50
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="biography"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Biography</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-32"
                    placeholder="Your title, profession or small biography"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center gap-6">
            <button className="btn btn-primary" type="submit">
              Save Changes
            </button>
            {state.message === "SUCCESS" && (
              <div className="bg-success/10 text-success rounded-md p-4">
                Account settings changes saved
              </div>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
};

export default AccountSettings;
