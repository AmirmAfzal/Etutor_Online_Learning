"use client";

import Image from "next/image";
import { z } from "zod";
import { startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";

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
import { Button } from "@/components/ui/button";
import { settingAccountSchema } from "@/lib/validation/Student-dashboard/settingAccountSchema";
import { updateStudentAccount } from "@/lib/actions/updateStudentAccount";

interface Props {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  title: string;
}

const AccountSettingsForm = (props: Props) => {
  const accountForm = useForm<z.infer<typeof settingAccountSchema>>({
    resolver: zodResolver(settingAccountSchema),
    defaultValues: {
      id: props._id,
      firstName: props.firstName,
      lastName: props.lastName,
      username: props.username,
      email: props.email,
      title: props.title,
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
    <div className="mb-12">
      <div className="flex gap-10">
        {/* Profile Photo */}
        <div className="w-1/3 flex-shrink-0">
          <div className="border-base-content/10 flex flex-col items-center gap-2 border p-4">
            <div className="bg-base-100 relative mb-2 flex h-52 w-52 items-center justify-center overflow-hidden">
              <Image
                width={192}
                height={192}
                src="/images/student-dashboard/profile-student.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
              <button
                className="bg-base-content/70 text-base-100 absolute bottom-0 left-0 flex w-full cursor-pointer items-center justify-center gap-2 py-2 text-sm font-medium"
                type="button"
              >
                <Icon icon="ph:upload-simple" width={16} height={16} />
                Upload Photo
              </button>
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
              <button type="submit" className="btn btn-primary mt-2 px-6 py-2">
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
