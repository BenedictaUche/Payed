'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Home } from 'lucide-react'
import { MenuItem, menuItems } from '@/lib/menu-items'

interface MobileNavProps {
  currentPage: string
  onNavigate: (item: MenuItem) => void
}

export function MobileNav({ currentPage, onNavigate }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Home className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle>Payed</SheetTitle>
        </SheetHeader>
        <nav className="mt-4 flex flex-col space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.name}
              variant={currentPage === item.name ? 'secondary' : 'ghost'}
              className="justify-start"
              onClick={() => onNavigate(item)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
