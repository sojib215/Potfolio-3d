import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { LineMask, Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { journey } from '@/data/journey'
import { cn } from '@/lib/utils'

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 })
  const height = useTransform(scaleY, (v) => `${Math.min(100, v * 108)}%`)

  return (
    <section id="journey" className="relative border-t border-line-soft py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHead
          index="06"
          label="Journey"
          title={
            <>
              <LineMask>From SSC to shipping</LineMask>
              <LineMask delay={0.08}>
                <span className="font-serif italic text-accent-soft">real applications.</span>
              </LineMask>
            </>
          }
          description="A short, honest timeline. No big claims — just the path so far and where I am heading next."
        />

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* rail */}
          <div className="absolute left-[7px] top-2 h-[calc(100%-16px)] w-px bg-line-soft md:left-[calc(9rem+7px)]">
            <motion.div
              className="w-px origin-top bg-gradient-to-b from-accent via-accent/60 to-accent/10"
              style={{ height: reduce ? '100%' : height }}
            />
          </div>

          <ol className="space-y-12 md:space-y-16">
            {journey.map((step, i) => (
              <li key={step.period} className="relative">
                <Reveal delay={i * 0.05} y={18}>
                  <div className="grid gap-3 md:grid-cols-12 md:gap-8">
                    {/* node */}
                    <span
                      className={cn(
                        'absolute left-0 top-[7px] size-[15px] rounded-full border md:left-36',
                        step.current ? 'border-accent bg-accent/25' : 'border-line bg-void',
                      )}
                    >
                      {step.current ? (
                        <span className="absolute inset-[3px] rounded-full bg-accent animate-pulse-dot" />
                      ) : null}
                    </span>

                    <div className="pl-8 md:col-span-3 md:pl-0 md:pr-8 md:text-right">
                      <span
                        className={cn(
                          'block font-mono text-[11px] uppercase tracking-[0.16em]',
                          step.current ? 'text-accent' : 'text-dim',
                        )}
                      >
                        {step.period}
                      </span>
                      {step.current ? (
                        <span className="mt-2 hidden font-mono text-[10px] uppercase tracking-[0.16em] text-faint md:block">
                          Now
                        </span>
                      ) : null}
                    </div>

                    <div className="pl-8 md:col-span-7 md:col-start-5 md:pl-0">
                      <h3 className="text-[clamp(1.15rem,2.4vw,1.6rem)] font-medium tracking-[-0.025em] text-chalk">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-[54ch] text-[14px] leading-[1.75] text-mute">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
