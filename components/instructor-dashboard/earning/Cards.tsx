"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Icon from "@/components/ui/Icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewPaymentCardModal from "./NewPaymentCardModal";

const cards = [
  {
    id: 1,
    number: "4855 **** **** ****",
    name: "Vako Shvili",
    expires: "02/27",
  },
  {
    id: 2,
    number: "5123 **** **** ****",
    name: "Vako Shvili",
    expires: "06/25",
  },
  {
    id: 3,
    number: "6037 **** **** ****",
    name: "Vako Shvili",
    expires: "04/26",
  },
];

const Cards = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current &&
      swiperInstance.params.navigation &&
      typeof swiperInstance.params.navigation === "object"
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;

      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <section className="bg-base-100 h-full w-full">
      <div className="border-base-300 flex flex-row items-center justify-between border-b p-4">
        <h3 className="text-sm font-bold">Cards</h3>
        <Select>
          <SelectTrigger className="border-0">
            <SelectValue placeholder="This Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="withdraw">Withdraw</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="p-4">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          navigation={false}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper);
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            setActiveIndex(swiper.activeIndex);
          }}
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <div className="bg-secondary shadow-secondary/70 relative flex h-48 w-full flex-col justify-between p-4 shadow-lg">
                <div className="flex flex-row items-center justify-between">
                  <p className="text-base-100 text-2xl font-bold">VISA</p>
                  <Icon
                    icon="ph:dots-three"
                    className="text-base-300 cursor-pointer"
                    width="24"
                    height="24"
                  />
                </div>
                <div className="flex flex-row items-center gap-6">
                  <p className="text-base-100 text-xl">{card.number}</p>
                  <Icon
                    icon="ph:copy"
                    className="text-base-300 cursor-pointer"
                    width="24"
                    height="24"
                  />
                </div>
                <div className="text-base-100 flex flex-row items-center gap-16">
                  <span>
                    <p className="text-base-300/70 text-xs">Expires</p>
                    <p>{card.expires}</p>
                  </span>
                  <span>
                    <p className="text-base-300/70 text-xs">Card name</p>
                    <p>{card.name}</p>
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-6 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleDotClick(index)}
                className={`hover:bg-primary h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary" : "bg-primary/30"
                }`}
              />
            ))}
          </div>
          <div>
            <button
              ref={prevRef}
              className="btn btn-ghost btn-xs disabled:btn-disabled"
              disabled={isBeginning}
            >
              <Icon icon="ph:arrow-left" width="24" height="24" />
            </button>
            <button
              ref={nextRef}
              className="btn btn-ghost btn-xs disabled:btn-disabled"
              disabled={isEnd}
            >
              <Icon icon="ph:arrow-right" width="24" height="24" />
            </button>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-dash btn-block mt-12 py-8"
        >
          <Icon
            icon="ph:plus-circle"
            className="text-primary"
            width="24"
            height="24"
          />
          Add new card
        </button>
      </div>
      {isModalOpen && <NewPaymentCardModal closeModal={closeModalHandler} />}
    </section>
  );
};

export default Cards;
