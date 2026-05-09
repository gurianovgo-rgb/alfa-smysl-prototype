import React, { useEffect } from 'react'
import { useApp } from '../context/AppContext'

export default function DepositConfirm() {
  const { setScreen, depositAmount, balance, goalAmount, setBalance, formatNumber } = useApp()

  function handleClose() {
    const newBalance = balance + depositAmount
    setBalance(newBalance)
    if (newBalance >= goalAmount && goalAmount > 0) {
      setScreen('triumph')
    } else {
      setScreen('savings-active')
    }
  }

  useEffect(() => {
    const timer = setTimeout(handleClose, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] screen-enter items-center justify-center px-5 py-12">
      <div className="absolute top-4 right-4">
        <button onClick={handleClose} className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center btn-press">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="w-full max-w-[340px]">
        <div className="bg-[#1a1a1a] rounded-3xl p-6 fade-in">
          <p className="text-[#8E8E93] text-sm text-center mb-4">
            Перевод выполнен — Накопительный счёт ·· 2572
          </p>

          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FF3B30] flex items-center justify-center">
              <span className="text-white text-3xl font-black">А</span>
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="text-white font-bold mb-1" style={{ fontSize: depositAmount >= 10000 ? '40px' : '48px' }}>
              {formatNumber(depositAmount)} ₽
            </p>
            <p className="text-[#8E8E93] text-sm">Без комиссии</p>
          </div>

          <div className="bg-[#0a0a0a] rounded-2xl p-3 text-center mb-5">
            <p className="text-white text-sm font-medium">Накопительный счёт ·· 2572</p>
            <p className="text-[#8E8E93] text-xs mt-0.5">Перевод на свой счёт</p>
          </div>

          <div className="flex items-center justify-around">
            {['📄 Квитанция', '⭐ Шаблон', '🕐 Автоплатёж'].map(item => (
              <button key={item} className="flex flex-col items-center gap-1 btn-press">
                <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <span className="text-sm">{item.split(' ')[0]}</span>
                </div>
                <span className="text-[#8E8E93] text-[10px]">{item.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
