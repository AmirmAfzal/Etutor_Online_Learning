"use client";

import Icon from "@/components/ui/Icon";

interface Props {
  card: { [key: string]: string };
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

const PaymentMethod = ({ card, index, isSelected, onSelect }: Props) => {
  return (
    <button
      key={index}
      className={`border-base-300 grid w-full grid-cols-6 items-center justify-items-center border p-4 ${isSelected && "border-success"}`}
      onClick={onSelect}
    >
      <p className="text-xs">{card.bank}</p>
      <p className="col-span-2 text-xs">
        {card.cardNumber.slice(0, 4) + " **** **** ****"}
      </p>
      <p className="text-xs">{card.expiration}</p>
      <p className="text-xs">{card.name}</p>
      {isSelected && (
        <Icon
          icon="ph:check-circle-fill"
          className="text-success p-0"
          width="24"
          height="24"
        />
      )}
    </button>
  );
};

export default PaymentMethod;
