import { useEffect } from 'react'
import { site } from '@/config/site'

/** Sets `document.title` to "`title` | Site name" while the calling page is mounted. */
export function usePageTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} | ${site.name}`
  }, [title])
}
