import Image from "next/image";

const cards = [
  {
    id: 1,
    icon: "/images/visa.png",
    number: "4855 **** **** ****",
    name: "Vako Shvili",
    expires: "02/27",
  },
  {
    id: 2,
    icon: "/images/mastercard.png",
    number: "5123 **** **** ****",
    name: "Vako Shvili",
    expires: "06/25",
  },
];

const WithdrawMoney = () => {
  return (
    <div className="bg-base-100 h-full w-full">
      <div className="border-base-300 border-b p-4">
        <h3 className="text-sm font-bold">Withdraw your money</h3>
      </div>

      <div className="p-4">
        <p className="text-base-content/70 text-xs">Payment method:</p>
        <div className="mt-4 flex flex-col gap-2">
          {cards.map((card) => (
            <div
              key={card.id}
              className="border-base-300 grid w-full grid-cols-6 items-center justify-items-center gap-1 border p-4"
            >
              <Image src={card.icon} alt="card icon" width={40} height={40} />
              <p className="col-span-2 text-xs">{card.number}</p>
              <p className="text-xs">{card.expires}</p>
              <p className="text-xs">{card.name}</p>
              <span></span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-base-300 mt-16 flex flex-row items-center justify-between border-t p-4">
        <div>
          <p className="text-xl">$16,582.00</p>
          <p className="text-base-content/80 text-xs">Current Balance</p>
        </div>
        <button className="btn btn-primary">Withdraw Money</button>
      </div>
    </div>
  );
};

export default WithdrawMoney;
