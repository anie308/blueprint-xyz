"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  CompassIcon,
  TrendingIcon,
  BookmarkIcon,
  GridIcon,
  BlueprintIcon,
  BriefcaseIcon,
  MessageIcon,
} from "./icons"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", icon: HomeIcon, label: "Home" },
    { href: "/dashboard/studios", icon: CompassIcon, label: "Studios" },
    { href: "/dashboard/trending", icon: TrendingIcon, label: "Trending" },
    { href: "/dashboard/jobs", icon: BriefcaseIcon, label: "Jobs" },
    { href: "/dashboard/messages", icon: MessageIcon, label: "Messages" },
    { href: "/dashboard/saved", icon: BookmarkIcon, label: "Saved" },
    { href: "/dashboard/portfolio", icon: GridIcon, label: "My Portfolio" },
  ]

  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 border-r border-border bg-card flex-col z-50">
      {/* Logo */}
      <Link
        href="/dashboard"
        className="flex items-center gap-3 h-16 px-6 border-b border-border hover:bg-secondary/50 transition-colors"
      >
        <BlueprintIcon className="w-8 h-8 text-primary" />
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-tight">Blueprint</span>
          <span className="text-xs text-muted-foreground font-mono">.xyz</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-sm transition-colors",
                    isActive && "bg-primary text-primary-foreground",
                    !isActive && "text-foreground hover:bg-secondary",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground font-mono">Community for Architects</p>
      </div>
    </aside>
  )
}
