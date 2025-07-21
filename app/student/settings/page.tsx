"use client";

import Image from "next/image";
import { z } from "zod";
import { useState } from "react";

import Icon from "@/components/ui/Icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { settingPasswordSchema } from "@/lib/validation/Student-dashboard/settingPasswordSchema";

const StudentSettingsPage = () => {
  // form state for account settings
  const formAccount = useForm<z.infer<typeof settingAccountSchema>>({
    resolver: zodResolver(settingAccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      title: "",
    },
  });

  // form state for password settings
  const formPassword = useForm<z.infer<typeof settingPasswordSchema>>({
    resolver: zodResolver(settingPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  //TODO:server action for update student model
  // const [state, formAction, pending] = useActionState(studentModel.updateOne, {
  //   message: "",
  //   errors: [],
  // });

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // handle submit for account settings
  const onSubmitAccount = (data: z.infer<typeof settingAccountSchema>) => {
    console.log(data);
    // update student model
  };

  // handle submit for password settings
  const onSubmitPassword = (data: z.infer<typeof settingPasswordSchema>) => {
    console.log(data);
  };

  return (
    <div className="bg-base-100 max-w-5xl">
      {/* Header */}

      {/* Account Settings */}
      <div className="mb-12">
        <h3 className="mb-6 text-lg font-semibold">Account settings</h3>
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
                Image size should be under 1MB and <br /> image ration needs to
                be 1:1
              </p>
            </div>
          </div>
          {/* User Info Form */}
          <Form {...formAccount}>
            <form
              onSubmit={formAccount.handleSubmit(onSubmitAccount)}
              className="grid flex-1 grid-cols-2 gap-6"
            >
              <FormField
                control={formAccount.control}
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
                control={formAccount.control}
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
                control={formAccount.control}
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
                control={formAccount.control}
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
                control={formAccount.control}
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
                <Button
                  type="submit"
                  className="!btn !btn-primary mt-2 px-6 py-2 font-medium"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Change Password */}
      <Form {...formPassword}>
        <form
          onSubmit={formPassword.handleSubmit(onSubmitPassword)}
          className="flex flex-col items-start gap-6"
        >
          <FormField
            control={formPassword.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                    <button
                      type="button"
                      className="text-base-content/80 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      tabIndex={-1}
                      onClick={() => setShowCurrentPassword((v) => !v)}
                    >
                      <Icon
                        icon={showCurrentPassword ? "ph:eye-slash" : "ph:eye"}
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formPassword.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                    <button
                      type="button"
                      className="text-base-content/80 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      tabIndex={-1}
                      onClick={() => setShowNewPassword((v) => !v)}
                    >
                      <Icon
                        icon={showNewPassword ? "ph:eye-slash" : "ph:eye"}
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formPassword.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmNewPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      {...field}
                    />
                    <button
                      type="button"
                      className="text-base-content/80 absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      tabIndex={-1}
                      onClick={() => setShowConfirmNewPassword((v) => !v)}
                    >
                      <Icon
                        icon={
                          showConfirmNewPassword ? "ph:eye-slash" : "ph:eye"
                        }
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-3">
            <Button
              type="submit"
              className="!btn !btn-primary mt-2 px-6 py-2 font-medium"
            >
              Change Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default StudentSettingsPage;
