import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import instructorModel from "@/lib/db/models/instructorModel";
import paymentCardModel from "@/lib/db/models/paymentCardModel";

import PaymentMethodsWrapper from "./PaymentMethodsWrapper";

const WithdrawMoney = async () => {
  await connectDB();

  const session = await getServerSession(authOptions);

  const instructor = await instructorModel.findOne({ user: session?.user.id });
  const paymentCards = await paymentCardModel
    .find({ instructor: instructor._id })
    .lean();

  return (
    <div className="bg-base-100 h-full w-full">
      <div className="border-base-300 border-b p-4">
        <h3 className="text-sm font-bold">Withdraw your money</h3>
      </div>

      <PaymentMethodsWrapper
        paymentCards={JSON.parse(JSON.stringify(paymentCards))}
      />

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
