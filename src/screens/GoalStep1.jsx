import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

const QUICK_TAGS = [
  { emoji: '👟', label: 'Кроссовки' },
  { emoji: '📱', label: 'Гаджет' },
  { emoji: '✈️', label: 'Путешествие' },
  { emoji: '🎵', label: 'Концерт' },
  { emoji: '🎁', label: 'Подарок' },
]

export default function GoalStep1() {
  const { setScreen, goalName, setGoalName } = useApp()
  const [input, setInput] = useState(goalName || '')

  function handleNext() {
    if (!input.trim()) return
    setGoalName(input.trim())
    setScreen('goal-step2')
  }

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] screen-enter">
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute inset-0 bg-[#0a0a0a] opacity-70" />
        </div>

        <div className="relative px-4 pt-4 pb-6">
          <button onClick={() => setScreen('savings')} className="btn-press p-1 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="text-[#8E8E93] text-sm">Накопительный счёт ↗</p>
          <p className="text-white text-4xl font-bold mt-1">0 ₽</p>
          <p className="text-[#8E8E93] text-sm mt-0.5">Доход за всё время: 0 ₽</p>
        </div>
      </div>

      <div className="flex-1 bg-[#1a1a1a] rounded-t-3xl px-6 pt-3 pb-8 screen-enter">
        <div className="flex justify-center mb-6 mt-1">
          <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-1 bg-[#FF3B30] rounded-full" />
            <div className="flex-1 h-1 bg-[#3a3a3a] rounded-full" />
          </div>
          <p className="text-[#8E8E93] text-xs font-semibold tracking-widest mt-3">ШАГ 1 ИЗ 2</p>
        </div>

        <h1 className="text-white text-3xl font-bold mb-1">Как называется цель?</h1>
        <p className="text-[#8E8E93] text-sm mb-5">Например: Кроссовки, Айфон, Концерт</p>

        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Введи название"
          className="w-full bg-white text-black text-base font-medium px-4 py-4 rounded-2xl focus:outline-none mb-5 placeholder:text-[#8E8E93]"
          autoFocus
        />

        <div className="flex flex-wrap gap-2 mb-8">
          {QUICK_TAGS.map(t => (
            <button
              key={t.label}
              onClick={() => setInput(t.label)}
              className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2.5 rounded-full text-white text-sm font-medium btn-press"
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!input.trim()}
          className={`w-full py-4 rounded-2xl font-semibold text-base btn-press transition-all ${
            input.trim()
              ? 'bg-white text-black'
              : 'bg-[#2a2a2a] text-[#8E8E93]'
          }`}
        >Далее</button>
      </div>
    </div>
  )
}
