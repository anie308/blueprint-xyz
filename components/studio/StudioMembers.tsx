import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, Crown, Shield, User, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface StudioMembersProps {
  members: any[]
  studio: any
  isOwner: boolean
}

export function StudioMembers({ members, studio, isOwner }: StudioMembersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'owner' | 'moderator' | 'member'>('all')

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.username?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || 
                       (roleFilter === 'owner' && member.role === 'owner') ||
                       (roleFilter === 'moderator' && member.role === 'moderator') ||
                       (roleFilter === 'member' && member.role === 'member')
    
    return matchesSearch && matchesRole
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4" />
      case 'moderator':
        return <Shield className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'owner':
        return <Badge variant="secondary" className="gap-1">Owner</Badge>
      case 'moderator':
        return <Badge variant="outline" className="gap-1">Moderator</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Members Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Studio Members</h2>
          <p className="text-sm text-muted-foreground">
            {members.length} members in {studio.name}
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search members..."
            className="pl-10 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={roleFilter} onValueChange={(value: 'all' | 'owner' | 'moderator' | 'member') => setRoleFilter(value)}>
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="owner">Owners</SelectItem>
            <SelectItem value="moderator">Moderators</SelectItem>
            <SelectItem value="member">Members</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Members List */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-sm bg-secondary flex items-center justify-center text-2xl mx-auto mb-4">
            👥
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery || roleFilter !== 'all' ? 'No members found' : 'No members yet'}
          </h3>
          <p className="text-muted-foreground">
            {searchQuery || roleFilter !== 'all'
              ? 'No members match your search criteria.'
              : 'This studio doesn\'t have any members yet.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMembers.map((member: any) => (
            <Card key={member._id} className="border border-border rounded-sm bg-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12 rounded-sm">
                    <AvatarImage src={member.profilePictureUrl} />
                    <AvatarFallback className="rounded-sm bg-secondary text-foreground">
                      {member.fullName?.slice(0, 2).toUpperCase() || member.username?.slice(0, 2).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm truncate">
                        {member.fullName || member.username}
                      </h3>
                      {getRoleBadge(member.role)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      @{member.username}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-mono">{member.postCount || 0} posts</span>
                      <span>•</span>
                      <span className="font-mono">Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {isOwner && member.role !== 'owner' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          {member.role === 'moderator' ? 'Remove Moderator' : 'Make Moderator'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove from Studio
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
