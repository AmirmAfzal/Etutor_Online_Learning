"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";

import { wishlistBuyNowAction } from "@/lib/actions/student/wishlistBuyNowAction";
import Icon from "@/components/ui/Icon";

interface Props {
  id: string;
}

interface ToastState {
  message: string;
  errors?: string[];
}

const WishlistBuyNow = (props: Props) => {
  const { id } = props;
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const [state, action, pending] = useActionState(wishlistBuyNowAction, {
    message: "",
    errors: [],
  });

  useEffect(() => {
    if (state.message) {
      setShowToast(true);

      if (state.message === "SUCCESS") {
        router.push("/student/checkout");
      }

      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [state.message, router]);

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
    <Form action={action} ref={formRef}>
      <input type="hidden" name="courseId" value={id} />
      <button
        type="submit"
        className="btn btn-soft btn-base-content h-10 w-28 text-sm"
        disabled={pending}
      >
        Buy Now
      </button>
      {renderToast(showToast, state)}
    </Form>
  );
};

export default WishlistBuyNow;
