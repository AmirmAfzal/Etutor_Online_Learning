"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
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
import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { saveChangePassword } from "@/lib/actions/instructor/settings/changesPassword";
import {
  changePasswordFormData,
  changePasswordSchema,
} from "@/lib/validation/schemas/instructor/settings/changePassword";
import ErrorMessage from "@/components/ErrorMessage";

const initialState = {
  message: "",
  errors: [],
};

const Changepassword = () => {
  const [state, formAction, pendding] = useActionState(
    saveChangePassword,
    initialState
  );

  const [isPassword, setIsPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const form = useForm<changePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const submitHandler = (data: changePasswordFormData) => {
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
    }
  }, [state.message, form]);

  return (
    <section className="bg-base-100 space-y-4 p-6">
      <h3 className="text-2xl font-bold">Change password</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <button
                      type="button"
                      className="absolute top-2 right-2"
                      onClick={() => setIsPassword(!isPassword)}
                    >
                      <Icon
                        icon={isPassword ? "ph:eye-closed" : "ph:eye"}
                        width="24"
                        height="24"
                      />
                    </button>
                    <Input
                      {...field}
                      type={isPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <button
                      type="button"
                      className="absolute top-2 right-2 cursor-pointer"
                      onClick={() => setIsNewPassword(!isNewPassword)}
                    >
                      <Icon
                        icon={isNewPassword ? "ph:eye-closed" : "ph:eye"}
                        width="24"
                        height="24"
                      />
                    </button>
                    <Input
                      {...field}
                      type={isNewPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <button
                      type="button"
                      className="absolute top-2 right-2"
                      onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                    >
                      <Icon
                        icon={isConfirmPassword ? "ph:eye-closed" : "ph:eye"}
                        width="24"
                        height="24"
                      />
                    </button>
                    <Input
                      {...field}
                      type={isConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <button
              className="btn btn-primary"
              disabled={pendding}
              type="submit"
            >
              {pendding && <div className="loading loading-spinner" />}
              Save Changes
            </button>

            {state.message === "SUCCESS" && (
              <div className="bg-success/10 text-success rounded-md p-4">
                Password changed successfully.
              </div>
            )}
          </div>
          {state.message === "ERROR" && (
            <div className="p-4">
              <ErrorMessage
                title="Error saving course information:"
                errors={state.errors}
              />
            </div>
          )}
        </form>
      </Form>
    </section>
  );
};

export default Changepassword;
