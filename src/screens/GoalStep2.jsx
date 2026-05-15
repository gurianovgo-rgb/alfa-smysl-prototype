import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import FlameCharacter from '../components/FlameCharacter'

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
  const [trigger, setTrigger] = useState(false)

  const amount = parseInt(amountInput.replace(/\D/g, '')) || 0

  function monthsBetween(a, b) {
    const diff = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth())
    return Math.max(1, diff)
  }

  useEffect(() => {
    if (amount > 0 && dateInput) {
      const months = monthsBetween(new Date(), new Date(dateInput))
      setMonthlyAmount(Math.ceil(amount / months))
    }
  }, [amount, dateInput])

  function handleStart() {
    const finalAmount = parseInt(amountInput.replace(/\D/g, '')) || 0
    if (!finalAmount) return
    setGoalAmount(finalAmount)
    setGoalDate(dateInput)
    setScreen('account-opened')
  }

  const months = monthsBetween(new Date(), new Date(dateInput))
  const neededPerMonth = amount > 0 ? Math.ceil(amount / months) : 0
  const incomeEstimate = amount > 0 ? Math.round(amount * 0.135 * (months / 12)) : 0
  const achieveDate = formatDateShort(dateInput)

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] relative overflow-hidden">
      <div className="px-4 pt-4 pb-4">
        <button onClick={() => setScreen('goal-step1')} className="btn-press p-1 mb-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="text-[#8E8E93] text-sm flex items-center gap-1">
          Накопительный счёт
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4C3.45 4 3 4.45 3 5V20C3 20.55 3.45 21 4 21H19C19.55 21 20 20.55 20 20V13" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M18.5 2.5C19.33 1.67 20.67 1.67 21.5 2.5C22.33 3.33 22.33 4.67 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </p>
        <p className="text-white text-4xl font-bold">0 ₽</p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl px-6 pt-3 pb-10 sheet-enter overflow-y-auto" style={{ maxHeight: '88vh' }}>
        <div className="flex justify-center mb-5 mt-1">
          <div className="w-10 h-1 bg-[#3a3a3a] rounded-full" />
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-1 bg-[#FF3B30] rounded-full" />
            <div className="flex-1 h-1 bg-[#FF3B30] rounded-full" />
          </div>
          <p className="text-[#8E8E93] text-xs font-semibold tracking-widest mt-3">ШАГ 2 ИЗ 2</p>
        </div>

        <div className="flex items-start justify-between mb-4">
          <h1 className="text-white text-2xl font-bold leading-tight">Сколько хочешь<br/>накопить?</h1>
          <FlameCharacter size={76} className="flame-anim" />
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2 border-b border-[#3a3a3a] pb-3">
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

        <div className="relative flex items-center justify-between py-4 border-b border-[#3a3a3a]">
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
            className="opacity-0 absolute right-0 w-10 h-10 cursor-pointer"
          />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        <div className="py-4 border-b border-[#3a3a3a]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-white text-base font-semibold">Откладывать автоматически</p>
              <p className="text-[#8E8E93] text-sm mt-0.5">
                {autoSave && neededPerMonth > 0 ? `${formatNumber(neededPerMonth)} ₽ в месяц` : 'Введите сумму'}
              </p>
            </div>
            <button
              onClick={() => setAutoSave(!autoSave)}
              className={`w-12 h-7 rounded-full transition-all relative btn-press flex-shrink-0 ${autoSave ? 'bg-[#30D158]' : 'bg-[#3a3a3a]'}`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${autoSave ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        <div className="py-4 border-b border-[#3a3a3a] mb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-white text-base font-semibold">Включить триггер на пополнение</p>
              <p className="text-[#8E8E93] text-sm mt-0.5">Настроить триггер</p>
            </div>
            <button
              onClick={() => setTrigger(!trigger)}
              className={`w-12 h-7 rounded-full transition-all relative btn-press flex-shrink-0 ${trigger ? 'bg-[#30D158]' : 'bg-[#3a3a3a]'}`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${trigger ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>

        {amount > 0 && (
          <div className="bg-[#0f0f0f] rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">📅</span>
                <span className="text-[#8E8E93] text-sm">Достигнешь цели</span>
              </div>
              <span className="text-white text-sm font-semibold">{achieveDate}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">📊</span>
                <span className="text-[#8E8E93] text-sm">{formatNumber(neededPerMonth)} ₽ в месяц</span>
              </div>
              <span className="text-white text-sm font-semibold">~{formatNumber(incomeEstimate)} ₽</span>
            </div>
            <div className="h-0.5 bg-[#2a2a2a] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#FF3B30] rounded-full" style={{ width: '2%' }} />
            </div>
            <p className="text-[#8E8E93] text-xs">0% · только что начали</p>
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={!amount}
          className={`w-full py-4 rounded-2xl font-semibold text-base btn-press ${
            amount ? 'bg-white text-black' : 'bg-[#2a2a2a] text-[#8E8E93]'
          }`}
        >Начать копить</button>
      </div>
    </div>
  )
}
