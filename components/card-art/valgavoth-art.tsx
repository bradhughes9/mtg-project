export default function ValgavothArt() {
  return (
    <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#3b0764" />
          <stop offset="70%" stopColor="#1e0438" />
          <stop offset="100%" stopColor="#0c0118" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="100%" height="100%" fill="url(#bgGradient)" />

      {/* Swirling souls */}
      <g opacity="0.6">
        {Array.from({ length: 15 }).map((_, i) => (
          <path
            key={i}
            d={`M ${150 + Math.sin(i * 0.8) * 100} ${200 + Math.cos(i * 0.8) * 80} 
                Q ${150 + Math.sin(i * 0.8 + 1) * 120} ${200 + Math.cos(i * 0.8 + 1) * 100}, 
                  ${150 + Math.sin(i * 0.8 + 2) * 80} ${200 + Math.cos(i * 0.8 + 2) * 60}`}
            stroke={`hsl(${260 + i * 5}, 70%, ${60 + i * 2}%)`}
            strokeWidth="2"
            fill="none"
            opacity={0.3 + (i % 5) * 0.1}
          />
        ))}
      </g>

      {/* Valgavoth silhouette */}
      <g transform="translate(150, 180) scale(0.8)">
        {/* Body */}
        <path
          d="M 0,0 
             L -60,-100 
             Q -80,-120 -90,-150 
             L -70,-140 
             L -50,-180 
             L -30,-150 
             L 0,-190 
             L 30,-150 
             L 50,-180 
             L 70,-140 
             L 90,-150 
             Q 80,-120 60,-100 
             L 0,0 Z"
          fill="#1a0836"
          stroke="#6d28d9"
          strokeWidth="1"
        />

        {/* Wings */}
        <path
          d="M -60,-100 
             Q -120,-50 -150,50 
             Q -100,0 -60,-50 Z"
          fill="#0f042b"
          stroke="#6d28d9"
          strokeWidth="1"
        />
        <path
          d="M 60,-100 
             Q 120,-50 150,50 
             Q 100,0 60,-50 Z"
          fill="#0f042b"
          stroke="#6d28d9"
          strokeWidth="1"
        />

        {/* Head */}
        <ellipse cx="0" cy="-120" rx="25" ry="35" fill="#1a0836" />

        {/* Horns */}
        <path d="M -15,-140 Q -30,-170 -20,-190" stroke="#6d28d9" strokeWidth="3" fill="none" />
        <path d="M 15,-140 Q 30,-170 20,-190" stroke="#6d28d9" strokeWidth="3" fill="none" />

        {/* Eyes */}
        <circle cx="-10" cy="-125" r="5" fill="#a855f7" filter="url(#glow)" />
        <circle cx="10" cy="-125" r="5" fill="#a855f7" filter="url(#glow)" />
      </g>

      {/* Soul orbs */}
      {Array.from({ length: 7 }).map((_, i) => (
        <circle
          key={i}
          cx={150 + Math.sin(i * 0.9) * (80 + i * 10)}
          cy={200 + Math.cos(i * 0.9) * (60 + i * 8)}
          r={3 + (i % 4)}
          fill="white"
          opacity={0.6 - i * 0.05}
          filter="url(#glow)"
        />
      ))}

      {/* Magical energy */}
      <g opacity="0.7">
        {Array.from({ length: 5 }).map((_, i) => (
          <path
            key={i}
            d={`M ${70 + i * 40} ${350 - i * 20} Q ${150} ${280 - i * 15} ${230 - i * 40} ${350 - i * 20}`}
            stroke={`hsl(${270 + i * 10}, 80%, 60%)`}
            strokeWidth={3 - i * 0.4}
            fill="none"
            opacity={0.8 - i * 0.1}
          />
        ))}
      </g>
    </svg>
  )
}
