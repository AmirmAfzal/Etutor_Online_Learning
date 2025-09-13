"use client";

import { useState } from "react";

import PaymentMethod from "./PaymentMethod";

interface Card {
  [key: string]: string;
}

interface Props {
  paymentCards: Card[];
}

const PaymentMethodsWrapper = ({ paymentCards }: Props) => {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleSelectCard = (card: Card) => {
    setSelectedCard(card);
  };

  return (
    <div className="p-4">
      <p className="text-base-content/70 text-xs">Payment method:</p>
      <div className="mt-4 flex flex-col gap-2">
        {paymentCards.length > 0 ? (
          paymentCards.map((card, index) => (
            <PaymentMethod
              key={index}
              card={JSON.parse(JSON.stringify(card))}
              index={index}
              isSelected={selectedCard === card}
              onSelect={() => handleSelectCard(card)}
            />
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center py-6">
            No payment method
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodsWrapper;
