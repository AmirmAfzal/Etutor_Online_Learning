"use client";

import React, { useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { signInSchema } from "@/lib/validation/auth/signinSchema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/Icon";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [resultError, setResultError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result?.ok) {
      redirect("/");
    } else {
      setResultError(result?.error || "");
    }
  };

  return (
    <div className="grid h-screen grid-cols-5">
      <Image
        className="col-span-2 h-screen object-cover"
        src={"/images/signup/signup.svg"}
        alt="Illustrations"
        width={1080}
        height={1920}
      />
      <div className="relative col-span-3 flex flex-col items-center justify-center">
        <h1 className="mb-8 text-center text-4xl font-semibold">
          Sign in to your account
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username or email address..."
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Password"
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
            <div className="flex flex-row justify-between gap-4">
              <FormField
                control={form.control}
                name="remember"
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
                        Remember me
                      </span>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button type="submit" className="btn btn-primary flex gap-2 px-8">
                SignIn
                <Icon width={24} icon="ph:arrow-right" />
              </button>
            </div>
            {resultError && (
              <div className="text-error mb-2 text-center text-sm">
                {resultError}
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
