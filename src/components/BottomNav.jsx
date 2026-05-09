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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#8E8E93" strokeWidth="1.5" fill="none"/>
            <path d="M8 12H16M8 12L11 9M8 12L11 15M16 12L13 9M16 12L13 15" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-[10px] font-medium text-[#8E8E93]">Платежи</span>
        </button>

        <button className="flex flex-col items-center -mt-3 btn-press">
          <div className="w-14 h-14 rounded-full bg-[#FF3B30] flex items-center justify-center shadow-lg">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 24C14 24 4 18 4 10.5C4 7.46 6.46 5 9.5 5C11.26 5 12.85 5.84 14 7.09C15.15 5.84 16.74 5 18.5 5C21.54 5 24 7.46 24 10.5C24 18 14 24 14 24Z"
                fill="white"/>
            </svg>
          </div>
        </button>

        <button className="flex flex-col items-center gap-1 btn-press">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#8E8E93" strokeWidth="1.5" fill="none"/>
            <path d="M12 7V12L15 15" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] font-medium text-[#8E8E93]">История</span>
        </button>

        <button className="flex flex-col items-center gap-1 btn-press">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15C21 15.53 20.79 16.04 20.41 16.41C20.04 16.79 19.53 17 19 17H7L3 21V5C3 4.47 3.21 3.96 3.59 3.59C3.96 3.21 4.47 3 5 3H19C19.53 3 20.04 3.21 20.41 3.59C20.79 3.96 21 4.47 21 5V15Z"
              stroke="#8E8E93" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
          </svg>
          <span className="text-[10px] font-medium text-[#8E8E93]">Чаты</span>
        </button>
      </div>
    </div>
  )
}
