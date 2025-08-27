"use client";

import { useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MyCoursesPagination = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const queryParams = Object.fromEntries(searchParams);

  const createPageLink = (pageNum: number) => {
    return {
      pathname: "/instructor/dashboard/my-courses",
      query: { ...queryParams, page: pageNum.toString() },
    };
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="rounded-full"
              href={createPageLink(currentPage - 1)}
              aria-disabled={currentPage <= 1}
            />
          </PaginationItem>
          {[1, 2, 3, 4, 5].map((pageNum) => (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href={createPageLink(pageNum)}
                isActive={currentPage === pageNum}
                className="rounded-full"
              >
                {pageNum.toString().padStart(2, "0")}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="rounded-full"
              href={createPageLink(currentPage + 1)}
              aria-disabled={currentPage >= 5}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MyCoursesPagination;
