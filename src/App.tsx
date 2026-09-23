import { Mail, MapPin, Phone } from "lucide-react"
import profileImg from "@/assets/profile.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const profile = {
  name: "Anantachai Srilmai",
  phone: "090-989-9903",
  email: "anantachai607@gmail.com",
  location: "Thailand",
}

const contactItems = [
  { icon: Phone, label: "เบอร์โทรศัพท์", value: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}` },
  { icon: Mail, label: "อีเมล", value: profile.email, href: `mailto:${profile.email}` },
  { icon: MapPin, label: "ที่อยู่", value: profile.location },
]

const techStack = [
  { group: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS", "React"] },
  { group: "Database", items: ["MySQL", "SQLite"] },
]

function App() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md overflow-hidden py-0">
        <div className="h-28 bg-gradient-to-r from-primary to-primary/60" />
        <CardContent className="px-6 pb-6">
          <div className="-mt-14 flex justify-center">
            <Avatar className="size-28 ring-4 ring-card" size="lg">
              <AvatarImage src={profileImg} alt={profile.name} className="object-cover" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
          </div>

          <div className="mt-4 text-center">
            <h1 className="font-heading text-2xl font-semibold text-foreground">
              {profile.name}
            </h1>
            <Badge variant="secondary" className="mt-2">
              Profile ส่วนตัว
            </Badge>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            {contactItems.map(({ icon: Icon, label, value, href }) => {
              const content = (
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="truncate text-sm font-medium text-foreground">{value}</p>
                  </div>
                </div>
              )

              return href ? (
                <a
                  key={label}
                  href={href}
                  className="block rounded-lg transition-colors hover:bg-muted/60"
                >
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              )
            })}
          </div>

          <Separator className="my-6" />

          <section>
            <h2 className="text-sm font-semibold text-foreground">Tech Stack</h2>
            <div className="mt-3 space-y-3">
              {techStack.map(({ group, items }) => (
                <div key={group}>
                  <p className="mb-2 text-xs text-muted-foreground">{group}</p>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
