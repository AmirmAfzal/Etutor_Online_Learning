import { Types } from "mongoose";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/Icon";
import WatchComments from "@/components/Courses/watchCourses/WatchComments";

interface Lecture {
  _id: Types.ObjectId;
  title: string;
  description: string;
  video: string;
  duration: number;
  files: string | string[];
  notes: string;
  caption: string;
}

interface Comment {
  name: string;
  avatar: string;
  time: string;
  star: number;
  comment: string;
  ADMIN: boolean;
  replies?: Comment[];
}

interface WatchTabsProps {
  currentLecture: Lecture;
  comments: Comment[];
}

const WatchTabs = ({ currentLecture, }: WatchTabsProps) => {
  if (!currentLecture) {
    return <div>No lecture details available.</div>;
  }

  const files: string[] = currentLecture.files
    ? Array.isArray(currentLecture.files)
      ? currentLecture.files
      : [currentLecture.files]
    : [];

  return (
    <Tabs defaultValue="description" className="mt-12 w-full md:mt-8">
      <TabsList className="bg-base-100 flex h-auto w-full gap-2 overflow-auto overflow-y-hidden">
        {[
          { value: "description", label: "Description" },
          { value: "lecture notes", label: "Lecture Notes" },
          {
            value: "attach file",
            label: `Attach Files (${String(files.length).padStart(2, "0")})`,
          },
          { value: "comments", label: "Comments" },
        ].map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="text-base-content/70 data-[state=active]:border-primary data-[state=active]:text-base-content md:text-md flex-1 border-0 px-4 py-4 text-sm font-semibold whitespace-nowrap data-[state=active]:border-b-2 data-[state=active]:bg-transparent md:px-6"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="description" className="my-6">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold md:text-xl">
            Lecture Description
          </h3>
          <p className="text-base-content/70 text-sm leading-6">
            {currentLecture.description}
          </p>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h3 className="text-lg font-semibold md:text-xl">Lecture Notes</h3>
            <button className="btn btn-primary btn-soft w-full sm:w-auto">
              <Icon icon="ph:download-simple" className="text-2xl" />
              Download Notes
            </button>
          </div>
          <p className="text-base-content/70 text-sm leading-6">
            {currentLecture.notes}
          </p>

          {/* FIXME : fix file number*/}
          {files.length > 0 ? (
            <div className="flex flex-col gap-6">
              <h3 className="text-lg font-semibold lg:text-xl">
                Attach Files ({String(files.length).padStart(2, "0")})
              </h3>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="bg-base-200 flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center sm:p-6"
                >
                  <div className="flex items-center gap-4">
                    <Icon
                      icon="ph:file-text"
                      className="text-primary text-4xl sm:text-5xl"
                    />
                    <div>
                      <p className="font-medium">
                        {file.split("/").pop() || "Downloadable File"}
                      </p>
                      <p className="text-base-content/60 text-sm">File Size</p>{" "}
                      {/* FIXME :  This should be dynamic */}
                    </div>
                  </div>
                  <Link
                    href={file}
                    download
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Download File
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-base-content/70 text-md ml-4 font-semibold italic">
              this lecture Does not have a file for download .
            </span>
          )}

          {/* <WatchComments comments={comments} lectureId={currentLecture.id} /> */}
          <WatchComments lectureId={currentLecture._id} />
        </div>
      </TabsContent>

      <TabsContent value="lecture notes" className="my-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h3 className="text-xl font-semibold">Lecture Notes</h3>
            <button className="btn btn-primary btn-soft w-full sm:w-auto">
              <Icon icon="ph:download-simple" className="text-2xl" />
              Download Notes
            </button>
          </div>
          <p className="text-base-content/70 text-md font-semibold">
            {currentLecture.notes}
          </p>
        </div>
      </TabsContent>

      <TabsContent value="attach file" className="my-6">
        {files.length > 0 ? (
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-semibold lg:text-xl">
              Attach Files ({String(files.length).padStart(2, "0")})
            </h3>
            {files.map((file, index) => (
              <div
                key={index}
                className="bg-base-200 flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <Icon
                    icon="ph:file-text"
                    className="text-primary text-4xl sm:text-5xl"
                  />
                  <div>
                    <p className="font-medium">
                      {file.split("/").pop() || "Downloadable File"}
                    </p>
                    <p className="text-base-content/60 text-sm">File Size</p>{" "}
                    {/* This should be dynamic */}
                  </div>
                </div>
                <Link
                  href={file}
                  download
                  className="btn btn-primary w-full sm:w-auto"
                >
                  Download File
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-base-content/70 text-md ml-4 font-semibold italic">
            this lecture Does not have a file for download .
          </span>
        )}
      </TabsContent>

      <TabsContent value="comments" className="mt-6">
        {/* <WatchComments comments={comments}  lectureId={currentLecture.id}/> */}
        <WatchComments lectureId={currentLecture._id} />
      </TabsContent>
    </Tabs>
  );
};

export default WatchTabs;
