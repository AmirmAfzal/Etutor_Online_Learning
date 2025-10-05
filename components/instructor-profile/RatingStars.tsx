"use client";

import React from "react";

import { Rating } from "@fluentui/react-rating";

type Props = {
  stars: number;
};

const RatingStars = ({ stars }: Props) => {
  return (
    <>
      <Rating
        className="text-primary"
        size="medium"
        value={+stars.toFixed(1)}
        max={5}
      />
    </>
  );
};

export default RatingStars;
