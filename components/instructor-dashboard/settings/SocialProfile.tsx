"use client";

import { startTransition, useActionState } from "react";
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
import { saveSocialProfile } from "@/lib/actions/instructor/settings/socialProfile";
import {
  SocialProfileFormData,
  socialProfileSchema,
} from "@/lib/validation/schemas/instructor/settings/socialProfile";

const initialState = {
  message: "",
  errors: [],
};

const SocialProfile = () => {
  const formFields = [
    {
      id: 1,
      icon: "ph:facebook-logo",
      title: "Facebook",
      placeholder: "Username",
    },
    {
      id: 2,
      icon: "ph:instagram-logo",
      title: "Instagram",
      placeholder: "Username",
    },
    {
      id: 3,
      icon: "ph:linkedin-logo",
      title: "Linkedin",
      placeholder: "Username",
    },
    {
      id: 4,
      icon: "ph:twitter-logo-fill",
      title: "Twitter",
      placeholder: "Username",
    },
    {
      id: 5,
      icon: "ph:whatsapp-logo-bold",
      title: "Whatsapp",
      placeholder: "Phone number",
    },
    {
      id: 6,
      icon: "ph:youtube-logo-fill",
      title: "Youtube",
      placeholder: "Username",
    },
  ];

  const [state, formAction] = useActionState(saveSocialProfile, initialState);

  const form = useForm<SocialProfileFormData>({
    resolver: zodResolver(socialProfileSchema),
    defaultValues: {
      website: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      whatsapp: "",
      youtube: "",
    },
  });

  const submitHandler = (data: SocialProfileFormData) => {
    startTransition(() => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formAction(formData);
    });
  };

  return (
    <section className="bg-base-100 container mx-auto p-6">
      <h3 className="text-2xl font-bold">Social Profile</h3>
      <div className="mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Personal Website</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Icon
                        icon="ph:globe"
                        className="text-primary border-base-300 absolute top-2 left-2 border-r-2 pr-1"
                        width="24"
                        height="24"
                      />
                      <Input
                        {...field}
                        placeholder="Personal website or portfolio url..."
                        className="pl-12"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-4 grid grid-cols-3 gap-4">
              {formFields.map((item, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={item.title.toLowerCase() as keyof SocialProfileFormData}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>{item.title}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Icon
                            icon={item.icon}
                            className="text-primary border-base-300 absolute top-2 left-2 border-r-2 pr-1"
                            width="24"
                            height="24"
                          />
                          <Input
                            {...field}
                            placeholder={item.placeholder}
                            className="pl-12"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="mt-6 flex flex-row items-center gap-6">
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
              {state.message === "SUCCESS" && (
                <div className="bg-success/10 text-success rounded-md p-4">
                  Account settings changes saved
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default SocialProfile;
