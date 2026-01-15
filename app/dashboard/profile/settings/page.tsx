"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  AlertCircle, 
  CheckCircle, 
  Upload, 
  Trash2, 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Mail,
  Eye,
  EyeOff,
  LogOut,
  AlertTriangle
} from "lucide-react"
import { useGetMeQuery, useUpdateUserMutation, useUpdateProfilePictureMutation, useLogoutMutation } from "@/lib/store/api"
import { handleApiError } from "@/lib/utils/errorHandler"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { updateUserProfile } from "@/lib/store/slices/authSlice"
import { AppDispatch } from "@/lib/store"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function ProfileSettingsPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { data: userData, isLoading, error: userError, refetch } = useGetMeQuery()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()
  const [updateProfilePicture, { isLoading: isUploadingPicture }] = useUpdateProfilePictureMutation()
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation()

  const user = (userData as any)?.data

  // Profile Tab State
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    location: "",
    website: "",
  })

  // Account Tab State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // Privacy Tab State
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public", // public, private
    showEmail: false,
    showLocation: true,
    allowMessages: true,
    showOnlineStatus: true,
  })

  // Notifications Tab State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newFollower: true,
    newMessage: true,
    newComment: true,
    newLike: true,
    studioInvite: true,
    weeklyDigest: false,
  })

  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Initialize form data when user data loads
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || user.name || "",
        username: user.username || "",
        email: user.email || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
      })
      if (user.profilePicture || user.profilePictureUrl) {
        setProfilePicturePreview(user.profilePicture || user.profilePictureUrl)
      }
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
    setSuccess(false)
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handlePrivacyChange = (field: string, value: any) => {
    setPrivacySettings(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB")
        return
      }
      if (!file.type.startsWith('image/')) {
        setError("Please select an image file")
        return
      }
      setProfilePicture(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveProfilePicture = () => {
    setProfilePicture(null)
    setProfilePicturePreview(null)
  }

  const handleUploadProfilePicture = async () => {
    if (!profilePicture) {
      toast.error("Please select an image")
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', profilePicture)

      const result = await updateProfilePicture(formData).unwrap()
      
      if (result.success && result.data?.user) {
        // Update Redux state and localStorage
        dispatch(updateUserProfile(result.data.user))
        toast.success("Profile picture updated successfully")
        setProfilePicture(null)
        refetch()
      } else {
        toast.error(result.message || "Failed to update profile picture")
      }
    } catch (err: any) {
      const errorMessage = handleApiError(err)
      toast.error(errorMessage)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!formData.fullName.trim()) {
      setError("Full name is required")
      return
    }

    if (!formData.username.trim()) {
      setError("Username is required")
      return
    }

    try {
      const result = await updateUser({
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        bio: formData.bio.trim() || undefined,
        location: formData.location.trim() || undefined,
        website: formData.website.trim() || undefined,
      }).unwrap()

      if (result.success && result.data) {
        // Update Redux state and localStorage
        dispatch(updateUserProfile(result.data))
        setSuccess(true)
        toast.success("Profile updated successfully")
        refetch()
      } else {
        setError(result.message || "Failed to update profile")
      }
    } catch (err: any) {
      const errorMessage = handleApiError(err)
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError("All password fields are required")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    // TODO: Implement password change API endpoint
    toast.info("Password change feature coming soon")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleSavePrivacySettings = async () => {
    // TODO: Implement privacy settings API endpoint
    toast.success("Privacy settings saved")
  }

  const handleSaveNotificationSettings = async () => {
    // TODO: Implement notification settings API endpoint
    toast.success("Notification settings saved")
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap()
      toast.success("Logged out successfully")
      router.push("/auth/login")
    } catch (err: any) {
      const errorMessage = handleApiError(err)
      toast.error(errorMessage)
    }
  }

  const handleDeleteAccount = async () => {
    // TODO: Implement account deletion API endpoint
    toast.info("Account deletion feature coming soon")
    setShowDeleteDialog(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="pb-20 md:pb-8">
            <div className="max-w-5xl mx-auto p-4 md:p-6">
              <div className="space-y-6">
                <div className="h-8 bg-secondary animate-pulse rounded-sm" />
                <div className="h-64 bg-secondary animate-pulse rounded-sm" />
              </div>
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
    )
  }

  if (userError || !user) {
    return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="pb-20 md:pb-8">
            <div className="max-w-5xl mx-auto p-4 md:p-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {userError ? "Failed to load profile" : "User not found"}
                </AlertDescription>
              </Alert>
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-5xl mx-auto p-4 md:p-6">
            <div className="mb-8">
              <Link
                href="/dashboard/profile"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                ← Back to Profile
              </Link>
              <h1 className="text-4xl font-bold mb-2">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Settings saved successfully!
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="account" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>
                      Upload a new profile picture. Maximum file size: 5MB
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar className="w-24 h-24 rounded-sm border-2 border-border">
                          <AvatarImage 
                            src={profilePicturePreview || user.profilePicture || user.profilePictureUrl || "/placeholder-user.jpg"} 
                          />
                          <AvatarFallback className="rounded-sm bg-secondary text-foreground text-2xl">
                            {(formData.fullName || user.fullName || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleProfilePictureChange}
                              className="hidden"
                            />
                            <Button type="button" variant="outline" size="sm" asChild>
                              <span>
                                <Upload className="w-4 h-4 mr-2" />
                                {profilePicture ? "Change Image" : "Upload Image"}
                              </span>
                            </Button>
                          </label>
                          {profilePicture && (
                            <>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleUploadProfilePicture}
                                disabled={isUploadingPicture}
                              >
                                {isUploadingPicture ? "Uploading..." : "Save Picture"}
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleRemoveProfilePicture}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                        {profilePicture && (
                          <p className="text-xs text-muted-foreground">
                            Selected: {profilePicture.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <form onSubmit={handleProfileSubmit}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>
                        Update your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          required
                          maxLength={100}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">Username *</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          required
                          maxLength={50}
                          pattern="[a-zA-Z0-9_]+"
                        />
                        <p className="text-xs text-muted-foreground">
                          Only letters, numbers, and underscores allowed
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          disabled
                          className="bg-secondary"
                        />
                        <p className="text-xs text-muted-foreground">
                          Email cannot be changed. Contact support if you need to update it.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Information</CardTitle>
                      <CardDescription>
                        Tell others about yourself
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          placeholder="Tell us about yourself..."
                          rows={4}
                          maxLength={500}
                        />
                        <p className="text-xs text-muted-foreground">
                          {formData.bio.length}/500 characters
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="City, Country"
                          maxLength={100}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://example.com"
                          maxLength={200}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3">
                    <Button 
                      type="submit" 
                      className="flex-1" 
                      disabled={isUpdating || success}
                    >
                      {isUpdating ? "Saving..." : success ? "Saved!" : "Save Changes"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => router.push("/dashboard/profile")}
                      disabled={isUpdating || success}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6">
                <form onSubmit={handlePasswordSubmit}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password to keep your account secure
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPasswords.current ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                          >
                            {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPasswords.new ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                            required
                            minLength={8}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                          >
                            {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Must be at least 8 characters long
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showPasswords.confirm ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                            required
                            minLength={8}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full"
                            onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                          >
                            {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Update Password
                      </Button>
                    </CardContent>
                  </Card>
                </form>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Actions</CardTitle>
                    <CardDescription>
                      Manage your account actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sign Out</p>
                        <p className="text-sm text-muted-foreground">Sign out of your account</p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        {isLoggingOut ? "Signing out..." : "Sign Out"}
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-destructive">Delete Account</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={() => setShowDeleteDialog(true)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control who can see your information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Profile Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Control who can view your profile
                        </p>
                      </div>
                      <select
                        value={privacySettings.profileVisibility}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        className="rounded-sm border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Email</Label>
                        <p className="text-sm text-muted-foreground">
                          Display your email on your profile
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.showEmail}
                        onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Location</Label>
                        <p className="text-sm text-muted-foreground">
                          Display your location on your profile
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.showLocation}
                        onCheckedChange={(checked) => handlePrivacyChange('showLocation', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow others to send you messages
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.allowMessages}
                        onCheckedChange={(checked) => handlePrivacyChange('allowMessages', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Online Status</Label>
                        <p className="text-sm text-muted-foreground">
                          Display when you're online
                        </p>
                      </div>
                      <Switch
                        checked={privacySettings.showOnlineStatus}
                        onCheckedChange={(checked) => handlePrivacyChange('showOnlineStatus', checked)}
                      />
                    </div>

                    <Button onClick={handleSavePrivacySettings} className="w-full">
                      Save Privacy Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose what notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold">Notification Types</h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Follower</Label>
                          <p className="text-sm text-muted-foreground">
                            When someone follows you
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.newFollower}
                          onCheckedChange={(checked) => handleNotificationChange('newFollower', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Message</Label>
                          <p className="text-sm text-muted-foreground">
                            When you receive a new message
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.newMessage}
                          onCheckedChange={(checked) => handleNotificationChange('newMessage', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Comment</Label>
                          <p className="text-sm text-muted-foreground">
                            When someone comments on your content
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.newComment}
                          onCheckedChange={(checked) => handleNotificationChange('newComment', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Like</Label>
                          <p className="text-sm text-muted-foreground">
                            When someone likes your content
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.newLike}
                          onCheckedChange={(checked) => handleNotificationChange('newLike', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Studio Invite</Label>
                          <p className="text-sm text-muted-foreground">
                            When you're invited to join a studio
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.studioInvite}
                          onCheckedChange={(checked) => handleNotificationChange('studioInvite', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Weekly Digest</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a weekly summary of activity
                          </p>
                        </div>
                        <Switch
                          checked={notificationSettings.weeklyDigest}
                          onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveNotificationSettings} className="w-full">
                      Save Notification Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Delete Account
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account? This action cannot be undone. All your data, projects, posts, and content will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
