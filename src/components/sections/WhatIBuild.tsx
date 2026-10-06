import { LineMask, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { Marker, SectionHead } from '@/components/ui/SectionHead'
import { whatIBuild } from '@/data/content'

export default function WhatIBuild() {
  return (
    <section
      id="what-i-build"
      className="relative border-t border-line-soft py-24 md:py-32 lg:py-40"
    >
      <div className="shell">
        <SectionHead
          index="04"
          label="What I Build"
          title={
            <>
              <LineMask>The kind of work</LineMask>
              <LineMask delay={0.08}>
                <span className="font-serif italic text-accent-soft">I take seriously.</span>
              </LineMask>
            </>
          }
          description="Not an agency service list — the things I can actually sit down and build today, end to end."
        />

        <RevealGroup
          stagger={0.07}
          className="mt-16 grid border-t border-l border-line-soft sm:grid-cols-2 lg:mt-24 lg:grid-cols-3"
        >
          {whatIBuild.map((item) => (
            <RevealItem
              key={item.index}
              className="group relative border-b border-r border-line-soft p-7 transition-colors duration-700 hover:bg-white/[0.018] md:p-9"
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent/70">
                {item.index}
              </span>
              <h3 className="mt-7 text-[19px] font-medium leading-tight tracking-[-0.025em] text-chalk">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[36ch] text-[13.5px] leading-[1.7] text-mute">{item.body}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-accent/50 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Marker className="left-6 top-32 hidden lg:block" />
    </section>
  )
}
