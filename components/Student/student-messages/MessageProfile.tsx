import Image from "next/image";
import Icon from "@/components/ui/Icon";
import React from "react";

interface Props {
  avatar?: string;
  firstname?: string;
  lastname?: string;
}

const MessageProfile = (props: Props) => {
  return (
    <div className="border-base-300 flex w-full flex-row items-center justify-between border-b pb-2">
      <div className="flex items-center gap-4">
        {props?.avatar ? (
          <Image
            src={props?.avatar || ""}
            width={70}
            height={70}
            alt={`${props.firstname} ${props.lastname}`}
            className="rounded-full object-cover"
          />
        ) : (
          <Icon
            icon="ph:user"
            className="border-base-300 shrink-0 rounded-full border p-3 text-3xl"
          />
        )}
        <div className="flex flex-col items-start gap-1.5">
          <span className="text-md font-semibold">{`${props.firstname} ${props.lastname}`}</span>

          {/*TODO: dynamic activate */}
          <span className="text-base-content/60 text-xs">Active Now</span>
        </div>
      </div>
      <Icon icon="ph:dots-three" className="bg-base-300 p-1 text-4xl" />
    </div>
  );
};

export default MessageProfile;
