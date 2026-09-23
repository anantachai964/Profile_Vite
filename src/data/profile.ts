// ข้อมูลทั้งหมดของเว็บอยู่ที่ไฟล์นี้ แก้ที่นี่ที่เดียว

export const profile = {
  name: "Anantachai Srilamai",
  shortName: "Anantachai",
  role: "Web Developer",
  intro: "สร้างเว็บที่เรียบง่าย ใช้งานง่าย และใส่ใจในรายละเอียด",
  email: "anantachai607@gmail.com",
  location: "Thailand",
  github: "https://github.com/anantachai964",
}

export const techStack = [
  { group: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Tailwind CSS", "React"] },
  { group: "Database", items: ["MySQL", "SQLite"] },
]

export type Project = {
  title: string
  description: string
  tags: string[]
  image?: string
  link?: string
}

// ยังไม่มีโปรเจกต์ — เพิ่มได้ตามรูปแบบ Project ด้านบน
export const projects: Project[] = []

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "#contact", label: "Contact" },
]
