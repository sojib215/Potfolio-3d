/* Editorial copy blocks for the sections that are not projects or skills. */

export interface AboutBlock {
  index: string
  title: string
  body: string
}

export const aboutIntro = [
  'I’m Habibul Hasan Sojib, a Computer Science & Technology diploma student and frontend developer from Bangladesh. I enjoy turning ideas into practical digital products — especially dashboards, SaaS applications and modern responsive interfaces.',
  'I’m especially interested in React, TypeScript, Tailwind CSS and Firebase, while continuously improving my problem-solving, product thinking and design sense.',
]

export const aboutBlocks: AboutBlock[] = [
  {
    index: '01',
    title: 'Who I am',
    body: 'Diploma CST student + Frontend Developer',
  },
  {
    index: '02',
    title: 'What I build',
    body: 'Web Apps + SaaS + Dashboards',
  },
  {
    index: '03',
    title: 'What I use',
    body: 'React + TypeScript + Tailwind + Firebase',
  },
  {
    index: '04',
    title: 'What I’m improving',
    body: 'Product Thinking + UI Quality + Engineering Skills',
  },
]

/** Specification-sheet rows for the About panel. */
export const aboutSpec = [
  { key: 'Name', value: 'Habibul Hasan Sojib' },
  { key: 'Alias', value: 'SOJIB' },
  { key: 'Based in', value: 'Habiganj, Bangladesh' },
  { key: 'Education', value: 'Diploma in CST — 6th semester' },
  { key: 'Institute', value: 'Habiganj Polytechnic Institute' },
  { key: 'Focus', value: 'Frontend · SaaS · Product UI' },
  { key: 'Status', value: 'Building & learning' },
]

export const whatIBuild = [
  {
    index: '01',
    title: 'Modern Frontend Interfaces',
    body: 'Clean, responsive interfaces with a clear hierarchy — the kind that still reads well three screens later.',
  },
  {
    index: '02',
    title: 'React Web Applications',
    body: 'Component-driven applications with sensible state, routing and structure instead of one long file.',
  },
  {
    index: '03',
    title: 'SaaS Dashboards',
    body: 'Role-aware dashboards where the data, the filters and the empty states are designed together.',
  },
  {
    index: '04',
    title: 'Firebase-powered Apps',
    body: 'Authentication, Firestore data and real user accounts — applications that remember people.',
  },
  {
    index: '05',
    title: 'Responsive Business Websites',
    body: 'Practical websites for real businesses, built to work properly on the phones people actually use.',
  },
  {
    index: '06',
    title: 'Product UI Implementation',
    body: 'Turning an idea or a rough sketch into interfaces that developers can build and users can follow.',
  },
]

export const principles = [
  {
    index: '01',
    title: 'Keep it useful',
    body: 'Design should solve a real problem. If a screen does not help someone do something, it is decoration.',
  },
  {
    index: '02',
    title: 'Keep it clean',
    body: 'Less visual noise, stronger hierarchy. Most of the work is removing things, not adding them.',
  },
  {
    index: '03',
    title: 'Build for real users',
    body: 'Interfaces should feel practical, not just impressive — including on a slow phone and a bad connection.',
  },
  {
    index: '04',
    title: 'Keep learning',
    body: 'Every project should leave me better at something than I was when I started it.',
  },
]
