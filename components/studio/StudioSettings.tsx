import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, Trash2, AlertTriangle } from "lucide-react"

interface StudioSettingsProps {
  studio: any
}

export function StudioSettings({ studio }: StudioSettingsProps) {
  const [formData, setFormData] = useState({
    name: studio?.name || '',
    description: studio?.description || '',
    rules: studio?.rules || '',
    category: studio?.category || '',
    isPublic: studio?.isPublic ?? true,
    allowMemberPosts: studio?.allowMemberPosts ?? true,
    requireApproval: studio?.requireApproval ?? false
  })
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    
    try {
      // Here you would call the API to update the studio
      // await updateStudio(studio._id, formData)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('Failed to update studio settings. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteStudio = async () => {
    if (!confirm('Are you sure you want to delete this studio? This action cannot be undone.')) {
      return
    }
    
    try {
      // Here you would call the API to delete the studio
      // await deleteStudio(studio._id)
      console.log('Studio deleted')
    } catch (err) {
      setError('Failed to delete studio. Please try again.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Studio Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your studio's settings and preferences
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">
            Studio settings updated successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Basic Information */}
      <Card className="border border-border rounded-sm bg-card">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Studio Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter studio name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your studio"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="public">Public Buildings</SelectItem>
                <SelectItem value="landscape">Landscape</SelectItem>
                <SelectItem value="interior">Interior Design</SelectItem>
                <SelectItem value="urban">Urban Planning</SelectItem>
                <SelectItem value="sustainable">Sustainable Design</SelectItem>
                <SelectItem value="historic">Historic Preservation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rules">Studio Rules</Label>
            <Textarea
              id="rules"
              value={formData.rules}
              onChange={(e) => handleInputChange('rules', e.target.value)}
              placeholder="Set rules for your studio members"
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="border border-border rounded-sm bg-card">
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="isPublic">Public Studio</Label>
              <p className="text-sm text-muted-foreground">
                Allow anyone to discover and join this studio
              </p>
            </div>
            <Switch
              id="isPublic"
              checked={formData.isPublic}
              onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="allowMemberPosts">Allow Member Posts</Label>
              <p className="text-sm text-muted-foreground">
                Let members create posts in this studio
              </p>
            </div>
            <Switch
              id="allowMemberPosts"
              checked={formData.allowMemberPosts}
              onCheckedChange={(checked) => handleInputChange('allowMemberPosts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="requireApproval">Require Post Approval</Label>
              <p className="text-sm text-muted-foreground">
                Review posts before they appear in the studio
              </p>
            </div>
            <Switch
              id="requireApproval"
              checked={formData.requireApproval}
              onCheckedChange={(checked) => handleInputChange('requireApproval', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>

        <Button
          variant="destructive"
          onClick={handleDeleteStudio}
          className="gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete Studio
        </Button>
      </div>
    </div>
  )
}
