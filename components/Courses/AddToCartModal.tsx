import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "../ui/Icon";
import Image from "next/image";

const AddToCartModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="btn btn-primary w-full text-xs">
        Add To Cart
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Added to cart</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="border-base-300 flex flex-col items-start justify-between gap-2 border-2">
                <Image
                  src="/images/course-images-1.png"
                  width={600}
                  height={400}
                  alt="Course Thumbnail"
                />

                <div className="flex flex-row items-center gap-4 p-2">
                  <Icon
                    icon="ph:check-circle"
                    className="text-success text-3xl"
                  />
                  <div className="flex w-full flex-col items-center gap-2">
                    <span className="text-base-content/80 text-2xl font-semibold">
                      course title
                    </span>
                    <span className="text-base-content/70 p-4 pt-0 text-sm">
                      instructor name
                    </span>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary w-full">Go to Cart</button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartModal;
