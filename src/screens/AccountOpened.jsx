import React, { useEffect } from 'react'
import { useApp } from '../context/AppContext'

export default function AccountOpened() {
  const { setScreen, goalAmount, setBalance, setStreak, setHasGoal } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => {
      setBalance(Math.round(goalAmount * 0.7))
      setStreak(1)
      setHasGoal(true)
      setScreen('savings-active')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  function handleSetGoal() {
    setBalance(Math.round(goalAmount * 0.7))
    setStreak(1)
    setHasGoal(true)
    setScreen('savings-active')
  }

  function handleNoGoal() {
    setBalance(0)
    setStreak(0)
    setHasGoal(false)
    setScreen('savings')
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] screen-enter items-center justify-between py-12 px-6">
      <div className="absolute top-4 right-4">
        <button onClick={handleNoGoal} className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center btn-press">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <div className="w-20 h-20 rounded-[22px] bg-[#30D158] flex items-center justify-center pop-in shadow-[0_0_40px_rgba(48,209,88,0.4)]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M5 12L10 17L19 8" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="fade-in" style={{ animationDelay: '200ms' }}>
          <h1 className="text-white text-3xl font-bold mb-3">Накопительный счёт открыт</h1>
          <p className="text-[#8E8E93] text-base">Поставь цель — и мы покажем,<br/>когда ты её достигнешь</p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          onClick={handleSetGoal}
          className="w-full bg-white text-black py-4 rounded-2xl font-semibold text-base btn-press"
        >Поставить цель</button>
        <button
          onClick={handleNoGoal}
          className="w-full text-[#8E8E93] py-3 font-medium text-base btn-press"
        >Пока без цели</button>
      </div>
    </div>
  )
}
