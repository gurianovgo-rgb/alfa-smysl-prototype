import React from 'react'
import { useApp } from '../context/AppContext'

export default function DepositScreen() {
  const { setScreen } = useApp()

  const METHODS = [
    { icon: '→', label: 'Со счёта в Альфа-Банке', clickable: true, screen: 'deposit-source' },
    { icon: '=', label: 'С карты другого банка', clickable: false },
    { icon: '🏦', label: 'Автопополнение со счёта другого банка', clickable: false },
    { icon: '↔', label: 'Автопополнение со счёта в Альфа-Банке', clickable: false },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] screen-enter">
      <div className="px-4 pt-4 pb-4 flex items-center justify-between">
        <button onClick={() => setScreen('savings-active')} className="btn-press p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="text-white text-lg font-semibold">Пополнить счёт</span>
        <button
          onClick={() => setScreen('savings-active')}
          className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center btn-press"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="px-4">
        <p className="text-white text-base font-semibold mb-3">С моего счёта в другом банке</p>
        <p className="text-[#8E8E93] text-sm mb-3">Без комиссии через СБП</p>

        <div className="flex gap-3 mb-6">
          {[['T', 'Т-Банк', '#FFDD00', '#000'], ['◇', 'Другой банк', '#2a2a2a', '#fff']].map(([icon, name, bg, color]) => (
            <div key={name} className="bg-[#1a1a1a] rounded-2xl p-4 flex flex-col items-center gap-2 flex-1">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold" style={{ background: bg, color }}>
                {icon}
              </div>
              <span className="text-white text-sm font-medium text-center">{name}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-[#2a2a2a]" />
          <span className="text-[#8E8E93] text-sm">Ещё способы</span>
          <div className="flex-1 h-px bg-[#2a2a2a]" />
        </div>

        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
          {METHODS.map((m, i) => (
            <button
              key={i}
              onClick={() => m.clickable && setScreen(m.screen)}
              className={`w-full flex items-center gap-4 px-4 py-4 ${i > 0 ? 'border-t border-[#2a2a2a]' : ''} ${m.clickable ? 'btn-press' : 'opacity-50'}`}
            >
              <div className="w-9 h-9 rounded-full bg-[#2a2a2a] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {m.icon}
              </div>
              <span className="text-white text-sm font-medium text-left">{m.label}</span>
              {m.clickable && (
                <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none">
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
