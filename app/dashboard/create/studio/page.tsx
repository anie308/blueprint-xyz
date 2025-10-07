"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
// import { ArrowLeftIcon } from "@/components/icons"
import Link from "next/link"

export default function CreateStudioPage() {
  const [studioName, setStudioName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [rules, setRules] = useState("")
  const [category, setCategory] = useState("")
  const [isPublic, setIsPublic] = useState(true)

  const handleNameChange = (name: string) => {
    setStudioName(name)
    // Auto-generate slug from name
    const generatedSlug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
    setSlug(generatedSlug)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle studio creation
    console.log("[v0] Creating studio:", { studioName, slug, description, rules, category, isPublic })
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-3xl mx-auto p-4 md:p-6">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              {/* <ArrowLeftIcon className="w-4 h-4" /> */}
              Back to Create
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-balance">Create a Studio</h1>
              <p className="text-muted-foreground leading-relaxed">
                Build a community around your architectural interests and connect with professionals who share your
                passion
              </p>
            </div>

            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Studio Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Studio Name *</Label>
                  <Input
                    id="name"
                    value={studioName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g., Sustainable Housing, Brutalism Lovers"
                    required
                    maxLength={50}
                  />
                  <p className="text-xs text-muted-foreground">{studioName.length}/50 characters</p>
                </div>

                {/* Studio Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">Studio URL *</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">blueprint.xyz/s/</span>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="sustainable-housing"
                      required
                      pattern="[a-z0-9-]+"
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Only lowercase letters, numbers, and hyphens</p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what your studio is about and what kind of content members can expect..."
                    required
                    rows={4}
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground">{description.length}/500 characters</p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-sm border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a category</option>
                    <option value="residential">Residential Design</option>
                    <option value="commercial">Commercial Projects</option>
                    <option value="sustainable">Sustainable Architecture</option>
                    <option value="urban">Urban Planning</option>
                    <option value="historic">Historic Preservation</option>
                    <option value="interior">Interior Design</option>
                    <option value="landscape">Landscape Architecture</option>
                    <option value="theory">Architectural Theory</option>
                    <option value="technology">Technology & Innovation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Studio Rules */}
                <div className="space-y-2">
                  <Label htmlFor="rules">Studio Rules (Optional)</Label>
                  <Textarea
                    id="rules"
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    placeholder="Set guidelines for your community members..."
                    rows={4}
                    maxLength={1000}
                  />
                  <p className="text-xs text-muted-foreground">{rules.length}/1000 characters</p>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-3">
                  <Label>Privacy</Label>
                  <div className="space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="privacy"
                        checked={isPublic}
                        onChange={() => setIsPublic(true)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-sm">Public</div>
                        <div className="text-xs text-muted-foreground">
                          Anyone can view, post, and comment in this studio
                        </div>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="privacy"
                        checked={!isPublic}
                        onChange={() => setIsPublic(false)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium text-sm">Private</div>
                        <div className="text-xs text-muted-foreground">
                          Only approved members can view and participate
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Create Studio
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/create">Cancel</Link>
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
