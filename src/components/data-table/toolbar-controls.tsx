'use client'

import type * as React from 'react'
import { Table } from '@tanstack/react-table'
import { cn } from '~/lib/utils'
import { ActionControls } from './actions-controls'
import { FilterControls } from './filter-controls'
import { FloatingActionBar } from './floating-action-bar'
import SortControls from './sort-controls'
import ViewControls from './view-controls'

interface ToolbarControlsProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type Table<TData>
   */
  table: Table<TData>

  /**
   * Debounce time (ms) for filter updates to enhance performance during rapid input.
   * @default 300
   */
  debounceMs?: number

  throttleMs?: number

  /**
   * Shallow mode keeps query states client-side, avoiding server calls.
   * Setting to `false` triggers a network request with the updated querystring.
   * @default true
   */
  shallow?: boolean
}

export default function ToolbarControls<TData>({
  table,
  debounceMs = 300,
  shallow = true,
  throttleMs = 300,
  className,
  ...props
}: ToolbarControlsProps<TData>) {
  return (
    <div
      role='toolbar'
      aria-orientation='horizontal'
      className={cn(
        'flex w-full items-center justify-between gap-2 overflow-auto',
        className
      )}
      {...props}
    >
      <div className='flex items-center gap-2'>
        <SortControls table={table} debounceMs={debounceMs} shallow={shallow} />
        <FilterControls
          table={table}
          shallow={shallow}
          debounceMs={debounceMs}
          throttleMs={throttleMs}
        />
      </div>
      <div className='flex items-center gap-2'>
        <ActionControls table={table} />
        <ViewControls table={table} />
      </div>
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <FloatingActionBar table={table} />
      )}
    </div>
  )
}
