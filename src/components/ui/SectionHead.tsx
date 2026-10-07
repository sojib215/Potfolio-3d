import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { LineMask, Reveal } from './Reveal'

interface SectionHeadProps {
  index: string
  label: string
  title: ReactNode
  description?: ReactNode
  className?: string
  /** Optional node rendered under the description column. */
  aside?: ReactNode
}

export function SectionHead({
  index,
  label,
  title,
  description,
  className,
  aside,
}: SectionHeadProps) {
  return (
    <header className={cn('relative', className)}>
      <Reveal className="flex items-center gap-4" y={14}>
        <span className="label text-accent/80">{index}</span>
        <span className="label">{label}</span>
        <span className="hairline flex-1" />
      </Reveal>

      <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:gap-10">
        <h2 className="text-balance text-[clamp(2rem,5.2vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-chalk md:col-span-7">
          {title}
        </h2>
        {description || aside ? (
          <div className="md:col-span-4 md:col-start-9 md:pt-3">
            {description ? (
              <Reveal delay={0.1}>
                <p className="max-w-sm text-[15px] leading-relaxed text-mute">{description}</p>
              </Reveal>
            ) : null}
            {aside}
          </div>
        ) : null}
      </div>
    </header>
  )
}

/** Tiny crosshair / registration mark used as a technical micro-detail. */
export function Marker({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('pointer-events-none absolute block size-3 opacity-40', className)}
    >
      <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-dim" />
      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-dim" />
    </span>
  )
}

/** Numbered editorial title used by "What I build" / "How I build". */
export function IndexedTitle({
  index,
  children,
  className,
}: {
  index: string
  children: ReactNode
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-baseline gap-3', className)}>
      <span className="font-mono text-[11px] tracking-[0.18em] text-accent/70">{index}</span>
      <span>{children}</span>
    </span>
  )
}

/** Masked heading lines helper. */
export function MaskedLines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <LineMask key={line} delay={i * 0.08}>
          {line}
        </LineMask>
      ))}
    </span>
  )
}
