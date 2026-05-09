import React, { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [screen, setScreen] = useState('home')
  const [goalName, setGoalName] = useState('')
  const [goalAmount, setGoalAmount] = useState(0)
  const [goalDate, setGoalDate] = useState(null)
  const [monthlyAmount, setMonthlyAmount] = useState(0)
  const [autoSave, setAutoSave] = useState(false)
  const [balance, setBalance] = useState(0)
  const [streak, setStreak] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [depositAmount, setDepositAmount] = useState(0)
  const [hasGoal, setHasGoal] = useState(false)
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(3600)

  const goalEmoji = {
    'Кроссовки': '👟',
    'Гаджет': '📱',
    'Путешествие': '✈️',
    'Концерт': '🎵',
    'Подарок': '🎁',
  }

  function getGoalEmoji() {
    for (const [key, emoji] of Object.entries(goalEmoji)) {
      if (goalName.toLowerCase().includes(key.toLowerCase())) return emoji
    }
    return '🎯'
  }

  function daysUntilGoal() {
    if (!goalDate) return 0
    const diff = new Date(goalDate) - new Date()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  function progressPercent(bal = balance) {
    if (!goalAmount) return 0
    return Math.min(100, Math.round((bal / goalAmount) * 100))
  }

  function formatNumber(n) {
    return Math.round(n).toLocaleString('ru-RU')
  }

  function formatDate(d) {
    if (!d) return ''
    const date = new Date(d)
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  function formatDateShort(d) {
    if (!d) return ''
    const date = new Date(d)
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  }

  const value = {
    screen, setScreen,
    goalName, setGoalName,
    goalAmount, setGoalAmount,
    goalDate, setGoalDate,
    monthlyAmount, setMonthlyAmount,
    autoSave, setAutoSave,
    balance, setBalance,
    streak, setStreak,
    withdrawAmount, setWithdrawAmount,
    depositAmount, setDepositAmount,
    hasGoal, setHasGoal,
    timerActive, setTimerActive,
    timerSeconds, setTimerSeconds,
    getGoalEmoji,
    daysUntilGoal,
    progressPercent,
    formatNumber,
    formatDate,
    formatDateShort,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}
