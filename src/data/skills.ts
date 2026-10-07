export type SkillGroupId = 'frontend' | 'data' | 'tools' | 'additional'

export interface Skill {
  name: string
  group: SkillGroupId
  /** Honest one-liner: how the technology is actually used. */
  note: string
}

export interface SkillGroup {
  id: SkillGroupId
  label: string
  index: string
  /** Radius used by the orbit visualisation (sv units inside the viewBox). */
  ring: number
  blurb: string
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    index: '01',
    ring: 108,
    blurb: 'Where I spend most of my time — building interfaces that stay clean as they grow.',
  },
  {
    id: 'data',
    label: 'Backend / Data',
    index: '02',
    ring: 186,
    blurb: 'Authentication, cloud data and the queries behind the screens.',
  },
  {
    id: 'tools',
    label: 'Tools',
    index: '03',
    ring: 258,
    blurb: 'The everyday workflow: version control, builds and deployments.',
  },
  {
    id: 'additional',
    label: 'Additional',
    index: '04',
    ring: 300,
    blurb: 'Useful context from other parts of computing.',
  },
]

export const skills: Skill[] = [
  // Frontend
  {
    name: 'React',
    group: 'frontend',
    note: 'Components, hooks and state — the core of almost everything I build.',
  },
  { name: 'TypeScript', group: 'frontend', note: 'Typed props and models so refactors stay safe.' },
  {
    name: 'JavaScript',
    group: 'frontend',
    note: 'The language underneath: DOM, async work, modules.',
  },
  {
    name: 'Tailwind CSS',
    group: 'frontend',
    note: 'Fast, consistent styling with a small design system.',
  },
  { name: 'HTML', group: 'frontend', note: 'Semantic structure that screen readers can follow.' },
  {
    name: 'CSS',
    group: 'frontend',
    note: 'Layout, spacing rhythm and motion that supports content.',
  },

  // Backend / data
  { name: 'Firebase', group: 'data', note: 'Authentication and hosted backend services.' },
  { name: 'Firestore', group: 'data', note: 'Document data modelling for real application data.' },

  // Tools
  { name: 'Git', group: 'tools', note: 'Commits, branches and a readable project history.' },
  {
    name: 'GitHub',
    group: 'tools',
    note: 'Repositories, issues and the public record of my work.',
  },
  { name: 'Vercel', group: 'tools', note: 'Deployments, preview links and environment variables.' },
  { name: 'Vite', group: 'tools', note: 'Local dev server and quick production builds.' },

  // Additional
  {
    name: 'WordPress',
    group: 'additional',
    note: 'Theme-level customisation for content websites.',
  },
  { name: 'Java', group: 'additional', note: 'Object-oriented programming fundamentals (basic).' },
  {
    name: 'Networking',
    group: 'additional',
    note: 'Basic understanding of how requests, DNS and networks behave.',
  },
]

export const headlineStack = ['React', 'TypeScript', 'Tailwind CSS', 'Firebase']
