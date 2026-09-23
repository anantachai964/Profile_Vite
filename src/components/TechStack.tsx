import { useEffect, useRef, useState } from "react"
import Matter from "matter-js"
import { techStack } from "@/data/profile"
import { Section } from "@/components/Section"

const chips = techStack.flatMap(({ group, items }) => items.map((label) => ({ label, group })))

// Chips fall into a box with physics; drag them around
function PhysicsChips() {
  const boxRef = useRef<HTMLDivElement>(null)
  const chipRefs = useRef<(HTMLDivElement | null)[]>([])
  const [started, setStarted] = useState(false)

  // Start the simulation once the box scrolls into view
  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const observer = new IntersectionObserver(([e]) => e.isIntersecting && setStarted(true), {
      threshold: 0.4,
    })
    observer.observe(box)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const box = boxRef.current
    if (!started || !box) return
    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Body } = Matter

    const width = box.clientWidth
    const height = box.clientHeight
    const engine = Engine.create({ gravity: { x: 0, y: 1 } })
    const wall = { isStatic: true, render: { visible: false } }
    Composite.add(engine.world, [
      Bodies.rectangle(width / 2, height + 25, width * 2, 50, wall),
      Bodies.rectangle(-25, height / 2, 50, height * 3, wall),
      Bodies.rectangle(width + 25, height / 2, 50, height * 3, wall),
    ])

    const bodies = chipRefs.current.map((el, i) => {
      const w = el!.offsetWidth
      const h = el!.offsetHeight
      const body = Bodies.rectangle(
        w / 2 + Math.random() * (width - w),
        -60 - i * 50,
        w,
        h,
        { chamfer: { radius: h / 2 }, restitution: 0.4, friction: 0.2 },
      )
      Body.setAngle(body, (Math.random() - 0.5) * 0.6)
      return body
    })
    Composite.add(engine.world, bodies)

    const mouse = Mouse.create(box)
    // Let the page keep scrolling over the box
    const m = mouse as unknown as { element: HTMLElement; mousewheel: EventListener }
    m.element.removeEventListener("wheel", m.mousewheel)
    Composite.add(
      engine.world,
      MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } }),
    )

    const runner = Runner.create()
    Runner.run(runner, engine)

    let frame = 0
    const sync = () => {
      bodies.forEach((b, i) => {
        const el = chipRefs.current[i]
        if (!el) return
        el.style.transform = `translate(${b.position.x - el.offsetWidth / 2}px, ${b.position.y - el.offsetHeight / 2}px) rotate(${b.angle}rad)`
      })
      frame = requestAnimationFrame(sync)
    }
    sync()

    return () => {
      cancelAnimationFrame(frame)
      Runner.stop(runner)
      Engine.clear(engine)
    }
  }, [started])

  return (
    <div
      ref={boxRef}
      className="relative h-72 touch-pan-y overflow-hidden rounded-2xl border bg-muted/30 select-none"
    >
      <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground/60">
        ลากเล่นได้
      </p>
      {chips.map(({ label, group }, i) => (
        <div
          key={label}
          ref={(el) => {
            chipRefs.current[i] = el
          }}
          className={`absolute top-0 left-0 cursor-grab rounded-full border px-5 py-2.5 text-sm font-medium whitespace-nowrap shadow-sm active:cursor-grabbing ${
            group === "Database" ? "bg-foreground text-background" : "bg-background text-foreground"
          }`}
          style={{ transform: "translate(-999px, -999px)" }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export function TechStack() {
  return (
    <Section id="stack" eyebrow="Tools I use" title="Tech Stack">
      <div className="grid gap-4 sm:grid-cols-2">
        {techStack.map(({ group, items }) => (
          <div key={group} className="rounded-2xl border bg-card p-5">
            <p className="text-xs tracking-widest text-muted-foreground uppercase">{group}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {items.map((item) => (
                <span key={item} className="rounded-full border px-3 py-1 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <PhysicsChips />
      </div>
    </Section>
  )
}
