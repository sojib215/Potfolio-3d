import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'outline' | 'ghost'

export interface ActionProps {
  children: ReactNode
  /** Internal route (react-router). */
  to?: string
  /** External URL, mailto: or tel: */
  href?: string
  onClick?: (event: MouseEvent<HTMLElement>) => void
  variant?: Variant
  className?: string
  arrow?: boolean
  ariaLabel?: string
  cursor?: string
  disabled?: boolean
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-[2px] text-[13px] font-medium tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:pointer-events-none disabled:opacity-40'

const variants: Record<Variant, string> = {
  solid: 'bg-chalk text-void hover:bg-accent hover:text-void',
  outline: 'border border-line text-chalk hover:border-chalk/45 hover:bg-white/[0.035]',
  ghost: 'text-mute hover:text-chalk',
}

const paddings: Record<Variant, string> = {
  solid: 'h-12 px-7',
  outline: 'h-12 px-7',
  ghost: 'h-10 px-0',
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
    >
      <path
        d="M2 7h9.5M7.5 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function Action({
  children,
  to,
  href,
  onClick,
  variant = 'solid',
  className,
  arrow = false,
  ariaLabel,
  cursor = 'link',
  disabled,
}: ActionProps) {
  const content = (
    <>
      <span className="relative">{children}</span>
      {arrow ? <Arrow /> : null}
    </>
  )

  const shared = {
    className: cn(base, variants[variant], paddings[variant], className),
    'aria-label': ariaLabel,
    'data-cursor': cursor,
    onClick,
  }

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href)
    return (
      <a
        {...shared}
        href={href}
        target={external && href.startsWith('http') ? '_blank' : undefined}
        rel={external && href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  if (to) {
    return (
      <Link {...shared} to={to}>
        {content}
      </Link>
    )
  }

  return (
    <button {...shared} type="button" disabled={disabled}>
      {content}
    </button>
  )
}

/** Small pill used for micro-CTAs and status chips. */
export function Chip({
  children,
  className,
  accent = false,
}: {
  children: ReactNode
  className?: string
  accent?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em]',
        accent
          ? 'border-accent/30 bg-accent/[0.07] text-accent-soft'
          : 'border-line bg-white/[0.015] text-dim',
        className,
      )}
    >
      {children}
    </span>
  )
}
