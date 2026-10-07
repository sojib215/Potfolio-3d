import { LineMask, Reveal } from '@/components/ui/Reveal'
import { Marker, SectionHead } from '@/components/ui/SectionHead'
import FeaturedProject from '@/components/project/FeaturedProject'
import ProjectIndex from '@/components/project/ProjectIndex'
import { featuredProjects, secondaryProjects } from '@/data/projects'

export default function Projects() {
  return (
    <section id="projects" className="relative border-t border-line-soft py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHead
          index="03"
          label="Selected Work"
          title={
            <>
              <LineMask>Products I’m building,</LineMask>
              <LineMask delay={0.08}>
                not <span className="font-serif italic text-accent-soft">tutorial clones.</span>
              </LineMask>
            </>
          }
          description="Four projects I have put real time into, followed by smaller studies. Open any of them for the full case study — the problem, the approach and what it taught me."
        />

        {/* ---- featured ---- */}
        <div className="mt-20 divide-y divide-line-soft lg:mt-28">
          {featuredProjects.map((project, i) => (
            <div key={project.slug} className="py-16 first:pt-4 lg:py-24 lg:first:pt-0">
              <FeaturedProject project={project} reversed={i % 2 === 1} />
            </div>
          ))}
        </div>

        {/* ---- secondary ---- */}
        <div className="mt-24 lg:mt-32">
          <Reveal className="flex items-center gap-4">
            <span className="label">Also building</span>
            <span className="hairline flex-1" />
            <span className="label">{secondaryProjects.length} projects</span>
          </Reveal>

          <div className="mt-10">
            <ProjectIndex items={secondaryProjects} />
          </div>
        </div>
      </div>

      <Marker className="right-6 top-32 hidden lg:block" />
    </section>
  )
}
