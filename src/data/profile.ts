/* ------------------------------------------------------------------
   Profile — single source of truth for identity + contact details.

   TODO (Sojib): replace the two placeholder values below with your real
   email address and LinkedIn profile URL. They are marked with
   `placeholder: true` so the UI can render them honestly instead of
   inventing links.
------------------------------------------------------------------- */

export const profile = {
  name: 'Habibul Hasan Sojib',
  displayName: 'SOJIB',
  role: 'Frontend Developer',
  positioning: 'Frontend Developer • SaaS Builder',
  positioningLong: 'Frontend Developer • React Developer • SaaS Builder • Creative Web Developer',

  location: 'Bangladesh',
  city: 'Habiganj',
  coords: '24.3745° N, 91.4100° E',
  timezone: 'Asia/Dhaka',
  status: 'Currently building & learning',

  education: {
    program: 'Diploma in Computer Science & Technology (CST)',
    semester: '6th semester',
    institute: 'Habiganj Polytechnic Institute',
    ssc: 'SSC completed in 2023',
  },

  contact: {
    email: 'your.email@example.com',
    github: 'https://github.com/sojib215',
    linkedin: 'https://www.linkedin.com/',
    /** Fields listed here are rendered as honest placeholders, not fake links. */
    placeholder: ['email', 'linkedin'] as const,
  },
} as const

export const isPlaceholder = (key: 'email' | 'linkedin' | 'github') =>
  (profile.contact.placeholder as readonly string[]).includes(key)

export const navItems = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Journey', href: '/#journey' },
  { label: 'Contact', href: '/#contact' },
] as const
