'use client'

import type * as React from 'react'
import { Table } from '@tanstack/react-table'
import { cn } from '~/lib/utils'
import { DataTableAdvancedFilterField } from '~/types/data-table'
import { ActionControls } from './actions-controls'
import FilterControls from './filter-controls'
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
   * An array of filter field configurations for the data table.
   * @type DataTableAdvancedFilterField<TData>[]
   * @example
   * const filterFields = [
   *   {
   *     id: 'name',
   *     label: 'Name',
   *     type: 'text',
   *     placeholder: 'Filter by name...'
   *   },
   *   {
   *     id: 'status',
   *     label: 'Status',
   *     type: 'select',
   *     options: [
   *       { label: 'Active', value: 'active', count: 10 },
   *       { label: 'Inactive', value: 'inactive', count: 5 }
   *     ]
   *   }
   * ]
   */
  filterFields: DataTableAdvancedFilterField<TData>[]

  /**
   * Debounce time (ms) for filter updates to enhance performance during rapid input.
   * @default 300
   */
  debounceMs?: number

  /**
   * Shallow mode keeps query states client-side, avoiding server calls.
   * Setting to `false` triggers a network request with the updated querystring.
   * @default true
   */
  shallow?: boolean
}

export default function ToolbarControls<TData>({
  table,
  filterFields = [],
  debounceMs = 300,
  shallow = true,
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
        <FilterControls
          table={table}
          filterFields={filterFields}
          debounceMs={debounceMs}
          shallow={shallow}
        />
        <SortControls table={table} debounceMs={debounceMs} shallow={shallow} />
      </div>
      <div className='flex items-center gap-2'>
        <ActionControls table={table} />
        <ViewControls table={table} />
      </div>
    </div>
  )
}
