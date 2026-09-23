import { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { motion } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { navLinks } from "@/data/profile"

function getInitialDark() {
  try {
    const saved = localStorage.getItem("theme")
    if (saved) return saved === "dark"
  } catch {
    // ignore storage errors
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function Navbar() {
  const [dark, setDark] = useState(getInitialDark)
  const [active, setActive] = useState(navLinks[0].href)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    try {
      localStorage.setItem("theme", dark ? "dark" : "light")
    } catch {
      // ignore storage errors
    }
  }, [dark])

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    )
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const toggleTheme = (e: React.MouseEvent) => {
    const apply = () => flushSync(() => setDark((d) => !d))
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply()
      return
    }
    const x = e.clientX
    const y = e.clientY
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    document.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" },
      )
    })
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="flex items-center gap-1 rounded-full border bg-background/70 p-1.5 shadow-sm backdrop-blur-md">
        {navLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="relative rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-4"
          >
            {active === href && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className={`relative ${active === href ? "text-background" : ""}`}>{label}</span>
          </a>
        ))}
        <button
          onClick={toggleTheme}
          aria-label="สลับธีม"
          className="ml-1 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </nav>
    </motion.header>
  )
}
