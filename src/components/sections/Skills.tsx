import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Marker, SectionHead } from '@/components/ui/SectionHead'
import { LineMask } from '@/components/ui/Reveal'
import { Reveal } from '@/components/ui/Reveal'
import { skillGroups, skills, headlineStack, type SkillGroupId } from '@/data/skills'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

const SIZE = 880
const CENTER = SIZE / 2

interface Node {
  name: string
  note: string
  group: SkillGroupId
  x: number
  y: number
  side: 'start' | 'middle' | 'end'
  lx: number
  ly: number
}

function buildNodes(): Node[] {
  return skillGroups.flatMap((ring, gi) => {
    const items = skills.filter((s) => s.group === ring.id)
    return items.map((skill, si) => {
      const spread = 360 / items.length
      const deg = spread * si - 90 + gi * 22
      const rad = (deg * Math.PI) / 180
      const cos = Math.cos(rad)
      const sin = Math.sin(rad)
      const x = cos * ring.ring
      const y = sin * ring.ring
      const side: Node['side'] = cos > 0.2 ? 'start' : cos < -0.2 ? 'end' : 'middle'
      const offset = 26
      return {
        name: skill.name,
        note: skill.note,
        group: skill.group,
        x,
        y,
        side,
        lx: x + cos * offset,
        ly: y + sin * offset,
      }
    })
  })
}

export default function Skills() {
  const [active, setActive] = useState<SkillGroupId>('frontend')
  const [hovered, setHovered] = useState<string | null>(null)
  const isMobile = useIsMobile()

  const nodes = useMemo(buildNodes, [])
  const activeGroup = skillGroups.find((g) => g.id === active) ?? skillGroups[0]
  const hoveredSkill = hovered ? nodes.find((n) => n.name === hovered) : undefined

  return (
    <section id="skills" className="relative border-t border-line-soft py-24 md:py-32 lg:py-40">
      <div className="shell">
        <SectionHead
          index="02"
          label="Skills"
          title={
            <>
              <LineMask>A stack I use every day,</LineMask>
              <LineMask delay={0.08}>
                <span className="font-serif italic text-accent-soft">not a logo wall.</span>
              </LineMask>
            </>
          }
          description="Hover or focus a node to see how I actually use it. No percentages — just the tools I build with and the ones I am still growing into."
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* ---- group selector ---- */}
          <div className="lg:col-span-3">
            <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {skillGroups.map((group) => {
                const isActive = group.id === active
                return (
                  <li key={group.id} className="lg:border-b lg:border-line-soft">
                    <button
                      type="button"
                      onClick={() => setActive(group.id)}
                      onMouseEnter={() => setActive(group.id)}
                      data-cursor="link"
                      aria-pressed={isActive}
                      className={cn(
                        'group flex w-full items-center gap-3 rounded-full border px-4 py-2 text-left transition-colors duration-500 lg:rounded-none lg:border-0 lg:px-0 lg:py-5',
                        isActive
                          ? 'border-accent/40 text-chalk'
                          : 'border-line text-dim hover:text-mute lg:hover:text-chalk',
                      )}
                    >
                      <span
                        className={cn(
                          'font-mono text-[10px] tracking-[0.18em] transition-colors',
                          isActive ? 'text-accent' : 'text-faint',
                        )}
                      >
                        {group.index}
                      </span>
                      <span className="text-sm font-medium tracking-[-0.01em]">{group.label}</span>
                      <span
                        className={cn(
                          'ml-auto hidden h-px bg-accent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block',
                          isActive ? 'w-10' : 'w-0',
                        )}
                      />
                    </button>
                  </li>
                )
              })}
            </ul>

            <Reveal delay={0.1} className="mt-8 hidden lg:block">
              <p className="max-w-[24ch] text-[13px] leading-relaxed text-dim">
                {activeGroup.blurb}
              </p>
            </Reveal>
          </div>

          {/* ---- visualisation ---- */}
          <div className="lg:col-span-9">
            {isMobile ? (
              <SkillLists />
            ) : (
              <div className="relative mx-auto w-full max-w-[660px]">
                <svg
                  viewBox={`0 0 ${SIZE} ${SIZE}`}
                  className="w-full"
                  role="img"
                  aria-label="Skill map: frontend technologies closest to the core, then data, tools and additional skills."
                >
                  {/* rings */}
                  {skillGroups.map((group) => (
                    <circle
                      key={group.id}
                      cx={CENTER}
                      cy={CENTER}
                      r={group.ring}
                      fill="none"
                      stroke={
                        group.id === active ? 'rgba(76,141,255,0.28)' : 'rgba(255,255,255,0.055)'
                      }
                      strokeWidth={1}
                      className="transition-colors duration-700"
                    />
                  ))}

                  {/* core */}
                  <circle cx={CENTER} cy={CENTER} r={7} fill="#4c8dff" />
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={20}
                    fill="none"
                    stroke="rgba(76,141,255,0.22)"
                  />
                  <text
                    x={CENTER}
                    y={CENTER + 44}
                    textAnchor="middle"
                    className="fill-faint font-mono"
                    style={{ fontSize: 15, letterSpacing: '0.22em' }}
                  >
                    CORE
                  </text>

                  {/* connectors + nodes */}
                  {nodes.map((node, i) => {
                    const dim = node.group !== active
                    const isHot = hovered === node.name
                    return (
                      <motion.g
                        key={node.name}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-15%' }}
                        transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <g opacity={dim ? 0.32 : 1} style={{ transition: 'opacity 600ms' }}>
                          <line
                            x1={CENTER}
                            y1={CENTER}
                            x2={CENTER + node.x}
                            y2={CENTER + node.y}
                            stroke={isHot ? 'rgba(76,141,255,0.65)' : 'rgba(255,255,255,0.08)'}
                            strokeWidth={1}
                          />
                          <circle
                            cx={CENTER + node.x}
                            cy={CENTER + node.y}
                            r={isHot ? 8 : 5}
                            fill={isHot ? '#4c8dff' : node.group === active ? '#e8e8ec' : '#4d4d57'}
                            className="transition-all duration-300"
                          />
                          {isHot ? (
                            <circle
                              cx={CENTER + node.x}
                              cy={CENTER + node.y}
                              r={16}
                              fill="none"
                              stroke="rgba(76,141,255,0.35)"
                            />
                          ) : null}
                          <text
                            x={CENTER + node.lx}
                            y={CENTER + node.ly}
                            textAnchor={node.side}
                            dominantBaseline="middle"
                            className={cn(
                              'font-medium transition-colors duration-300',
                              isHot ? 'fill-chalk' : dim ? 'fill-faint' : 'fill-mute',
                            )}
                            style={{ fontSize: 19, letterSpacing: '-0.01em' }}
                          >
                            {node.name}
                          </text>
                        </g>
                      </motion.g>
                    )
                  })}
                </svg>

                {/* accessible hit areas */}
                <div className="pointer-events-none absolute inset-0">
                  {nodes.map((node) => (
                    <button
                      key={node.name}
                      type="button"
                      data-cursor="link"
                      aria-label={`${node.name} — ${node.note}`}
                      onMouseEnter={() => setHovered(node.name)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => {
                        setHovered(node.name)
                        setActive(node.group)
                      }}
                      onBlur={() => setHovered(null)}
                      className="pointer-events-auto absolute size-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{
                        left: `${50 + (node.x / SIZE) * 100}%`,
                        top: `${50 + (node.y / SIZE) * 100}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* readout */}
            <div className="mt-10 min-h-[92px] border-t border-line-soft pt-6 md:mt-6">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent/70">
                  {hoveredSkill ? 'Skill' : activeGroup.index}
                </span>
                <h3 className="text-xl font-medium tracking-[-0.02em] text-chalk">
                  {hoveredSkill?.name ?? activeGroup.label}
                </h3>
              </div>
              <p className="mt-3 max-w-[58ch] text-[14px] leading-relaxed text-mute">
                {hoveredSkill?.note ?? activeGroup.blurb}
              </p>
            </div>
          </div>
        </div>

        {/* ---- honest hierarchy footnote ---- */}
        <Reveal className="mt-16 flex flex-col gap-4 border-t border-line-soft pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            Primary · {headlineStack.join(' · ')}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            Secondary · WordPress · Java · Networking
          </p>
        </Reveal>

        <Marker className="bottom-10 left-6 hidden lg:block" />
      </div>
    </section>
  )
}

/** Compact, keyboard-friendly version for small screens. */
function SkillLists() {
  return (
    <div className="grid gap-8">
      {skillGroups.map((group) => (
        <div key={group.id}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.18em] text-accent/70">
              {group.index}
            </span>
            <h3 className="text-sm font-medium tracking-[0.01em] text-chalk">{group.label}</h3>
            <span className="hairline flex-1" />
          </div>
          <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {skills
              .filter((s) => s.group === group.id)
              .map((skill) => (
                <li key={skill.name} className="border-l border-line pl-4">
                  <p className="text-sm text-chalk">{skill.name}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-dim">{skill.note}</p>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
