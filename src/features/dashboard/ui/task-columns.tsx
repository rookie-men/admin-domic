'use client'

import * as React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { Ellipsis } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { DataTableColumnHeader } from '~/components/ui/data-table/column-header'
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

interface GetColumnsProps {
  setRowAction: React.Dispatch<
    React.SetStateAction<DataTableRowAction<Task> | null>
  >
}

export function getColumns({
  setRowAction,
}: GetColumnsProps): ColumnDef<Task>[] {
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
    },
    {
      accessorKey: 'code',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Task' />
      ),
      cell: ({ row }) => <div className='w-20'>{row.getValue('code')}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Title' />
      ),
      cell: ({ row }) => {
        const label = TASK_LABELS.find((label) => label === row.original.label)

        return (
          <div className='flex space-x-2'>
            {label && <Badge variant='outline'>{label}</Badge>}
            <span className='max-w-[31.25rem] truncate font-medium'>
              {row.getValue('title')}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ cell }) => {
        const status = TASK_STATUSES.find(
          (status) => status === cell.getValue<Task['status']>()
        )

        if (!status) return

        const Icon = getStatusIcon(status)

        return (
          <div className='flex w-[6.25rem] items-center'>
            <Icon
              className='text-muted-foreground mr-2 size-4'
              aria-hidden='true'
            />
            <span className='capitalize'>{status}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Priority' />
      ),
      cell: ({ cell }) => {
        const priority = TASK_PRIORITIES.find(
          (priority) => priority === cell.getValue<Task['priority']>()
        )

        if (!priority) return

        const Icon = getPriorityIcon(priority)

        return (
          <div className='flex items-center'>
            <Icon
              className='text-muted-foreground mr-2 size-4'
              aria-hidden='true'
            />
            <span className='capitalize'>{priority}</span>
          </div>
        )
      },
      filterFn: (row, id, value) => {
        return Array.isArray(value) && value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: 'archived',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Archived' />
      ),
      cell: ({ row }) => (
        <Badge variant='outline'>{row.original.archived ? 'Yes' : 'No'}</Badge>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Created At' />
      ),
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [isUpdatePending] = React.useTransition()

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
                  setRowAction({ row, type: 'update' })
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
                  setRowAction({ row, type: 'delete' })
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
