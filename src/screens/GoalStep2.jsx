import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

export default function GoalStep2() {
  const {
    setScreen, goalName,
    goalAmount, setGoalAmount,
    goalDate, setGoalDate,
    monthlyAmount, setMonthlyAmount,
    autoSave, setAutoSave,
    formatNumber, formatDateShort,
  } = useApp()

  const [amountInput, setAmountInput] = useState(goalAmount > 0 ? String(goalAmount) : '')
  const [dateInput, setDateInput] = useState(() => {
    if (goalDate) return goalDate
    const d = new Date()
    d.setMonth(d.getMonth() + 3)
    return d.toISOString().split('T')[0]
  })
  const [weeklyAmount, setWeeklyAmount] = useState('500')

  const amount = parseInt(amountInput.replace(/\D/g, '')) || 0

  useEffect(() => {
    if (amount > 0 && dateInput) {
      const months = monthsBetween(new Date(), new Date(dateInput))
      const needed = months > 0 ? Math.ceil(amount / months) : amount
      setMonthlyAmount(needed)
    }
  }, [amount, dateInput])

  function monthsBetween(a, b) {
    const diff = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
    return Math.max(1, diff)
  }

  function handleAmountKey(key) {
    if (key === 'backspace') {
      setAmountInput(prev => prev.slice(0, -1))
    } else if (key === ',') {
      if (!amountInput.includes(',')) setAmountInput(prev => prev + ',')
    } else {
      setAmountInput(prev => prev + key)
    }
  }

  function handleStart() {
    const finalAmount = parseInt(amountInput.replace(/\D/g, '')) || 0
    if (!finalAmount) return
    setGoalAmount(finalAmount)
    setGoalDate(dateInput)
    setScreen('account-opened')
  }

  const months = monthsBetween(new Date(), new Date(dateInput))
  const neededPerMonth = amount > 0 ? Math.ceil(amount / months) : 0
  const achieveDate = formatDateShort(dateInput)

  function formatAmountDisplay(s) {
    const n = parseInt(s.replace(/\D/g, '')) || 0
    if (n === 0 && !s) return '0'
    return n.toLocaleString('ru-RU')
  }

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] screen-enter">
      <div className="px-4 pt-4 pb-4">
        <button onClick={() => setScreen('goal-step1')} className="btn-press p-1 mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="text-[#8E8E93] text-sm">Накопительный счёт ↗</p>
        <p className="text-white text-4xl font-bold">0 ₽</p>
      </div>

      <div className="flex-1 bg-[#1a1a1a] rounded-t-3xl px-6 pt-3 pb-4">
        <div className="flex justify-center mb-5 mt-1">
          <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
        </div>

        <div className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-1 bg-[#FF3B30] rounded-full" />
            <div className="flex-1 h-1 bg-[#FF3B30] rounded-full" />
          </div>
          <p className="text-[#8E8E93] text-xs font-semibold tracking-widest mt-3">ШАГ 2 ИЗ 2</p>
        </div>

        <h1 className="text-white text-2xl font-bold mb-4">Сколько хочешь накопить?</h1>

        <div className="mb-4">
          <div className="flex items-baseline gap-1 border-b border-[#3a3a3a] pb-2 mb-1 relative">
            <input
              type="number"
              inputMode="numeric"
              value={amountInput}
              onChange={e => setAmountInput(e.target.value.replace(/\D/g, ''))}
              placeholder="0"
              className="bg-transparent text-white font-bold w-full focus:outline-none placeholder:text-[#3a3a3a]"
              style={{ fontSize: (amountInput || '').length > 6 ? '36px' : '48px' }}
              autoFocus
            />
            <span className="text-white text-3xl font-bold flex-shrink-0">₽</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-4 border-b border-[#3a3a3a] mb-4">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="17" rx="2" stroke="#8E8E93" strokeWidth="1.5"/>
              <path d="M3 9H21M8 2V5M16 2V5" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div>
              <p className="text-[#8E8E93] text-xs">Накопить до</p>
              <p className="text-white text-base font-semibold">
                {new Date(dateInput).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
          <input
            type="date"
            value={dateInput}
            onChange={e => setDateInput(e.target.value)}
            className="opacity-0 absolute w-8 h-8 cursor-pointer"
            style={{ right: '24px' }}
          />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-white text-base font-semibold">Откладывать автоматически</p>
            {autoSave && <p className="text-[#8E8E93] text-sm">{weeklyAmount} ₽ в неделю</p>}
          </div>
          <button
            onClick={() => setAutoSave(!autoSave)}
            className={`w-12 h-7 rounded-full transition-all relative btn-press ${autoSave ? 'bg-[#30D158]' : 'bg-[#3a3a3a]'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${autoSave ? 'left-5' : 'left-0.5'}`} />
          </button>
        </div>

        {amount > 0 && (
          <div className="bg-[#0a0a0a] rounded-2xl p-4 mt-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">📅</span>
                <span className="text-[#8E8E93] text-sm">Достигнешь цели</span>
              </div>
              <span className="text-white text-sm font-semibold">{achieveDate}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">📈</span>
                <span className="text-[#8E8E93] text-sm">Нужно в месяц</span>
              </div>
              <span className="text-white text-sm font-semibold">~{formatNumber(neededPerMonth)} ₽</span>
            </div>
            <div className="h-1 bg-[#2a2a2a] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#FF3B30] rounded-full w-[2%]" />
            </div>
            <p className="text-[#8E8E93] text-xs">0% · только что начали</p>
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={!amount}
          className={`w-full py-4 rounded-2xl font-semibold text-base btn-press mt-2 ${
            amount ? 'bg-white text-black' : 'bg-[#2a2a2a] text-[#8E8E93]'
          }`}
        >Начать копить</button>
      </div>
    </div>
  )
}
