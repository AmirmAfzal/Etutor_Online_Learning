"use client";

import React, { startTransition, useActionState, useEffect } from "react";
import { redirect } from "next/navigation";

import { becomeInstructor } from "@/lib/actions/becomeInstructor";

import Icon from "../ui/Icon";
import { Student } from "./StudentProfile";

type Props = {
  userId: string;
  student: Student;
  isInstructor: boolean;
};

const BecomeInstructorButton = ({ userId, student, isInstructor }: Props) => {
  const [state, formAction, pending] = useActionState(becomeInstructor, {
    message: "",
    errors: [],
  });

  const becomeInstructorHandler = () => {
    startTransition(() => {
      const formData = new FormData();
      formData.append("id", userId);
      formData.append("firstname", student.firstname);
      formData.append("lastname", student.lastname);

      formAction(formData);
    });
  };

  useEffect(() => {
    if (state.message === "ERROR") {
      setTimeout(() => {
        redirect("/instructor/dashboard");
      }, 500);
    }
  }, [state.message]);

  return (
    <div className="flex flex-col justify-center gap-2">
      <button
        onClick={becomeInstructorHandler}
        className="btn btn-primary btn-soft mt-2 w-full gap-2 font-bold md:mt-0 md:ml-auto md:w-auto"
        disabled={pending}
      >
        {isInstructor ? "View Instructor Dashboard" : "Become Instructor"}

        {pending ? (
          <div className="loading loading-spinner" />
        ) : (
          <Icon icon="ph:arrow-right" className="text-xl sm:text-2xl" />
        )}
      </button>
      {state.message === "ERROR" && (
        <div className="text-base-content/60 flex max-w-xs flex-row items-center gap-2 text-xs">
          <div className="loading loading-spinner" />
          {state.errors[0]}
        </div>
      )}
    </div>
  );
};

export default BecomeInstructorButton;
