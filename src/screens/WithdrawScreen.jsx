import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { icons } from '../icons'

const KEYS = [
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'],
  [',','0','backspace'],
]

const LETTERS = {
  '2':'АБВ','3':'ГДЕ','4':'ЖЗИ','5':'КЛМ',
  '6':'НОП','7':'РСТ','8':'УФХ','9':'ЦЧШ',
}

// Keyboard height: 4 rows × 64px + shortcuts row 52px + safe area
const KB_HEIGHT = 'calc(64px * 4 + 52px + env(safe-area-inset-bottom, 0px))'

export default function WithdrawScreen() {
  const { setScreen, balance, setWithdrawAmount, formatNumber } = useApp()
  const [input, setInput] = useState('')

  const amount = parseInt(input) || 0
  const roundUp = input ? Math.ceil((amount + 1) / 100) * 100 : 0
  const canProceed = amount > 0 && amount <= balance

  function handleKey(key) {
    if (key === 'backspace') {
      setInput(prev => prev.slice(0, -1))
    } else if (key === ',') {
      // ignore
    } else {
      if (input.length >= 8) return
      setInput(prev => prev + key)
    }
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
    <div className="flex flex-col bg-[#0a0a0a] screen-enter" style={{ minHeight: '100dvh' }}>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between flex-shrink-0">
        <button onClick={() => setScreen('savings-active')} className="btn-press p-1">
          <img src={icons.backArrow} className="w-6 h-6 object-contain" alt="" />
        </button>
        <span className="text-white text-lg font-semibold">Между счетами</span>
        <div className="w-8" />
      </div>

      {/* Content — scrollable, padded so keyboard doesn't cover it */}
      <div className="flex-1 overflow-y-auto px-4" style={{ paddingBottom: KB_HEIGHT }}>

        {/* From / To accounts */}
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden mb-3">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2a2a2a]">
            <div className="w-9 h-9 rounded-xl bg-[#2a2a2a] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">₽</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-base font-semibold">{formatNumber(balance)} ₽</p>
              <p className="text-[#8E8E93] text-xs">Накопительный счёт</p>
            </div>
            <span className="text-[#8E8E93] text-sm flex-shrink-0">··2572</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-9 h-9 rounded-xl bg-[#2a2a2a] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">₽</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-base font-semibold">80 ₽</p>
              <p className="text-[#8E8E93] text-xs">Текущий счёт</p>
            </div>
            <span className="text-[#8E8E93] text-sm flex-shrink-0">··8645</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <p className="text-[#8E8E93] text-xs mb-8">Зачисление происходит моментально.</p>

        {/* Amount display + proceed button */}
        <div className="flex items-end justify-between">
          <div>
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
            onClick={handleProceed}
            disabled={!canProceed}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center btn-press transition-all flex-shrink-0 ${
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
      </div>

      {/* ── KEYBOARD PANEL ── fixed, slides up from below */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 sheet-enter"
        style={{ background: '#111111', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {/* Shortcuts row */}
        <div className="flex items-center gap-4 px-4 py-3 border-t border-[#2a2a2a]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="#8E8E93" strokeWidth="1.5"/>
            <path d="M2 10H22" stroke="#8E8E93" strokeWidth="1.5"/>
          </svg>
          {roundUp > amount && roundUp <= balance && (
            <button onClick={() => setInput(String(roundUp))} className="btn-press">
              <p className="text-[#8E8E93] text-xs">До круглого</p>
              <p className="text-white text-sm font-semibold">{formatNumber(roundUp)} ₽</p>
            </button>
          )}
          <button onClick={() => setInput(String(balance))} className="btn-press">
            <p className="text-[#8E8E93] text-xs">Всё</p>
            <p className="text-white text-sm font-semibold">{formatNumber(balance)} ₽</p>
          </button>
        </div>

        {/* Keys grid */}
        <div className="grid grid-cols-3 gap-px bg-[#2a2a2a]">
          {KEYS.flat().map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className="bg-[#111111] flex flex-col items-center justify-center btn-press active:bg-[#2a2a2a] transition-colors"
              style={{ height: '64px' }}
            >
              {key === 'backspace' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M21 6H8L1 12L8 18H21V6Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M12 9L18 15M18 9L12 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <>
                  <span className="text-white text-2xl font-light leading-none">{key}</span>
                  {LETTERS[key] && (
                    <span className="text-[#8E8E93] text-[10px] tracking-widest mt-0.5">{LETTERS[key]}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
