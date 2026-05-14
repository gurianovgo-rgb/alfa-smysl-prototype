import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

export default function PauseScreen() {
  const {
    setScreen, balance, goalName, goalAmount, withdrawAmount, monthlyAmount,
    streak, setBalance, setStreak, setTimerActive, setTimerSeconds,
    getGoalEmoji, progressPercent, formatNumber,
  } = useApp()

  const [seconds, setSeconds] = useState(3600)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  function formatTimer(s) {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const currentProg = progressPercent(balance)
  const afterProg = progressPercent(balance - withdrawAmount)
  const diff = currentProg - afterProg
  const daysLost = Math.ceil(withdrawAmount / ((monthlyAmount || 1) / 30))
  const timerProgress = (seconds / 3600) * 100

  function handleWait() {
    setTimerSeconds(seconds)
    setTimerActive(true)
    setScreen('savings-active')
  }

  function handleWithdraw() {
    setBalance(prev => Math.max(0, prev - withdrawAmount))
    setStreak(0)
    setScreen('transfer-confirm')
  }

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] screen-enter px-5 pt-12 pb-8 overflow-y-auto">
      <div className="absolute top-4 right-4">
        <button onClick={handleWait} className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center btn-press">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <h1 className="text-white text-4xl font-bold mb-2">Подожди секунду !</h1>
      <p className="text-[#8E8E93] text-base mb-5">Снимать сейчас не лучшая идея. Вот что произойдёт.</p>

      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-3">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">{getGoalEmoji()}</span>
          <span className="text-white text-base font-semibold">{goalName}</span>
        </div>

        <p className="text-[#8E8E93] text-xs font-semibold tracking-widest mb-2">СЕЙЧАС</p>
        <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden mb-1.5">
          <div className="h-full bg-[#FF3B30] rounded-full progress-bar" style={{ width: `${currentProg}%` }} />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#8E8E93] text-sm">{formatNumber(balance)} ₽ из {formatNumber(goalAmount)} ₽</span>
          <span className="text-white text-sm font-semibold">{currentProg}%</span>
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-[#8E8E93] text-sm font-medium">↓ -{diff}%</span>
        </div>

        <p className="text-[#8E8E93] text-xs font-semibold tracking-widest mb-2">ПОСЛЕ СНЯТИЯ</p>
        <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden mb-1.5">
          <div className="h-full bg-[#FF3B30] rounded-full progress-bar" style={{ width: `${afterProg}%` }} />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#8E8E93] text-sm">{formatNumber(balance - withdrawAmount)} ₽ из {formatNumber(goalAmount)} ₽</span>
          <span className="text-white text-sm font-semibold">{afterProg}%</span>
        </div>

        <p className="text-[#8E8E93] text-sm">
          Если снимешь сейчас — цель отдалится на {daysLost} {daysLost === 1 ? 'день' : daysLost < 5 ? 'дня' : 'дней'}
        </p>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl flame-anim">🔥</span>
          <span className="text-white text-base font-semibold">
            Сгорит {streak} {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'} стрика
          </span>
        </div>
        <span className="text-[#8E8E93] text-sm">начнётся заново</span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 bg-[#1a1a1a] rounded-2xl p-5">
          <p className="text-white font-bold text-center mb-3" style={{ fontSize: '64px', lineHeight: 1, letterSpacing: '-2px' }}>
            {formatTimer(seconds)}
          </p>
          <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-[#FF3B30] rounded-full transition-all duration-1000"
              style={{ width: `${timerProgress}%` }}
            />
          </div>
          <p className="text-[#8E8E93] text-sm text-center">таймер остывания</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <span style={{ fontSize: '48px' }}>🧊</span>
          <span className="text-2xl flame-anim">🔥</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <button
          onClick={handleWait}
          className="w-full bg-white text-black py-4 rounded-2xl font-semibold text-base btn-press"
        >Подождать</button>
        <button
          onClick={handleWithdraw}
          className="w-full bg-[#1a1a1a] text-white py-4 rounded-2xl font-semibold text-base btn-press"
        >Всё равно вывести</button>
      </div>
    </div>
  )
}
