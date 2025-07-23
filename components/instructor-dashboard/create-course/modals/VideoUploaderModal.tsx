"use client";

import { useState } from "react";

import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";

const VideoUploaderModal = () => {
  const [video, setVideo] = useState<File | null>(null);

  return (
    <div className="bg-base-content/70 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-base-100 relative w-full max-w-xl rounded-lg shadow-lg">
        <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Lecture Video</h2>
          <button>
            <Icon
              icon="ph:x"
              className="text-base-content/70 hover:text-base-content cursor-pointer"
              width="20"
              height="20"
            />
          </button>
        </div>
        <div className="space-y-4 p-4">
          <div className="relative flex flex-row items-center">
            <Input
              type="text"
              placeholder="Upload Video"
              className="w-full"
              readOnly
              value={video?.name || "Upload File"}
            />
            <label
              htmlFor="video-uploader"
              className="btn btn-soft btn-sm absolute right-0 cursor-pointer"
            >
              <Input
                type="file"
                id="video-uploader"
                onChange={(e) => setVideo(e.target.files?.[0] || null)}
                className="hidden"
              />
              Upload File
            </label>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm font-bold">Note: </p>
            <span className="text-base-content/70 text-sm">
              All files should be at least 720p and less than 4.0 GB.
            </span>
          </div>
          <div className="mt-6 flex flex-row items-center justify-between">
            <button className="btn btn-outline">Cancel</button>
            <button className="btn btn-primary">Upload Video</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploaderModal;
