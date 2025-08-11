"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { settingPasswordSchema } from "@/lib/validation/Student-dashboard/settingPasswordSchema";

const PasswordSettingsForm = () => {
  const passwordForm = useForm<z.infer<typeof settingPasswordSchema>>({
    resolver: zodResolver(settingPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const onSubmit = (data: z.infer<typeof settingPasswordSchema>) => {
    console.log(data);
  };

  return (
    <Form {...passwordForm}>
      <form
        onSubmit={passwordForm.handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-6"
      >
        <FormField
          control={passwordForm.control}
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
          control={passwordForm.control}
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
          control={passwordForm.control}
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
                      icon={showConfirmNewPassword ? "ph:eye-slash" : "ph:eye"}
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
          <button type="submit" className="btn btn-primary mt-2 px-6 py-2">
            Change Password
          </button>
        </div>
      </form>
    </Form>
  );
};

export default PasswordSettingsForm;
