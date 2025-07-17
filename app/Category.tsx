import Image from 'next/image';
import Link from 'next/link';

const Category = () => {

    const category = [
        {icon: "/icons/Cpu.svg", label: "Label", courseCount: "500", bg: "bg-[#EBEBFF]"},
        {icon: "/icons/Handshake.svg", label: "Business", courseCount: "600", bg: "bg-[#E1F7E3]"},
        {icon: "/icons/CreditCard.svg", label: "Finance & Accounting", courseCount: "500", bg: "bg-[#FFF2E5]"},
        {icon: "/icons/ChartBarHorizontal.svg", label: "IT & Software", courseCount: "500", bg: "bg-[#FFF0F0]"},
        {icon: "/icons/BugDroid.svg", label: "Personal Development", courseCount: "300", bg: "bg-[#E1F7E3]"},
        {icon: "/icons/Receipt.svg", label: "Office Productivity", courseCount: "500", bg: "bg-[#F5F7FA]"},
        {icon: "/icons/MegaphoneSimple.svg", label: "Marketing", courseCount: "2,000", bg: "bg-[#EBEBFF]"},
        {icon: "/icons/Camera.svg", label: "Photography & Video", courseCount: "4,000", bg: "bg-[#F5F7FA]"},
        {icon: "/icons/Package.svg", label: "Lifestyle", courseCount: "500", bg: "bg-[#FFF2E5]"},
        {icon: "/icons/PenNib.svg", label: "Design", courseCount: "500", bg: "bg-[#FFEEE8]"},
        {icon: "/icons/FirstAidKit.svg", label: "Health & Fitness", courseCount: "500", bg: "bg-[#E1F7E3]"},
        {icon: "/icons/Headphones.svg", label: "Music", courseCount: "500", bg: "bg-[#FFF2E5]"}
    ];

    return (
        <section className="container mx-auto space-y-8 py-16">
            <h3 className="text-3xl font-bold text-center">Browse top category</h3>
            <div className="grid grid-cols-4 gap-6">
                {category.map(item => (
                    <div key={item.label} className={`flex flex-row items-center gap-4 p-4 ${item.bg}`}>
                        <div className="w-16 h-16 flex items-center justify-center bg-base-100">
                            <Image src={item.icon} alt={item.label} width={30} height={30} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">{ item.label }</p>
                            <p className="text-base-content/80 text-sm">{ item.courseCount } Courses</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
                <p className="text-base-content/80 text-sm">We have more category & subcategory.</p>
                <Link href="" className="flex flex-row items-center gap-2 text-primary">
                    Browse All
                    <Image src="/icons/ArrowRight.svg" alt="arrow-right" width={20} height={20} />
                </Link>
            </div>
        </section>
    );
}

export default Category