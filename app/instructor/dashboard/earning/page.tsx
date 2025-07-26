import Cards from "@/components/instructor-dashboard/earning/Cards";
import Statistic from "@/components/instructor-dashboard/earning/Statistic";
import Icon from "@/components/ui/Icon";

const EarningPage = () => {
  const earningInformation = [
    {
      id: 1,
      icon: "ph:stack-duotone",
      name: "Total Revenue",
      value: "$13,804.00",
      bg: "bg-[#FFEEE8]",
      color: "text-[#FF6636]",
    },
    {
      id: 2,
      icon: "ph:receipt-duotone",
      name: "Current Balance",
      value: "$16,593.00",
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
    {
      id: 3,
      icon: "ph:credit-card-duotone",
      name: "Total Withdrawals",
      value: "$13,184.00",
      bg: "bg-[#FFF0F0]",
      color: "text-[#E34444]",
    },
    {
      id: 4,
      icon: "ph:crown-simple-duotone",
      name: "Today Revenue",
      value: "$162.00",
      bg: "bg-[#E1F7E3]",
      color: "text-[#23BD33]",
    },
  ];

  return (
    <section className="bg-base-200 w-full">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-4 gap-6">
          {earningInformation.map((item) => (
            <div key={item.id} className="bg-base-100 flex flex-row gap-4 p-4">
              <div
                className={`flex h-16 w-16 items-center justify-center ${item.bg}`}
              >
                <Icon
                  icon={item.icon}
                  className={`${item.color}`}
                  width="28"
                  height="28"
                />
              </div>
              <div className="flex flex-col justify-center gap-2">
                <p className="text-xl">{item.value}</p>
                <p className="text-base-content/70 text-xs">{item.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <Statistic stroke="#23BD33" fill="#E1F7E3" height={400} />
          </div>
          <div className="col-span-4">
            <Cards />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningPage;
