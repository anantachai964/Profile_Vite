import { useEffect } from "react"
import Lenis from "lenis"
import { profile } from "@/data/profile"
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"
import { Projects } from "@/components/Projects"
import { TechStack } from "@/components/TechStack"
import { Contact } from "@/components/Contact"

function App() {
  // Smooth scrolling, including nav anchor links
  useEffect(() => {
    const lenis = new Lenis({ anchors: { offset: -80 } })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-svh bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <TechStack />
        <Contact />
      </main>
      <footer className="border-t py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  )
}

export default App
