import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export function Pagination({ currentPage = 1, totalPages = 5, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between px-2 py-4 border-t border-gray-100 mt-4">
      <div className="text-sm text-text-muted">
        Showing <span className="font-medium text-text-main">1</span> to <span className="font-medium text-text-main">25</span> of <span className="font-medium text-text-main">114</span> entries
      </div>
      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          className="p-2 text-text-muted hover:text-primary disabled:opacity-50 disabled:hover:text-text-muted transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        
        {pages.map((page) => (
          <button
            key={page}
            className={cn(
              "w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md transition-all",
              page === currentPage
                ? "bg-primary text-black"
                : "text-text-muted hover:bg-gray-100 hover:text-text-main"
            )}
          >
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          className="p-2 text-text-muted hover:text-primary disabled:opacity-50 disabled:hover:text-text-muted transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
