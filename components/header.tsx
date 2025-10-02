"use client"

import { SearchIcon, BellIcon, UserIcon } from "./icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 md:ml-64">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search studios, projects, architects..."
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <BellIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <UserIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
