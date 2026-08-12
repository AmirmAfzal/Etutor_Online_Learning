import Link from "next/link";
import { Suspense } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/Icon";

interface RatingItem {
  label: string;

  value: number;
}

interface Props {
  searchParams: Promise<{ rating?: string }>;
  courseRating: number[];
}

const ratingOptions: RatingItem[] = [
  {
    label: "5 Star",
    value: 5,
  },
  {
    label: "4 Star & up",
    value: 4,
  },
  {
    label: "3 Star & up",
    value: 3,
  },
  {
    label: "2 Star & up",
    value: 2,
  },
  {
    label: "1 Star & up",
    value: 1,
  },
];

const RatingContent = ({
  currentRatingFilter,
  searchParams,
  courseRating,
}: {
  currentRatingFilter: number;
  courseRating: number[];
  searchParams: { rating?: string };
}) => {
  const getRatingCount = (ratingValue: number) => {
    if (!courseRating) return 0;
    return courseRating.filter((rating) => rating === ratingValue).length;
  };
  return (
    <AccordionContent>
      {ratingOptions.map((item, i) => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (currentRatingFilter === item.value) {
          newSearchParams.delete("rating");
        } else {
          newSearchParams.set("rating", String(item.value));
        }

        return (
          <Link
            key={i}
            href={`?${newSearchParams.toString()}`}
            className="flex flex-row items-center justify-between gap-2 p-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={item.label}
                checked={currentRatingFilter === item.value}
                readOnly
                disabled={getRatingCount(item.value) === 0}
                className="checkbox checkbox-primary checkbox-xs"
              />
              <Icon icon="ph:star-fill" className="text-primary" />
              <span className="text-base-content/80 text-xs font-medium">
                {item.label}
              </span>
            </div>
            <span className="text-base-content/70">
              {getRatingCount(item.value)}
            </span>
          </Link>
        );
      })}
    </AccordionContent>
  );
};

const Rating = async (props: Props) => {
  const searchParams = await props.searchParams;
  const currentRatingFilter = Number(searchParams.rating) || 0;

  return (
    <Accordion
      type="single"
      // defaultValue="rating"
      collapsible
      className="border-base-300 mt-4 border"
    >
      <AccordionItem value="rating">
        <AccordionTrigger className="border-base-300 rounded-none border border-x-0 px-2 text-lg font-semibold">
          RATING
        </AccordionTrigger>
        <Suspense fallback={<div>Loading...</div>}>
          <RatingContent
            courseRating={props.courseRating}
            currentRatingFilter={currentRatingFilter}
            searchParams={searchParams}
          />
        </Suspense>
      </AccordionItem>
    </Accordion>
  );
};

export default Rating;
