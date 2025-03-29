import { type ClassValue, clsx } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat('en-US', {
    month: opts.month ?? 'long',
    day: opts.day ?? 'numeric',
    year: opts.year ?? 'numeric',
    ...opts,
  }).format(new Date(date))
}

export function toSentenceCase(str: string) {
  return str
    .replaceAll('_', ' ')
    .replaceAll(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replaceAll(/\s+/g, ' ')
    .trim()
}

const prefixes: Record<string, unknown> = {}

interface GenerateIdOptions {
  length?: number
  separator?: string
}

export function generateId(
  prefixOrOptions?: keyof typeof prefixes | GenerateIdOptions,
  inputOptions: GenerateIdOptions = {}
) {
  const finalOptions =
    typeof prefixOrOptions === 'object' ? prefixOrOptions : inputOptions

  const prefix =
    typeof prefixOrOptions === 'object' ? undefined : prefixOrOptions

  const { length = 12, separator = '_' } = finalOptions
  const id = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    length
  )()

  return prefix ? `${prefixes[prefix]}${separator}${id}` : id
}
