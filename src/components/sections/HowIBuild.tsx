import { LineMask, Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { principles } from '@/data/content'

export default function HowIBuild() {
  return (
    <section
      id="how-i-build"
      className="relative border-t border-line-soft py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <SectionHead
          index="05"
          label="How I Build"
          title={
            <>
              <LineMask>Four rules I try</LineMask>
              <LineMask delay={0.08}>
                <span className="font-serif italic text-accent-soft">not to break.</span>
              </LineMask>
            </>
          }
        />

        <div className="mt-16 border-t border-line-soft lg:mt-24">
          {principles.map((principle, i) => (
            <Reveal key={principle.index} delay={i * 0.06} y={20}>
              <div className="group grid gap-4 border-b border-line-soft py-9 md:grid-cols-12 md:items-baseline md:gap-8 md:py-11">
                <span className="font-mono text-[11px] tracking-[0.18em] text-accent/70 md:col-span-1">
                  {principle.index}
                </span>
                <h3 className="text-[clamp(1.4rem,3vw,2.1rem)] font-medium tracking-[-0.03em] text-mute transition-colors duration-700 group-hover:text-chalk md:col-span-5">
                  {principle.title}
                </h3>
                <p className="max-w-[46ch] text-[14px] leading-[1.75] text-dim transition-colors duration-700 group-hover:text-mute md:col-span-5 md:col-start-8">
                  {principle.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
