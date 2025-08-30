"use client";

import { z } from "zod";
import { useState, useEffect ,useActionState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";

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
import { changeStudentPassword } from "@/lib/actions/student/changePassword";

const initialState = {
  message: "",
  errors: [],
};

const PasswordSettingsForm = () => {
  const [state, formAction, pending] = useActionState(
    changeStudentPassword,
    initialState
  );

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
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formAction(formData);
  };

  // Reset form and sign out user on success
  useEffect(() => {
    if (state.message === "SUCCESS") {
      passwordForm.reset();

      // Show success message for 2 seconds then sign out
      setTimeout(() => {
        signOut({
          callbackUrl: "/auth/signin",
          redirect: true,
        });
      }, 2000);
    }
  }, [state.message, passwordForm]);

  return (
    <Form {...passwordForm}>
      <form
        onSubmit={passwordForm.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6 md:ml-3 md:items-start"
      >
        <FormField
          control={passwordForm.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="w-full md:w-1/2">
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter your current password"
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
            <FormItem className="w-full md:w-1/2">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your new password"
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
            <FormItem className="w-full md:w-1/2">
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmNewPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
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

        {state.message === "SUCCESS" && (
          <div className="bg-success/10 text-success w-full rounded-md p-4 md:w-1/2">
            <div className="flex items-center gap-2">
              <Icon icon="ph:check-circle" width={20} height={20} />
              <div>
                <p className="font-medium">Password changed successfully!</p>
                <p className="text-sm">
                  You will be redirected to login page in 2 seconds...
                </p>
              </div>
            </div>
          </div>
        )}

        {state.message === "ERROR" && state.errors.length > 0 && (
          <div className="bg-error/10 text-error w-full rounded-md p-4 md:w-1/2">
            <ul className="list-inside list-disc">
              {state.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="btn btn-primary mt-2 self-start px-2 py-0 sm:self-center md:self-start md:px-6 md:py-2"
        >
          {pending && (
            <div className="loading loading-spinner loading-sm mr-2" />
          )}
          {pending ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </Form>
  );
};

export default PasswordSettingsForm;
