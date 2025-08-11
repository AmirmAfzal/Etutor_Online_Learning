"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const GiftCourseFormSchema = z.object({
  name: z.string().min(1, "Recipient's name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  message: z.string().optional(),
});

const GiftCourseForm = () => {
  const form = useForm<z.infer<typeof GiftCourseFormSchema>>({
    resolver: zodResolver(GiftCourseFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof GiftCourseFormSchema>) {
    console.log(values);
  }

  return (
    <div className="flex w-1/3 flex-col p-2">
      <h3 className="mb-4 text-xl font-semibold">Gift course</h3>
      <span className="text-base-content/80 text-sm font-medium">
        Recipient's Information
      </span>

      <Form {...form}>
        <form className="mt-4 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base-content/80 text-xs font-medium">
                  Recipient's Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base-content/80 text-xs font-medium">
                  Recipient's Email
                </FormLabel>
                <FormControl>
                  <Input placeholder="Email Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base-content/80 text-xs font-medium">
                  Gift Message
                </FormLabel>
                <FormControl>
                  <Input
                    className="pt-6 pb-20"
                    placeholder="Add your personal message here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default GiftCourseForm;
