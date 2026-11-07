import { Link } from 'react-router-dom'
import { PageHero } from '../components/shared/Sections'
import { legalLinks, site } from '../config/site'
import { usePageTitle } from '../hooks/usePageTitle'

/**
 * Placeholder policy copy. Replace with text reviewed for your business and jurisdiction.
 */
const docs = {
  'terms-and-conditions': {
    title: 'Terms and Conditions',
    sections: [
      ['Agreement', `By ordering from ${site.name} you agree to these terms. Each project is confirmed in writing with its scope, price and timeline before work begins.`],
      ['Payments', 'Packages are billed as stated on the pricing page. Custom scopes are quoted individually and may be split into milestone payments.'],
      ['Revisions', 'Revision rounds follow the package you purchase. Requests that change the original brief significantly may be quoted as additional work.'],
      ['Ownership', 'Full ownership of approved final designs transfers to you once the project is paid in full. We may show completed work in our portfolio unless you ask us not to.'],
      ['Liability', 'We take care to deliver original work. You are responsible for checking trademark availability in the markets where you plan to use your mark.'],
    ],
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    sections: [
      ['What we collect', 'Information you send us through forms, email or phone, such as your name, email address, business details and project notes.'],
      ['How we use it', 'Only to reply to you, prepare quotes, deliver your project and send updates you have asked for. We never sell your data.'],
      ['Storage', 'Project files and correspondence are stored with reputable providers and kept only as long as needed for the project and legal obligations.'],
      ['Your rights', `You may request a copy of your data or ask us to delete it at any time by emailing ${site.email}.`],
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    sections: [
      ['Before concepts', 'If you cancel before initial concepts are delivered, you are eligible for a full refund.'],
      ['After concepts', 'Once concepts are delivered, refunds are assessed against the brief. If the work does not meet the agreed brief after the included revisions, we will discuss a partial or full refund.'],
      ['Exclusions', 'Refunds do not apply to change-of-mind requests after final files have been approved and delivered.'],
      ['How to request', `Email ${site.email} with your order details. We respond to every request within two working days.`],
    ],
  },
  'cancellation-policy': {
    title: 'Cancellation Policy',
    sections: [
      ['Cancelling a project', 'You can cancel at any stage by contacting us in writing. Work completed up to that point is assessed under our refund policy.'],
      ['Paused projects', 'Projects with no client response for 30 days are paused. You can resume them at any time within six months.'],
      ['Studio cancellations', 'In the rare case we cannot complete a project, you receive a refund for any work not delivered.'],
    ],
  },
} satisfies Record<string, { title: string; sections: Array<[string, string]> }>

export type LegalSlug = keyof typeof docs

export default function Legal({ slug }: { slug: LegalSlug }) {
  const doc = docs[slug]
  usePageTitle(doc.title)
  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} intro={`Last updated ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`} />
      <section className="bg-white px-5 py-20 text-black md:py-28">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[220px_1fr]">
          <nav className="flex flex-row flex-wrap gap-2 md:sticky md:top-32 md:flex-col md:self-start" aria-label="Policies">
            {legalLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${l.to === `/${slug}` ? 'bg-[#0b1f14] text-white' : 'bg-black/5 hover:bg-black/10'}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <article className="space-y-10">
            {doc.sections.map(([h, p], i) => (
              <div key={h} data-reveal="">
                <h2 className="text-2xl font-black normal-case tracking-tight">
                  <span className="mr-3 font-mono text-sm text-emerald-600">{String(i + 1).padStart(2, '0')}</span>
                  {h}
                </h2>
                <p className="mt-3 leading-relaxed text-black/65">{p}</p>
              </div>
            ))}
            <p className="rounded-2xl bg-black/[0.04] p-5 text-sm text-black/60">
              Questions about this policy? Email{' '}
              <a className="font-bold text-black underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
