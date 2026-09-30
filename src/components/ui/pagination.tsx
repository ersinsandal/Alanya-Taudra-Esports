"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-ate-border bg-ate-panel text-ate-white hover:bg-ate-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ate-red"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ate-red ${
            currentPage === page
              ? 'bg-ate-red text-ate-white'
              : 'border border-ate-border bg-ate-panel text-ate-white hover:bg-ate-surface'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-ate-border bg-ate-panel text-ate-white hover:bg-ate-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ate-red"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export { Pagination }
