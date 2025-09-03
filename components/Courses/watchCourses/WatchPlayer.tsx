"use client"
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

interface WatchPlayerProps {
  posterSrc?: string;
  videoSrc?: string;
}

const WatchPlayer = ({
  // posterSrc = "/images/courses/videoPlayer.png",
  videoSrc,
}: WatchPlayerProps) => {
  return (
    <div className="w-full lg:mt-8 lg:w-7/12">
      <div className="relative aspect-video w-full overflow-hidden">

        <CldVideoPlayer
          width="1920"
          height="1080"
          src={videoSrc || ""}
        />

      </div>
    </div>
  );
};

export default WatchPlayer;
