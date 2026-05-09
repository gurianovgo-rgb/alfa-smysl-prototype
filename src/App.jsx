import React from 'react'
import { AppProvider, useApp } from './context/AppContext'
import HomeScreen from './screens/HomeScreen'
import SavingsScreen from './screens/SavingsScreen'
import GoalStep1 from './screens/GoalStep1'
import GoalStep2 from './screens/GoalStep2'
import AccountOpened from './screens/AccountOpened'
import SavingsActive from './screens/SavingsActive'
import WithdrawScreen from './screens/WithdrawScreen'
import PauseScreen from './screens/PauseScreen'
import TransferConfirm from './screens/TransferConfirm'
import DepositScreen from './screens/DepositScreen'
import DepositSource from './screens/DepositSource'
import DepositAmount from './screens/DepositAmount'
import DepositConfirm from './screens/DepositConfirm'
import TriumphScreen from './screens/TriumphScreen'

function Router() {
  const { screen } = useApp()

  const screens = {
    'home': <HomeScreen />,
    'savings': <SavingsScreen />,
    'goal-step1': <GoalStep1 />,
    'goal-step2': <GoalStep2 />,
    'account-opened': <AccountOpened />,
    'savings-active': <SavingsActive />,
    'withdraw': <WithdrawScreen />,
    'pause': <PauseScreen />,
    'transfer-confirm': <TransferConfirm />,
    'deposit': <DepositScreen />,
    'deposit-source': <DepositSource />,
    'deposit-amount': <DepositAmount />,
    'deposit-confirm': <DepositConfirm />,
    'triumph': <TriumphScreen />,
  }

  return screens[screen] || <HomeScreen />
}

export default function App() {
  return (
    <AppProvider>
      <div className="w-full bg-[#0a0a0a]" style={{ minHeight: '100dvh' }}>
        <Router />
      </div>
    </AppProvider>
  )
}
