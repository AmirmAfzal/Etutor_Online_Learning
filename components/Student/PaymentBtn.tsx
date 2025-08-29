"use client";
import CoursesLoading from "@/app/courses/loading";
import { addToCheckout } from "@/lib/actions/student/addToCheckout";
import Form from "next/form";
import { useActionState, useEffect, useState } from "react";
import Icon from "../ui/Icon";

interface Props {
  courseIds?: string[];
}

interface ToastState {
  message: string;
  errors?: string[];
}

const PaymentBtn = ({ courseIds }: Props) => {
  const [state, action, pending] = useActionState(addToCheckout, {
    message: "",
    errors: [] as string[],
  });

  const [showCheckoutToast, setShowCheckoutToast] = useState(false);

  useEffect(() => {
    if (state.message) {
      setShowCheckoutToast(true);
      const timer = setTimeout(() => setShowCheckoutToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [state.message]);

  const renderToast = (show: boolean, state: ToastState) => (
    <div className="toast toast-top toast-end">
      {show && state.message && (
        <div
          role="alert"
          className={`alert ${
            state.errors?.length ? "alert-error" : "alert-success"
          }`}
        >
          <Icon
            icon={state.errors?.length ? "ph:x-circle" : "ph:check-circle"}
            className="text-lg"
          />
          <span className="text-xs">{state.message}</span>
        </div>
      )}
    </div>
  );

  return (
    <Form action={action} className="w-full">
      {courseIds?.map((id) => (
        <input key={id} type="hidden" name="courseId" value={id} />
      ))}
      <button
        type="submit"
        className="btn btn-primary text-md mt-6 w-full py-3 font-semibold tracking-wide transition-all"
        disabled={pending}
      >
        {pending ? <CoursesLoading /> : "Complete Payment"}
      </button>
      {renderToast(showCheckoutToast, state)}
    </Form>
  );
};

export default PaymentBtn;
