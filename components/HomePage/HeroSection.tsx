import Image from 'next/image';

const HeroSection = () => {
    return (
        <section className="w-full flex flex-row justify-between bg-base-200">
            <div className="max-w-2xl py-16 pl-32">
                <h1 className="text-5xl font-semibold">
                    Learn with expert anytime anyWhere
                </h1>
                <p className="text-base-content/80 text-xl mt-8">
                    Our mision is to help people to find the best course online and learn with expert anytime, anywhere.
                </p>
                <button className="btn btn-primary mt-8">Create Account</button>
            </div>
            <div className="">
                <Image src="/images/hero-img.png" alt="hero image" width={700} height={600} />
            </div>
        </section>
    );
}

export default HeroSection