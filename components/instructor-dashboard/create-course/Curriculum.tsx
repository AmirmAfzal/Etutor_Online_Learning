"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { CloudinaryUploadWidgetInfo } from "next-cloudinary";

import { saveCurriculum } from "@/lib/actions/instructor/create-course/curriculum";
import { CourseInterface } from "@/lib/db/models/courseModel";
import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ErrorMessage from "@/components/ErrorMessage";

import VideoUploaderModal, {
  formatDuration,
} from "./modals/VideoUploaderModal";
import FileUploaderModal from "./modals/FileUploaderModal";
import CaptionsModal from "./modals/CaptionsModal";
import DescriptionModal from "./modals/DescriptionModal";
import LectureNotesModal from "./modals/LectureNotesModal";

export interface Lecture {
  id: number;
  name: string;
  videoUrl?: string;
  fileUrl?: string;
  captions?: string;
  description?: string;
  note?: string;
  noteFile?: string;
}

export interface Section {
  id: number;
  name: string;
  lectures: Lecture[];
}

interface Props {
  onNext: () => void;
  onBack: () => void;
  course: CourseInterface | null;
}

const initialState = {
  message: "",
  errors: [],
};

export type ModalType = "video" | "file" | "caption" | "description" | "note";

const Curriculum = ({ onNext, onBack, course }: Props) => {
  const [state, formAction, pending] = useActionState(
    saveCurriculum,
    initialState
  );
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      name: "Section name",
      lectures: [
        { id: 1, name: "Lecture name" },
        { id: 2, name: "Lecture name" },
      ],
    },
  ]);

  // Lecture edit state
  const [editingLecture, setEditingLecture] = useState<{
    sectionId: number;
    lectureId: number;
    draft: string;
  } | null>(null);

  const [activeLecture, setActiveLecture] = useState<{
    sectionId: number;
    lectureId: number;
  } | null>(null);

  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [sectionNameDraft, setSectionNameDraft] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [videoOpenModal, setVideoOpenModal] = useState(false);
  const [fileOpenModal, setFileOpenModal] = useState(false);
  const [captionOpenModal, setCaptionOpenModal] = useState(false);
  const [descriptionOpenModal, setDescriptionOpenModal] = useState(false);
  const [noteOpenModal, setNoteOpenModal] = useState(false);

  const [video, setVideo] = useState<CloudinaryUploadWidgetInfo>();

  const openLectureModalsHandler = (type: ModalType) => {
    switch (type) {
      case "video":
        setVideoOpenModal(!videoOpenModal);
        break;
      case "file":
        setFileOpenModal(!fileOpenModal);
        break;
      case "caption":
        setCaptionOpenModal(!captionOpenModal);
        break;
      case "description":
        setDescriptionOpenModal(!descriptionOpenModal);
        break;
      case "note":
        setNoteOpenModal(!noteOpenModal);
        break;
    }
  };
  // update lecture data handler
  const updateLectureContent = (
    sectionId: number,
    lectureId: number,
    updatedFields: Partial<Lecture>
  ) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.map((lecture) =>
                lecture.id === lectureId
                  ? { ...lecture, ...updatedFields }
                  : lecture
              ),
            }
          : section
      )
    );
  };

  const addSection = () => {
    const newId = sections.length + 1;
    setSections([
      ...sections,
      {
        id: newId,
        name: "Section name",
        lectures: [
          { id: 1, name: "Lecture name" },
          { id: 2, name: "Lecture name" },
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
                  name: `Lecture name`,
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
      prev.map((section) => {
        const editedLectures = section.lectures
          .filter((lecture) => lecture.id !== lectureId)
          .map((lecture, index) => ({
            ...lecture,
            id: index + 1,
            name: `Lecture name ${index + 1}`,
          }));
        const editedSection = {
          ...section,
          lectures: editedLectures,
        };
        console.log(editedSection);
        return section.id === sectionId ? editedSection : section;
      })
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
    startTransition(() => {
      formAction({ sections, courseId: (course?._id as string) || "" });
      console.log(sections);
    });
  };

  useEffect(() => {
    if (state.message === "SUCCESS") {
      onNext();
    }
    if (state.message === "ERROR") {
      console.log(state.errors);
    }
  }, [state.message, state.errors, onNext]);

  return (
    <div>
      <div className="border-base-300 flex flex-col items-center justify-between gap-2 border-y p-4 md:flex-row">
        <h2 className="text-xl font-bold">Curriculum</h2>
        <div>
          <button className="btn btn-primary btn-soft mr-4">Save</button>
          <button className="btn btn-primary btn-soft">Save & Preview</button>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="bg-base-200 border-base-300 border-b p-6"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon icon="ph:list" width="20" height="20" />
                  <div className="flex flex-col gap-1 md:flex-row">
                    <span className="font-semibold">
                      Sections {String(index + 1).padStart(2, "0")}:
                    </span>
                    <span>{section.name}</span>
                  </div>
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

              <Accordion type="single" collapsible className="w-full">
                {section.lectures.map((lecture, index) => (
                  <AccordionItem
                    key={lecture.id}
                    value={index.toString()}
                    className="border-none"
                  >
                    <AccordionTrigger asChild>
                      <div className="bg-base-100 mt-4 flex items-center justify-between rounded-none p-4">
                        <div className="flex items-center gap-2">
                          <Icon icon="ph:list" width="20" height="20" />
                          {editingLecture &&
                          editingLecture.sectionId === section.id &&
                          editingLecture.lectureId === lecture.id ? (
                            <div className="flex flex-col gap-2 md:flex-row">
                              <Input
                                type="text"
                                value={editingLecture.draft}
                                onChange={(e) =>
                                  setEditingLecture({
                                    ...editingLecture,
                                    draft: e.target.value,
                                  })
                                }
                                className="md:48 w-34"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveLectureName();
                                  if (e.key === "Escape") cancelLectureEdit();
                                }}
                              />
                              <div className="">
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
                              </div>
                            </div>
                          ) : (
                            <span className="text-base-content/70 text-sm">
                              {lecture.name} {index + 1}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-row items-center gap-4">
                          <button
                            onClick={() =>
                              startEditLecture(
                                section.id,
                                lecture.id,
                                lecture.name
                              )
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
                            onClick={() =>
                              deleteLecture(section.id, lecture.id)
                            }
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
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="bg-base-100 border-base-200 flex flex-col gap-6 border-t-2 p-4">
                        <div>
                          {lecture.videoUrl ? (
                            <div className="flex flex-col gap-4 md:flex-row">
                              <video controls className="w-55 rounded-lg">
                                <source src={video?.secure_url} />
                                <track kind="captions" />
                              </video>
                              <div className="flex flex-col items-start justify-between gap-2">
                                <span className="flex flex-row items-center gap-2">
                                  <p className="text-success text-xs">
                                    FILE UPLOADED
                                  </p>
                                  <div className="bg-base-content h-1 w-1 rounded-full"></div>
                                  <p className="text-base-content/80">
                                    {formatDuration(video?.duration as number)}
                                  </p>
                                </span>
                                <p className="text-sm">
                                  {video?.original_filename}
                                </p>
                                <button
                                  className="btn btn-secondary btn-soft"
                                  type="button"
                                  onClick={() => {
                                    setActiveLecture({
                                      sectionId: section.id,
                                      lectureId: lecture.id,
                                    });
                                    openLectureModalsHandler("video");
                                  }}
                                >
                                  Replace video
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              className="btn btn-primary btn-soft"
                              type="button"
                              onClick={() => {
                                setActiveLecture({
                                  sectionId: section.id,
                                  lectureId: lecture.id,
                                });
                                openLectureModalsHandler("video");
                              }}
                            >
                              Video
                            </button>
                          )}
                        </div>
                        <div>
                          {lecture.fileUrl ? (
                            <div className="space-y-2">
                              <h3 className="text-2xl">File</h3>
                              <p className="text-success">
                                Upload File Successfully
                              </p>
                            </div>
                          ) : (
                            <button
                              className="btn btn-primary btn-soft"
                              type="button"
                              onClick={() => {
                                setActiveLecture({
                                  sectionId: section.id,
                                  lectureId: lecture.id,
                                });
                                openLectureModalsHandler("file");
                              }}
                            >
                              Attach File
                            </button>
                          )}
                        </div>
                        <div>
                          {lecture.captions ? (
                            <div className="space-y-2">
                              <h3 className="text-2xl">Captions</h3>
                              <p className="text-base-content/70">
                                {lecture.captions}
                              </p>
                            </div>
                          ) : (
                            <button
                              className="btn btn-primary btn-soft"
                              type="button"
                              onClick={() => {
                                setActiveLecture({
                                  sectionId: section.id,
                                  lectureId: lecture.id,
                                });
                                openLectureModalsHandler("caption");
                              }}
                            >
                              Captions
                            </button>
                          )}
                        </div>
                        <div>
                          {lecture.description ? (
                            <div className="space-y-2">
                              <h3 className="text-2xl">Description</h3>
                              <p className="text-base-content/70">
                                {lecture.description}
                              </p>
                            </div>
                          ) : (
                            <button
                              className="btn btn-primary btn-soft"
                              type="button"
                              onClick={() => {
                                setActiveLecture({
                                  sectionId: section.id,
                                  lectureId: lecture.id,
                                });
                                openLectureModalsHandler("description");
                              }}
                            >
                              Description
                            </button>
                          )}
                        </div>
                        <div>
                          {lecture.note || lecture.noteFile ? (
                            <div className="space-y-2">
                              <h3 className="text-2xl">Note</h3>
                              <p className="text-base-content/70">
                                {lecture.note}
                              </p>
                            </div>
                          ) : (
                            <button
                              className="btn btn-primary btn-soft"
                              type="button"
                              onClick={() => {
                                setActiveLecture({
                                  sectionId: section.id,
                                  lectureId: lecture.id,
                                });
                                openLectureModalsHandler("note");
                              }}
                            >
                              Lecture Notes
                            </button>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
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

        <button
          type="submit"
          disabled={pending}
          onClick={sendData}
          className="btn btn-primary"
        >
          {pending && <div className="loading loading-spinner" />}
          Save & Next
        </button>
      </div>
      {state.message === "ERROR" && (
        <div className="p-4">
          <ErrorMessage
            title="Error saving curriculum:"
            errors={state.errors}
          />
        </div>
      )}

      {videoOpenModal && activeLecture && (
        <VideoUploaderModal
          openModal={openLectureModalsHandler}
          onSave={(video: CloudinaryUploadWidgetInfo) => {
            updateLectureContent(
              activeLecture.sectionId,
              activeLecture.lectureId,
              {
                videoUrl: video.secure_url,
              }
            );
            setVideo(video);
            setActiveLecture(null);
          }}
        />
      )}
      {fileOpenModal && activeLecture && (
        <FileUploaderModal
          openModal={openLectureModalsHandler}
          onSave={(fileUrl) => {
            updateLectureContent(
              activeLecture.sectionId,
              activeLecture.lectureId,
              {
                fileUrl: fileUrl,
              }
            );
            setActiveLecture(null);
          }}
        />
      )}
      {captionOpenModal && activeLecture && (
        <CaptionsModal
          openModal={openLectureModalsHandler}
          sections={sections}
          sectionId={activeLecture.sectionId}
          lectureId={activeLecture.lectureId}
          onSave={(caption) => {
            updateLectureContent(
              activeLecture.sectionId,
              activeLecture.lectureId,
              {
                captions: caption,
              }
            );
            setActiveLecture(null);
          }}
        />
      )}
      {descriptionOpenModal && activeLecture && (
        <DescriptionModal
          openModal={openLectureModalsHandler}
          sections={sections}
          sectionId={activeLecture.sectionId}
          lectureId={activeLecture.lectureId}
          onSave={(description) => {
            updateLectureContent(
              activeLecture.sectionId,
              activeLecture.lectureId,
              {
                description,
              }
            );
            setActiveLecture(null);
          }}
        />
      )}
      {noteOpenModal && activeLecture && (
        <LectureNotesModal
          openModal={openLectureModalsHandler}
          sections={sections}
          sectionId={activeLecture.sectionId}
          lectureId={activeLecture.lectureId}
          onSave={(note, noteFile) => {
            updateLectureContent(
              activeLecture.sectionId,
              activeLecture.lectureId,
              {
                note,
                noteFile,
              }
            );
            setActiveLecture(null);
          }}
        />
      )}

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
