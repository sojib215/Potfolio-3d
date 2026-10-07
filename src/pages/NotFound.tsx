import { Action } from '@/components/ui/Button'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function NotFound() {
  usePageMeta('Not found — SOJIB')

  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center py-40">
      <span className="label">Error 404</span>
      <h1 className="mt-6 text-[clamp(2.4rem,7vw,4.6rem)] font-medium text-edge text-chalk">
        This page hasn’t been built yet.
      </h1>
      <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed text-mute">
        The link may be old or mistyped. The projects are all on the home page.
      </p>
      <div className="mt-10">
        <Action to="/" arrow>
          Back to the portfolio
        </Action>
      </div>
    </section>
  )
}
