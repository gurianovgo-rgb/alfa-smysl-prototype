import React from 'react'
import { useApp } from '../context/AppContext'

export default function BottomNav() {
  const { screen, setScreen } = useApp()

  const isHome = ['home'].includes(screen)

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-[#0a0a0a] border-t border-[#1a1a1a] z-50">
      <div className="flex items-center justify-around px-2 pt-2 pb-4">
        <button
          onClick={() => setScreen('home')}
          className="flex flex-col items-center gap-1 btn-press"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
              fill={isHome ? '#FFFFFF' : '#8E8E93'} />
          </svg>
          <span className={`text-[10px] font-medium ${isHome ? 'text-white' : 'text-[#8E8E93]'}`}>Главный</span>
        </button>

        <button className="flex flex-col items-center gap-1 btn-press">
          <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
            <circle cx="9" cy="12" r="8.5" fill="#8E8E93"/>
            <circle cx="19" cy="12" r="8.5" fill="#8E8E93"/>
            <path d="M10 12H18M13.5 9L10 12L13.5 15M14.5 9L18 12L14.5 15" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] font-medium text-[#8E8E93]">Платежи</span>
        </button>

        <button className="flex flex-col items-center -mt-3 btn-press">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <defs>
              <radialGradient id="heart-main" cx="42%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#FF6B5B"/>
                <stop offset="35%" stopColor="#E8001A"/>
                <stop offset="75%" stopColor="#B00010"/>
                <stop offset="100%" stopColor="#7A0009"/>
              </radialGradient>
              <radialGradient id="heart-rim" cx="50%" cy="80%" r="55%">
                <stop offset="0%" stopColor="#FF2D1A" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#6A0008" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="heart-gloss" cx="38%" cy="28%" r="45%">
                <stop offset="0%" stopColor="white" stopOpacity="0.9"/>
                <stop offset="60%" stopColor="white" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="heart-gloss2" cx="65%" cy="75%" r="30%">
                <stop offset="0%" stopColor="white" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </radialGradient>
              <filter id="heart-shadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#CC0010" floodOpacity="0.6"/>
              </filter>
              <clipPath id="heart-clip">
                <path d="M28 49C28 49 6 37 6 22C6 14.82 11.82 9 19 9C22.5 9 25.7 10.4 28 12.8C30.3 10.4 33.5 9 37 9C44.18 9 50 14.82 50 22C50 37 28 49 28 49Z"/>
              </clipPath>
            </defs>
            <path d="M28 49C28 49 6 37 6 22C6 14.82 11.82 9 19 9C22.5 9 25.7 10.4 28 12.8C30.3 10.4 33.5 9 37 9C44.18 9 50 14.82 50 22C50 37 28 49 28 49Z" fill="url(#heart-main)" filter="url(#heart-shadow)"/>
            <path d="M28 49C28 49 6 37 6 22C6 14.82 11.82 9 19 9C22.5 9 25.7 10.4 28 12.8C30.3 10.4 33.5 9 37 9C44.18 9 50 14.82 50 22C50 37 28 49 28 49Z" fill="url(#heart-rim)"/>
            <path d="M28 47C28 47 8 36 8 22C8 15.92 12.92 11 19 11C22.2 11 25.1 12.3 28 15C30.9 12.3 33.8 11 37 11C43.08 11 48 15.92 48 22C48 36 28 47 28 47Z" fill="url(#heart-main)"/>
            <ellipse cx="22" cy="19" rx="9" ry="5.5" fill="url(#heart-gloss)" clipPath="url(#heart-clip)"/>
            <ellipse cx="38" cy="37" rx="6" ry="4" fill="url(#heart-gloss2)" clipPath="url(#heart-clip)"/>
          </svg>
        </button>

        <button className="flex flex-col items-center gap-1 btn-press">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#8E8E93"/>
            <rect x="11" y="6.5" width="2" height="5.5" rx="1" fill="white"/>
            <rect x="11" y="11" width="4.5" height="2" rx="1" fill="white"/>
          </svg>
          <span className="text-[10px] font-medium text-[#8E8E93]">История</span>
        </button>

        <button className="flex flex-col items-center gap-1 btn-press">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 3H4C3.45 3 3 3.45 3 4V16C3 16.55 3.45 17 4 17H7V21L12.5 17H20C20.55 17 21 16.55 21 16V4C21 3.45 20.55 3 20 3Z" fill="#8E8E93"/>
            <rect x="7" y="8.5" width="10" height="2" rx="1" fill="white"/>
            <rect x="7" y="12" width="7" height="2" rx="1" fill="white"/>
          </svg>
          <span className="text-[10px] font-medium text-[#8E8E93]">Чаты</span>
        </button>
      </div>
    </div>
  )
}
