import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

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
      // ignore decimals for simplicity
    } else {
      if (input.length >= 8) return
      setInput(prev => prev + key)
    }
  }

  function handleRoundUp() { setInput(String(roundUp)) }
  function handleAll() { setInput(String(balance)) }

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

  const KEYS = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    [',','0','backspace'],
  ]

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] screen-enter">
      <div className="px-4 pt-4 pb-4 flex items-center justify-between">
        <button onClick={() => setScreen('savings-active')} className="btn-press p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="text-white text-lg font-semibold">Между счетами</span>
        <div className="w-8" />
      </div>

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

      <div className="px-4 flex items-end justify-between mb-1 flex-1">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold" style={{ fontSize: input.length > 5 ? '44px' : '56px' }}>
              {input ? formatDisplay(input) : <span className="text-[#3a3a3a]">0</span>}
            </span>
            <span className="text-white text-4xl font-bold">₽</span>
          </div>
          <p className="text-[#8E8E93] text-sm mt-1">Без комиссии</p>
        </div>
        <button
          onClick={handleProceed}
          disabled={!canProceed}
          className={`w-14 h-14 rounded-full flex items-center justify-center btn-press transition-all ${
            canProceed ? 'bg-white' : 'bg-[#2a2a2a]'
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M13 6L19 12L13 18" stroke={canProceed ? 'black' : '#8E8E93'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="px-4 mt-4 mb-4 flex items-center gap-4">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="5" width="20" height="14" rx="2" stroke="#8E8E93" strokeWidth="1.5"/>
          <path d="M2 10H22" stroke="#8E8E93" strokeWidth="1.5"/>
        </svg>
        {roundUp > amount && roundUp <= balance && (
          <button onClick={handleRoundUp} className="btn-press">
            <p className="text-[#8E8E93] text-xs">До круглого</p>
            <p className="text-white text-sm font-semibold">{formatNumber(roundUp)} ₽</p>
          </button>
        )}
        <button onClick={handleAll} className="btn-press">
          <p className="text-[#8E8E93] text-xs">Всё</p>
          <p className="text-white text-sm font-semibold">{formatNumber(balance)} ₽</p>
        </button>
      </div>

      <div className="bg-[#1a1a1a] mt-auto">
        {KEYS.map((row, ri) => (
          <div key={ri} className="flex border-t border-[#0a0a0a]">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKey(key)}
                className="flex-1 flex flex-col items-center justify-center py-4 gap-0.5 btn-press active:bg-[#2a2a2a] transition-colors"
              >
                {key === 'backspace' ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M21 6H8L1 12L8 18H21V6Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M12 9L18 15M18 9L12 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <>
                    <span className="text-white text-2xl font-light">{key}</span>
                    {['2','3','4','5','6','7','8','9'].includes(key) && (
                      <span className="text-[#8E8E93] text-[10px] tracking-widest">
                        {{'2':'АБВГ','3':'ДЕЖЗ','4':'ИЙКЛ','5':'МНОП','6':'РСТУ','7':'ФХЦЧ','8':'ШЩЪЫ','9':'ЬЭЮЯ'}[key]}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
