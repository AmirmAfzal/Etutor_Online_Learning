"use client";

import { useSession } from "next-auth/react";
import { useActionState, useRef } from "react";

import Icon from "@/components/ui/Icon";
import { addFeedbackAction } from "@/lib/actions/feedBack/addFeedbackAction";
import Toast from "@/components/Toast";



const WriteReview = ({ courseId } :{courseId: string}) => {
  const { data: session } = useSession();
  const [state, action, pending] = useActionState(addFeedbackAction, {
    message: "",
    messageDetail: "",
    errors: [],
  });
  const formRef = useRef<HTMLFormElement>(null);

  const userRole = session?.user?.role ?? "";
  const userName = session?.user?.name ?? "";

  console.log(courseId);

  return (
    <>
      <label
        htmlFor="my_modal_6"
        className="btn bg-base-100 text-primary shadow md:shadow-none"
      >
        Write A Review
      </label>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal " role="dialog">
        <div className="modal-box rounded-none">
          <div className="border-b-base-300 flex w-full flex-row items-center justify-between border-b">
            <span className="text-md text-sm">write a review</span>
            <label htmlFor="my_modal_6" className="btn btn-ghost">
              <Icon icon="ph:x" className="text-base-content/70 text-xl" />
            </label>
          </div>

          <form action={action} ref={formRef} className="w-full">
            <div className="my-4 flex flex-col items-center gap-2">
              <div className="flex flex-col items-center gap-3">
                <span className="text-md font-semibold">
                  4.5
                  <span className="text-base-content/70 font-medium">{`(Good/Amazing)`}</span>
                </span>
                <div className="rating">
                  <input
                    type="radio"
                    name="star"
                    value={1}
                    className="mask mask-star-2 bg-primary w-10"
                    aria-label="1 star"
                  />
                  <input
                    type="radio"
                    name="star"
                    value={2}
                    className="mask mask-star-2 bg-primary w-10"
                    aria-label="2 star"
                  />
                  <input
                    type="radio"
                    name="star"
                    value={3}
                    className="mask mask-star-2 bg-primary w-10"
                    aria-label="3 star"
                  />
                  <input
                    type="radio"
                    name="star"
                    value={4}
                    className="mask mask-star-2 bg-primary w-10"
                    aria-label="4 star"
                  />
                  <input
                    type="radio"
                    name="star"
                    value={5}
                    className="mask mask-star-2 bg-primary w-10"
                    aria-label="5 star"
                    defaultChecked
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="feedback-input"
                  className="text-base-content/70 text-sm"
                >
                  feedback
                </label>
                <textarea
                  required
                  rows={3}
                  id="feedback-input"
                  name="feedback"
                  placeholder="Write down your feedback here"
                  className=" w-full border border-base-300 p-2 mt-2"
                />
                <input name="refPath" type="hidden" value={userRole} />
                <input name="name" type="hidden" value={userName} />
                <input type="hidden" name="courseId" value={courseId} />
              </div>
            </div>

            {state?.errors && (
              <div className="mt-4 w-full">
                {state.errors.map((error, index) => (
                  <p key={index} className="text-error text-sm">
                    {error}
                  </p>
                ))}
              </div>
            )}

            <div className="modal-action flex flex-row items-center justify-between">
              <label htmlFor="my_modal_6" className="btn">
                Cancel
              </label>
              <button
                type="submit"
                disabled={pending}
                className="btn btn-primary"
              >
                <label htmlFor="my_modal_6">
                  Submit Review
                  <Icon
                    icon="ph:paper-plane-right-fill"
                    className="text-base-100 text-xl"
                  />
                </label>
              </button>
            </div>
          </form>

          <Toast message={state.message} isError={!!state.errors?.length} errors={state.errors} messageDetail={state.messageDetail} />

        </div>
      </div>
    </>
  );
};

export default WriteReview;