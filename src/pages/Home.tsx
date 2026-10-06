import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import WhatIBuild from '@/components/sections/WhatIBuild'
import HowIBuild from '@/components/sections/HowIBuild'
import Journey from '@/components/sections/Journey'
import Contact from '@/components/sections/Contact'
import { usePageMeta } from '@/hooks/usePageMeta'

export default function Home() {
  usePageMeta(
    'SOJIB — Frontend Developer & SaaS Builder',
    'Habibul Hasan Sojib (SOJIB) — CST diploma student and frontend developer from Bangladesh building modern React, TypeScript and Firebase applications, including the MEVO School management SaaS and Spendly expense tracker.',
  )

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <WhatIBuild />
      <HowIBuild />
      <Journey />
      <Contact />
    </>
  )
}
