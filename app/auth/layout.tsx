import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - Blueprint.xyz",
  description: "Sign in or create an account to join the Blueprint community",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
