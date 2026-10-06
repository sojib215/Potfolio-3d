import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'
import InterfacePreview from './InterfacePreview'
import { Tilt } from '@/components/ui/Tilt'
import { Reveal } from '@/components/ui/Reveal'
import { Marker } from '@/components/ui/SectionHead'
import { cn } from '@/lib/utils'

interface Props {
  project: Project
  /** Flips the composition so the section never feels like a grid. */
  reversed?: boolean
}

export default function FeaturedProject({ project, reversed = false }: Props) {
  const navigate = useNavigate()
  const open = () => navigate(`/projects/${project.slug}`)

  return (
    <article className="relative">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---- visual ---- */}
        <Reveal
          className={cn(
            'lg:col-span-7',
            reversed ? 'lg:order-2 lg:col-start-6' : 'lg:order-1 lg:col-start-1',
          )}
        >
          <Tilt max={5}>
            <button
              type="button"
              onClick={open}
              data-cursor="project"
              aria-label={`Open the ${project.name} case study`}
              className="group relative block w-full text-left"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] border border-line bg-abyss transition-colors duration-700 group-hover:border-line/80">
                <InterfacePreview
                  kind={project.preview}
                  className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] group-hover:-translate-y-1"
                />
                <div className="pointer-events-none absolute inset-0 bg-void/25 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <Marker className="left-3 top-3 opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
                <Marker className="right-3 top-3 opacity-0 transition-opacity duration-500 group-hover:opacity-60" />

                <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
                  <span className="rounded-[2px] border border-white/15 bg-void/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-chalk backdrop-blur-sm">
                    View case study
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-dim">
                    {project.index} / 09
                  </span>
                </div>
              </div>
            </button>
          </Tilt>
        </Reveal>

        {/* ---- text ---- */}
        <div
          className={cn(
            'lg:col-span-5',
            reversed ? 'lg:order-1 lg:col-start-1 lg:row-start-1' : 'lg:order-2 lg:col-start-8',
          )}
        >
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.18em] text-accent/70">
                {project.index}
              </span>
              <span className="hairline flex-1" />
              <span className="label">{project.category}</span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h3 className="mt-6 text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-[1.05] tracking-[-0.035em] text-chalk">
              {project.name}
            </h3>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-3 text-[17px] font-serif italic text-accent-soft">{project.tagline}</p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-[48ch] text-[14.5px] leading-[1.75] text-mute">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {project.features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[13px] text-dim">
                  <span className="mt-[7px] h-px w-3 shrink-0 bg-accent/50" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 border-t border-line-soft pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                My role
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-mute">{project.role}</p>

              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-dim"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <motion.button
                type="button"
                onClick={open}
                data-cursor="link"
                className="group inline-flex items-center gap-2 text-[13px] font-medium text-chalk"
              >
                <span className="wipe">Read case study</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                >
                  <path
                    d="M2 7h9.5M7.5 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="square"
                  />
                </svg>
              </motion.button>

              {project.links.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group inline-flex items-center gap-2 text-[13px] text-mute transition-colors hover:text-chalk"
                >
                  <span className="wipe">Live demo</span>
                  <span className="text-faint transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ) : null}

              {project.links.github ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group inline-flex items-center gap-2 text-[13px] text-mute transition-colors hover:text-chalk"
                >
                  <span className="wipe">GitHub</span>
                  <span className="text-faint transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  )
}
