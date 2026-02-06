"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface PaginationProps {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
}

export function Pagination({ pageInfo }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleNext = () => {
    if (!pageInfo.hasNextPage || !pageInfo.endCursor) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("cursor", pageInfo.endCursor);
    params.set("direction", "next");
    router.push(pathname + "?" + params.toString());
  };

  const handlePrev = () => {
    if (!pageInfo.hasPreviousPage || !pageInfo.startCursor) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("cursor", pageInfo.startCursor);
    params.set("direction", "prev");
    router.push(pathname + "?" + params.toString());
  };

  if (!pageInfo.hasNextPage && !pageInfo.hasPreviousPage) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-16 pb-16">
      <Button
        variant="ghost"
        onClick={handlePrev}
        disabled={!pageInfo.hasPreviousPage}
        className="cursor-pointer gap-2 hover:bg-transparent hover:underline px-0 disabled:no-underline font-normal text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="w-px h-4 bg-gray-200 mx-2 hidden sm:block"></div>

      <Button
        variant="ghost"
        onClick={handleNext}
        disabled={!pageInfo.hasNextPage}
        className="cursor-pointer gap-2 hover:bg-transparent hover:underline px-0 disabled:no-underline font-normal text-sm"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
