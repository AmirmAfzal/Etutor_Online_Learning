"use client";

import { useState } from "react";

const TruncatedText = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  const isTruncated = text.length > maxLength;
  const displayedText = isTruncated ? text.slice(0, maxLength) + "..." : text;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <span className="text-base-content/70 text-sm">
        {isExpanded ? text : displayedText}
      </span>
      {isTruncated && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-base-content/80 text-sm font-semibold text-nowrap"
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button>
      )}
    </div>
  );
};
export default TruncatedText;
