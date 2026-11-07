import { lazy, Suspense } from 'react'
import { Hero } from '@/components/home/Hero'
import { useDeferredReady } from '@/hooks/useDeferredContent'
import { usePageTitle } from '@/hooks/usePageTitle'

const HomeSections = lazy(() => import('./HomeSections'))

/** Keeps the footer below the fold until the deferred sections have rendered. */
const placeholder = <div aria-hidden="true" className="min-h-[100vh]" />

export default function Home() {
  usePageTitle('Custom Logo, Brand & Website Design')
  const showSections = useDeferredReady()

  return (
    <>
      <Hero />
      {showSections ? (
        <Suspense fallback={placeholder}>
          <HomeSections />
        </Suspense>
      ) : (
        placeholder
      )}
    </>
  )
}
