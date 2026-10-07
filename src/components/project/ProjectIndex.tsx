import { Link } from 'react-router-dom'
import type { Project } from '@/data/projects'
import InterfacePreview from './InterfacePreview'
import { Reveal } from '@/components/ui/Reveal'

/** Editorial index of the secondary projects — rows, not cards. */
export default function ProjectIndex({ items }: { items: Project[] }) {
  return (
    <ul className="border-b border-line-soft">
      {items.map((project, i) => (
        <li
          key={project.slug}
          className="group relative border-t border-line-soft first:border-t-0"
        >
          <Reveal delay={i * 0.04} y={16}>
            <span className="absolute left-0 top-0 h-px w-0 bg-accent/60 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />

            <Link
              to={`/projects/${project.slug}`}
              data-cursor="project"
              className="relative flex items-center gap-5 py-7 pr-2 md:gap-8"
            >
              <span className="w-8 shrink-0 font-mono text-[11px] tracking-[0.16em] text-faint transition-colors duration-500 group-hover:text-accent">
                {project.index}
              </span>

              <h3 className="text-[clamp(1.35rem,3.2vw,2.1rem)] font-medium tracking-[-0.03em] text-mute transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-chalk">
                {project.name}
              </h3>

              <span className="ml-auto hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-faint md:block">
                {project.category}
              </span>

              <span className="flex shrink-0 items-center gap-3">
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-dim opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block">
                  View
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                  className="text-faint transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-accent"
                >
                  <path
                    d="M2 7h9.5M7.5 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </Link>

            {/* peek preview — desktop only */}
            <div className="pointer-events-none absolute right-20 top-1/2 hidden h-[104px] w-[168px] -translate-y-1/2 scale-95 opacity-0 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100 xl:block">
              <InterfacePreview kind={project.preview} className="h-full w-full" />
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
