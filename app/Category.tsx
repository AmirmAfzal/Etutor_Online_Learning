import Link from 'next/link';

const Category = () => {

    const category = [
        {icon: "", label: "Label", courseCount: "500"},
        {icon: "", label: "Business", courseCount: "600"},
        {icon: "", label: "Finance & Accounting", courseCount: "500"},
        {icon: "", label: "IT & Software", courseCount: "500"},
        {icon: "", label: "Personal Development", courseCount: "300"},
        {icon: "", label: "Office Productivity", courseCount: "500"},
        {icon: "", label: "Marketing", courseCount: "2,000"},
        {icon: "", label: "Photography & Video", courseCount: "4,000"},
        {icon: "", label: "Lifestyle", courseCount: "500"},
        {icon: "", label: "Design", courseCount: "500"},
        {icon: "", label: "Health & Fitness", courseCount: "500"},
        {icon: "", label: "Music", courseCount: "500"}
    ];

    return (
        <section className="container mx-auto space-y-8 py-16">
            <h3 className="text-3xl font-bold text-center">Browse top category</h3>
            <div className="grid grid-cols-4 gap-6">
                {category.map(item => (
                    <div key={item.label} className="flex flex-row items-center gap-4 bg-base-200 p-4">
                        <div className="w-16 h-16 flex items-center justify-center bg-base-100">
                            🎁
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold">{ item.label }</p>
                            <p className="text-base-content/80 text-sm">{ item.courseCount } Courses</p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-base-content/80 text-sm text-center">
                We have more category & subcategory.
                <Link href="" className="text-primary ml-4">Browse All</Link>
            </p>
        </section>
    );
}

export default Category