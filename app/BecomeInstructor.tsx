import Image from "next/image"

const BecomeInstructor = () => {

    const steps = [
        { id: 1, title: "Apply to become instructor", bg: "bg-[#EBEBFF]", color: "text-[#564FFD]" },
        { id: 2, title: "Build & edit your profile", bg: "bg-[#FFF0F0]", color: "text-[#FF6636]" },
        { id: 3, title: "Create your new course", bg: "bg-[#FFF0F0]", color: "text-[#E34444]" },
        { id: 4, title: "Start teaching & earning", bg: "bg-[#E1F7E3]", color: "text-[#23BD33]" },
    ]

    return (
        <section className="w-full bg-base-300 mt-16 pt-16 pb-64">
            <div className="container mx-auto grid grid-cols-2 gap-6">
                <div className="w-full h-full flex flex-row items-center justify-between bg-gradient-to-l from-primary to-[#CC522B]">
                    <div className="space-y-8 p-8 pr-0">
                        <h3 className="text-3xl text-base-100 font-bold">Become an Instructor</h3>
                        <p className="text-sm text-base-100 ">
                            Instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love.
                        </p>
                        <button className="btn btn-primary btn-soft">
                            Start Teaching
                            <Image src="/icons/ArrowRight.svg" alt="" width={20} height={20} />
                        </button>
                    </div>
                    <Image src="/images/Become-an-Instructor.png" alt="Become an Instructor" width={600} height={700} />
                </div>
                <div className="bg-base-100 p-8">
                    <h3 className="text-3xl font-bold">Your teaching & earning steps</h3>
                    <div className="grid grid-cols-2 gap-2 gap-y-6 mt-8">
                        {steps.map(step => (
                            <div key={step.id} className="flex flex-row items-center gap-2">
                                <div className={`w-13 h-13 flex items-center justify-center rounded-full ${step.bg} ${step.color} font-bold text-xl`}>{ step.id }</div>
                                <p className="">{ step.title }</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BecomeInstructor
