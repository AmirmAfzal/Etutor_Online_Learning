"use client";

import { startTransition, useActionState, useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { notifications } from "@/lib/actions/instructor/settings/notifications";
import { getUserNotifications } from "@/lib/actions/instructor/settings/getUserNotifications";
import ErrorMessage from "@/components/ErrorMessage";

const checkBoxs = [
  { name: "coursePurchased", label: "I want to know who buy my course." },
  {
    name: "CourseReview",
    label: "I want to know who write a review on my course.",
  },
  {
    name: "LectureComment",
    label: "I want to know who commented on my lecture.",
  },
  {
    name: "LectureDownload",
    label: "I want to know who download my lecture notes.",
  },
  {
    name: "CommentReply",
    label: "I want to know who replied on my comment.",
  },
  {
    name: "ProfileVisit",
    label: "I want to know daily how many people visited my profile.",
  },
  {
    name: "attachmentDownloaded",
    label: "I want to know who download my lecture attach file.",
  },
];

const Notifications = () => {
  const [state, formAction, pending] = useActionState(notifications, {
    message: "",
    errors: [],
    data: null,
  });

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    coursePurchased: false,
    CourseReview: false,
    LectureComment: false,
    LectureDownload: false,
    CommentReply: false,
    ProfileVisit: false,
    attachmentDownloaded: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserNotifications();
      setCheckedItems(data);
    };
    fetchData();
  }, [state.data]);

  useEffect(() => {
    if (state.data) {
      setCheckedItems(state.data);
    }
  }, [state.data]);

  const handleCheck = (name: string) => {
    setCheckedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const saveNotofications = () => {
    startTransition(() => {
      formAction(checkedItems);
    });
  };

  return (
    <section className="bg-base-100 space-y-4 p-6">
      <h3 className="text-2xl font-bold">Notifications</h3>
      <div className="space-y-2">
        {checkBoxs.map((item, index) => (
          <div key={index} className="flex flex-row items-center gap-4">
            <Checkbox
              id={item.name}
              checked={checkedItems[item.name] || false}
              onCheckedChange={() => handleCheck(item.name)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary rounded-none"
            />
            <label htmlFor={item.name}> {item.label} </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <button
          type="submit"
          onClick={saveNotofications}
          className="btn btn-primary"
          disabled={pending}
        >
          {pending && <div className="loading loading-spinner" />}
          Save Changes
        </button>
        {state.message === "SUCCESS" && (
          <div className="bg-success/10 text-success rounded-md p-4">
            Save changed successfully.
          </div>
        )}
      </div>
      {state.message === "ERROR" && (
        <ErrorMessage
          title="Error changing notificaions :"
          errors={state.errors}
        />
      )}
    </section>
  );
};

export default Notifications;
