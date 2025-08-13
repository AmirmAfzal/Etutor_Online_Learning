import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-base-200 flex w-full flex-col-reverse justify-between lg:flex-row">
      <div className="max-w-2xl p-8 py-16 md:pl-32">
        <h1 className="text-3xl font-semibold md:text-5xl">
          Learn with expert anytime anyWhere
        </h1>
        <p className="text-base-content/80 mt-8 text-sm md:text-xl">
          Our mision is to help people to find the best course online and learn
          with expert anytime, anywhere.
        </p>
        <button className="btn btn-primary mt-8">Create Account</button>
      </div>
      <div>
        <Image
          src="/images/hero-img.png"
          alt="hero image"
          width={700}
          height={600}
        />
      </div>
    </section>
  );
};

export default HeroSection;
