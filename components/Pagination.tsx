import { Icon } from "@iconify/react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="flex items-center gap-2">
        {/* Prev Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`border-base-content/10 flex h-10 w-10 items-center justify-center rounded-full border text-xl transition-all ${currentPage === 1 ? "bg-base-100 text-base-content/30 cursor-not-allowed" : "bg-base-100 text-primary hover:bg-primary/10"}`}
        >
          <Icon icon="solar:arrow-left-linear" />
        </button>
        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`border-base-content/10 flex h-10 w-10 items-center justify-center rounded-full font-bold ${
              currentPage === i + 1
                ? "bg-primary text-base-200"
                : i % 2 === 0
                  ? "bg-base-100 text-primary/80"
                  : "bg-primary/20 text-primary/80"
            } `}
          >
            {(i + 1).toString().padStart(2, "0")}
          </button>
        ))}
        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`border-base-content/10 flex h-10 w-10 items-center justify-center rounded-full border text-xl transition-all ${currentPage === totalPages ? "bg-base-100 text-base-content/30 cursor-not-allowed" : "bg-base-100 text-primary hover:bg-primary/10"}`}
        >
          <Icon icon="solar:arrow-right-linear" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
