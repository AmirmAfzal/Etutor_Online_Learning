"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import { Textarea } from "@/components/ui/textarea";
import { ModalType, Section } from "../Curriculum";

type Props = {
  openModal: (type: ModalType) => void;
  sections: Section[];
  sectionId: number;
  lectureId: number;
  onSave: (caption: string) => void;
};

const CaptionsModal = ({
  openModal,
  sections,
  sectionId,
  lectureId,
  onSave,
}: Props) => {
  const lecture = sections
    .find((s) => s.id === sectionId)
    ?.lectures.find((l) => l.id === lectureId);

  const [caption, setCaption] = useState(lecture?.captions || "");

  useEffect(() => {
    setCaption(lecture?.captions || "");
  }, [lecture]);

  return (
    <div className="bg-base-content/70 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-base-100 relative w-full max-w-xl rounded-lg shadow-lg">
        <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Add Lecture Captions</h2>
          <button onClick={() => openModal("caption")}>
            <Icon
              icon="ph:x"
              className="text-base-content/70 hover:text-base-content cursor-pointer"
              width="20"
              height="20"
            />
          </button>
        </div>
        <div className="p-4">
          <p className="text-base-content/70 mb-2 text-sm">Caption</p>
          <Textarea
            className="mb-4 min-h-32 w-full rounded border px-3 py-2"
            placeholder="Write your lecture caption here..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="mt-6 flex flex-row items-center justify-between">
            <button
              className="btn btn-outline"
              onClick={() => openModal("caption")}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                onSave(caption);
                openModal("caption");
              }}
            >
              Add Caption
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptionsModal;
