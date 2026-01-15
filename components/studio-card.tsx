"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { AuthService } from "@/lib/services/authService"

interface StudioCardProps {
  _id?: string
  name: string
  slug: string
  description: string
  members?: Array<any> | number
  posts?: Array<any> | number
  icon: string
  memberCount?: number
  postCount?: number
  owner?: any
}

export function StudioCard({ 
  _id, 
  name, 
  slug, 
  description, 
  members, 
  posts, 
  icon, 
  memberCount, 
  postCount,
  owner
}: StudioCardProps) {
  const currentUser = AuthService.getCurrentUser()
  
  // Handle different data structures for members and posts
  const memberCountValue = memberCount || (Array.isArray(members) ? members.length : members) || 0
  const postCountValue = postCount || (Array.isArray(posts) ? posts.length : posts) || 0

  // Check if current user is owner
  const isOwner = useMemo(() => {
    if (!currentUser || !owner) return false
    
    const userId = currentUser._id || currentUser.id
    if (!userId) return false
    
    // Handle both string ID and populated object
    let ownerId: string | null = null
    
    if (typeof owner === 'string') {
      ownerId = owner
    } else if (owner && typeof owner === 'object') {
      // Handle populated owner object
      ownerId = owner._id || owner.id || null
    }
    
    if (!ownerId) return false
    
    // Normalize IDs for comparison (remove any whitespace, convert to string)
    const normalizedUserId = String(userId).trim()
    const normalizedOwnerId = String(ownerId).trim()
    
    return normalizedUserId === normalizedOwnerId
  }, [currentUser, owner])

  // Check if current user is a member of the studio
  const isMember = useMemo(() => {
    if (!currentUser || isOwner) return false
    
    const userId = currentUser._id || currentUser.id
    if (!userId) return false
    
    // Handle different data structures for members
    let membersList: any[] = []
    
    if (Array.isArray(members)) {
      membersList = members
    } else if (typeof members === 'number') {
      // If it's just a count, we can't check membership
      return false
    } else if (!members) {
      return false
    }
    
    // Check if user ID is in members array (could be IDs or user objects)
    return membersList.some((member: any) => {
      if (!member) return false
      
      let memberId: string | null = null
      
      // Handle string ID
      if (typeof member === 'string') {
        memberId = member
      } 
      // Handle user object
      else if (typeof member === 'object') {
        memberId = member._id || member.id || null
      }
      
      if (!memberId) return false
      
      // Compare as strings to handle different ID formats
      return String(userId).trim() === String(memberId).trim()
    })
  }, [currentUser, members, isOwner])

  const studioPath = `/dashboard/studios/${slug || _id}`

  return (
    <div className="border border-border rounded-sm bg-card p-6 hover:border-primary/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
          {icon || "🏗️"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="font-mono">{memberCountValue} members</span>
            <span>•</span>
            <span className="font-mono">{postCountValue} posts</span>
          </div>
          <Button asChild size="sm" className="rounded-sm" variant={isMember || isOwner ? "outline" : "default"}>
            <Link href={studioPath}>
              {isOwner ? "Manage Studio" : isMember ? "View Studio" : "Join Studio"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
