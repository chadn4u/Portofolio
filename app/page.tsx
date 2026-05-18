import ClientBackground from '@/components/ui/ClientBackground'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import projectsData from '@/data/projects.json'
import type { Project } from '@/lib/types'

export default function Home() {
  return (
    <>
      <ClientBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects projects={projectsData as Project[]} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
