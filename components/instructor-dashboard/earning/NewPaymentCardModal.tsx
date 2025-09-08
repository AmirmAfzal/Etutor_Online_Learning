"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cleave from "cleave.js/react";

import {
  Form,
  FormItem,
  FormMessage,
  FormControl,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/Icon";
import { Separator } from "@/components/ui/separator";
import { savePaymentCard } from "@/lib/actions/instructor/earning/paymentCard";
import {
  PaymentCardFormData,
  paymentCardSchema,
} from "@/lib/validation/schemas/instructor/newPaymentCard";
import ErrorMessage from "@/components/ErrorMessage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialState = {
  message: "",
  errors: [],
};

interface Props {
  closeModal: () => void;
}

const NewPaymentCardModal = ({ closeModal }: Props) => {
  const [state, formAction, pending] = useActionState(
    savePaymentCard,
    initialState
  );

  const form = useForm<PaymentCardFormData>({
    resolver: zodResolver(paymentCardSchema),
    defaultValues: {
      bank: "",
      name: "",
      cardNumber: "",
      expiration: "",
      cvc: "",
    },
  });

  const onSubmit = (data: PaymentCardFormData) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state.message === "SUCCESS") {
      form.reset();
      setTimeout(() => {
        closeModal();
      }, 1000);
    }
  }, [state.message, closeModal, form]);

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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 p-4"
          >
            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visa">Visa</SelectItem>
                        <SelectItem value="mastercard">MasterCard</SelectItem>
                        <SelectItem value="paypal">Paypal</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <div className="relative">
                      <Icon
                        icon="ph:credit-card"
                        className="text-primary absolute top-2 left-2"
                        width="24"
                        height="24"
                      />
                      <Separator
                        orientation="vertical"
                        className="absolute left-10"
                      />
                      <Cleave
                        {...field}
                        options={{ creditCard: true }}
                        placeholder="Label"
                        className="border-base-300 w-full border p-2 pl-12 shadow-xs"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MM / YY</FormLabel>
                    <FormControl>
                      <Cleave
                        {...field}
                        options={{ date: true, datePattern: ["m", "y"] }}
                        placeholder="MM / YY"
                        className="border-base-300 w-full border p-2 shadow-xs"
                      />
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
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className="btn btn-primary"
              >
                {pending && <div className="loading loading-spinner" />}
                Send Message
                <Icon icon="ph:paper-plane-right-fill" width="24" height="24" />
              </button>
            </div>

            {state.message === "SUCCESS" && (
              <div className="bg-success/10 text-success mt-4 flex flex-row items-center gap-4 rounded-md p-4">
                <div className="loading loading-spinner" />
                <p>add new payment card successfully!</p>
              </div>
            )}

            {state.message === "ERROR" && (
              <div className="p-4">
                <ErrorMessage
                  title="Error saving new payment card:"
                  errors={state.errors}
                />
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewPaymentCardModal;
