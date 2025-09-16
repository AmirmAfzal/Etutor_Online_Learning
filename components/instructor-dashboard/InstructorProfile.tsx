"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import {
  DataTypes,
  instructorProfile,
} from "@/lib/actions/instructor/instructorProfile";

import Icon from "../ui/Icon";

interface Props {
  className?: string;
  instructorData?: (data: DataTypes) => void;
}

const InstructorProfile = ({ className, instructorData }: Props) => {
  const [profileState, profileAction] = useActionState(instructorProfile, {
    message: "",
    errors: [],
    data: null,
  });
  const { data: session } = useSession();

  const instructorProfileHandler = (id: string) => {
    startTransition(() => {
      profileAction(id);
    });
  };

  useEffect(() => {
    const id = session?.user?.id?.toString();
    if (id) {
      instructorProfileHandler(id);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (profileState.data) {
      instructorData?.(profileState.data);
    }
  }, [profileState.data, instructorData]);

  return (
    <div>
      {typeof profileState?.data?.avatar === "string" &&
      profileState.data?.avatar ? (
        <Image
          src={profileState.data.avatar}
          alt="instructor profile"
          width={100}
          height={100}
          className={`rounded-full ${className}`}
        />
      ) : (
        <span
          className={`bg-base-300 flex items-center justify-center rounded-full ${className}`}
        >
          <Icon icon="ph:user" width="24" height="24" />
        </span>
      )}
    </div>
  );
};

export default InstructorProfile;
