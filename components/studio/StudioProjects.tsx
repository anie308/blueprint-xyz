import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, Plus, Calendar, User, Eye, Heart, MessageSquare, FolderOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface StudioProjectsProps {
  projects: any[]
  studio: any
  isOwner: boolean
}

export function StudioProjects({ projects, studio, isOwner }: StudioProjectsProps) {
  console.log(projects, "projects")
  console.log(studio, "studio")
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'archived'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest')

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus
    
    return matchesSearch && matchesStatus
  }) || []

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'popular':
        return (b.views || 0) - (a.views || 0)
      default:
        return 0
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Projects Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Studio Projects</h2>
          <p className="text-sm text-muted-foreground">
            {projects?.length || 0} projects in {studio?.name}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/create/project">
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="pl-10 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={(value: 'all' | 'active' | 'completed' | 'archived') => setFilterStatus(value)}>
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(value: 'newest' | 'oldest' | 'popular') => setSortBy(value)}>
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects List */}
      {sortedProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-sm bg-secondary flex items-center justify-center text-2xl mx-auto mb-4">
            🏗️
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery || filterStatus !== 'all' ? 'No projects found' : 'No projects yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || filterStatus !== 'all'
              ? 'No projects match your search criteria.'
              : 'No projects have been created in this studio yet.'
            }
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <Button asChild>
              <Link href="/dashboard/create/project">
                <Plus className="w-4 h-4 mr-2" />
                Create First Project
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProjects.map((project: any) => (
            <Card key={project._id} className="border border-border rounded-sm bg-card hover:border-primary/30 transition-colors group">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                {project.images?.[0] ? (
                  <Image 
                    src={project.images[0]} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🏗️
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">{project.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>
                
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.slice(0, 3).map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.tags.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{project.author?.fullName || project.author?.username}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{project.views || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    <span>{project.likes || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    <span>{project.comments || 0}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button asChild size="sm" className="rounded-sm">
                    <Link href={`/projects/${project._id}`}>
                      View Project
                    </Link>
                  </Button>
                  {isOwner && (
                    <div className="flex items-center gap-1">
                      <Button variant="outline" size="sm" className="rounded-sm">
                        Edit
                      </Button>
                    </div>
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
