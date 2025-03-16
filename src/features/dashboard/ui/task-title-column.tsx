import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '~/components/data-table/column-header'
import { Badge } from '~/components/ui/badge'
import { TASK_LABELS } from '~/constants/task'
import { Task } from '~/types/task'

export const taskTitleColumn: ColumnDef<Task> = {
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
}
