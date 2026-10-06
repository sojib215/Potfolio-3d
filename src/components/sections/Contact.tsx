import { LineMask, Reveal } from '@/components/ui/Reveal'
import { SectionHead } from '@/components/ui/SectionHead'
import { Action } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { isPlaceholder, profile } from '@/data/profile'
import { cn } from '@/lib/utils'

export default function Contact() {
  const { email, github, linkedin } = profile.contact

  const rows = [
    {
      label: 'Email',
      value: email.replace('mailto:', ''),
      href: `mailto:${email.replace('mailto:', '')}`,
      key: 'email' as const,
    },
    { label: 'GitHub', value: 'github.com/sojib215', href: github, key: 'github' as const },
    { label: 'LinkedIn', value: 'LinkedIn profile', href: linkedin, key: 'linkedin' as const },
  ]

  return (
    <section id="contact" className="relative border-t border-line-soft py-24 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(76,141,255,0.10),transparent_70%)]" />

      <div className="shell relative">
        <SectionHead
          index="07"
          label="Contact"
          title={
            <>
              <LineMask>Have an idea</LineMask>
              <LineMask delay={0.08}>
                <span className="font-serif italic text-accent-soft">worth building?</span>
              </LineMask>
            </>
          }
          description="Let’s turn it into something useful, clear and well-designed."
        />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* ---- CTA ---- */}
          <div className="lg:col-span-6">
            <Reveal delay={0.05}>
              <div className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" />
                <span className="label">{profile.status}</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8">
                <Magnetic>
                  <Action href={`mailto:${email}`} arrow data-cursor="link">
                    Let’s Work Together
                  </Action>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[42ch] text-[14.5px] leading-[1.75] text-mute">
                I’m open to internships, freelance frontend work, collaborations and product ideas
                that need a careful interface. Tell me what you are building and what it needs to
                do.
              </p>
            </Reveal>
          </div>

          {/* ---- details ---- */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.08}>
              <div className="border-t border-line-soft">
                {rows.map((row) => {
                  const placeholder = isPlaceholder(row.key)
                  return (
                    <a
                      key={row.label}
                      href={row.href}
                      target={row.href.startsWith('http') ? '_blank' : undefined}
                      rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      data-cursor="link"
                      title={
                        placeholder
                          ? 'Placeholder — replace this in src/data/profile.ts'
                          : undefined
                      }
                      className="group flex items-center justify-between gap-6 border-b border-line-soft py-5"
                    >
                      <span className="label">{row.label}</span>
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            'text-[14px] text-mute transition-colors duration-500 group-hover:text-chalk',
                            placeholder && 'border-b border-dashed border-faint',
                          )}
                        >
                          {row.value}
                        </span>
                        <span className="text-faint transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </span>
                    </a>
                  )
                })}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                <span>Based in Bangladesh</span>
                <span>{profile.coords}</span>
                <span>GMT +6</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
