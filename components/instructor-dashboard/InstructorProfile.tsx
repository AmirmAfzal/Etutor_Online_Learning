"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { instructorProfile } from "@/lib/actions/instructor/instructorProfile";

import Icon from "../ui/Icon";

interface Props {
  className?: string;
}

const InstructorProfile = ({ className }: Props) => {
  const [profileState, profileAction] = useActionState(instructorProfile, {
    message: "",
    errors: [],
    data: "",
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
  return (
    <div>
      {typeof profileState?.data === "string" && profileState.data ? (
        <Image
          src={profileState.data}
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
