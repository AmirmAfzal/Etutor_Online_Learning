"use client";

import Icon from "@/components/ui/Icon";
import { useActionState, useRef } from "react";
import { wishlistRemoveAction } from "@/lib/actions/student/wishlistRemoveAction";
import Toast from "@/components/Toast";

interface Props {
  id: string;
}

const WishlistRemoveBtn = (props: Props) => {
  const { id } = props;

  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(wishlistRemoveAction, {
    message: "",
    messageDetail: "",
    errors: [] as string[],
  });

  return (
    <form action={action} ref={formRef}>
      <input type="hidden" name="courseId" value={id} />
      <button
        type="submit"
        className="btn btn-soft btn-primary h-8 w-8 p-0"
        title="Remove from wishlist"
        disabled={pending}
      >
        <Icon icon="ph:heart-fill" className="text-sm" />
      </button>
      <Toast
        message={state.message}
        messageDetail={state.messageDetail}
        isError={!!state.errors.length}
        errors={state.errors}
      />
    </form>
  );
};

export default WishlistRemoveBtn;
