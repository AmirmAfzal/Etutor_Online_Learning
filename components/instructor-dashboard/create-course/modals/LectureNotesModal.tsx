"use client";

import { useState } from "react";

import Icon from "@/components/ui/Icon";
import { Textarea } from "@/components/ui/textarea";

import { ModalType, Section } from "../Curriculum";

interface Props {
  openModal: (type: ModalType) => void;
  sections: Section[];
  sectionId: number;
  lectureId: number;
  onSave: (note: string) => void;
}

const LectureNotesModal = ({
  openModal,
  sections,
  sectionId,
  lectureId,
  onSave,
}: Props) => {
  const lecture = sections
    .find((s) => s.id === sectionId)
    ?.lectures.find((l) => l.id === lectureId);

  const [note, setNote] = useState<string>(lecture?.notes || "");

  const uploadHandler = () => {
    if (note) {
      onSave(note);
      openModal("note");
    }
  };

  return (
    <div className="bg-base-content/70 fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-base-100 relative w-full max-w-xl rounded-lg shadow-lg">
        <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Add Lecture Notes</h2>
          <button onClick={() => openModal("note")}>
            <Icon
              icon="ph:x"
              className="text-base-content/70 hover:text-base-content cursor-pointer"
              width="20"
              height="20"
            />
          </button>
        </div>
        <div className="p-4">
          <p className="text-base-content/70 mb-2 text-sm">Notes</p>
          <Textarea
            className="mb-4 min-h-32 w-full rounded border px-3 py-2"
            placeholder="Write your lecture notes here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="mt-6 flex flex-row items-center justify-between">
            <button
              className="btn btn-outline"
              onClick={() => openModal("note")}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={uploadHandler}>
              Add Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureNotesModal;
