"use client";

import { useState } from "react";

import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Lecture {
  id: number;
  name: string;
}

interface Section {
  id: number;
  name: string;
  lectures: Lecture[];
}

type Props = {
  onNext: () => void;
  onBack: () => void;
};

const Curriculum = ({ onNext, onBack }: Props) => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      name: "Section name",
      lectures: [
        { id: 1, name: "Lecture name 1" },
        { id: 2, name: "Lecture name 2" },
      ],
    },
  ]);

  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [sectionNameDraft, setSectionNameDraft] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Lecture edit state
  const [editingLecture, setEditingLecture] = useState<{
    sectionId: number;
    lectureId: number;
    draft: string;
  } | null>(null);

  const addSection = () => {
    const newId = sections.length + 1;
    setSections([
      ...sections,
      {
        id: newId,
        name: "Section name",
        lectures: [
          { id: 1, name: "Lecture name 1" },
          { id: 2, name: "Lecture name 2" },
        ],
      },
    ]);
  };

  const addLecture = (sectionId: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: [
                ...section.lectures,
                {
                  id: section.lectures.length + 1,
                  name: `Lecture name ${section.lectures.length + 1}`,
                },
              ],
            }
          : section
      )
    );
  };

  const openEditModal = (section: Section) => {
    setEditingSectionId(section.id);
    setSectionNameDraft(section.name);
    setModalOpen(true);
  };

  const saveSectionName = (sectionId: number | null) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, name: sectionNameDraft }
          : section
      )
    );
    setModalOpen(false);
    setEditingSectionId(null);
  };

  const deleteSection = (sectionId: number) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
  };

  const deleteLecture = (sectionId: number, lectureId: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.filter(
                (lecture) => lecture.id !== lectureId
              ),
            }
          : section
      )
    );
  };

  // Lecture edit handlers
  const startEditLecture = (
    sectionId: number,
    lectureId: number,
    currentName: string
  ) => {
    setEditingLecture({ sectionId, lectureId, draft: currentName });
  };

  const saveLectureName = () => {
    if (!editingLecture) return;
    setSections((prev) =>
      prev.map((section) =>
        section.id === editingLecture.sectionId
          ? {
              ...section,
              lectures: section.lectures.map((lecture) =>
                lecture.id === editingLecture.lectureId
                  ? { ...lecture, name: editingLecture.draft }
                  : lecture
              ),
            }
          : section
      )
    );
    setEditingLecture(null);
  };

  const cancelLectureEdit = () => {
    setEditingLecture(null);
  };

  const sendData = () => {
    console.log(sections);
    onNext();
  };

  return (
    <div>
      <div className="border-base-300 flex flex-row items-center justify-between border-t border-b p-4">
        <h2 className="text-xl font-bold">Curriculum</h2>
        <div>
          <button className="btn btn-primary btn-soft mr-4">Save</button>
          <button className="btn btn-primary btn-soft">Save & Preview</button>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className="bg-base-200 border-base-300 border-b p-6"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon icon="ph:list" width="20" height="20" />
                  <span className="font-semibold">
                    Sections {String(idx + 1).padStart(2, "0")}:
                  </span>
                  <span>{section.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => addLecture(section.id)}>
                    <Icon
                      icon="ph:plus"
                      className="text-base-content/70 hover:text-base-content cursor-pointer"
                      width="20"
                      height="20"
                    />
                  </button>
                  <button onClick={() => openEditModal(section)}>
                    <Icon
                      icon="ph:pencil-simple-line"
                      className="text-base-content/70 hover:text-base-content cursor-pointer"
                      width="20"
                      height="20"
                    />
                  </button>
                  <button onClick={() => deleteSection(section.id)}>
                    <Icon
                      icon="ph:trash"
                      className="text-base-content/70 hover:text-primary cursor-pointer"
                      width="20"
                      height="20"
                    />
                  </button>
                </div>
              </div>

              {section.lectures.map((lecture) => (
                <div
                  key={lecture.id}
                  className="bg-base-100 my-4 flex items-center justify-between px-4 py-2"
                >
                  <div className="flex items-center gap-2">
                    <Icon icon="ph:list" width="20" height="20" />
                    {editingLecture &&
                    editingLecture.sectionId === section.id &&
                    editingLecture.lectureId === lecture.id ? (
                      <>
                        <Input
                          type="text"
                          value={editingLecture.draft}
                          onChange={(e) =>
                            setEditingLecture({
                              ...editingLecture,
                              draft: e.target.value,
                            })
                          }
                          className="w-48"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveLectureName();
                            if (e.key === "Escape") cancelLectureEdit();
                          }}
                        />
                        <button
                          className="btn btn-primary btn-xs ml-2"
                          onClick={saveLectureName}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-ghost btn-xs ml-1"
                          onClick={cancelLectureEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <span className="text-base-content/70 text-sm">
                        {lecture.name}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="btn btn-primary btn-soft">
                          Contents
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <button>Video</button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button>Attach File</button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button>Captions</button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button>Description</button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <button>Lecture Notes</button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <button
                      onClick={() =>
                        startEditLecture(section.id, lecture.id, lecture.name)
                      }
                    >
                      <Icon
                        icon="ph:pencil-simple-line"
                        className="text-base-content/70 hover:text-base-content cursor-pointer"
                        width="18"
                        height="18"
                      />
                    </button>
                    <button
                      onClick={() => deleteLecture(section.id, lecture.id)}
                    >
                      <Icon
                        icon="ph:trash"
                        className="text-base-content/70 hover:text-primary cursor-pointer"
                        width="18"
                        height="18"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={addSection}
            className="btn btn-primary btn-soft w-full"
          >
            Add Sections
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-row items-center justify-between p-4">
        <button className="btn btn-outline" type="button" onClick={onBack}>
          Previous
        </button>
        <button type="submit" onClick={sendData} className="btn btn-primary">
          Save & Next
        </button>
      </div>

      {modalOpen && (
        <div className="bg-base-content/70 fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-base-100 relative w-full max-w-xl rounded-lg shadow-lg">
            <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">Edit Section Name</h2>
              <button onClick={() => setModalOpen(false)}>
                <Icon
                  icon="ph:x"
                  className="text-base-content/70 hover:text-base-content cursor-pointer"
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <div className="p-4">
              <p className="text-base-content/70 mb-2 text-sm">Section</p>
              <Input
                type="text"
                value={sectionNameDraft}
                placeholder="Write your section name here..."
                onChange={(e) => setSectionNameDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveSectionName(editingSectionId);
                  }
                }}
                className="mb-4 w-full rounded border px-3 py-2"
              />
              <div className="flex flex-row items-center justify-between">
                <button
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveSectionName(editingSectionId)}
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Curriculum;
