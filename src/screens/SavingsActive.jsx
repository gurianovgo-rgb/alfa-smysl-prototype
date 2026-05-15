import React from 'react'
import { useApp } from '../context/AppContext'
import BottomNav from '../components/BottomNav'
import FlameCharacter from '../components/FlameCharacter'

export default function SavingsActive() {
  const {
    setScreen, balance, streak, goalName, goalAmount, goalDate,
    getGoalEmoji, daysUntilGoal, progressPercent, formatNumber,
  } = useApp()

  const prog = progressPercent()
  const remaining = Math.max(0, goalAmount - balance)
  const incomeTotal = Math.round(balance * 0.135 / 12)
  const incomeForecast = Math.round(balance * 0.135 / 12)

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] screen-enter pb-28 overflow-y-auto">
      <div className="px-4 pt-4 relative">

        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setScreen('home')} className="btn-press p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="text-[#8E8E93] text-sm flex items-center gap-1.5">
            Накопительный счёт
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M11 4H4C3.45 4 3 4.45 3 5V20C3 20.55 3.45 21 4 21H19C19.55 21 20 20.55 20 20V13" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M18.5 2.5C19.33 1.67 20.67 1.67 21.5 2.5C22.33 3.33 22.33 4.67 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <div className="w-8" />
        </div>

        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-white font-bold leading-none mb-1" style={{ fontSize: balance >= 100000 ? '36px' : '44px' }}>
              {formatNumber(balance)} ₽
            </p>
            <p className="text-[#8E8E93] text-sm">Доход за всё время: {formatNumber(incomeTotal)} ₽</p>
          </div>
          <FlameCharacter size={100} className="flame-anim" style={{ marginTop: '-8px', marginRight: '-4px' }} />
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl flame-anim">🔥</span>
            <span className="text-white text-base font-semibold">
              {streak} {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'} без снятий
            </span>
          </div>
          <span className="text-[#8E8E93] text-sm">личный рекорд: 21</span>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            className="flex-1 bg-white text-black py-4 rounded-2xl font-semibold text-base btn-press"
            onClick={() => setScreen('deposit')}
          >+ Пополнить</button>
          <button
            className="flex-1 bg-[#2a2a2a] text-white py-4 rounded-2xl font-semibold text-base btn-press"
            onClick={() => setScreen('withdraw')}
          >↑ Вывести</button>
        </div>

        {goalName && (
          <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getGoalEmoji()}</span>
                <span className="text-white text-base font-semibold">{goalName}</span>
              </div>
              <span className="text-[#8E8E93] text-sm">осталось {daysUntilGoal()} дней</span>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#FF3B30] rounded-full progress-bar" style={{ width: `${prog}%` }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#8E8E93] text-sm">{formatNumber(balance)} ₽ из {formatNumber(goalAmount)} ₽</span>
              <span className="text-[#8E8E93] text-sm">{formatNumber(remaining)} ₽ осталось</span>
            </div>
          </div>
        )}

        <div className="flex gap-3 mb-4">
          <div className="flex-1 bg-[#1a1a1a] rounded-2xl p-4">
            <p className="text-[#8E8E93] text-xs mb-1">Ваша ставка</p>
            <p className="text-white text-2xl font-bold mb-1">13,5%</p>
            <p className="text-[#30D158] text-xs font-medium">Максимальный % в мае</p>
          </div>
          <div className="flex-1 bg-[#1a1a1a] rounded-2xl p-4">
            <p className="text-[#8E8E93] text-xs mb-1">Прогноз дохода</p>
            <p className="text-white text-2xl font-bold mb-1">{formatNumber(Math.max(incomeForecast, 12))} ₽</p>
            <p className="text-[#8E8E93] text-xs">Начислим 31 мая</p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-4 flex items-center justify-between btn-press cursor-pointer">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#8E8E93"/>
              <rect x="11" y="6.5" width="2" height="5.5" rx="1" fill="white"/>
              <rect x="11" y="11" width="4.5" height="2" rx="1" fill="white"/>
            </svg>
            <span className="text-white text-base font-semibold">История операций</span>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
