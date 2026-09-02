"use client";

import { useEffect, useState } from "react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";

import { ModalType } from "../Curriculum";

interface Props {
  openModal: (type: ModalType) => void;
  onSave: (videoUrl: CloudinaryUploadWidgetInfo) => void;
}

export const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
};

const VideoUploaderModal = ({ openModal, onSave }: Props) => {
  const [video, setVideo] = useState<CloudinaryUploadWidgetInfo>();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleUpload = () => {
    if (video) {
      openModal("video");
      onSave(video);
    }
  };

  return (
    <div className="bg-base-content/70 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-base-100 relative w-full max-w-xl rounded-lg shadow-lg">
        <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Lecture Video</h2>
          <button onClick={() => openModal("video")}>
            <Icon
              icon="ph:x"
              className="text-base-content/70 hover:text-base-content cursor-pointer"
              width="20"
              height="20"
            />
          </button>
        </div>

        <div className="space-y-4 p-4">
          {video?.secure_url ? (
            <div className="flex flex-row gap-4">
              <video controls className="w-55 rounded-lg">
                <source src={video.secure_url} />
                <track kind="captions" />
              </video>
              <div className="flex flex-col items-start justify-between gap-2">
                <span className="flex flex-row items-center gap-2">
                  <p className="text-success text-xs">FILE UPLOADED</p>
                  <div className="bg-base-content h-1 w-1 rounded-full"></div>
                  <p className="text-base-content/80">
                    {formatDuration(video.duration as number)}
                  </p>
                </span>
                <p className="text-sm">{video.original_filename}</p>
                <CldUploadButton
                  uploadPreset="course"
                  className="cursor-pointer"
                  options={{
                    sources: ["local"],
                    multiple: false,
                    resourceType: "video",
                  }}
                  onSuccess={(result: CloudinaryUploadWidgetResults) => {
                    if (
                      result.event === "success" &&
                      typeof result.info === "object" &&
                      "secure_url" in result.info
                    ) {
                      setVideo(result.info);
                    }
                  }}
                >
                  <p className="text-secondary">Replace video</p>
                </CldUploadButton>
              </div>
            </div>
          ) : (
            <>
              <div className="relative flex flex-row items-center">
                <Input
                  type="text"
                  placeholder="Upload Video"
                  className="w-full"
                  readOnly
                  value={video?.original_filename || "No video uploaded yet"}
                />
                <CldUploadButton
                  uploadPreset="course"
                  className="btn btn-soft btn-sm absolute top-0 right-0 cursor-pointer"
                  options={{
                    sources: ["local"],
                    multiple: false,
                    resourceType: "video",
                  }}
                  onSuccess={(result: CloudinaryUploadWidgetResults) => {
                    if (
                      result.event === "success" &&
                      typeof result.info === "object" &&
                      "secure_url" in result.info
                    ) {
                      setVideo(result.info);
                    }
                  }}
                >
                  Upload File
                </CldUploadButton>
              </div>
              <span className="text-base-content/70 text-sm">
                All files should be at least 720p and less than 4.0 GB.
              </span>
            </>
          )}

          <div className="mt-6 flex flex-row items-center justify-between">
            <button
              className="btn btn-outline"
              onClick={() => {
                openModal("video");
                setVideo(undefined);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              disabled={!video}
              onClick={handleUpload}
            >
              Upload Video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploaderModal;
