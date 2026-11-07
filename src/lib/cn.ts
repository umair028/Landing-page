type ClassValue = string | false | null | undefined

/**
 * Joins class names, skipping falsy values.
 *
 * @example
 * cn('btn', isActive && 'btn--active') // "btn btn--active"
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
