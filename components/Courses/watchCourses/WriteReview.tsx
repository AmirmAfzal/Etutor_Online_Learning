import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";

const WriteReview = () => {
  return (
    <>
      <label
        htmlFor="my_modal_6"
        className="btn bg-base-100 text-primary shadow md:shadow-none"
      >
        Write A Review
      </label>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="border-b-base-300 flex w-full flex-row items-center justify-between border-b">
            <span className="text-md text-sm">write a review</span>
            <label htmlFor="my_modal_6" className="btn btn-ghost">
              <Icon icon="ph:x"   className="text-base-content/70 text-xl" />
            </label>
          </div>

          <div className="my-4 flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-3">
              <span className="text-md font-semibold">
                4.5
                <span className="text-base-content/70 font-medium">{`(Good/Amazing)`}</span>
              </span>
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-primary w-10"
                  aria-label="1 star"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-primary w-10"
                  aria-label="2 star"
                  defaultChecked
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-primary w-10"
                  aria-label="3 star"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-primary w-10"
                  aria-label="4 star"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-primary w-10"
                  aria-label="5 star"
                />
              </div>
            </div>
            <form className="w-full">
              <label
                htmlFor="feedback-input"
                className="text-base-content/70 text-sm"
              >
                feedback
              </label>
              <Input
                id="feedback-input"
                placeholder="Write down your feedback here"
                className="pt-3 pb-20"
              />
            </form>
          </div>

          <div className="modal-action flex flex-row items-center justify-between">
            <label htmlFor="my_modal_6" className="btn">
              Cancel
            </label>
            <label htmlFor="my_modal_6" className="btn btn-primary">
              Submit Review
              <Icon
                icon="ph:paper-plane-right-fill"
                className="text-base-100 text-xl"
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteReview;
