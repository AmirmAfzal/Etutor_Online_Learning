import Image from "next/image";

const CompaniesLogo = () => {

    const companies = [
        { id: 1, img: "/images/companies-logo/netflix.svg" },
        { id: 2, img: "/images/companies-logo/youtube.svg" },
        { id: 3, img: "/images/companies-logo/google.svg" },
        { id: 4, img: "/images/companies-logo/lenovo.svg" },
        { id: 5, img: "/images/companies-logo/slack.svg" },
        { id: 6, img: "/images/companies-logo/verizon.svg" },
        { id: 7, img: "/images/companies-logo/lexmark.svg" },
        { id: 8, img: "/images/companies-logo/microsoft.svg" }
    ];

    return (
        <section className="container mx-auto py-16">
            <div className="flex flex-row items-center gap-16 px-8">
                <div>
                    <h3 className="text-3xl font-bold">6.3k trusted companies</h3>
                    <p className="max-w-86 text-sm text-base-content/50 mt-6">
                        Nullam egestas tellus at enim ornare tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra.
                    </p>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    {companies.map((item) => (
                        <div key={item.id} className="flex items-center justify-center shadow-lg p-8">
                            <Image src={item.img} alt={item.img} width={100} height={100} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CompaniesLogo