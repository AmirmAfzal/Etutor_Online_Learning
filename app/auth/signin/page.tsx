"use client";
import Image from "next/image";
import React from "react";
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
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

const SignInPage = () => {
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

  const [resultError, setResultError] = useState<string | null>(null);
  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    // Simulate error for demonstration
    if (data.email === "error@example.com") {
      setResultError("An account with this email already exists.");
      return;
    }
    setResultError(null);
    alert("Account created!\n" + JSON.stringify(data, null, 2));
  };

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
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md space-y-4"
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
                          className="absolute top-1/2 right-2 -translate-y-1/2 text-xs text-gray-500"
                          tabIndex={-1}
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? "Hide" : "Show"}
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
                          className="absolute top-1/2 right-2 -translate-y-1/2 text-xs text-gray-500"
                          tabIndex={-1}
                          onClick={() => setShowConfirmPassword((v) => !v)}
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      id="terms"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mr-2"
                    />
                  </FormControl>
                  <FormLabel htmlFor="terms" className="text-xs">
                    I Agree with all of your{" "}
                    <Link href="/" className="text-primary underline">
                      Terms & Conditions
                    </Link>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            {resultError && (
              <div className="mb-2 text-center text-sm text-red-600">
                {resultError}
              </div>
            )}
            
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 mt-2 w-full text-base font-semibold"
            >
              Create Account
            </Button>
            <div className="my-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">SIGN UP WITH</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
