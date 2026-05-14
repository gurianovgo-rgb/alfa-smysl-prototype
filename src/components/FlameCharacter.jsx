import React, { useId } from 'react'

export default function FlameCharacter({ size = 80, celebrate = false, className = '', style = {} }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')

  return (
    <svg
      width={size}
      height={Math.round(size * 1.3)}
      viewBox="0 0 100 130"
      fill="none"
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
    >
      <defs>
        <radialGradient id={`${uid}-body`} cx="38%" cy="58%" r="62%">
          <stop offset="0%" stopColor="#FFDA00"/>
          <stop offset="42%" stopColor="#FF8C00"/>
          <stop offset="100%" stopColor="#D93200"/>
        </radialGradient>
        <radialGradient id={`${uid}-hl`} cx="35%" cy="35%" r="48%">
          <stop offset="0%" stopColor="#FFF5A0" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#FFAA00" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <ellipse cx="50" cy="70" rx="40" ry="48" fill="#FF5500" opacity="0.18"/>

      <path d="M50 10 C46 16 37 26 30 38 C23 50 21 64 25 76 C29 88 38 96 50 98 C62 96 71 88 75 76 C79 64 77 50 70 38 C63 26 54 16 50 10Z"
            fill={`url(#${uid}-body)`}/>

      <path d="M50 10 C47 4 43 -1 40 3 C43 7 47 12 50 16Z" fill="#FFE044"/>
      <path d="M50 10 C53 4 57 -1 60 3 C57 7 53 12 50 16Z" fill="#FFE044"/>
      <path d="M43 20 C40 12 36 6 34 9 C36 14 40 19 43 23Z" fill="#FFCC00"/>
      <path d="M57 20 C60 12 64 6 66 9 C64 14 60 19 57 23Z" fill="#FFCC00"/>

      <path d="M50 18 C47 24 40 33 37 44 C35 54 37 65 50 70 C63 65 65 54 63 44 C60 33 53 24 50 18Z"
            fill={`url(#${uid}-hl)`} opacity="0.75"/>

      <path
        d={celebrate
          ? "M24 68 C14 74 7 70 7 63 C7 57 14 54 20 59 C22 62 23 65 24 68Z"
          : "M24 60 C14 56 8 48 12 42 C14 38 20 40 22 46 C23 52 23 57 24 60Z"}
        fill="#E07800"
      />

      <path
        d={celebrate
          ? "M76 50 C86 38 92 30 88 24 C86 20 80 22 78 28 C76 34 75 44 76 50Z"
          : "M76 60 C86 56 92 48 88 42 C86 38 80 40 78 46 C77 52 77 57 76 60Z"}
        fill="#E07800"
      />

      {celebrate && <>
        <path d="M10 72 L26 60 L32 68 L16 80Z" fill="#FF3B30"/>
        <path d="M26 60 L32 68 L30 70 L24 62Z" fill="#FFD60A"/>
        <ellipse cx="7" cy="74" rx="5" ry="5" fill="#FF9500" opacity="0.9"/>
        <rect x="2" y="62" width="4" height="3" rx="1.5" fill="#30D158" transform="rotate(-25 2 62)"/>
        <rect x="0" y="54" width="4" height="3" rx="1.5" fill="#FFD60A" transform="rotate(15 0 54)"/>
        <circle cx="6" cy="51" r="3" fill="#FF3B30"/>
        <circle cx="0" cy="47" r="2" fill="#007AFF"/>
      </>}

      {celebrate && <>
        <path d="M84 26 C84 21 88 18 91 19 C93 20 94 23 92 26 L92 34 C90 34 87 31 85 29 C84 28 84 27 84 26Z" fill="#E07800"/>
        <rect x="83" y="26" width="10" height="9" rx="2.5" fill="#E07800"/>
      </>}

      <ellipse cx="39" cy="63" rx="9.5" ry="10.5" fill="white"/>
      <ellipse cx="61" cy="63" rx="9.5" ry="10.5" fill="white"/>
      <circle cx="41" cy="64" r="6.5" fill="#1C1C1E"/>
      <circle cx="63" cy="64" r="6.5" fill="#1C1C1E"/>
      <circle cx="43.5" cy="61" r="2.8" fill="white"/>
      <circle cx="65.5" cy="61" r="2.8" fill="white"/>

      <path d="M42 75 Q50 82 58 75" stroke="#B03000" strokeWidth="2.8" strokeLinecap="round" fill="none"/>

      <ellipse cx="30" cy="71" rx="7" ry="4.5" fill="#FF5500" opacity="0.3"/>
      <ellipse cx="70" cy="71" rx="7" ry="4.5" fill="#FF5500" opacity="0.3"/>

      <ellipse cx="40" cy="101" rx="13" ry="7.5" fill="#C06000"/>
      <ellipse cx="60" cy="101" rx="13" ry="7.5" fill="#C06000"/>
      <ellipse cx="37" cy="99" rx="7" ry="3.5" fill="#E08000" opacity="0.6"/>
      <ellipse cx="57" cy="99" rx="7" ry="3.5" fill="#E08000" opacity="0.6"/>
    </svg>
  )
}
