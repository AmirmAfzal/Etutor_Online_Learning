import Icon from "@/components/ui/Icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const paymentMethods = [
  {
    id: "visa",
    icon: "/images/visa.png",
    label: "4855 **** **** ****",
    expiry: "04/24",
    name: "Vako Shtvili",
  },
  {
    id: "mastercard",
    icon: "/images/masterCard.png",
    label: "5795 **** **** ****",
    expiry: "04/24",
    name: "Vako Shtvili",
  },
  {
    id: "paypal",
    icon: "/images/paypal.png",

    desc: "You will be redirected to the PayPal site after reviewing your order.",
  },
];
const GiftCoursePayment = () => {
  return (
    <div className="flex w-1/3 flex-col gap-10 md:flex-row">
      <div className="bg-base-100 flex-1 p-2">
        <h2 className="text-base-content/80 mb-4 text-lg font-semibold">
          Payment Method
        </h2>
        <div className="mb-6 space-y-4">
          {paymentMethods.map((pm) => (
            <div
              key={pm.id}
              className={`bg-base-100/80 hover:border-primary/60 border-base-content/10 relative flex cursor-pointer items-center gap-3 border p-2 transition-all`}
            >
              <Image src={pm.icon} alt={pm.id} width={32} height={32} />
              <span className="text-base-content/90 text-xs tracking-widest">
                {pm.label}
              </span>
              <span className="text-base-content/60 ml-auto text-xs">
                {pm.expiry}
              </span>
              <span className="text-base-content/80 ml-4 text-xs">
                {pm.name}
              </span>
              <span className="text-base-content/70 ml-2 text-xs">
                {pm.desc}
              </span>
            </div>
          ))}
        </div>
        <div className="border-success bg-base-100 mb-6 flex items-center border p-2">
          <span className="text-base-content/60 flex items-center gap-2 text-xs">
            <Icon icon="ph:credit-card" className="text-primary text-lg" />
            New Payment Card
          </span>
          <Icon
            icon="ph:check-circle-fill"
            className="text-success ml-auto text-xl"
          />
        </div>
        <form className="space-y-5">
          <div>
            <Label htmlFor="name" className="mb-1 block text-xs">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name on card"
              className="border-base-content/10"
            />
          </div>
          <div>
            <Label
              htmlFor="card"
              className="mb-1 flex items-center gap-1 text-xs"
            >
              Card Number
              <span className="text-error align-middle text-base">*</span>
            </Label>
            <div className="border-base-content/10 focus-within:border-primary bg-base-100 flex items-center overflow-hidden border">
              <span className="text-primary flex items-center pr-2 pl-3 text-xl">
                <Icon icon="ph:credit-card" />
              </span>
              <span className="bg-base-content/10 mx-2 h-6 w-px" />
              <Input
                id="card"
                type="text"
                placeholder="Label"
                className="text-base-content/80 placeholder:text-base-content/40 flex-1 border-0 bg-transparent px-2 py-3 outline-none focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="expiry" className="mb-1 block text-xs">
                MM / YY
              </Label>
              <Input
                id="expiry"
                placeholder="MM / YY"
                className="border-base-content/10 shadow-none"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="cvc" className="mb-1 block text-xs">
                CVC
              </Label>
              <Input
                id="cvc"
                placeholder="Security Code"
                className="border-base-content/10 shadow-none"
              />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="checkbox checkbox-primary checkbox-xs"
              defaultChecked
            />
            <Label htmlFor="remember" className="text-base-content/70 text-xs">
              Remember this card, save it on my card list
            </Label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GiftCoursePayment;
