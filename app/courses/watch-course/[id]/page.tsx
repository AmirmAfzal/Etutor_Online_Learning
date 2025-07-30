import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import Link from "next/link";

const watchCourse = () => {
  return (
    <section className="container mx-auto flex w-full flex-col items-center">
      <div className="bg-base-200 flex w-full flex-row items-center justify-between p-4">
        {/* description */}
        <div className="flex flex-row items-center gap-4">
          <Link
            href=""
            className="bg-base-100 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <Icon
              icon="ph:arrow-left"
              className="text-base-content/80 text-lg"
            />
          </Link>

          <div className="flex flex-col gap-3">
            <span className="text-base-content/80 text-xl font-semibold">
              Complete Website Responsive Design: from Figma to Webflow to
              Website Design
            </span>
            <div className="flex flex-row items-center gap-2">
              <span className="flex items-center gap-1 text-sm">
                <Icon icon="ph:folder-open" className="text-primary text-lg" />6
                section
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Icon
                  icon="ph:play-circle"
                  className="text-secondary text-lg"
                />
                203 lectures
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Icon icon="ph:clock" className="text-primary text-lg" /> 19h
                37m
              </span>
            </div>
          </div>
        </div>
        {/* btns */}
        <div className="flex flex-row items-center gap-2">
          <Button className="!btn !bg-base-100 !text-primary">
            Write A Review
          </Button>
          <Button className="!btn !btn-primary">Next Lecture</Button>
        </div>
      </div>
    </section>
  );
};

export default watchCourse;
