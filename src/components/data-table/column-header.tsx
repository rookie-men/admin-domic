'use client'

import { SelectIcon } from '@radix-ui/react-select'
import type { Column } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '~/components/ui/select'
import { cn } from '~/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>
  }

  const noneValue = `${column.id}-none`
  const ascValue = `${column.id}-asc`
  const descValue = `${column.id}-desc`
  const hideValue = `${column.id}-hide`

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Select
        value={
          column.getIsSorted() === 'desc'
            ? descValue
            : column.getIsSorted() === 'asc'
              ? ascValue
              : noneValue
        }
        onValueChange={(value) => {
          switch (value) {
            case ascValue: {
              column.toggleSorting(false)
              break
            }
            case descValue: {
              column.toggleSorting(true)
              break
            }
            case hideValue: {
              column.toggleVisibility(false)
              break
            }
            case noneValue: {
              {
                column.clearSorting()
                // No default
              }
              break
            }
          }
        }}
      >
        <SelectTrigger
          aria-label={
            column.getIsSorted() === 'desc'
              ? 'Sorted descending. Click to sort ascending.'
              : column.getIsSorted() === 'asc'
                ? 'Sorted ascending. Click to sort descending.'
                : 'Not sorted. Click to sort ascending.'
          }
          className='hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent -ml-3 h-8 w-fit border-none text-xs [&>svg:last-child]:hidden'
        >
          {title}
          <SelectIcon asChild>
            {column.getCanSort() && column.getIsSorted() === 'desc' ? (
              <ArrowDown className='ml-2.5 size-4' aria-hidden='true' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp className='ml-2.5 size-4' aria-hidden='true' />
            ) : (
              <ChevronsUpDown className='ml-2.5 size-4' aria-hidden='true' />
            )}
          </SelectIcon>
        </SelectTrigger>
        <SelectContent align='start'>
          {column.getCanSort() && (
            <>
              <SelectItem value={ascValue}>
                <span className='flex items-center'>
                  <ArrowUp
                    className='text-muted-foreground/70 mr-2 size-3.5'
                    aria-hidden='true'
                  />
                  Asc
                </span>
              </SelectItem>
              <SelectItem value={descValue}>
                <span className='flex items-center'>
                  <ArrowDown
                    className='text-muted-foreground/70 mr-2 size-3.5'
                    aria-hidden='true'
                  />
                  Desc
                </span>
              </SelectItem>
              <SelectItem value={noneValue}>
                <span className='flex items-center gap-2'>
                  <X
                    className='text-muted-foreground/70 size-3.5'
                    aria-hidden='true'
                  />
                  Reset
                </span>
              </SelectItem>
            </>
          )}
          {column.getCanHide() && (
            <SelectItem value={hideValue}>
              <span className='flex items-center'>
                <EyeOff
                  className='text-muted-foreground/70 mr-2 size-3.5'
                  aria-hidden='true'
                />
                Hide
              </span>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
