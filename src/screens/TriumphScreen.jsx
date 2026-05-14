import React, { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext'

const CONFETTI_COLORS = ['#FF3B30', '#FFD60A', '#FFFFFF', '#FF9F0A', '#FF453A', '#FFE5B4', '#30D158']

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      width: 5 + Math.random() * 8,
      height: 8 + Math.random() * 8,
      delay: Math.random() * 2.5,
      duration: 2.5 + Math.random() * 2,
      rotate: Math.random() * 360,
      round: Math.random() > 0.5,
    }))
  )

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-20px',
            width: p.width,
            height: p.height,
            background: p.color,
            borderRadius: p.round ? '50%' : '2px',
            transform: `rotate(${p.rotate}deg)`,
            animation: `fall ${p.duration}s ${p.delay}s ease-in infinite`,
          }}
        />
      ))}
    </div>
  )
}

export default function TriumphScreen() {
  const {
    setScreen, goalName, goalAmount, streak,
    setGoalName, setGoalAmount, setGoalDate, setBalance, setStreak, setHasGoal,
    getGoalEmoji, formatNumber,
  } = useApp()

  function handleNewGoal() {
    setGoalName('')
    setGoalAmount(0)
    setGoalDate(null)
    setBalance(0)
    setStreak(0)
    setHasGoal(false)
    setScreen('goal-step1')
  }

  function handleContinue() {
    setScreen('savings-active')
  }

  const impulseCount = Math.max(3, Math.round(streak * 0.7))
  const savedAmount = Math.round(goalAmount * 0.65)

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] screen-enter relative overflow-hidden">
      <Confetti />

      <div className="absolute top-4 right-4 z-10">
        <button onClick={handleContinue} className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center btn-press">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="absolute top-8 left-0 z-10 pointer-events-none">
        <span style={{ fontSize: '120px', lineHeight: 1 }} className="flame-anim">🔥</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center z-10 px-6 pt-20">
        <div
          className="w-20 h-20 rounded-[22px] flex items-center justify-center pop-in"
          style={{ background: 'linear-gradient(145deg, #FFD60A, #FF9F0A)', boxShadow: '0 0 60px rgba(255,214,10,0.4)' }}
        >
          <span style={{ fontSize: '40px' }}>🏆</span>
        </div>

        <div className="fade-in" style={{ animationDelay: '200ms' }}>
          <h1 className="text-white text-3xl font-bold mb-2">Ты накопил!</h1>
          <p className="text-white text-base mb-3">
            {getGoalEmoji()} {goalName}
          </p>
          <p className="text-white font-bold" style={{ fontSize: '52px', letterSpacing: '-1px' }}>
            {formatNumber(goalAmount)} ₽
          </p>
        </div>

        <div className="w-full bg-[#1a1a1a] rounded-2xl p-4 fade-in text-left" style={{ animationDelay: '350ms' }}>
          <p className="text-white text-sm font-semibold mb-2">
            🔥 {streak} {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'} без снятий — личный рекорд.
          </p>
          <div className="h-px bg-[#FF3B30] rounded-full mb-3" />
          <p className="text-[#8E8E93] text-sm leading-relaxed">
            За всё время ты удержался(-ась) от импульсивных трат {impulseCount} раз и сэкономил(-а) {formatNumber(savedAmount)} ₽ — достойная дисциплина!
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 z-10 px-6 pb-10 fade-in" style={{ animationDelay: '500ms' }}>
        <button
          onClick={handleNewGoal}
          className="w-full bg-white text-black py-4 rounded-2xl font-semibold text-base btn-press"
        >Поставить новую цель</button>
        <button
          onClick={handleContinue}
          className="w-full bg-[#1a1a1a] text-white py-4 rounded-2xl font-semibold text-base btn-press"
        >Продолжить копить</button>
      </div>
    </div>
  )
}
