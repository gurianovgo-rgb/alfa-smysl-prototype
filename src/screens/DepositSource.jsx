import React from 'react'
import { useApp } from '../context/AppContext'
import { icons } from '../icons'

export default function DepositSource() {
  const { setScreen } = useApp()

  const accounts = [
    { balance: '80 ₽', name: 'Текущий счёт', num: '··8645', clickable: true },
    { balance: '0 ₽', name: 'Накопительный счёт', num: '··5365', clickable: false },
  ]

  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0a0a] screen-enter">
      <div className="px-4 pt-4 pb-4 flex items-center justify-between">
        <button onClick={() => setScreen('deposit')} className="btn-press p-1">
          <img src={icons.backArrow} className="w-6 h-6 object-contain" alt="" />
        </button>
        <div className="text-center">
          <p className="text-white text-base font-semibold">Откуда</p>
          <p className="text-[#8E8E93] text-xs">С моего счёта в Альфа-Банке</p>
        </div>
        <div className="w-8" />
      </div>

      <div className="px-4">
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
          {accounts.map((a, i) => (
            <button
              key={i}
              onClick={() => a.clickable && setScreen('deposit-amount')}
              className={`w-full flex items-center gap-4 px-4 py-4 ${i > 0 ? 'border-t border-[#2a2a2a]' : ''} ${a.clickable ? 'btn-press' : 'opacity-40'}`}
            >
              <div className="w-10 h-10 rounded-xl bg-[#2a2a2a] flex items-center justify-center">
                <span className="text-white font-bold">₽</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-white text-base font-semibold">{a.balance}</p>
                <p className="text-[#8E8E93] text-xs">{a.name} {a.num}</p>
              </div>
              {a.clickable && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
