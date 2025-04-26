"use client"

import { useMemo } from "react"

type CardArtProps = {
  type: "creature" | "spell" | "land" | "artifact" | "enchantment"
  colorIdentity: string
  name: string
  seed?: number
}

export default function CardArtGenerator({ type, colorIdentity, name, seed = 0 }: CardArtProps) {
  const colors = {
    W: { primary: "#f9fafb", secondary: "#e5e7eb", accent: "#fef3c7" },
    U: { primary: "#dbeafe", secondary: "#93c5fd", accent: "#3b82f6" },
    B: { primary: "#6b21a8", secondary: "#4c1d95", accent: "#7e22ce" },
    R: { primary: "#fee2e2", secondary: "#fecaca", accent: "#ef4444" },
    G: { primary: "#d1fae5", secondary: "#a7f3d0", accent: "#10b981" },
  }

  // Determine primary colors based on color identity
  const primaryColor = colorIdentity.includes("B") ? colors.B.primary : "#6b21a8"
  const secondaryColor = colorIdentity.includes("B") ? colors.B.secondary : "#4c1d95"
  const accentColor = colorIdentity.includes("B") ? colors.B.accent : "#7e22ce"

  // Generate pseudo-random values based on name and seed
  const getRandomValue = (index: number, min: number, max: number) => {
    const charCodes = name.split("").map((char) => char.charCodeAt(0))
    const sum = charCodes.reduce((acc, code) => acc + code, 0) + seed + index
    return min + (sum % (max - min))
  }

  const svgContent = useMemo(() => {
    switch (type) {
      case "creature":
        return (
          <>
            <defs>
              <radialGradient id={`bgGradient-${name}`} cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="70%" stopColor={secondaryColor} />
                <stop offset="100%" stopColor="#0c0118" />
              </radialGradient>
              <filter id={`glow-${name}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background */}
            <rect width="100%" height="100%" fill={`url(#bgGradient-${name})`} />

            {/* Creature silhouette */}
            <g transform={`translate(150, 200) scale(${0.6 + getRandomValue(0, 0.2, 0.5)})`}>
              {/* Body */}
              <path
                d={`M 0,0 
                   L ${-40 - getRandomValue(1, 0, 30)},${-70 - getRandomValue(2, 0, 40)} 
                   Q ${-60 - getRandomValue(3, 0, 30)},${-90 - getRandomValue(4, 0, 30)} ${-70 - getRandomValue(5, 0, 30)},${-120 - getRandomValue(6, 0, 30)} 
                   L ${-50 - getRandomValue(7, 0, 20)},${-110 - getRandomValue(8, 0, 30)} 
                   L ${-30 - getRandomValue(9, 0, 20)},${-140 - getRandomValue(10, 0, 40)} 
                   L ${-10 - getRandomValue(11, 0, 20)},${-110 - getRandomValue(12, 0, 30)} 
                   L 0,${-150 - getRandomValue(13, 0, 40)} 
                   L ${10 + getRandomValue(14, 0, 20)},${-110 - getRandomValue(15, 0, 30)} 
                   L ${30 + getRandomValue(16, 0, 20)},${-140 - getRandomValue(17, 0, 40)} 
                   L ${50 + getRandomValue(18, 0, 20)},${-110 - getRandomValue(19, 0, 30)} 
                   L ${70 + getRandomValue(20, 0, 30)},${-120 - getRandomValue(21, 0, 30)} 
                   Q ${60 + getRandomValue(22, 0, 30)},${-90 - getRandomValue(23, 0, 30)} ${40 + getRandomValue(24, 0, 30)},${-70 - getRandomValue(25, 0, 40)} 
                   L 0,0 Z`}
                fill={secondaryColor}
                stroke={accentColor}
                strokeWidth="1"
              />

              {/* Eyes */}
              <circle
                cx={-10 - getRandomValue(26, 0, 5)}
                cy={-100 - getRandomValue(27, 0, 20)}
                r={3 + getRandomValue(28, 0, 3)}
                fill={accentColor}
                filter={`url(#glow-${name})`}
              />
              <circle
                cx={10 + getRandomValue(29, 0, 5)}
                cy={-100 - getRandomValue(30, 0, 20)}
                r={3 + getRandomValue(31, 0, 3)}
                fill={accentColor}
                filter={`url(#glow-${name})`}
              />
            </g>

            {/* Energy effects */}
            <g opacity="0.7">
              {Array.from({ length: 3 }).map((_, i) => (
                <path
                  key={i}
                  d={`M ${70 + getRandomValue(i * 10 + 32, 0, 40)} ${350 - getRandomValue(i * 10 + 33, 0, 50)} 
                     Q ${150} ${280 - getRandomValue(i * 10 + 34, 0, 40)} 
                     ${230 - getRandomValue(i * 10 + 35, 0, 40)} ${350 - getRandomValue(i * 10 + 36, 0, 50)}`}
                  stroke={accentColor}
                  strokeWidth={3 - i * 0.5}
                  fill="none"
                  opacity={0.8 - i * 0.2}
                />
              ))}
            </g>
          </>
        )

      case "spell":
        return (
          <>
            <defs>
              <radialGradient id={`spellGradient-${name}`} cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="70%" stopColor={secondaryColor} />
                <stop offset="100%" stopColor="#0c0118" />
              </radialGradient>
              <filter id={`spellGlow-${name}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background */}
            <rect width="100%" height="100%" fill={`url(#spellGradient-${name})`} />

            {/* Magical energy */}
            <g opacity="0.8">
              {Array.from({ length: 8 }).map((_, i) => (
                <path
                  key={i}
                  d={`M ${getRandomValue(i * 5, 50, 250)} ${getRandomValue(i * 5 + 1, 50, 150)}
                     Q ${getRandomValue(i * 5 + 2, 100, 200)} ${getRandomValue(i * 5 + 3, 150, 250)}
                     ${getRandomValue(i * 5 + 4, 150, 250)} ${getRandomValue(i * 5 + 5, 250, 350)}`}
                  stroke={accentColor}
                  strokeWidth={2 + getRandomValue(i, 0, 2)}
                  fill="none"
                  opacity={0.3 + getRandomValue(i, 0, 0.5)}
                />
              ))}
            </g>

            {/* Energy orbs */}
            {Array.from({ length: 5 }).map((_, i) => (
              <circle
                key={i}
                cx={getRandomValue(i * 10 + 50, 80, 220)}
                cy={getRandomValue(i * 10 + 51, 100, 300)}
                r={5 + getRandomValue(i, 0, 10)}
                fill="white"
                opacity={0.4 + getRandomValue(i, 0, 0.4)}
                filter={`url(#spellGlow-${name})`}
              />
            ))}
          </>
        )

      case "land":
        return (
          <>
            <defs>
              <linearGradient id={`landGradient-${name}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="100%" stopColor={secondaryColor} />
              </linearGradient>
            </defs>

            {/* Sky */}
            <rect width="100%" height="60%" fill={`url(#landGradient-${name})`} />

            {/* Ground */}
            <rect y="60%" width="100%" height="40%" fill={secondaryColor} />

            {/* Mountains/structures */}
            {Array.from({ length: 6 }).map((_, i) => (
              <path
                key={i}
                d={`M ${getRandomValue(i * 10, 0, 50)} 240
                   L ${getRandomValue(i * 10 + 1, 30, 80)} ${getRandomValue(i * 10 + 2, 180, 220)}
                   L ${getRandomValue(i * 10 + 3, 60, 120)} ${getRandomValue(i * 10 + 4, 200, 240)}
                   L ${getRandomValue(i * 10 + 5, 100, 150)} 240 Z`}
                fill={accentColor}
                opacity={0.7 + getRandomValue(i, 0, 0.3)}
              />
            ))}

            {/* Structures */}
            {Array.from({ length: 3 }).map((_, i) => (
              <path
                key={i}
                d={`M ${100 + i * 50 + getRandomValue(i * 5, -20, 20)} 240
                   L ${110 + i * 50 + getRandomValue(i * 5 + 1, -20, 20)} ${180 + getRandomValue(i * 5 + 2, -30, 0)}
                   L ${130 + i * 50 + getRandomValue(i * 5 + 3, -20, 20)} ${180 + getRandomValue(i * 5 + 4, -30, 0)}
                   L ${140 + i * 50 + getRandomValue(i * 5 + 5, -20, 20)} 240 Z`}
                fill="#1a0836"
                stroke={accentColor}
                strokeWidth="1"
              />
            ))}

            {/* Moon or light source */}
            <circle
              cx={getRandomValue(100, 50, 250)}
              cy={getRandomValue(101, 50, 120)}
              r={getRandomValue(102, 15, 30)}
              fill="white"
              opacity="0.7"
            />
          </>
        )

      case "enchantment":
        return (
          <>
            <defs>
              <radialGradient id={`enchantmentGradient-${name}`} cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                <stop offset="0%" stopColor={primaryColor} />
                <stop offset="70%" stopColor={secondaryColor} />
                <stop offset="100%" stopColor="#0c0118" />
              </radialGradient>
              <filter id={`enchantmentGlow-${name}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background */}
            <rect width="100%" height="100%" fill={`url(#enchantmentGradient-${name})`} />

            {/* Magical symbols */}
            <g transform="translate(150, 200)" opacity="0.8">
              {/* Outer circle */}
              <circle cx="0" cy="0" r="100" stroke={accentColor} strokeWidth="2" fill="none" />

              {/* Inner circle */}
              <circle cx="0" cy="0" r="70" stroke={accentColor} strokeWidth="1.5" fill="none" />

              {/* Runes and symbols */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180
                const x = 85 * Math.cos(angle)
                const y = 85 * Math.sin(angle)
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    fontSize="12"
                    fill={accentColor}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${i * 30}, ${x}, ${y})`}
                  >
                    {String.fromCharCode(8592 + getRandomValue(i, 0, 8))}
                  </text>
                )
              })}

              {/* Center symbol */}
              <path
                d={`M 0,0 
                   m -40,-40 
                   l 80,0 
                   l 0,80 
                   l -80,0 
                   Z`}
                stroke={accentColor}
                strokeWidth="2"
                fill="none"
                transform={`rotate(${getRandomValue(0, 0, 45)})`}
              />
              <path d={`M 0,-50 L 0,50 M -50,0 L 50,0`} stroke={accentColor} strokeWidth="2" opacity="0.7" />

              {/* Energy glow */}
              <circle cx="0" cy="0" r="20" fill={accentColor} opacity="0.3" filter={`url(#enchantmentGlow-${name})`} />
            </g>
          </>
        )

      case "artifact":
        return (
          <>
            <defs>
              <linearGradient id={`artifactGradient-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Background */}
            <rect width="100%" height="100%" fill={`url(#artifactGradient-${name})`} />

            {/* Artifact structure */}
            <g transform="translate(150, 200)">
              {/* Base */}
              <rect x="-60" y="20" width="120" height="30" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />

              {/* Main structure */}
              <path
                d={`M -40,20 
                   L -30,-80 
                   L 30,-80 
                   L 40,20 
                   Z`}
                fill="#334155"
                stroke="#94a3b8"
                strokeWidth="1"
              />

              {/* Details */}
              <rect x="-20" y="-60" width="40" height="60" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />

              {/* Glowing elements */}
              <circle cx="0" cy="-30" r="10" fill={accentColor} opacity="0.8" />

              {/* Additional details based on seed */}
              {Array.from({ length: 5 }).map((_, i) => (
                <rect
                  key={i}
                  x={-35 + getRandomValue(i * 10, 0, 70)}
                  y={-70 + getRandomValue(i * 10 + 1, 0, 80)}
                  width={5 + getRandomValue(i * 10 + 2, 0, 10)}
                  height={5 + getRandomValue(i * 10 + 3, 0, 10)}
                  fill="#0f172a"
                  stroke="#94a3b8"
                  strokeWidth="0.5"
                />
              ))}
            </g>
          </>
        )

      default:
        return <rect width="100%" height="100%" fill="#6b21a8" />
    }
  }, [type, name, primaryColor, secondaryColor, accentColor])

  return (
    <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
      {svgContent}
    </svg>
  )
}
