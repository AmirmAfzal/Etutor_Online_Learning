"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

interface Props {
  videoSrc: string;
}

const CourseTrailer = ({ videoSrc }: Props) => {
  return (
    <div className="relative mt-4 aspect-video w-full overflow-hidden lg:mt-8">
      <CldVideoPlayer width="1920" height="1080" src={videoSrc} />
    </div>
  );
};

export default CourseTrailer;
