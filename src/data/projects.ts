/**
 * Projects — every field here is written from what Sojib actually shared.
 * No invented metrics, clients or users. Links are only present where they
 * were provided; everything else renders as an honest "not public yet".
 */

export type PreviewKind =
  'school' | 'expense' | 'dashboard' | 'health' | 'booking' | 'commerce' | 'mess'

export interface Project {
  slug: string
  index: string
  name: string
  category: string
  tagline: string
  summary: string
  featured: boolean
  /** Honest status — never a fake metric. */
  status: string
  role: string
  stack: string[]
  features: string[]
  problem: string
  approach: string
  challenges: string[]
  learnings: string[]
  links: {
    demo?: string
    github?: string
  }
  preview: PreviewKind
  /** Optional honesty note rendered on the detail page. */
  note?: string
}

export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: 'mevo-school',
    index: '01',
    name: 'MEVO School',
    category: 'School Management SaaS',
    tagline: 'School management without the registers.',
    summary:
      'A modern school management platform that brings students, teachers, academic records and everyday administration into one place — so a school spends less time searching for information and more time running itself.',
    featured: true,
    status: 'Actively building',
    role: 'Product thinking, interface design and frontend implementation',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Firestore'],
    features: [
      'Student, teacher and staff records in one system',
      'Class and section structure that mirrors a real school',
      'Academic information that stays connected to each student',
      'Administrative dashboard for the people running the school',
      'Teachers can complete school tasks remotely',
      'Designed as a repeatable SaaS product, not a single-school script',
    ],
    problem:
      'A lot of schools still run on paper: attendance in one register, results in another, notices on a board. Finding a single piece of information can take ten minutes, and if you are not standing in the school you cannot check anything at all.',
    approach:
      'I started from the working day of a school instead of from a feature list. Teachers, students and administrators each get a focused space with the information they need first. Because every record lives in one system, the same student entry feeds the class list, the profile view and the academic records — nothing gets typed twice.',
    challenges: [
      'Modelling a school in data: classes, sections, subjects and academic years are all connected, and the wrong structure makes every screen harder.',
      'Keeping the admin dashboard readable when a school has hundreds of students instead of thirty.',
      'Designing flows that a non-technical member of staff can follow without training.',
    ],
    learnings: [
      'Sketching the data model before the screens saves days of rework.',
      'Clear labels, empty states and a predictable layout matter more than visual polish.',
      'Product thinking is mostly about roles: who is allowed to do what, and in how many steps.',
    ],
    links: { demo: 'https://movoschool.com' },
    preview: 'school',
  },
  /* ------------------------------------------------------------------ */
  {
    slug: 'spendly',
    index: '02',
    name: 'Spendly',
    category: 'Expense Tracker / SaaS-style Web App',
    tagline: 'Know where the month went.',
    summary:
      'A personal expense tracker built as a real product: quick daily entries, a monthly overview, PDF reports and Firebase accounts so the data belongs to the user, not the browser.',
    featured: true,
    status: 'Live',
    role: 'Product design, frontend build, Firebase integration and deployment',
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Firestore'],
    features: [
      'Fast daily expense entry',
      'Monthly overview built from the same data',
      'PDF report export',
      'Firebase authentication with private data',
      'Firestore storage that syncs across devices',
      'Product UI that stays usable on a phone',
    ],
    problem:
      'I was writing expenses in a notebook and still could not see the pattern at the end of the month. I wanted the daily picture and the monthly picture at the same time — and a report I could actually hand to someone.',
    approach:
      'I built it like a product rather than a demo. Authentication first, then a Firestore structure where a month is one cheap query instead of a full collection scan, then the interface: an entry form that takes seconds, an overview underneath it, and a PDF export generated from the same data the screen shows.',
    challenges: [
      'Shaping Firestore documents so monthly totals do not require reading every expense ever written.',
      'Generating a PDF that looks like the application instead of a raw table dump.',
      'Keeping data entry fast on a small screen, where most expenses actually happen.',
    ],
    learnings: [
      'Query patterns should drive the data structure, not the other way around.',
      'Authentication changes how you design every screen that follows it.',
      'The parts users notice most are the boring ones working reliably: saving, loading, syncing.',
    ],
    links: { demo: 'https://spendly-sigma-two.vercel.app' },
    preview: 'expense',
  },
  /* ------------------------------------------------------------------ */
  {
    slug: 'school-management-system',
    index: '03',
    name: 'School Management System',
    category: 'Education Management System',
    tagline: 'The administrative side of a school, structured.',
    summary:
      'A dashboard-focused system for students, classes, sections and academic records — built to work through real administrative workflows like promotion and class-based filtering.',
    featured: true,
    status: 'Ongoing',
    role: 'Database structure, dashboard UI and workflow logic',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Firestore'],
    features: [
      'Student management with individual profiles',
      'Class and section management',
      'GPA and academic information',
      'Administrative dashboard',
      'Class-based filtering',
      'Student promotion workflow',
    ],
    problem:
      'A class is not one list. It is students, sections, academic records and an end-of-year promotion — and spreadsheets start to break the moment two people need the same information at once.',
    approach:
      'Database first. Students, classes, sections and academic records are separate but linked, so promotion can move a whole section forward without rewriting history. The dashboard was then built around the questions an administrator actually asks: who is in this section, who is being promoted, what changed this term.',
    challenges: [
      'Promotion logic: moving an entire section forward while keeping previous records intact.',
      'Filtering large student lists without making the interface feel slow.',
      'Structuring academic data so it can be both displayed and edited safely.',
    ],
    learnings: [
      'Relational thinking still applies inside a document database.',
      'Admin interfaces win on density and clarity, not decoration.',
      'Every extra field you store is a report you can build later — or a mess you have to maintain.',
    ],
    links: {},
    preview: 'dashboard',
  },
  /* ------------------------------------------------------------------ */
  {
    slug: 'student-expense-tracker',
    index: '04',
    name: 'Student Expense Tracker',
    category: 'Expense Management Web App',
    tagline: 'A student month, on one page.',
    summary:
      'A focused expense tracker for student life — daily records, monthly totals, PDF downloads and a cloud database so nothing disappears when the browser is cleared.',
    featured: true,
    status: 'Public repository',
    role: 'Full frontend build, Firebase integration and UI design',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    features: [
      'Daily expense records',
      'Monthly tracking and totals',
      'PDF download',
      'Delete confirmation before anything is removed',
      'Authentication',
      'Cloud database storage',
    ],
    problem:
      'Small daily spending is exactly what breaks a student budget, and it is the part nobody remembers at the end of the month.',
    approach:
      'Keep the entry step to a few fields, put the monthly summary directly below it, and store everything in Firestore behind authentication so the records survive a new phone or a cleared cache. Deleting asks first — a month of data should not disappear on a mis-click.',
    challenges: [
      'Making totals trustworthy: one wrong aggregation and the whole app feels broken.',
      'Designing a delete flow that is quick but never accidental.',
      'Keeping the interface calm while it handles a long list of small entries.',
    ],
    learnings: [
      'Write the summary logic before the form — it decides what you need to store.',
      'Confirmations are a feature when the data is personal.',
      'Shipping a small, finished tool teaches more than starting a large unfinished one.',
    ],
    links: { github: 'https://github.com/sojib215/student-expense-tracker' },
    preview: 'expense',
  },
  /* ------------------------------------------------------------------ */
  {
    slug: 'doctalk',
    index: '05',
    name: 'DocTalk',
    category: 'Healthcare UI Concept',
    tagline: 'A calmer way to read a busy dashboard.',
    summary:
      'A structured interface study for appointment-style workflows — how a healthcare dashboard can present schedules, records and status clearly without becoming noise.',
    featured: false,
    status: 'Interface concept',
    role: 'Interface structure, layout system and UI design',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'Appointment-oriented layout',
      'Consistent status language across screens',
      'Dashboard hierarchy with one primary action per view',
      'Record-style list views',
    ],
    problem:
      'Healthcare interfaces are usually dense. I wanted to see how much calm a strict grid, a limited palette and clear status language can bring to a screen that is full of information.',
    approach:
      'Hierarchy before decoration. One primary action per screen, status expressed the same way everywhere, and a layout that still holds up when a list grows from five rows to fifty.',
    challenges: [
      'Fitting a lot of information on one screen without shrinking the type.',
      'Designing status states that read correctly at a glance.',
    ],
    learnings: [
      'Repetition is what makes a dense interface feel simple.',
      'Restraint with colour does more for clarity than any visual effect.',
    ],
    links: {},
    preview: 'health',
    note: 'Concept work. This is an interface and structure study — not a production healthcare system, and it makes no medical claims.',
  },
  /* ------------------------------------------------------------------ */
  {
    slug: 'royalstay',
    index: '06',
    name: 'RoyalStay',
    category: 'Hospitality / Booking Website',
    tagline: 'From listing to confirmation, without friction.',
    summary:
      'A hospitality website concept focused on information architecture and a booking flow that stays readable on a phone.',
    featured: false,
    status: 'Concept / UI work',
    role: 'Information architecture, responsive UI and booking flow design',
    stack: ['React', 'Tailwind CSS', 'TypeScript'],
    features: [
      'Property and room presentation',
      'Booking-oriented user flow',
      'Responsive layout from mobile up',
      'Clear pricing and availability hierarchy',
    ],
    problem:
      'Booking sites often bury the two things a visitor came for: what the place actually is, and how to reserve it.',
    approach:
      'Give the property room to breathe, then keep the booking action visible but never in the way. Every screen answers one question and points to the next.',
    challenges: [
      'Keeping the booking action reachable on mobile without covering the content.',
      'Presenting availability in a way that reads at a glance.',
    ],
    learnings: [
      'Information architecture is a design decision, not a content task.',
      'A booking flow is a conversation — one question per step.',
    ],
    links: {},
    preview: 'booking',
  },
  /* ------------------------------------------------------------------ */
  {
    slug: 'nexora',
    index: '07',
    name: 'Nexora',
    category: 'Clothing / E-commerce Concept',
    tagline: 'Product-first fashion interface.',
    summary:
      'An e-commerce concept for a clothing brand: product presentation, collection structure and a visual identity that holds together from desktop down to mobile.',
    featured: false,
    status: 'Concept / UI work',
    role: 'Visual branding, product layout and responsive frontend',
    stack: ['React', 'Tailwind CSS', 'JavaScript'],
    features: [
      'Product grid and detail layout',
      'Collection structure',
      'Consistent visual branding',
      'Responsive product presentation',
    ],
    problem:
      'Clothing sells on presentation. A generic product grid makes a good catalogue look like every other store.',
    approach:
      'Start from the product photography and build the layout around it — generous spacing, one accent colour, and typography that does not compete with the images.',
    challenges: [
      'Designing a grid that works for both portrait and landscape product images.',
      'Keeping the brand voice consistent across many screens with very little text.',
    ],
    learnings: [
      'In commerce, the image is the interface — everything else supports it.',
      'A tight type scale makes a simple layout feel deliberate.',
    ],
    links: {},
    preview: 'commerce',
  },
  /* ------------------------------------------------------------------ */
  {
    slug: 'sojib-store',
    index: '08',
    name: 'Sojib Store',
    category: 'Local E-commerce Project',
    tagline: 'Online selling, built for how it works here.',
    summary:
      'A local Bangladeshi e-commerce interface designed around real buying habits: cash on delivery, bKash / Nagad / Rocket payments and WhatsApp or SMS follow-up instead of a card-only checkout.',
    featured: false,
    status: 'Concept / UI work',
    role: 'Interface design, product flow and responsive frontend',
    stack: ['React', 'Tailwind CSS', 'JavaScript'],
    features: [
      'Cash on delivery checkout',
      'bKash / Nagad / Rocket payment options',
      'WhatsApp and SMS based order communication',
      'Local delivery positioning',
      'Simple product catalogue',
    ],
    problem:
      'Most e-commerce templates assume card payments and an email funnel. In a lot of Bangladeshi markets the order actually happens over WhatsApp, is paid on delivery or through mobile banking, and is confirmed by a phone call.',
    approach:
      'Design the checkout around the local reality. Mobile banking and cash on delivery are first-class options, order confirmation can happen over WhatsApp or SMS, and delivery expectations are stated in plain language instead of buried in a policy page.',
    challenges: [
      'Fitting several payment paths into one checkout without confusing the buyer.',
      'Making an order flow that works when half of it happens in a chat app.',
    ],
    learnings: [
      'Local context is a real design constraint, not a translation task.',
      'Trust is the hardest part of commerce UI — clarity builds it faster than badges do.',
    ],
    links: {},
    preview: 'commerce',
  },
  /* ------------------------------------------------------------------ */
  {
    slug: 'belal-mess',
    index: '09',
    name: 'Belal Mess',
    category: 'Local Service / Management Platform',
    tagline: 'Software for a problem on my own street.',
    summary:
      'A management concept for student messes and shared accommodation — members, meals, dues and notices in one place instead of on a paper noticeboard.',
    featured: false,
    status: 'Concept / UI work',
    role: 'Workflow thinking, data structure and interface design',
    stack: ['React', 'Tailwind CSS', 'Firebase'],
    features: [
      'Member records',
      'Monthly meal and dues tracking',
      'Notice surface for announcements',
      'Simple manager dashboard',
    ],
    problem:
      'Student messes usually run on paper and memory: who paid this month, who is eating, what the meal count is. Disputes come from missing records, not bad intentions.',
    approach:
      'Start from the mess manager’s week rather than a feature list: a member list, a monthly sheet, and one obvious place to post a notice. Everything else can wait.',
    challenges: [
      'Modelling a monthly cycle where members join and leave mid-month.',
      'Keeping the interface simple enough for a first-time computer user.',
    ],
    learnings: [
      'Local problems are the best practice ground — the feedback is immediate.',
      'Software for real people has to survive being used badly.',
    ],
    links: {},
    preview: 'mess',
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const secondaryProjects = projects.filter((p) => !p.featured)

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug)

export const getNextProject = (slug?: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return projects[0]
  return projects[(i + 1) % projects.length]
}
