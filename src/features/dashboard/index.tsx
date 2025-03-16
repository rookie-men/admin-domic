import React from 'react'
import { DataTable } from '~/components/data-table/data-table'
import { useTasksTable } from './hooks/use-tasks-table'

export default function Dashboard() {
  const { table } = useTasksTable()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <DataTable table={table} shallow={false} />
    </div>
  )
}
