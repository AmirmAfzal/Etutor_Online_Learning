"use client";

import { useEffect, useState } from "react";

import Icon from "@/components/ui/Icon";
import { Textarea } from "@/components/ui/textarea";

import { ModalType, Section } from "../Curriculum";

interface Props {
  openModal: (type: ModalType) => void;
  sections: Section[];
  sectionId: number;
  lectureId: number;
  onSave: (description: string) => void;
}

const DescriptionModal = ({
  openModal,
  sections,
  sectionId,
  lectureId,
  onSave,
}: Props) => {
  const lecture = sections
    .find((s) => s.id === sectionId)
    ?.lectures.find((l) => l.id === lectureId);

  const [description, setDescription] = useState(lecture?.description || "");

  useEffect(() => {
    setDescription(lecture?.description || "");
  }, [lecture]);

  return (
    <div className="bg-base-content/70 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-base-100 relative w-full max-w-xl rounded-lg shadow-lg">
        <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Add Lecture Description</h2>
          <button onClick={() => openModal("description")}>
            <Icon
              icon="ph:x"
              className="text-base-content/70 hover:text-base-content cursor-pointer"
              width="20"
              height="20"
            />
          </button>
        </div>
        <div className="p-4">
          <p className="text-base-content/70 mb-2 text-sm">Description</p>
          <Textarea
            className="mb-4 min-h-32 w-full rounded border px-3 py-2"
            placeholder="Write your lecture description here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-6 flex flex-row items-center justify-between">
            <button
              className="btn btn-outline"
              onClick={() => openModal("description")}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                onSave(description);
                openModal("description");
              }}
            >
              Add Description
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
