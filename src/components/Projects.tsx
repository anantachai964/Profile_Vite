import { motion } from "motion/react"
import { ArrowUpRight, FolderOpen } from "lucide-react"
import { projects } from "@/data/profile"
import { Section } from "@/components/Section"

export function Projects() {
  return (
    <Section id="projects" eyebrow="Selected work" title="Projects">
      {projects.length === 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed text-muted-foreground"
            >
              <FolderOpen className="size-8 opacity-60" />
              <p className="text-sm">เร็ว ๆ นี้</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group block overflow-hidden rounded-2xl border bg-card"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{p.title}</h3>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </Section>
  )
}
