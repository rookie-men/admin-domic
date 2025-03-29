export type Task = {
  id: string
  code: string
  title: string | null
  status: 'todo' | 'in-progress' | 'done' | 'canceled'
  label: 'bug' | 'feature' | 'enhancement' | 'documentation'
  priority: 'low' | 'medium' | 'high'
  archived: boolean
  createdAt: string
  updatedAt: string | null
}
