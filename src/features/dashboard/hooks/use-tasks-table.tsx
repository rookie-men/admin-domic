import React from 'react'
import { useDataTable } from '~/hooks/use-data-table'
import { mockedTaskData } from '~/mocks/tasks'
import {
  DataTableAdvancedFilterField,
  DataTableRowAction,
} from '~/types/data-table'
import { Task } from '~/types/task'
import { generateTaskColumns } from '../ui/task-columns'

export function useTasksTable() {
  const [rowAction, setRowAction] = React.useState<DataTableRowAction<Task>>()

  const columns = React.useMemo(
    () =>
      generateTaskColumns({
        setRowAction,
        statusCounts: {
          todo: 23,
          'in-progress': 33,
          done: 22,
          canceled: 21,
        },
        priorityCounts: {
          low: 25,
          medium: 41,
          high: 33,
        },
        estimatedHoursRange: {
          min: 0,
          max: 0,
        },
      }),
    []
  )

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
    columns,
    pageCount: mockedTaskData.tasks.pageCount,
    enableAdvancedFilter: true,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  })

  return {
    table,
    advancedFilterFields,
    rowAction,
  }
}
