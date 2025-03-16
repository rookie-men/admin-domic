import type { Table } from '@tanstack/react-table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

interface PaginationControlsProps<TData> {
  table: Table<TData>
  pageSizeOptions?: number[]
}

export default function PaginationControls<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: PaginationControlsProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()

  return (
    <div className='flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8'>
      <div className='text-muted-foreground flex-1 text-sm whitespace-nowrap'>
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className='flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium whitespace-nowrap'>Rows per page</p>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className='h-8 w-[4.5rem]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-center text-sm font-medium'>
          {currentPage} of {totalPages}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            aria-label='Go to first page'
            variant='outline'
            className='hidden size-8 p-0 lg:flex'
            onClick={() => {
              table.setPageIndex(0)
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className='size-4' aria-hidden='true' />
          </Button>
          <Button
            aria-label='Go to previous page'
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => {
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className='size-4' aria-hidden='true' />
          </Button>
          <Button
            aria-label='Go to next page'
            variant='outline'
            size='icon'
            className='size-8'
            onClick={() => {
              table.nextPage()
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className='size-4' aria-hidden='true' />
          </Button>
          <Button
            aria-label='Go to last page'
            variant='outline'
            size='icon'
            className='hidden size-8 lg:flex'
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1)
            }}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className='size-4' aria-hidden='true' />
          </Button>
        </div>
      </div>
    </div>
  )
}
