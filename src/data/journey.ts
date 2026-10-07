export interface JourneyStep {
  period: string
  title: string
  body: string
  /** Marks the step that is happening right now. */
  current?: boolean
}

export const journey: JourneyStep[] = [
  {
    period: '2023',
    title: 'Completed SSC',
    body: 'Finished secondary school and chose the technical path — a diploma instead of the usual route, because I wanted to start building things sooner.',
  },
  {
    period: '2023 — Present',
    title: 'Diploma in Computer Science & Technology',
    body: 'Habiganj Polytechnic Institute, Bangladesh. Currently studying in the 6th semester, with programming, databases and networking alongside the frontend work I do on my own.',
  },
  {
    period: 'Now',
    title: 'Frontend, React and SaaS products',
    body: 'Building real applications instead of only following tutorials: React and TypeScript interfaces, Tailwind CSS design systems, and Firebase-backed products like MEVO School and Spendly.',
    current: true,
  },
  {
    period: 'Next',
    title: 'Keep going deeper',
    body: 'Continue growing as a software developer, take on more complex products, and pursue higher studies and wider opportunities in technology.',
  },
]
