import { ColumnDef } from '@tanstack/react-table'
import { Task } from '~/types/task'

export const mockedTaskData = {
  tasks: {
    data: [
      {
        id: 'tsk_3TO1TElGhEE4',
        code: 'TASK-3986',
        title:
          "I'll hack the redundant XML matrix, that should pixel the TLS interface!",
        status: 'done',
        label: 'enhancement',
        priority: 'high',
        archived: false,
        createdAt: '2025-03-16T06:47:05.004Z',
        updatedAt: '2025-03-16T06:47:05.004Z',
      },
      {
        id: 'tsk_r46E6WyjhH2L',
        code: 'TASK-5046',
        title:
          'Use the wireless HTTP alarm, then you can generate the neural array!',
        status: 'done',
        label: 'feature',
        priority: 'medium',
        archived: false,
        createdAt: '2025-03-16T06:47:05.004Z',
        updatedAt: '2025-03-16T06:47:05.004Z',
      },
      {
        id: 'tsk_oDCfdESmV4yE',
        code: 'TASK-9489',
        title:
          'The AGP monitor is down, program the bluetooth array so we can input the UTF8 array!',
        status: 'in-progress',
        label: 'enhancement',
        priority: 'medium',
        archived: false,
        createdAt: '2025-03-16T06:47:05.004Z',
        updatedAt: '2025-03-16T06:47:05.004Z',
      },
      {
        id: 'tsk_AhfrSbF2sEdW',
        code: 'TASK-0919',
        title:
          "You can't quantify the pixel without indexing the redundant IP interface!",
        status: 'done',
        label: 'documentation',
        priority: 'high',
        archived: true,
        createdAt: '2025-03-16T06:47:05.004Z',
        updatedAt: '2025-03-16T06:47:05.004Z',
      },
      {
        id: 'tsk_dfErtfOg1ReU',
        code: 'TASK-1199',
        title:
          'The EXE system is down, synthesize the 1080p hard drive so we can back up the SDD system!',
        status: 'todo',
        label: 'bug',
        priority: 'low',
        archived: false,
        createdAt: '2025-03-16T06:47:05.004Z',
        updatedAt: '2025-03-16T06:47:05.004Z',
      },
      {
        id: 'tsk_VVUfzjMnJV4z',
        code: 'TASK-8537',
        title:
          'Use the cross-platform CLI sensor, then you can copy the haptic monitor!',
        status: 'in-progress',
        label: 'documentation',
        priority: 'high',
        archived: false,
        createdAt: '2025-03-16T06:47:05.004Z',
        updatedAt: '2025-03-16T06:47:05.004Z',
      },
      {
        id: 'tsk_xSVUGd5glCiJ',
        code: 'TASK-5365',
        title:
          'Try to input the XML card, maybe it will reboot the primary panel!',
        status: 'todo',
        label: 'feature',
        priority: 'medium',
        archived: false,
        createdAt: '2025-03-16T06:47:05.004Z',
        updatedAt: '2025-03-16T06:47:05.004Z',
      },
      {
        id: 'tsk_y1w3UfSXw0NJ',
        code: 'TASK-0417',
        title:
          'Use the back-end HTTP microchip, then you can navigate the auxiliary capacitor!',
        status: 'todo',
        label: 'bug',
        priority: 'high',
        archived: false,
        createdAt: '2025-03-16T06:47:05.004Z',
        updatedAt: '2025-03-16T06:47:05.004Z',
      },
      {
        id: 'tsk_RMk1KhkXEuSK',
        code: 'TASK-1591',
        title:
          'The ADP circuit is down, quantify the haptic alarm so we can compress the OCR alarm!',
        status: 'todo',
        label: 'documentation',
        priority: 'medium',
        archived: false,
        createdAt: '2025-03-16T06:47:05.004Z',
        updatedAt: '2025-03-16T06:47:05.004Z',
      },
      {
        id: 'tsk_oQC8UW7T2uCk',
        code: 'TASK-4800',
        title:
          'Use the redundant HTTP bandwidth, then you can synthesize the bluetooth panel!',
        status: 'todo',
        label: 'bug',
        priority: 'low',
        archived: false,
        createdAt: '2025-03-16T06:47:05.004Z',
        updatedAt: '2025-03-16T06:47:05.004Z',
      },
    ],
    pageCount: 10,
  },
  statusCounts: {
    'in-progress': 32,
    done: 22,
    canceled: 19,
    todo: 26,
  },
  priorityCounts: {
    medium: 41,
    high: 33,
    low: 25,
  },
  rowAction: undefined,
  columns: [
    {
      id: 'select',
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'code',
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
    },
    {
      accessorKey: 'status',
    },
    {
      accessorKey: 'priority',
    },
    {
      accessorKey: 'archived',
    },
    {
      accessorKey: 'createdAt',
    },
    {
      id: 'actions',
      size: 40,
    },
  ],
} satisfies {
  tasks: {
    data: Task[]
    pageCount: number
  }
  statusCounts: Record<string, number>
  priorityCounts: Record<string, number>
  rowAction: undefined
  columns: ColumnDef<Task>[]
}
