import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowDown } from "lucide-react"
import profileImg from "@/assets/profile.jpg"
import { profile } from "@/data/profile"
import { FlowShader } from "@/components/FlowShader"

function MagneticPortrait() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15 })
  const sy = useSpring(y, { stiffness: 150, damping: 15 })
  const rotate = useTransform(sx, [-30, 30], [-6, 6])
  const radius = useSpring(40, { stiffness: 120, damping: 14 })
  const borderRadius = useTransform(radius, (r) => `${r}%`)

  return (
    <motion.div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * 0.25)
        y.set((e.clientY - rect.top - rect.height / 2) * 0.25)
        radius.set(22)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
        radius.set(40)
      }}
      style={{ x: sx, y: sy, rotate, borderRadius }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative size-44 overflow-hidden border-4 border-background shadow-xl sm:size-52"
    >
      <img src={profileImg} alt={profile.name} className="size-full object-cover" draggable={false} />
    </motion.div>
  )
}

export function Hero() {
  const words = profile.name.split(" ")

  return (
    <section id="home" className="relative flex min-h-svh items-center justify-center overflow-hidden px-4">
      <FlowShader className="absolute inset-0 -z-10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-background" />

      <div className="flex flex-col items-center text-center">
        <MagneticPortrait />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-full border bg-background/60 px-3 py-1 text-xs tracking-widest text-muted-foreground uppercase backdrop-blur"
        >
          {profile.role} · {profile.location}
        </motion.p>

        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              className="inline-block pr-[0.25em] last:pr-0"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 max-w-md text-muted-foreground"
        >
          {profile.intro}
        </motion.p>

        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105"
        >
          ดูผลงาน <ArrowDown className="size-4" />
        </motion.a>
      </div>
    </section>
  )
}
