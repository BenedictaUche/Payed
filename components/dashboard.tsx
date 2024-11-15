'use client'

import * as React from 'react'
import { Bell, CreditCard, DollarSign, PieChart, Send, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DesktopNav } from './navigation/desktop-nav'
import { MobileNav } from './navigation/mobile-nav'
import { StatsCard } from './stats-card'
import { MenuItem } from '@/lib/menu-items'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function Dashboard() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState('Home')

  const handleNavigate = (item: MenuItem) => {
    setCurrentPage(item.name)
    router.push(`/${item.name.toLowerCase()}`)
  }

  const stats = [
    {
      title: 'Total Balance',
      value: '$12,345.67',
      change: '+2.5% from last month',
      icon: DollarSign,
    },
    {
      title: 'Investments',
      value: '$5,678.90',
      change: '+5.2% from last month',
      icon: PieChart,
    },
    {
      title: 'Loans',
      value: '$2,345.67',
      change: '-1.8% from last month',
      icon: CreditCard,
    },
    {
      title: 'Savings',
      value: '$3,456.78',
      change: '+3.1% from last month',
      icon: Send,
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <DesktopNav currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MobileNav currentPage={currentPage} onNavigate={handleNavigate} />
              <h1 className="text-3xl font-bold">{currentPage}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}


export default Dashboard;
