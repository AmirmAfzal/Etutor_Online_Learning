import Image from "next/image";

type CourseHeroProps = {
  imageSrc?: string;
  alt?: string;
};

const CourseTrailer = ({
  imageSrc = "/images/courses/Trailer.jpg",
  alt = "trailer",
}: CourseHeroProps) => {
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={1024}
      height={800}
      className="mt-8 h-auto w-full max-w-2xl object-cover"
    />
  );
};

export default CourseTrailer;
