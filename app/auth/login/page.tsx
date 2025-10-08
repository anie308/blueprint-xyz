"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthPageWrapper } from "@/components/auth/auth-page-wrapper"
import { AuthForm, PasswordInput } from "@/components/auth/auth-form"
import { useRouter } from "next/navigation"
import { useAuthService } from "@/lib/services/authService"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login } = useAuthService()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await login(email, password)
      if (result.success) {
        // Redirect to dashboard after successful login
        console.log(result)
        router.push("/dashboard");
      } else {
        setError(result.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthPageWrapper>
      <AuthForm
        title="Welcome back"
        description="Sign in to your Blueprint account to continue building the future"
        onSubmit={handleSubmit}
        submitText="Sign in"
        isLoading={isLoading}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="architect@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-11"
          />
        </div>
        
        <PasswordInput
          id="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <Label htmlFor="remember" className="text-sm text-muted-foreground">
              Remember me
            </Label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full h-11 text-base font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </AuthForm>

      {/* Sign up link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthPageWrapper>
  )
}
