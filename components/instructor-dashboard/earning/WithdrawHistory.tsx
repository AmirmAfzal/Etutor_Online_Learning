import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/Icon";

const history = [
  {
    id: 1,
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Visa",
    amount: "American Express",
    status: "Pending",
    text: "text-[#FD8E1F]",
  },
  {
    id: 2,
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercard",
    amount: "American Express",
    status: "Pending",
    text: "text-[#FD8E1F]",
  },
  {
    id: 3,
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Visa",
    amount: "American Express",
    status: "Completed",
    text: "text-[#23BD33]",
  },
  {
    id: 4,
    date: "21 Sep, 2021 at 2:14 AM",
    method: "visa",
    amount: "American Express",
    status: "Canceled",
    text: "text-[#E34444]",
  },
  {
    id: 5,
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercard",
    amount: "American Express",
    status: "Completed",
    text: "text-[#23BD33]",
  },
  {
    id: 6,
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercard",
    amount: "American Express",
    status: "Completed",
    text: "text-[#23BD33]",
  },
  {
    id: 7,
    date: "21 Sep, 2021 at 2:14 AM",
    method: "Mastercard",
    amount: "American Express",
    status: "Completed",
    text: "text-[#23BD33]",
  },
];

const WithdrawHistory = () => {
  return (
    <div className="bg-base-100 w-full">
      <div className="border-base-300 border-b p-4">
        <h3 className="text-sm font-bold">Withdraw History</h3>
      </div>

      <div className="">
        <div className="bg-base-200 grid grid-cols-4 px-4 py-2">
          <p className="text-base-content/70 text-xs">DATE</p>
          <p className="text-base-content/70 text-xs">METHOD</p>
          <p className="text-base-content/70 text-xs">AMOUNT</p>
          <p className="text-base-content/70 text-xs">STATUS</p>
        </div>
        {history.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-4 items-center p-2 px-4 hover:shadow-lg"
          >
            <p className="text-base-content/70 text-xs">{item.date}</p>
            <p className="text-base-content/70 text-xs">{item.method}</p>
            <p className="text-base-content/70 text-xs">{item.amount}</p>
            <div className="flex w-full flex-row items-center justify-between">
              <p className={`text-xs ${item.text}`}>{item.status}</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Icon
                    icon="ph:dots-three"
                    className="btn btn-ghost btn-xs"
                    width="20"
                    height="20"
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>Cancel withdraw</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WithdrawHistory;
