import { Icon } from "@iconify/react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  coursesPerPage: number;
  totalItems: number;
  getPageHref?: (page: number) => string;
  children: (paginatedItems: any[]) => React.ReactNode;
  items: any[];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  coursesPerPage,
  totalItems,
  getPageHref,
  children,
  items,
}) => {
  const totalPages = Math.ceil(totalItems / coursesPerPage) || 1;
  const paginatedItems = items.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  if (totalPages <= 1) return <>{children(paginatedItems)}</>;

  return (
    <>
      {children(paginatedItems)}
      <div className="mt-10 flex flex-col items-center">
        <div className="flex items-center gap-2">
          {/* Prev Button/Link */}
          {getPageHref ? (
            <a
              href={getPageHref(Math.max(1, currentPage - 1))}
              aria-disabled={currentPage === 1}
              tabIndex={currentPage === 1 ? -1 : 0}
              className={`border-base-content/10 flex h-10 w-10 items-center justify-center rounded-full border text-xl transition-all ${currentPage === 1 ? "bg-base-100 text-base-content/30 pointer-events-none cursor-not-allowed" : "bg-base-100 text-primary hover:bg-primary/10"}`}
            >
              <Icon icon="solar:arrow-left-linear" />
            </a>
          ) : null}
          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) =>
            getPageHref ? (
              <a
                key={i}
                href={getPageHref(i + 1)}
                className={`border-base-content/10 flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                  currentPage === i + 1
                    ? "bg-primary text-base-200"
                    : i % 2 === 0
                      ? "bg-base-100 text-primary/80"
                      : "bg-primary/20 text-primary/80"
                } `}
                aria-current={currentPage === i + 1 ? "page" : undefined}
              >
                {(i + 1).toString().padStart(2, "0")}
              </a>
            ) : null
          )}
          {/* Next Button/Link */}
          {getPageHref ? (
            <a
              href={getPageHref(Math.min(totalPages, currentPage + 1))}
              aria-disabled={currentPage === totalPages}
              tabIndex={currentPage === totalPages ? -1 : 0}
              className={`border-base-content/10 flex h-10 w-10 items-center justify-center rounded-full border text-xl transition-all ${currentPage === totalPages ? "bg-base-100 text-base-content/30 pointer-events-none cursor-not-allowed" : "bg-base-100 text-primary hover:bg-primary/10"}`}
            >
              <Icon icon="solar:arrow-right-linear" />
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Pagination;
