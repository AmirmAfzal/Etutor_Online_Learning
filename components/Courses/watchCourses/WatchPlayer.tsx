import Image from "next/image";

interface WatchPlayerProps {
  posterSrc?: string;
}

const WatchPlayer = ({
  posterSrc = "/images/courses/videoPlayer.png",
}: WatchPlayerProps) => {
  return (
    <div className="w-full lg:mt-8 lg:w-7/12">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={posterSrc}
          alt="Course video player"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default WatchPlayer;
