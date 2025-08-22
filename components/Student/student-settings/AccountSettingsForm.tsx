"use client";

import { startTransition, useActionState, useState } from "react";
import {
  CldImage,
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { settingAccountSchema } from "@/lib/validation/Student-dashboard/settingAccountSchema";
import { updateStudentAccount } from "@/lib/actions/updateStudentAccount";

import Icon from "@/components/ui/Icon";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  title: string;
  avatar?: string;
};

const AccountSettingsForm = (props: Props) => {
  const [profileImage, setProfileImage] = useState(props.avatar || "");

  const accountForm = useForm<z.infer<typeof settingAccountSchema>>({
    resolver: zodResolver(settingAccountSchema),
    defaultValues: {
      id: props._id,
      firstName: props.firstName,
      lastName: props.lastName,
      username: props.username,
      email: props.email,
      title: props.title,
      avatar: props.avatar || "",
    },
  });

  const [, formAction] = useActionState(updateStudentAccount, {
    message: "",
    errors: [],
  });

  const onSubmit = () => {
    const formData = new FormData();
    Object.entries(accountForm.getValues()).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex flex-col items-center gap-10 sm:flex-row">
        {/* Profile Photo */}
        <div className="w-2/3 p-2 sm:w-1/3 md:w-1/3 lg:w-1/4">
          <div className="border-base-content/10 bg-base-100 flex flex-col items-center gap-2 border p-4">
            <div className="relative aspect-square w-full overflow-hidden">
              {profileImage ? (
                <CldImage
                  src={profileImage}
                  alt="Profile"
                  fill
                  className="object-cover"
                  crop={{
                    type: "auto",
                    source: true,
                  }}
                />
              ) : (
                <div className="bg-base-300 flex h-full w-full items-center justify-center">
                  <Icon
                    icon="ph:user-circle-duotone"
                    className="opacity-50"
                    width="64"
                    height="64"
                  />
                </div>
              )}
              <CldUploadButton
                uploadPreset="course"
                className="bg-base-content/70 text-base-100 hover:bg-base-content/80 absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 py-2 text-sm font-medium transition-colors"
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
                    const imageUrl = (result.info as { secure_url: string })
                      .secure_url;
                    setProfileImage(imageUrl);
                    accountForm.setValue("avatar", imageUrl);
                  }
                }}
                onError={(error: unknown) => {
                  console.error("Upload error:", error);
                }}
              >
                <Icon icon="ph:upload-simple" width={16} height={16} />
                Upload Photo
              </CldUploadButton>
            </div>
            <p className="text-base-content/70 text-center text-xs">
              Image size should be under 1MB and <br /> image ratio needs to be
              1:1
            </p>
          </div>
        </div>

        {/* User Info Form */}
        <Form {...accountForm}>
          <form
            onSubmit={accountForm.handleSubmit(onSubmit)}
            className="grid flex-1 grid-cols-2 gap-6"
          >
            <FormField
              control={accountForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={accountForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="col-span-1">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={accountForm.control}
              name="username"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={accountForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={accountForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Your title, profession or small biography"
                        maxLength={50}
                        {...field}
                      />
                      <span className="text-base-content/80 absolute top-1/2 right-3 -translate-y-1/2 text-xs">
                        {field.value?.length || 0}/50
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <button
                type="submit"
                className="btn btn-primary mt-2 px-2 py-0 md:px-6 md:py-2"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AccountSettingsForm;
