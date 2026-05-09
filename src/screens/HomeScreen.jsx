import React, { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'
import BottomNav from '../components/BottomNav'

export default function HomeScreen() {
  const {
    setScreen, balance, streak, goalName, goalAmount, hasGoal,
    timerActive, timerSeconds, setTimerSeconds, setTimerActive,
    formatNumber, getGoalEmoji, progressPercent,
  } = useApp()

  const [displaySeconds, setDisplaySeconds] = useState(timerSeconds)

  useEffect(() => {
    if (!timerActive) return
    setDisplaySeconds(timerSeconds)
    const interval = setInterval(() => {
      setDisplaySeconds(prev => {
        const next = prev - 1
        if (next <= 0) {
          clearInterval(interval)
          setTimerActive(false)
          return 0
        }
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [timerActive])

  function formatTimer(s) {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] pb-24">
      {timerActive && (
        <div className="mx-4 mt-3 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="#8E8E93" strokeWidth="2"/>
              <path d="M12 7V12L15 15" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-white text-sm font-medium">Снятие заморожено · {formatTimer(displaySeconds)}</span>
          </div>
          <button
            className="text-[#FF3B30] text-sm font-semibold btn-press"
            onClick={() => setTimerActive(false)}
          >Отменить</button>
        </div>
      )}

      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#8E8E93"/>
                <path d="M4 20C4 16.69 7.58 14 12 14C16.42 14 20 16.69 20 20" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-white text-xl font-bold">Максим</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex items-center gap-1.5 bg-[#1a3a1a] px-3 py-1.5 rounded-full">
            <span className="text-base">🪙</span>
            <span className="text-[#30D158] text-sm font-bold">15 000 ₽</span>
          </div>
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-3 btn-press cursor-pointer" onClick={() => {}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#8E8E93] text-sm mb-1">Текущий счёт</p>
              <p className="text-white text-2xl font-bold">80 ₽</p>
            </div>
            <div className="bg-[#FF3B30] rounded-xl px-4 py-3 min-w-[72px] flex flex-col items-end">
              <span className="text-white text-xs font-bold tracking-wider">5287</span>
              <span className="text-white/70 text-[10px] mt-1">МИР</span>
            </div>
          </div>
        </div>

        <div
          className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 btn-press cursor-pointer"
          onClick={() => setScreen('savings')}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[#8E8E93] text-sm mb-1">Накопительный счёт</p>
              <p className="text-white text-2xl font-bold">{formatNumber(balance)} ₽</p>
              {timerActive && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-base">🔒</span>
                  <p className="text-[#FF3B30] text-xs font-medium">Снятие заморожено до {formatTimer(displaySeconds)}</p>
                </div>
              )}
            </div>
            <div className="bg-[#2a2a2a] rounded-xl px-3 py-2">
              <span className="text-white text-sm font-bold">7,5%</span>
            </div>
          </div>
        </div>

        <div className="relative h-8 mb-4">
          <input
            className="w-full bg-[#1a1a1a] rounded-2xl pl-10 pr-4 py-2 text-[#8E8E93] text-sm focus:outline-none"
            placeholder="Поиск по приложению"
            readOnly
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#8E8E93" strokeWidth="2"/>
            <path d="M16.5 16.5L21 21" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {hasGoal && goalName && (
            <div
              className="flex-shrink-0 w-40 h-40 rounded-2xl bg-gradient-to-br from-[#3a1a1a] to-[#1a0a0a] p-4 flex flex-col justify-between cursor-pointer btn-press"
              onClick={() => setScreen('savings-active')}
            >
              <span className="text-3xl">{getGoalEmoji()}</span>
              <div>
                <p className="text-white text-sm font-semibold">Цель: {goalName}</p>
                <p className="text-[#8E8E93] text-xs mt-1">{formatNumber(balance)} / {formatNumber(goalAmount)} ₽</p>
              </div>
            </div>
          )}
          {hasGoal && streak > 0 && (
            <div className="flex-shrink-0 w-40 h-40 rounded-2xl bg-[#1a1a1a] p-4 flex flex-col justify-between">
              <span className="text-5xl flame-anim">🔥</span>
              <div>
                <p className="text-white text-sm font-semibold">Стрик {streak} {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'}</p>
                <p className="text-[#8E8E93] text-xs mt-1">личный рекорд: 21</p>
              </div>
            </div>
          )}
          <div className="flex-shrink-0 w-40 h-40 rounded-2xl bg-[#2a1a1a] p-4 flex flex-col justify-between">
            <div className="text-3xl">🎰</div>
            <div>
              <p className="text-white text-sm font-semibold">Инвесткопилка дарит 7000 ₽</p>
            </div>
          </div>
          <div className="flex-shrink-0 w-40 h-40 rounded-2xl bg-[#1a2a2a] p-4 flex flex-col justify-between">
            <div className="text-3xl">✈️</div>
            <div>
              <p className="text-white text-sm font-semibold">Всё для путешествий</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
