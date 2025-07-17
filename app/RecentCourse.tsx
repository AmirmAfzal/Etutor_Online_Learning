import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const RecentCourse = () => {

    const course = [1, 2, 3];

    return (
        <section className="container mx-auto py-16">
            <h3 className="text-3xl font-bold text-center">Recently added courses</h3>
            <div className="flex ">
                <div className="grid grid-cols-3 gap-6 mt-8">
                    {course.map(item => (
                        <div key={item} className="bg-base-100 border border-base-300 hover:shadow-lg transition-all duration-300">
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
                <div className="w-lg h-auto border border-base-300 shadow-lg -mt-16 -mb-42">
                    <div className="border-b border-base-300 space-y-4 p-4">
                        <div>
                            <p className="text-xs text-secondary bg-secondary/20 inline p-1">Category</p>
                        </div>
                        <div>
                            <p className="font-semibold">
                                2021 Complete Python Bootcamp From Zero to Hero in Python
                            </p>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center gap-2">
                                <div className="">
                                    <Image src="/images/profile-img.png" alt="profile" width={50} height={50} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs text-base-content/70">Course by</p>
                                    <p className="text-sm font-semibold">Kevin Gilbert</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-1 text-xs">
                                <Image src="/icons/Star.svg" alt="star" width={20} height={20} />
                                5.0 
                                <span className="text-base-content/70 ml-1">(357,914)</span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between text-xs">
                            <div className="flex flex-row items-center gap-1">
                                <Image src="/icons/User.svg" alt="user" width={18} height={18} />
                                265.7K
                                <span className="text-base-content/70 ml-1">student</span>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <Image src="/icons/bar-chart.svg" alt="bar chart" width={18} height={18} />
                                Beginner
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <Image src="/icons/Clock.svg" alt="clock" width={18} height={18} />
                                6 hour
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center gap-2">
                                <p className="text-2xl font-light">$14.00</p>
                                <p className="line-through text-base-content/50">$26.00</p>
                                <p className="text-sm text-primary p-1 bg-primary/20">56% OFF</p>
                            </div>
                            <div className="p-2 bg-primary/20">
                                <Image src="/icons/heart.svg" alt="herat" width={20} height={20} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-b border-base-300 space-y-4 p-4">
                        <p className="text-sm">WHAT YOU&apos;LL LEARN</p>
                        <p className="text-sm text-base-content/70">
                            ✔
                            Learn to use Python professionally, learning both Python 2 and Python 3!
                        </p>
                        <p className="text-sm text-base-content/70">
                            ✔            
                            Create games with Python, like Tic Tac Toe and Blackjack!
                        </p>
                        <p className="text-sm text-base-content/70">
                            ✔
                            Create games with Python, like Tic Tac Toe and Blackjack!
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 p-4">
                        <Link href="" className="btn btn-primary">
                            <Image src="/icons/ShoppingCart.svg" alt="cart" width={20} height={20} />
                            Add To Cart
                        </Link>
                        <Link href="" className="btn btn-primary btn-soft">Course Details</Link>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Link href="" className="btn btn-primary btn-soft mt-8">
                    Browse all Course
                    <Image src="/icons/ArrowRight.svg" alt="arrow right" width={20} height={20} />
                </Link>
            </div>
        </section>
    );
}

export default RecentCourse