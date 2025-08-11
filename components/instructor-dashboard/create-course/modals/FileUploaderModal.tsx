"use client";

import { useState } from "react";
import {
  CldUploadButton,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

import Icon from "@/components/ui/Icon";

import { ModalType } from "../Curriculum";

interface Props {
  openModal: (type: ModalType) => void;
  onSave: (fileUrl: string) => void;
}

const FileUploaderModal = ({ openModal, onSave }: Props) => {
  const [file, setFile] = useState<CloudinaryUploadWidgetInfo>();

  const uploadHandler = () => {
    if (file) {
      onSave(file.secure_url);
      openModal("file");
    }
  };

  return (
    <div className="bg-base-content/70 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-base-100 relative w-full max-w-xl rounded-lg shadow-lg">
        <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Attach File</h2>
          <button onClick={() => openModal("file")}>
            <Icon
              icon="ph:x"
              className="text-base-content/70 hover:text-base-content cursor-pointer"
              width="20"
              height="20"
            />
          </button>
        </div>
        <div className="p-4">
          <div className="border-base-300 flex flex-col items-center justify-center gap-2 border p-4">
            <p className="font-semibold">Attach File</p>

            {file?.original_filename && (
              <p className="text-success">
                File Uploaded:{" "}
                <span className="text-base-content">
                  {file?.original_filename}
                </span>
              </p>
            )}

            <CldUploadButton
              uploadPreset="course"
              className="btn btn-soft btn-sm"
              options={{
                sources: ["local"],
                multiple: false,
                resourceType: "raw",
              }}
              onSuccess={(result: CloudinaryUploadWidgetResults) => {
                if (
                  result.event === "success" &&
                  typeof result.info === "object" &&
                  "secure_url" in result.info
                ) {
                  setFile(result.info as CloudinaryUploadWidgetInfo);
                }
              }}
            >
              browse file
            </CldUploadButton>
          </div>
          <div className="mt-6 flex flex-row items-center justify-between">
            <button
              className="btn btn-outline"
              onClick={() => openModal("file")}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={uploadHandler}>
              Attach File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploaderModal;
