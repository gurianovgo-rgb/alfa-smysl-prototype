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
  const daysLost = Math.ceil(withdrawAmount / ((monthlyAmount || 1) / 30))

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
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] screen-enter px-5 pt-12 pb-8">
      <div className="absolute top-4 right-4">
        <button onClick={handleWait} className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center btn-press">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <h1 className="text-white text-4xl font-bold mb-2">Подожди секунду</h1>
      <p className="text-[#8E8E93] text-base mb-6">Снимать сейчас не лучшая идея. Вот что произойдёт.</p>

      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-3">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{getGoalEmoji()}</span>
          <span className="text-white text-base font-semibold">{goalName}</span>
        </div>

        <p className="text-[#8E8E93] text-xs font-semibold tracking-widest mb-2">СЕЙЧАС</p>
        <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden mb-2">
          <div className="h-full bg-[#FF3B30] rounded-full progress-bar" style={{ width: `${currentProg}%` }} />
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#8E8E93] text-sm">{formatNumber(balance)} ₽ из {formatNumber(goalAmount)} ₽</span>
          <span className="text-white text-sm font-semibold">{currentProg}%</span>
        </div>

        <div className="flex justify-center mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M6 13L12 19L18 13" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className="text-[#8E8E93] text-xs font-semibold tracking-widest mb-2">ПОСЛЕ СНЯТИЯ</p>
        <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden mb-2">
          <div className="h-full bg-[#FF3B30] rounded-full progress-bar" style={{ width: `${afterProg}%` }} />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#8E8E93] text-sm">{formatNumber(balance - withdrawAmount)} ₽ из {formatNumber(goalAmount)} ₽</span>
          <span className="text-white text-sm font-semibold">{afterProg}%</span>
        </div>

        <div className="flex items-center gap-2 bg-[#2a0a0a] rounded-xl p-3">
          <span className="text-base">⚠️</span>
          <p className="text-[#FF3B30] text-sm font-medium">
            Если снимешь сейчас — цель отдалится на {daysLost} {daysLost === 1 ? 'день' : daysLost < 5 ? 'дня' : 'дней'}
          </p>
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl flame-anim">🔥</span>
          <span className="text-white text-base font-semibold">Сгорит {streak} {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'} стрика</span>
        </div>
        <span className="text-[#8E8E93] text-sm">начнётся заново</span>
      </div>

      <div className="text-center mb-2">
        <p className="text-white font-bold" style={{ fontSize: '72px', lineHeight: 1 }}>{formatTimer(seconds)}</p>
        <p className="text-[#8E8E93] text-sm mt-2">Таймер остывания</p>
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <button
          onClick={handleWait}
          className="w-full bg-white text-black py-4 rounded-2xl font-semibold text-base btn-press"
        >Подождать</button>
        <button
          onClick={handleWithdraw}
          className="w-full text-[#8E8E93] py-3 font-medium text-base btn-press"
        >Всё равно вывести</button>
      </div>
    </div>
  )
}
