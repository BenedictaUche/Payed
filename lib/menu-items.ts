import { Bell, CreditCard, DollarSign, Home, PieChart, Send, Settings, User } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface MenuItem {
  name: string
  icon: LucideIcon
}

export const menuItems: MenuItem[] = [
  { name: 'Home', icon: Home },
  { name: 'Deposit', icon: DollarSign },
  { name: 'Investments', icon: PieChart },
  { name: 'My Card', icon: CreditCard },
  { name: 'Transfer', icon: Send },
  { name: 'Profile', icon: User },
  { name: 'Settings', icon: Settings },
]
