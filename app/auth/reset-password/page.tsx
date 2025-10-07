"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthPageWrapper } from "@/components/auth/auth-page-wrapper"
import { PasswordInput, PasswordRequirements } from "@/components/auth/auth-form"
import { CheckIcon } from "@/components/icons"
import { useRouter, useSearchParams } from "next/navigation"

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Implement actual password reset
      console.log("Password reset:", { token, password: formData.password })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSuccess(true)
    } catch (error) {
      console.error("Password reset error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isPasswordValid = formData.password.length >= 8 && 
                         /[A-Z]/.test(formData.password) && 
                         /[a-z]/.test(formData.password) && 
                         /\d/.test(formData.password)
  const isFormValid = formData.password && formData.confirmPassword === formData.password && isPasswordValid

  if (isSuccess) {
    return (
      <AuthPageWrapper>
        {/* Success Card */}
        <Card className="border-border shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold">Password updated!</CardTitle>
            <CardDescription className="text-base">
              Your password has been successfully updated. You can now sign in with your new password.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Button
              onClick={() => router.push("/auth/login")}
              className="w-full h-11 text-base font-medium"
            >
              Continue to sign in
            </Button>
          </CardContent>
        </Card>
      </AuthPageWrapper>
    )
  }

  return (
    <AuthPageWrapper>
      <Card className="border-border shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Set new password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <PasswordInput
                id="password"
                label="New Password"
                placeholder="Enter your new password"
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                required
              />
              <PasswordRequirements password={formData.password} />
            </div>

            <div className="space-y-2">
              <PasswordInput
                id="confirmPassword"
                label="Confirm New Password"
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={(value) => handleInputChange("confirmPassword", value)}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                required
              />
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-destructive">Passwords do not match</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-medium"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? "Updating password..." : "Update password"}
            </Button>
          </form>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Back to sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthPageWrapper>
  )
}
