import React from 'react'
import fireImg from '../assets/fire_character.svg'

export default function FlameCharacter({ size = 80, celebrate = false, className = '', style = {} }) {
  return (
    <img
      src={fireImg}
      width={size}
      height={Math.round(size * 1.3)}
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, objectFit: 'contain', ...style }}
      alt=""
    />
  )
}
