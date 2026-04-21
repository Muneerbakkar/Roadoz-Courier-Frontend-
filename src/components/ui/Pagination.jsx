import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

export function Pagination({ 
  currentPage = 1, 
  totalPages = 1, 
  totalEntries = 0, 
  limit = 10, 
  onPageChange 
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endEntry = Math.min(currentPage * limit, totalEntries);

  if (totalPages <= 1 && totalEntries <= limit) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-border-subtle mt-4 gap-4">
      <div className="text-xs md:text-sm text-text-muted">
        Showing <span className="font-medium text-text-main">{startEntry}</span> to{" "}
        <span className="font-medium text-text-main">{endEntry}</span> of{" "}
        <span className="font-medium text-text-main">{totalEntries}</span> entries
      </div>
      
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-text-muted hover:text-primary disabled:opacity-30 disabled:hover:text-text-muted transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-8 h-8 flex items-center justify-center text-xs font-bold rounded-lg transition-all",
                page === currentPage
                  ? "bg-primary text-black shadow-lg shadow-primary/20"
                  : "text-text-muted hover:bg-dashboard-bg hover:text-text-main border border-transparent hover:border-border-subtle"
              )}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-text-muted hover:text-primary disabled:opacity-30 disabled:hover:text-text-muted transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;