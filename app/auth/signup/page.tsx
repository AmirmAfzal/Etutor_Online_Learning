"use client";
import Image from "next/image";
import React, { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/validation/auth/signinSchema";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { createUser } from "@/lib/actions/signup";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const [state, formAction, pending] = useActionState(createUser, {
    message: "",
    errors: [],
  });

  const handleSumbit = async (data: z.infer<typeof signUpSchema>) => {
    startTransition(() => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      formAction(formData);
    });
  };

  useEffect(() => {
    const handleSignin = async () => {
      if (state.message === "SUCCESS") {
        const result = await signIn("credentials", {
          email: form.getValues("email"),
          password: form.getValues("password"),
          redirect: false,
        });
        if (result?.ok) redirect("/");
      }
    };
    handleSignin();
  }, [state.message]);

  return (
    <div className="grid h-screen grid-cols-5">
      <Image
        className="col-span-2 h-screen object-cover"
        src={"/images/signin/signin.svg"}
        alt="Illustrations"
        width={1080}
        height={1920}
      />
      <div className="col-span-3 flex flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl font-semibold">Create your account</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSumbit)}
            className="w-full max-w-lg space-y-4"
          >
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="First name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Create password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-2 -translate-y-1/2 text-xs"
                          tabIndex={-1}
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          <Icon
                            width={24}
                            icon={showPassword ? "ph:eye-slash" : "ph:eye"}
                          />
                        </button>
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
                  <FormItem className="w-1/2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Confirm password"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-2 -translate-y-1/2 text-xs"
                          tabIndex={-1}
                          onClick={() => setShowConfirmPassword((v) => !v)}
                        >
                          <Icon
                            width={24}
                            icon={
                              showConfirmPassword ? "ph:eye-slash" : "ph:eye"
                            }
                          />
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row justify-between gap-4">
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      {/* <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(!!checked)}
                        aria-checked={field.value}
                        className="checkbox-sm"
                      /> */}
                      <input
                        checked={field.value}
                        aria-checked={field.value}
                        onChange={field.onChange}
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
                    </FormControl>
                    <FormLabel htmlFor="terms">
                      <span className="text-base-content/60 leading-5 font-normal">
                        I Agree with all of your{" "}
                        <Link href="/" className="link-secondary link">
                          Terms & Conditions
                        </Link>
                      </span>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                className="btn btn-primary flex gap-2"
                disabled={pending}
              >
                {pending ? "Creating..." : "Create Account"}{" "}
                <Icon width={24} icon="ph:arrow-right" />
              </button>
            </div>
            {state.errors.length > 0 && (
              <div className="text-error mb-2 text-center text-sm">
                {state.errors.join(", ")}
              </div>
            )}

            <div className="divider text-base-content/60 mt-8 text-sm">
              SIGN UP WITH
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
