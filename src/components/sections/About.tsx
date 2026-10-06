import { LineMask, Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { Marker, SectionHead } from '@/components/ui/SectionHead'
import { aboutBlocks, aboutIntro, aboutSpec } from '@/data/content'
import { profile } from '@/data/profile'

export default function About() {
  return (
    <section id="about" className="relative border-t border-line-soft py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHead
          index="01"
          label="About"
          title={
            <>
              <LineMask>Turning ideas into</LineMask>
              <LineMask delay={0.08}>
                <span className="font-serif italic text-accent-soft">practical</span> digital
                products.
              </LineMask>
            </>
          }
          description="A short version of who I am, what I build and what I am working on right now."
        />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* ---- writing ---- */}
          <div className="lg:col-span-7">
            <RevealGroup stagger={0.12}>
              {aboutIntro.map((paragraph, i) => (
                <RevealItem key={i}>
                  <p
                    className={
                      i === 0
                        ? 'text-[17px] leading-[1.75] text-chalk md:text-lg'
                        : 'mt-6 text-[15px] leading-[1.8] text-mute md:text-base'
                    }
                  >
                    {paragraph}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
              <span className="label">Habiganj Polytechnic Institute</span>
              <span className="label">6th Semester · CST</span>
              <span className="label">Bangladesh</span>
            </Reveal>
          </div>

          {/* ---- specification sheet ---- */}
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <div className="relative border border-line bg-ink/40 p-6 backdrop-blur-[2px] md:p-7">
              <Marker className="-left-1.5 -top-1.5" />
              <Marker className="-right-1.5 -top-1.5" />
              <Marker className="-bottom-1.5 -left-1.5" />
              <Marker className="-bottom-1.5 -right-1.5" />

              <div className="flex items-center justify-between border-b border-line-soft pb-4">
                <span className="label">Profile</span>
                <span className="font-mono text-[10px] tracking-[0.14em] text-faint">
                  ID / {profile.displayName}
                </span>
              </div>

              <dl className="mt-5 space-y-3.5">
                {aboutSpec.map((row) => (
                  <div key={row.key} className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      {row.key}
                    </dt>
                    <dd className="text-right text-[13px] text-mute">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex items-center gap-2 border-t border-line-soft pt-5">
                <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
                  {profile.status}
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ---- numbered blocks ---- */}
        <div className="mt-20 grid gap-px border-t border-line-soft sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {aboutBlocks.map((block, i) => (
            <Reveal
              key={block.index}
              delay={i * 0.07}
              className="group relative border-b border-line-soft py-8 pr-6 lg:border-b-0 lg:border-r lg:border-line-soft lg:last:border-r-0"
            >
              <span className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent/70">
                {block.index}
              </span>
              <h3 className="mt-5 text-lg font-medium tracking-[-0.02em] text-chalk">
                {block.title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-mute">{block.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
