import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '~/components/ui/input'

interface SearchControlsProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  debounceMs?: number
}

export function SearchControls({
  value,
  onChange,
  placeholder = 'Search...',
  debounceMs = 300,
}: SearchControlsProps) {
  const [searchTerm, setSearchTerm] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(searchTerm)
    }, debounceMs)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm, onChange, debounceMs])

  return (
    <div className='relative max-w-sm'>
      <Search className='text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2' />
      <Input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
        placeholder={placeholder}
        className='w-full pl-8'
      />
    </div>
  )
}
