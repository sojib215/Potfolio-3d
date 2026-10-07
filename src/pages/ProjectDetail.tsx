import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { getNextProject, getProject } from '@/data/projects'
import InterfacePreview from '@/components/project/InterfacePreview'
import { LineMask, Reveal } from '@/components/ui/Reveal'
import { Action } from '@/components/ui/Button'
import { Marker } from '@/components/ui/SectionHead'
import { usePageMeta } from '@/hooks/usePageMeta'
import NotFound from './NotFound'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'approach', label: 'Approach' },
  { id: 'features', label: 'Key Features' },
  { id: 'stack', label: 'Tech Stack' },
  { id: 'role', label: 'My Role' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'learned', label: 'What I Learned' },
]

function Block({
  id,
  index,
  title,
  children,
}: {
  id: string
  index: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line-soft py-12 md:py-16">
      <div className="flex items-center gap-4">
        <span className="font-mono text-[11px] tracking-[0.18em] text-accent/70">{index}</span>
        <h2 className="text-[13px] font-medium uppercase tracking-[0.18em] text-chalk">{title}</h2>
        <span className="hairline flex-1" />
      </div>
      <div className="mt-7 max-w-[68ch]">{children}</div>
    </section>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  const next = getNextProject(slug)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })

  usePageMeta(project ? `${project.name} — SOJIB` : 'Project — SOJIB', project?.summary)

  if (!project) return <NotFound />

  return (
    <>
      {/* reading progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <article className="relative pt-32 md:pt-40">
        <div className="shell">
          {/* ---- header ---- */}
          <Link
            to="/#projects"
            data-cursor="link"
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim transition-colors hover:text-chalk"
          >
            <span className="transition-transform duration-500 group-hover:-translate-x-1">←</span>
            All projects
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent/70">
              {project.index}
            </span>
            <span className="label">{project.category}</span>
            <span className="hairline flex-1" />
            <span className="label">{project.status}</span>
          </div>

          <h1 className="mt-6 text-[clamp(2.4rem,8vw,5.6rem)] font-medium text-edge text-chalk">
            <LineMask>{project.name}</LineMask>
          </h1>

          <Reveal delay={0.05}>
            <p className="mt-5 max-w-[46ch] text-[18px] font-serif italic text-accent-soft md:text-xl">
              {project.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[64ch] text-[15px] leading-[1.8] text-mute md:text-base">
              {project.summary}
            </p>
          </Reveal>

          {/* ---- meta ---- */}
          <Reveal delay={0.14}>
            <dl className="mt-12 grid gap-px border-y border-line-soft sm:grid-cols-2 lg:grid-cols-4">
              {[
                { k: 'Role', v: project.role },
                { k: 'Status', v: project.status },
                { k: 'Stack', v: project.stack.join(' · ') },
                {
                  k: 'Links',
                  v: project.links.demo
                    ? 'Live demo available'
                    : project.links.github
                      ? 'Source available'
                      : 'Not public yet',
                },
              ].map((item) => (
                <div
                  key={item.k}
                  className="py-6 pr-6 lg:border-r lg:border-line-soft lg:last:border-r-0"
                >
                  <dt className="label">{item.k}</dt>
                  <dd className="mt-3 text-[13.5px] leading-relaxed text-mute">{item.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* ---- actions ---- */}
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.links.demo ? (
                <Action href={project.links.demo} arrow>
                  Live Demo
                </Action>
              ) : null}
              {project.links.github ? (
                <Action href={project.links.github} variant="outline" arrow>
                  GitHub
                </Action>
              ) : null}
              {!project.links.demo && !project.links.github ? (
                <span className="rounded-full border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                  Not public yet
                </span>
              ) : null}
            </div>
          </Reveal>

          {project.note ? (
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[62ch] border-l border-accent/40 pl-5 text-[13.5px] leading-relaxed text-dim">
                {project.note}
              </p>
            </Reveal>
          ) : null}

          {/* ---- interface preview ---- */}
          <Reveal delay={0.1} className="mt-16">
            <figure>
              <div className="relative">
                <Marker className="-left-2 -top-2" />
                <Marker className="-right-2 -top-2" />
                <InterfacePreview
                  kind={project.preview}
                  className="aspect-[16/10] w-full md:aspect-[16/9]"
                />
              </div>
              <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                Interface study — stylised preview of the {project.name} interface
              </figcaption>
            </figure>
          </Reveal>

          {/* ---- body ---- */}
          <div className="mt-8 grid gap-x-12 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <nav className="sticky top-32" aria-label="Case study contents">
                <p className="label">Contents</p>
                <ul className="mt-5 space-y-3">
                  {SECTIONS.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-[13px] text-dim transition-colors duration-300 hover:text-chalk"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <Block id="overview" index="01" title="Overview">
                <p className="text-[15px] leading-[1.85] text-mute md:text-base">
                  {project.summary}
                </p>
              </Block>

              <Block id="problem" index="02" title="The problem">
                <p className="text-[15px] leading-[1.85] text-mute md:text-base">
                  {project.problem}
                </p>
              </Block>

              <Block id="approach" index="03" title="My approach">
                <p className="text-[15px] leading-[1.85] text-mute md:text-base">
                  {project.approach}
                </p>
              </Block>

              <Block id="features" index="04" title="Key Features">
                <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-2.5 h-px w-4 shrink-0 bg-accent/60" />
                      <span className="text-[14px] leading-relaxed text-mute">{feature}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block id="stack" index="05" title="Tech Stack">
                <div className="flex flex-wrap gap-2.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line px-4 py-2 font-mono text-[11px] tracking-[0.1em] text-mute"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Block>

              <Block id="role" index="06" title="My Role">
                <p className="text-[15px] leading-[1.85] text-mute md:text-base">{project.role}</p>
              </Block>

              <Block id="challenges" index="07" title="Challenges">
                <ul className="space-y-5">
                  {project.challenges.map((challenge) => (
                    <li key={challenge} className="flex items-start gap-4">
                      <span className="mt-3 size-1 shrink-0 rounded-full bg-accent/70" />
                      <p className="text-[15px] leading-[1.8] text-mute">{challenge}</p>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block id="learned" index="08" title="What I Learned">
                <ul className="space-y-5">
                  {project.learnings.map((learning) => (
                    <li key={learning} className="flex items-start gap-4">
                      <span className="mt-3 size-1 shrink-0 rounded-full bg-accent/70" />
                      <p className="text-[15px] leading-[1.8] text-mute">{learning}</p>
                    </li>
                  ))}
                </ul>
              </Block>
            </div>
          </div>

          {/* ---- next ---- */}
          <Reveal className="mt-20 border-t border-line-soft pt-12 md:mt-28">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <span className="label">Next project</span>
                <Link
                  to={`/projects/${next.slug}`}
                  data-cursor="project"
                  className="group mt-4 block text-[clamp(1.8rem,5vw,3.4rem)] font-medium tracking-[-0.035em] text-mute transition-colors duration-500 hover:text-chalk"
                >
                  {next.name}
                  <span className="ml-4 inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                    →
                  </span>
                </Link>
              </div>
              <Link
                to="/#projects"
                className="label transition-colors hover:text-chalk"
                data-cursor="link"
              >
                All projects
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  )
}
