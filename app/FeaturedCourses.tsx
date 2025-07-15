import Image from 'next/image';

const FeaturedCourses = () => {

    const course = [1, 2, 3, 4]

    return (
        <section className="container mx-auto bg-base-100 border border-base-300 -mt-32">
            <div className="p-16">
                <div className="flex flex-row items-center justify-between">
                    <h3 className="text-3xl font-bold">
                        Our feature courses
                    </h3>
                    <p className="w-sm text-sm text-base-content/80">
                        Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec varius purus et eleifend porta.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-8">
                    {course.map(item => (
                        <div key={item} className="flex flex-row border border-base-300 text-sm">
                            <Image src="/images/course-img.png" alt="course image" className="w-45 h-45" width={200} height={200} />
                            <div className="w-full flex flex-col">
                                <div className="space-y-2 p-4">
                                    <div className="flex flex-row items-center justify-between">
                                        <p className="bg-base-300 p-1">Category</p>
                                        <div className="flex flex-row items-center gap-2">
                                            <p className="">$14.00</p>
                                            <p className="line-through text-base-content/50">$26.00</p>
                                        </div>
                                    </div>
                                    <p className="">
                                        Investing In Stocks The Complete Course...
                                    </p>
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center gap-2">
                                            <Image src="/images/profile-img.png" alt="profile" width={30} height={30} />
                                            <p className="text-base-content/70">Kevin Gilbert</p>
                                        </div>
                                        <div className="">
                                            ⭐ 5.0 
                                            <span className="text-base-content/70 ml-1">(357,914)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-between text-sm border-t border-base-300 p-4">
                                    <div className="">
                                        265.7K
                                        <span className="text-base-content/70 ml-1">student</span>
                                    </div>
                                    <div className="">
                                        Beginner
                                    </div>
                                    <div className="">
                                        6 hour
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedCourses