import React, { useState, useRef } from 'react'
import { useApp } from '../context/AppContext'

export default function WithdrawScreen() {
  const { setScreen, balance, setWithdrawAmount, formatNumber } = useApp()
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  const amount = parseInt(input) || 0
  const roundUp = input ? Math.ceil((amount + 1) / 100) * 100 : 0
  const canProceed = amount > 0 && amount <= balance

  function handleChange(e) {
    const val = e.target.value.replace(/\D/g, '')
    if (val.length <= 8) setInput(val)
  }

  function handleProceed() {
    if (!canProceed) return
    setWithdrawAmount(amount)
    setScreen('pause')
  }

  function formatDisplay(s) {
    const n = parseInt(s) || 0
    if (!s) return ''
    return n.toLocaleString('ru-RU')
  }

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] screen-enter" onClick={() => inputRef.current?.focus()}>

      {/* Header */}
      <div className="px-4 pt-4 pb-4 flex items-center justify-between flex-shrink-0">
        <button onClick={(e) => { e.stopPropagation(); setScreen('savings-active') }} className="btn-press p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="text-white text-lg font-semibold">Между счетами</span>
        <div className="w-8" />
      </div>

      {/* From / To accounts */}
      <div className="mx-4 bg-[#1a1a1a] rounded-2xl overflow-hidden mb-4">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2a2a2a]">
          <div className="w-9 h-9 rounded-xl bg-[#2a2a2a] flex items-center justify-center">
            <span className="text-white font-bold text-sm">₽</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-base font-semibold">{formatNumber(balance)} ₽</p>
            <p className="text-[#8E8E93] text-xs">Накопительный счёт</p>
          </div>
          <span className="text-[#8E8E93] text-sm">··2572</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-xl bg-[#2a2a2a] flex items-center justify-center">
            <span className="text-white font-bold text-sm">₽</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-base font-semibold">80 ₽</p>
            <p className="text-[#8E8E93] text-xs">Текущий счёт</p>
          </div>
          <span className="text-[#8E8E93] text-sm">··8645</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <p className="text-[#8E8E93] text-xs px-4 mb-6">Зачисление происходит моментально.</p>

      {/* Amount display + proceed */}
      <div className="px-4 flex items-end justify-between mb-4 flex-1">
        <div className="relative">
          {/* Native numeric keyboard input — invisible, autoFocused */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={input}
            onChange={handleChange}
            autoFocus
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            style={{ zIndex: 1 }}
          />
          <div className="flex items-baseline gap-2">
            <span
              className="text-white font-bold leading-none"
              style={{ fontSize: input.length > 5 ? '44px' : '56px' }}
            >
              {input ? formatDisplay(input) : <span className="text-[#3a3a3a]">0</span>}
            </span>
            <span className="text-white text-4xl font-bold">₽</span>
          </div>
          <p className="text-[#8E8E93] text-sm mt-1">Без комиссии</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); handleProceed() }}
          disabled={!canProceed}
          className={`w-14 h-14 rounded-full flex items-center justify-center btn-press transition-all flex-shrink-0 ${
            canProceed ? 'bg-white' : 'bg-[#2a2a2a]'
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M13 6L19 12L13 18"
              stroke={canProceed ? 'black' : '#8E8E93'}
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Shortcuts */}
      <div className="px-4 mb-6 flex items-center gap-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="#8E8E93" strokeWidth="1.5"/>
          <path d="M2 10H22" stroke="#8E8E93" strokeWidth="1.5"/>
        </svg>
        {roundUp > amount && roundUp <= balance && (
          <button onClick={(e) => { e.stopPropagation(); setInput(String(roundUp)) }} className="btn-press">
            <p className="text-[#8E8E93] text-xs">До круглого</p>
            <p className="text-white text-sm font-semibold">{formatNumber(roundUp)} ₽</p>
          </button>
        )}
        <button onClick={(e) => { e.stopPropagation(); setInput(String(balance)) }} className="btn-press">
          <p className="text-[#8E8E93] text-xs">Всё</p>
          <p className="text-white text-sm font-semibold">{formatNumber(balance)} ₽</p>
        </button>
      </div>
    </div>
  )
}
