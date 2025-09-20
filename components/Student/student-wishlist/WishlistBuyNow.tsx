"use client";

import Form from "next/form";
import { useActionState, useRef } from "react";

import { wishlistBuyNowAction } from "@/lib/actions/student/wishlistBuyNowAction";
import Toast from "@/components/Toast";

interface Props {
  id: string;
}

const WishlistBuyNow = (props: Props) => {
  const { id } = props;

  const formRef = useRef<HTMLFormElement>(null);

  const [state, action, pending] = useActionState(wishlistBuyNowAction, {
    message: "",
    messageDetail: "",
    errors: [],
  });
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
      <Toast
        message={state.message}
        isError={!!state.errors.length}
        errors={state.errors}
        messageDetail={state.messageDetail}
      />
    </Form>
  );
};

export default WishlistBuyNow;
