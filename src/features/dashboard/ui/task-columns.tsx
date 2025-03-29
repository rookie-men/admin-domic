'use client'

import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import {
  ArrowUpDown,
  CalendarIcon,
  CircleDashed,
  Clock,
  Ellipsis,
  Text,
} from 'lucide-react'
import { DataTableColumnHeader } from '~/components/data-table/column-header'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { TASK_LABELS, TASK_PRIORITIES, TASK_STATUSES } from '~/constants/task'
import { getPriorityIcon, getStatusIcon } from '~/lib/data-table'
import { formatDate } from '~/lib/utils'
import { DataTableRowAction } from '~/types/data-table'
import { Task } from '~/types/task'

interface GetTasksTableColumnsProps<TData> {
  statusCounts: Record<Task['status'], number>
  priorityCounts: Record<Task['priority'], number>
  estimatedHoursRange: { min: number; max: number }
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<TData> | undefined>
  >
}

export function generateTaskColumns<TData>({
  statusCounts,
  priorityCounts,
  estimatedHoursRange,
  setRowAction,
}: GetTasksTableColumnsProps<TData>): ColumnDef<TData>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value)
          }}
          aria-label='Select all'
          className='translate-y-0.5'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value)
          }}
          aria-label='Select row'
          className='translate-y-0.5'
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      id: 'code',
      accessorKey: 'code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Task' />
      ),
      cell: ({ row }) => <div className='w-20'>{row.getValue('code')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'title',
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Title' />
      ),
      cell: ({ row }) => {
        const label = TASK_LABELS.find((label) => label === row.original.label)

        return (
          <div className='flex items-center gap-2'>
            {label && <Badge variant='outline'>{label}</Badge>}
            <span className='max-w-[31.25rem] truncate font-medium'>
              {row.getValue('title')}
            </span>
          </div>
        )
      },
      meta: {
        label: 'Title',
        placeholder: 'Search titles...',
        variant: 'text',
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ cell }) => {
        const status = TASK_STATUSES.find(
          (status) => status === cell.getValue<Task['status']>()
        )

        if (!status) return null

        const Icon = getStatusIcon(status)

        return (
          <Badge variant='outline' className='py-1 [&>svg]:size-3.5'>
            <Icon />
            <span className='capitalize'>{status}</span>
          </Badge>
        )
      },
      meta: {
        label: 'Status',
        variant: 'multiSelect',
        options: TASK_STATUSES.map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
          count: statusCounts[status],
          icon: getStatusIcon(status),
        })),
        icon: CircleDashed,
      },
      enableColumnFilter: true,
    },
    {
      id: 'priority',
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Priority' />
      ),
      cell: ({ cell }) => {
        const priority = TASK_PRIORITIES.find(
          (priority) => priority === cell.getValue<Task['priority']>()
        )

        if (!priority) return null

        const Icon = getPriorityIcon(priority)

        return (
          <Badge variant='outline' className='py-1 [&>svg]:size-3.5'>
            <Icon />
            <span className='capitalize'>{priority}</span>
          </Badge>
        )
      },
      meta: {
        label: 'Priority',
        variant: 'multiSelect',
        options: TASK_PRIORITIES.map((priority) => ({
          label: priority.charAt(0).toUpperCase() + priority.slice(1),
          value: priority,
          count: priorityCounts[priority],
          icon: getPriorityIcon(priority),
        })),
        icon: ArrowUpDown,
      },
      enableColumnFilter: true,
    },
    {
      id: 'estimatedHours',
      accessorKey: 'estimatedHours',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Est. Hours' />
      ),
      cell: ({ cell }) => {
        const estimatedHours = cell.getValue<number>()
        return <div className='w-20 text-right'>{estimatedHours}</div>
      },
      meta: {
        label: 'Est. Hours',
        variant: 'range',
        range: [estimatedHoursRange.min, estimatedHoursRange.max],
        unit: 'hr',
        icon: Clock,
      },
      enableColumnFilter: true,
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Created At' />
      ),
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      meta: {
        label: 'Created At',
        variant: 'dateRange',
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [isUpdatePending, startUpdateTransition] = React.useTransition()

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label='Open menu'
                variant='ghost'
                className='data-[state=open]:bg-muted flex size-8 p-0'
              >
                <Ellipsis className='size-4' aria-hidden='true' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-40'>
              <DropdownMenuItem
                onSelect={() => {
                  setRowAction({ row, variant: 'update' })
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={row.original.label}
                    onValueChange={() => {}}
                  >
                    {TASK_LABELS.map((label) => (
                      <DropdownMenuRadioItem
                        key={label}
                        value={label}
                        className='capitalize'
                        disabled={isUpdatePending}
                      >
                        {label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  setRowAction({ row, variant: 'delete' })
                }}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
      size: 40,
    },
  ]
}
