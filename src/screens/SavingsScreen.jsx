import React from 'react'
import { useApp } from '../context/AppContext'
import BottomNav from '../components/BottomNav'
import { icons } from '../icons'

export default function SavingsScreen() {
  const { setScreen } = useApp()

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] screen-enter pb-24">
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setScreen('home')} className="btn-press p-1">
            <img src={icons.backArrow} className="w-6 h-6 object-contain" alt="" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white text-lg font-semibold">Накопительный счёт</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4C3.45 4 3 4.45 3 5V20C3 20.55 3.45 21 4 21H19C19.55 21 20 20.55 20 20V13" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M18.5 2.5C19.33 1.67 20.67 1.67 21.5 2.5C22.33 3.33 22.33 4.67 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="w-8" />
        </div>

        <div className="mb-6">
          <p className="text-white text-5xl font-bold mb-1">0 ₽</p>
          <p className="text-[#8E8E93] text-sm">Доход за всё время: 0 ₽</p>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8 6 6 9 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 9 16 6 12 2Z" fill="#8E8E93" opacity="0.6"/>
              </svg>
              <span className="text-white text-base font-semibold">0 дней без снятий</span>
            </div>
            <span className="text-[#8E8E93] text-sm">личный рекорд: 21</span>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            className="flex-1 bg-white text-black py-4 rounded-2xl font-semibold text-base btn-press"
            onClick={() => setScreen('deposit')}
          >+ Пополнить</button>
          <button
            className="flex-1 bg-[#2a2a2a] text-[#8E8E93] py-4 rounded-2xl font-semibold text-base btn-press"
          >↑ Вывести</button>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
          <button
            className="w-full flex items-center justify-center gap-2 py-2 btn-press"
            onClick={() => setScreen('goal-step1')}
          >
            <span className="text-[#FF3B30] text-xl font-bold">+</span>
            <span className="text-[#FF3B30] text-base font-semibold">Поставить новую цель</span>
          </button>
          <div className="mt-3 border-t border-[#2a2a2a] pt-3">
            <div className="h-1 bg-[#2a2a2a] rounded-full mb-2" />
            <div className="flex items-center justify-between">
              <span className="text-[#8E8E93] text-sm">0 ₽ из 0 ₽</span>
              <span className="text-[#8E8E93] text-sm">—</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-[#1a1a1a] rounded-2xl p-4">
            <p className="text-[#8E8E93] text-xs mb-2">Ваша ставка</p>
            <p className="text-white text-2xl font-bold mb-1">7%</p>
            <p className="text-[#30D158] text-xs font-medium">Максимальный % в мае</p>
          </div>
          <div className="flex-1 bg-[#1a1a1a] rounded-2xl p-4">
            <p className="text-[#8E8E93] text-xs mb-2">Прогноз дохода</p>
            <p className="text-white text-2xl font-bold mb-1">0 ₽</p>
            <p className="text-[#8E8E93] text-xs">Пополните счёт, чтобы получить %</p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-4 flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#8E8E93" strokeWidth="1.5"/>
            <path d="M12 7V12L15 15" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-white text-base font-semibold">История операций</span>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
