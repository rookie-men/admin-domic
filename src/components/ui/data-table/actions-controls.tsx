'use client'

import type { Table } from '@tanstack/react-table'
import { Download, Plus, RefreshCcw, Upload, X } from 'lucide-react'
import { Button } from '~/components/ui/button'

interface ActionControlsProps<TData> {
  table: Table<TData>
}

export function ActionControls<TData>({}: ActionControlsProps<TData>) {
  return (
    <div className='flex items-center gap-2'>
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteTasksDialog
          tasks={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => {
            table.toggleAllRowsSelected(false)
          }}
        />
      ) : null} */}
      <Button variant='ghost' size='sm'>
        <X />
        Reset
      </Button>
      <Button variant='outline' size='sm'>
        <Plus />
      </Button>
      <Button variant='outline' size='sm'>
        <RefreshCcw />
      </Button>
      <Button variant='outline' size='sm'>
        <Download />
      </Button>
      <Button variant='outline' size='sm'>
        <Upload />
      </Button>
    </div>
  )
}
