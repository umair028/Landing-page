import { Outlet } from 'react-router-dom'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { BusinessTypeModal } from './BusinessTypeModal'
import { Cursor } from './Cursor'
import { Footer } from './Footer'
import { Header } from './Header'

/**
 * Shared page chrome: header, footer, custom cursor and site-wide overlays.
 *
 * Pages mount their own `RevealManager` once their content is in the DOM, since the
 * home page renders its lower sections progressively after the first paint.
 */
export function Layout() {
  const hasFinePointer = useMediaQuery('(pointer: fine)')

  return (
    <div className="relative w-full bg-background selection:bg-primary selection:text-black">
      {hasFinePointer && <Cursor />}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <BusinessTypeModal />
    </div>
  )
}
