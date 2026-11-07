import { MotionLink } from '../components/shared/MotionLink'
import { PageHero } from '../components/shared/Sections'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <PageHero eyebrow="404" title="This page took a day off." intro="The link may be broken or the page may have moved.">
      <MotionLink to="/" className="inline-flex rounded-full bg-[#0b1f14] px-8 py-4 text-sm font-black uppercase tracking-widest text-white">
        Back to home
      </MotionLink>
    </PageHero>
  )
}
