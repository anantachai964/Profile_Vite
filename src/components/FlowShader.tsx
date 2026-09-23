import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const vertex = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

// Flowing monochrome noise, tinted by uDark (0 = light theme, 1 = dark theme)
const fragment = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform float uDark;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes.y;
  float t = uTime * 0.06;
  vec2 q = vec2(fbm(uv * 1.6 + t), fbm(uv * 1.6 - t + 4.0));
  float f = fbm(uv * 1.8 + q * 2.2 + vec2(t * 0.8, -t));
  float lines = smoothstep(0.0, 0.9, abs(sin(f * 14.0)) * 0.5 + f * 0.6);
  float light = mix(0.985, 0.88, lines);
  float dark = mix(0.07, 0.22, lines);
  gl_FragColor = vec4(vec3(mix(light, dark, uDark)), 1.0);
}
`

export function FlowShader({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas?.getContext("webgl")
    if (!canvas || !gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertex))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragment))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, "p")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, "uRes")
    const uTime = gl.getUniformLocation(prog, "uTime")
    const uDark = gl.getUniformLocation(prog, "uDark")

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let dark = document.documentElement.classList.contains("dark") ? 1 : 0
    let frame = 0
    const start = performance.now()
    const draw = (now: number) => {
      const target = document.documentElement.classList.contains("dark") ? 1 : 0
      dark += (target - dark) * 0.1
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, reduced ? 0 : (now - start) / 1000)
      gl.uniform1f(uDark, dark)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={cn("size-full", className)} />
}
