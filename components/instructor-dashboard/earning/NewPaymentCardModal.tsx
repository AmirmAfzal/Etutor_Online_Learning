"use client";

import { useForm } from "react-hook-form";
import Icon from "@/components/ui/Icon";

import {
  Form,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  closeModal: () => void;
};

const NewPaymentCardModal = ({ closeModal }: Props) => {
  const form = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    closeModal();
  }

  return (
    <div className="bg-base-content/70 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-base-100 relative w-full max-w-xl rounded-lg shadow-lg">
        <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">New Peyment Card</h2>
          <button onClick={closeModal}>
            <Icon
              icon="ph:x"
              className="text-base-content/70 hover:text-base-content cursor-pointer"
              width="20"
              height="20"
            />
          </button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name on card" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MM / YY</FormLabel>
                    <FormControl>
                      <Input placeholder="MM / YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input placeholder="Security Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6 flex flex-row items-center justify-between">
              <button className="btn btn-outline">Cancel</button>
              <button className="btn btn-primary">
                Send Message
                <Icon icon="ph:paper-plane-right-fill" width="24" height="24" />
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewPaymentCardModal;
