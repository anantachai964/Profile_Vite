import { useState } from "react"
import { Check, Copy, MapPin } from "lucide-react"
import { profile } from "@/data/profile"
import { FlowShader } from "@/components/FlowShader"
import { Section } from "@/components/Section"

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <Section id="contact" eyebrow="Get in touch" title="Contact">
      <div className="relative isolate overflow-hidden rounded-3xl border p-8 sm:p-12">
        <FlowShader className="absolute inset-0 -z-10 opacity-80" />
        <h3 className="max-w-md text-2xl font-semibold tracking-tight sm:text-3xl">
          มีงานหรือไอเดียอยากคุยกัน? ติดต่อได้เลย
        </h3>

        <button
          onClick={copyEmail}
          className="mt-8 flex max-w-full items-center gap-3 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
        >
          <span className="truncate">{profile.email}</span>
          {copied ? <Check className="size-4 shrink-0" /> : <Copy className="size-4 shrink-0" />}
        </button>
        <p className="mt-2 h-4 pl-5 text-xs text-muted-foreground">{copied ? "คัดลอกอีเมลแล้ว" : ""}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <MapPin className="size-4" /> {profile.location}
          </span>
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground">
            GitHub ↗
          </a>
        </div>
      </div>
    </Section>
  )
}
