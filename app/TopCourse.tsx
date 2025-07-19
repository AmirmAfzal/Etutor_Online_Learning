import Image from 'next/image';

const TopCourse = () => {

    const course = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <section className="w-full bg-base-200 pt-16 pb-48">
            <div className="container mx-auto space-y-8">
                <h3 className="text-3xl font-bold text-center">Best selling courses</h3>
                <div className="grid grid-cols-5 gap-6">
                    {course.map(item => (
                        <div key={item} className="bg-base-100 hover:shadow-lg transition-all duration-300">
                            <Image src="/images/course-image.png" alt="course image" width={400} height={200} />
                            <div className="space-y-2 p-4">
                                <div className="flex flex-row items-center justify-between">
                                    <p className="bg-base-200 text-xs p-1">Category</p>
                                    <p className="text-primary font-bold">$57</p>
                                </div>
                                <div className="">
                                    <p className="text-sm font-bold">
                                        The Complete 2021 Web Development Bootcamp
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between text-xs border-t border-base-300 p-4">
                                <div className="flex flex-row items-center gap-1">
                                    <Image src="/icons/Star.svg" alt="star" width={20} height={20} />
                                    5.0
                                </div>
                                <div className="font-semibold">
                                    265.7K
                                    <span className="text-base-content/80 font-normal"> student</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TopCourse