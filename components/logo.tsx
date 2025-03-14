import type React from "react"
export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" {...props}>
      <rect width="400" height="400" fill="#ffffff" fillOpacity="0" />
      <circle cx="200" cy="200" r="150" fill="#f0f9ff" opacity="0.4" />
      <path
        d="M200 90 L320 150 L320 260 C320 290 270 330 200 330 C130 330 80 290 80 260 L80 150 Z"
        fill="#003366"
        stroke="#001a33"
        strokeWidth="2"
      />
      <path
        d="M130 240 L160 210 L190 220 L220 180 L250 190 L280 150"
        stroke="#4caf50"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M200 140 A35 35 0 1 1 235 175 L250 160 L235 145 L220 160 L235 175" fill="#4caf50" />
      <line x1="200" y1="120" x2="200" y2="180" stroke="#ffffff" strokeWidth="5" />
      <line x1="150" y1="180" x2="250" y2="180" stroke="#ffffff" strokeWidth="5" />
      <circle cx="150" cy="200" r="20" fill="#ffffff" opacity="0.8" />
      <circle cx="250" cy="200" r="20" fill="#ffffff" opacity="0.8" />
    </svg>
  )
}

