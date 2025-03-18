import React from 'react'
import { DataTable } from '~/components/ui/data-table/data-table'
import { useDataTable } from '~/hooks/use-data-table'
import { mockedTaskData } from '~/mocks/tasks'
import {
  DataTableAdvancedFilterField,
  DataTableFilterField,
  DataTableRowAction,
} from '~/types/data-table'
import { Task } from '~/types/task'
import { getColumns } from './ui/task-columns'

export default function Dashboard() {
  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Task>>()

  const columns = React.useMemo(() => getColumns({ setRowAction }), [])

  const filterFields: DataTableFilterField<Task>[] = [
    {
      id: 'title',
      label: 'Title',
      placeholder: 'Filter titles...',
    },
    {
      id: 'status',
      label: 'Status',
      options: [
        {
          label: 'Todo',
          value: 'todo',
          count: 26,
        },
        {
          label: 'In-progress',
          value: 'in-progress',
          count: 32,
        },
        {
          label: 'Done',
          value: 'done',
          count: 22,
        },
        {
          label: 'Canceled',
          value: 'canceled',
          count: 19,
        },
      ],
    },
    {
      id: 'priority',
      label: 'Priority',
      options: [
        {
          label: 'Low',
          value: 'low',
          count: 25,
        },
        {
          label: 'Medium',
          value: 'medium',
          count: 41,
        },
        {
          label: 'High',
          value: 'high',
          count: 33,
        },
      ],
    },
  ]

  const advancedFilterFields: DataTableAdvancedFilterField<Task>[] = [
    {
      id: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        {
          label: 'Todo',
          value: 'todo',
          count: 26,
        },
        {
          label: 'In-progress',
          value: 'in-progress',
          count: 32,
        },
        {
          label: 'Done',
          value: 'done',
          count: 22,
        },
        {
          label: 'Canceled',
          value: 'canceled',
          count: 19,
        },
      ],
    },
    {
      id: 'priority',
      label: 'Priority',
      type: 'multi-select',
      options: [
        {
          label: 'Low',
          value: 'low',
          count: 25,
        },
        {
          label: 'Medium',
          value: 'medium',
          count: 41,
        },
        {
          label: 'High',
          value: 'high',
          count: 33,
        },
      ],
    },
    {
      id: 'createdAt',
      label: 'Created at',
      type: 'date',
    },
  ]

  const { table } = useDataTable({
    data: mockedTaskData.tasks.data,
    columns: columns,
    pageCount: mockedTaskData.tasks.pageCount,
    filterFields,
    enableAdvancedFilter: true,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  })
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <DataTable
        table={table}
        filterFields={advancedFilterFields}
        shallow={false}
      />
    </div>
  )
}
