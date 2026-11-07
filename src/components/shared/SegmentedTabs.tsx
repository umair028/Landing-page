import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { useId } from 'react'
import { cn } from '@/lib/cn'

type Tab = { id: string; label: string; icon?: LucideIcon; count?: number }

/** Pill tab bar with a sliding active indicator (shared layout animation). */
export function SegmentedTabs({
  tabs,
  value,
  onChange,
  tone = 'dark',
}: {
  tabs: Tab[]
  value: string
  onChange: (id: string) => void
  tone?: 'dark' | 'forest'
}) {
  const layoutId = useId()
  const odd = tabs.length % 2 === 1
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-full sm:w-auto sm:overflow-x-auto sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden">
        <div
          role="tablist"
          className={cn(
            'relative grid grid-cols-2 gap-1 rounded-[24px] p-1.5 sm:inline-flex sm:rounded-full',
            tone === 'dark'
              ? 'bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-md'
              : 'bg-[#0b1f14] ring-1 ring-black/20',
          )}
        >
          {tabs.map((t, i) => {
            const active = t.id === value
            const Icon = t.icon
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onChange(t.id)}
                className={cn(
                  'group relative flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 py-3 text-[11px] font-black uppercase tracking-[0.06em] outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.14em] md:px-6 md:py-3',
                  odd && i === tabs.length - 1 && 'max-sm:col-span-2',
                  active ? 'text-black' : 'text-white/65 hover:text-white',
                )}
              >
                {active ? (
                  <motion.span
                    layoutId={layoutId}
                    className="absolute inset-0 rounded-full bg-primary shadow-[0_8px_24px_rgba(4,214,109,0.35)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                ) : (
                  <span className="absolute inset-0 rounded-full bg-white/0 transition-colors duration-300 group-hover:bg-white/[0.07]" />
                )}
                {Icon && <Icon size={15} strokeWidth={2.5} className="relative shrink-0" />}
                <span className="relative">{t.label}</span>
                {t.count !== undefined && (
                  <span
                    className={cn(
                      'relative rounded-full px-1.5 py-0.5 text-[10px] leading-none tracking-normal transition-colors max-sm:hidden',
                      active ? 'bg-black/15 text-black' : 'bg-white/10 text-white/60',
                    )}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
