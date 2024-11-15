'use client'

import { Button } from '@/components/ui/button'
import { MenuItem, menuItems } from '@/lib/menu-items'
import { UserNav } from './user-nav'

interface DesktopNavProps {
  currentPage: string
  onNavigate: (item: MenuItem) => void
}

export function DesktopNav({ currentPage, onNavigate }: DesktopNavProps) {
  return (
    <aside className="hidden w-64 flex-col border-r bg-card lg:flex">
      <div className="p-6">
        <h2 className="text-lg font-semibold">FinTech App</h2>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => (
          <Button
            key={item.name}
            variant={currentPage === item.name ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onNavigate(item)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
          </Button>
        ))}
      </nav>
      <div className="border-t p-4">
        <UserNav />
      </div>
    </aside>
  )
}
