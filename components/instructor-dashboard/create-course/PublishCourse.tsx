import Image from "next/image";

import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const PublishCourse = () => {
  return (
    <div>
      <div className="border-base-300 flex flex-row items-center justify-between border-t border-b p-4">
        <h2 className="text-xl font-bold">Publish Course</h2>
        <div>
          <button className="btn btn-primary btn-soft mr-4">Save</button>
          <button className="btn btn-primary btn-soft">Save & Preview</button>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Message</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm">Welcome Message</p>
              <Textarea
                name=""
                id=""
                className="min-h-32"
                placeholder="Enter course starting message here..."
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm">Congratulations Message</p>
              <Textarea
                name=""
                id=""
                className="min-h-32"
                placeholder="Enter your course completed message here..."
              />
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-bold">Add Instructor (02)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Icon
                icon="ph:magnifying-glass"
                className="absolute top-2 left-2"
                width="24"
                height="24"
              />
              <Input
                type="text"
                placeholder="Search by username"
                className="pl-12"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {/* instructor 1 */}
            <div className="bg-base-200 flex flex-row items-center justify-between gap-2 p-4">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src="/images/dashboard-profile.png"
                  alt="profile"
                  width={45}
                  height={45}
                />
                <div className="space-y-2">
                  <p className="text-sm font-bold">John Doe</p>
                  <p className="text-base-content/70 text-sm">UI/UX Designer</p>
                </div>
              </div>
              <Icon icon="ph:x" width="24" height="24" />
            </div>

            {/* instructor 2 */}
            <div className="bg-base-200 flex flex-row items-center justify-between gap-2 p-4">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src="/images/profile-img.png"
                  alt="profile"
                  width={45}
                  height={45}
                />
                <div className="space-y-2">
                  <p className="text-sm font-bold">John Doe</p>
                  <p className="text-base-content/70 text-sm">UI/UX Designer</p>
                </div>
              </div>
              <Icon icon="ph:x" width="24" height="24" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-row items-center justify-between p-4">
          <button className="btn btn-soft">Prev Step</button>
          <button type="submit" className="btn btn-primary">
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishCourse;
