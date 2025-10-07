"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthPageWrapper } from "@/components/auth/auth-page-wrapper"
import { AuthForm, PasswordInput, PasswordRequirements } from "@/components/auth/auth-form"
import { useRouter } from "next/navigation"
import { register } from "@/lib/auth"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      await register({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
      // Redirect to dashboard after successful registration
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
      // TODO: Show error message to user
    } finally {
      setIsLoading(false)
    }
  }

  const isPasswordValid = formData.password.length >= 8 && 
                         /[A-Z]/.test(formData.password) && 
                         /[a-z]/.test(formData.password) && 
                         /\d/.test(formData.password)
  const isFormValid = formData.fullName && formData.username && formData.email && 
                     formData.password && formData.confirmPassword === formData.password && 
                     isPasswordValid && agreedToTerms

  return (
    <AuthPageWrapper>
      <AuthForm
        title="Join the community"
        description="Create your account and start sharing your architectural vision"
        onSubmit={handleSubmit}
        submitText="Create account"
        isLoading={isLoading}
      >
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="johndoe"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            required
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            This will be your unique identifier on Blueprint
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="architect@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <PasswordInput
            id="password"
            label="Password"
            placeholder="Create a strong password"
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
            label="Confirm Password"
            placeholder="Confirm your password"
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

        <div className="flex items-start space-x-2">
          <input
            id="terms"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary mt-0.5"
          />
          <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:text-primary/80">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:text-primary/80">
              Privacy Policy
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-medium"
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </AuthForm>

      {/* Sign in link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthPageWrapper>
  )
}
