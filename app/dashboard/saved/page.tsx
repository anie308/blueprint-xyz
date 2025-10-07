import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { PostCard } from "@/components/post-card"
import { ProjectCard } from "@/components/project-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookmarkIcon } from "@/components/icons"

export default function SavedPage() {
  const savedPosts = [
    {
      id: "1",
      author: {
        name: "Sarah Chen",
        username: "sarahchen",
        avatar: "/architect-woman.png",
      },
      studio: "Sustainable Housing",
      title: "Passive House Design: My Latest Project in Copenhagen",
      content:
        "Just completed the design phase for a 12-unit passive house complex. The challenge was balancing thermal efficiency with the client's desire for large windows.",
      image: "/modern-sustainable-architecture.jpg",
      appreciations: 234,
      comments: 45,
      timestamp: "2h ago",
    },
  ]

  const savedProjects = [
    {
      id: "1",
      title: "Sustainable Community Center",
      category: "Public Architecture",
      thumbnail: "/modern-sustainable-building.jpg",
      likes: 456,
      views: 2300,
    },
    {
      id: "2",
      title: "Modern Residential Complex",
      category: "Residential",
      thumbnail: "/modern-house-rendering.jpg",
      likes: 789,
      views: 4100,
    },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="flex items-center gap-3 mb-8">
              <BookmarkIcon className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-balance">Saved</h1>
                <p className="text-muted-foreground leading-relaxed">
                  Your bookmarked posts, projects, and inspiration
                </p>
              </div>
            </div>

            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto mb-6">
                <TabsTrigger
                  value="posts"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="reels"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Reels
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts">
                <div className="space-y-4">
                  {savedPosts.map((post) => (
                    <PostCard key={post.id} {...post} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="projects">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedProjects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reels">
                <div className="text-center py-12 text-muted-foreground">No saved reels yet</div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
