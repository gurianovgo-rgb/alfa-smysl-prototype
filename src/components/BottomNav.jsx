import React from 'react'
import { useApp } from '../context/AppContext'
import { icons } from '../icons'

export default function BottomNav() {
  const { screen, setScreen } = useApp()

  const isHome = screen === 'home'

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-[#0a0a0a] border-t border-[#1a1a1a] z-50">
      <div className="flex items-center justify-around px-2 pt-2 pb-4">
        <button
          onClick={() => setScreen('home')}
          className="flex flex-col items-center gap-1 btn-press"
        >
          <img
            src={icons.navHome}
            className="w-7 h-7 object-contain"
            style={{ filter: isHome ? 'none' : 'brightness(0.45) saturate(0)' }}
            alt=""
          />
          <span className={`text-[10px] font-medium ${isHome ? 'text-white' : 'text-[#8E8E93]'}`}>Главный</span>
        </button>

        <button className="flex flex-col items-center gap-1 btn-press">
          <img src={icons.navPayments} className="w-7 h-7 object-contain" alt="" />
          <span className="text-[10px] font-medium text-[#8E8E93]">Платежи</span>
        </button>

        <button className="flex flex-col items-center -mt-3 btn-press">
          <img src={icons.navHeart} className="w-14 h-14 object-contain" alt="" />
        </button>

        <button className="flex flex-col items-center gap-1 btn-press">
          <img src={icons.navHistory} className="w-7 h-7 object-contain" alt="" />
          <span className="text-[10px] font-medium text-[#8E8E93]">История</span>
        </button>

        <button className="flex flex-col items-center gap-1 btn-press">
          <img src={icons.navChat} className="w-7 h-7 object-contain" alt="" />
          <span className="text-[10px] font-medium text-[#8E8E93]">Чаты</span>
        </button>
      </div>
    </div>
  )
}
