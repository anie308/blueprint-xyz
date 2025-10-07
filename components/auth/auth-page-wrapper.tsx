"use client"

import Link from "next/link"
import { BlueprintIcon } from "@/components/icons"

interface AuthPageWrapperProps {
  children: React.ReactNode
}

export function AuthPageWrapper({ children }: AuthPageWrapperProps) {
  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2 -m-2">
            <BlueprintIcon className="w-10 h-10 sm:w-12 sm:h-12 text-primary group-hover:scale-105 transition-transform duration-200" />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight">Blueprint</span>
              <span className="text-xs sm:text-sm text-muted-foreground font-mono">.xyz</span>
            </div>
          </Link>
        </div>

        {children}
      </div>
    </div>
  )
}
