'use client'

import * as React from 'react'
import { Bell, CreditCard, DollarSign, PieChart, Plus, Send, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DesktopNav } from '@/components/navigation/desktop-nav'
import { MobileNav } from '@/components/navigation/mobile-nav'
import { StatsCard } from '@/components/stats-card'
import { MenuItem } from '@/lib/menu-items'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '@/lib/firebase'
import { signOut } from '@/lib/auth'
import { query, collection, getDocs, where, doc } from "firebase/firestore";
import { useEffect, useState } from 'react'

function Dashboard() {
  const router = useRouter()
  const [user, loading, error] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState('Home')
  const [name, setName] = useState("");

  const handleNavigate = (item: MenuItem) => {
    setCurrentPage(item.name)
    router.push(`/${item.name.toLowerCase()}`)
  }



  const handleSignOut = async () => {
    await signOut(router);
  };


  const fetchUserName = async () => {
    if (!user) return; // Ensure user is defined before fetching

    try {
      // Query the "users" collection where uid matches the logged-in user's uid
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Get the first document's data
        const data = querySnapshot.docs[0].data();
        setName(data.name);
      } else {
        console.error("No user data found");
      }
    } catch (err) {
      console.error("An error occurred while fetching user data:", err);
      alert("An error occurred while fetching user data.");
    }
  };


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

  useEffect(() => {
    if (loading) return; // Wait until the user state is resolved
    if (!user) return router.push("/login"); // Redirect if no user is logged in
    fetchUserName(); // Fetch the name when the user is available
  }, [user, loading]);

  return (
    <div className="flex min-h-screen bg-background">
      <DesktopNav currentPage={currentPage} onNavigate={handleNavigate} name={name} user={user} logout={handleSignOut}/>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MobileNav currentPage={currentPage} onNavigate={handleNavigate} />
              <h1 className="text-3xl font-bold">{currentPage}</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button className='hover:bg-red-300'>
                    <Plus />
                    New Transaction
                </Button>
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
