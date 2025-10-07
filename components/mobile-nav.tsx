"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, ReelsIcon, PlusIcon, BellIcon, UserIcon } from "./icons"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", icon: HomeIcon, label: "Home" },
    { href: "/dashboard/reels", icon: ReelsIcon, label: "Reels" },
    { href: "/dashboard/create", icon: PlusIcon, label: "Create" },
    { href: "/dashboard/notifications", icon: BellIcon, label: "Notifications" },
    { href: "/dashboard/profile", icon: UserIcon, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          const isCreate = item.label === "Create"

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive && !isCreate && "text-primary",
                !isActive && !isCreate && "text-muted-foreground hover:text-foreground",
                isCreate && "relative",
              )}
            >
              {isCreate ? (
                <div className="flex items-center justify-center w-12 h-12 -mt-6 rounded-sm bg-primary text-primary-foreground shadow-lg">
                  <Icon className="w-6 h-6" />
                </div>
              ) : (
                <>
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
