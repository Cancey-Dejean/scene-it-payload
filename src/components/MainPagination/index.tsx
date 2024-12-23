'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface PaginationProps {
  limit: number
  currentPage: number
  total: number
}

function PaginationComponent({ limit, currentPage, total }: PaginationProps) {
  const totalPages = Math.ceil(total / limit)

  const hasMorePages = () => {
    const receivedItemsCount = limit * currentPage
    return receivedItemsCount < total
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = []
    const showMax = 5 // Maximum number of page links to show

    if (totalPages <= showMax) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate middle pages
      const start = Math.max(currentPage - 1, 2)
      const end = Math.min(currentPage + 1, totalPages - 1)

      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push('ellipsis')
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push('ellipsis')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage <= 2 ? '/movies' : `/movies?page=${currentPage - 1}`}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? 'pointer-events-none text-white opacity-50' : 'text-white'
            }
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis className="text-white" />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={page === 1 ? '/movies' : `/movies?page=${page}`}
                isActive={page === currentPage}
                className="text-white hover:text-white/70"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href={`/movies?page=${currentPage + 1}`}
            aria-disabled={!hasMorePages()}
            className={!hasMorePages() ? 'pointer-events-none opacity-50' : 'text-white'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationComponent
