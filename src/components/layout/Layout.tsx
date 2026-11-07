import { Outlet, useLocation } from 'react-router-dom'
import { BusinessTypeModal } from './BusinessTypeModal'
import { Cursor } from './Cursor'
import { Footer } from './Footer'
import { Header } from './Header'
import { RevealManager } from './RevealManager'

/** Shared page chrome: header, footer, custom cursor and site-wide overlays. */
export function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="relative w-full bg-background selection:bg-primary selection:text-black">
      <Cursor />
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
      {/* Keyed by route so scroll reveals are rebound against the new page's DOM. */}
      <RevealManager key={pathname} />
      <BusinessTypeModal />
    </div>
  )
}
