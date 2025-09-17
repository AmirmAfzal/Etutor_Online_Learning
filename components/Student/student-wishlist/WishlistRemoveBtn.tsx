"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import Icon from "@/components/ui/Icon";
import { wishlistRemoveAction } from "@/lib/actions/student/wishlistRemoveAction";

interface Props {
  id: string;
}
interface ToastState {
  message: string;
  errors?: string[];
}


const WishlistRemoveBtn = (props: Props) => {
  const { id } = props;

  const [showToast, setShowToast] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, pending] = useActionState(wishlistRemoveAction, {
    message: "",
    errors: [] as string[],
  });

  useEffect(() => {
    if (state.message) {
      setShowToast(true);

      const timer = setTimeout(() => setShowToast(false), 2000);
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
    <form action={action} ref={formRef} >
      <input type="hidden" name="courseId" value={id} />
      <button
        type="submit"
        className="btn btn-soft btn-primary h-8 w-8 p-0"
        title="Remove from wishlist"
        disabled={pending}
      >
        <Icon icon="ph:heart-fill" className="text-sm" />
      </button>
      {renderToast(showToast, state)}

    </form>
  );
};

export default WishlistRemoveBtn;
