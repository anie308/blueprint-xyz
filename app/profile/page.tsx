import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"
import { PostCard } from "@/components/post-card"
import { GridIcon, ReelsIcon, MessageIcon } from "@/components/icons"
import Link from "next/link"
import Image from "next/image"

export default function ProfilePage() {
  const projects = [
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
    {
      id: "3",
      title: "Urban Park Pavilion",
      category: "Landscape Architecture",
      thumbnail: "/modern-sustainable-architecture.jpg",
      likes: 234,
      views: 1800,
    },
    {
      id: "4",
      title: "Minimalist Office Space",
      category: "Commercial",
      thumbnail: "/modern-apartment.png",
      likes: 567,
      views: 3200,
    },
  ]

  const posts = [
    {
      id: "1",
      author: {
        name: "Alex Rivera",
        username: "alexrivera",
        avatar: "/architect-woman.png",
      },
      studio: "Sustainable Housing",
      title: "Thoughts on Biophilic Design",
      content:
        "Integrating nature into architecture isn't just aesthetic—it's essential for human wellbeing. Here's what I've learned from 5 years of biophilic projects...",
      appreciations: 234,
      comments: 45,
      timestamp: "2d ago",
    },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          {/* Profile Header */}
          <div className="border-b border-border bg-card">
            <div className="max-w-6xl mx-auto p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="w-32 h-32 rounded-sm border-2 border-border">
                  <AvatarImage src="/architect-woman.png" />
                  <AvatarFallback className="rounded-sm bg-secondary text-foreground text-3xl">AR</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div>
                      <h1 className="text-2xl font-bold mb-1">Alex Rivera</h1>
                      <p className="text-muted-foreground font-mono">@alexrivera</p>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild className="rounded-sm bg-primary hover:bg-primary/90">
                        <Link href="/messages/alexrivera">
                          <MessageIcon className="w-4 h-4 mr-2" />
                          Message
                        </Link>
                      </Button>
                      <Button variant="outline" className="rounded-sm bg-transparent">
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="rounded-sm bg-transparent">
                        Share
                      </Button>
                    </div>
                  </div>

                  <p className="text-foreground leading-relaxed mb-4 max-w-2xl">
                    Sustainable architect specializing in biophilic design and passive house construction. Based in
                    Portland, OR. LEED AP certified.
                  </p>

                  <div className="flex flex-wrap gap-6 text-sm">
                    <div>
                      <span className="font-bold font-mono">24</span>
                      <span className="text-muted-foreground ml-1">Projects</span>
                    </div>
                    <div>
                      <span className="font-bold font-mono">12.4K</span>
                      <span className="text-muted-foreground ml-1">Followers</span>
                    </div>
                    <div>
                      <span className="font-bold font-mono">892</span>
                      <span className="text-muted-foreground ml-1">Following</span>
                    </div>
                    <div>
                      <span className="font-bold font-mono">45.2K</span>
                      <span className="text-muted-foreground ml-1">Appreciations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="projects"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  <GridIcon className="w-4 h-4 mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="reels"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  <ReelsIcon className="w-4 h-4 mr-2" />
                  Reels
                </TabsTrigger>
                <TabsTrigger
                  value="posts"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reels" className="mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="relative aspect-[9/16] rounded-sm overflow-hidden border border-border bg-secondary"
                    >
                      <Image src={`/architectural-sketch.jpg`} alt={`Reel ${i}`} fill className="object-cover" />
                      <div className="absolute bottom-2 left-2 text-white text-xs font-mono bg-black/50 px-2 py-1 rounded-sm">
                        1.2K views
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="posts" className="mt-6">
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard key={post.id} {...post} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <div className="max-w-3xl space-y-6">
                  <div className="border border-border rounded-sm bg-card p-6">
                    <h3 className="font-bold text-lg mb-4">About</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Location</span>
                        <p className="font-medium">Portland, Oregon, USA</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Education</span>
                        <p className="font-medium">M.Arch, University of Oregon</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Certifications</span>
                        <p className="font-medium">LEED AP BD+C, Passive House Designer</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Specializations</span>
                        <p className="font-medium">Sustainable Design, Biophilic Architecture, Passive House</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-sm bg-card p-6">
                    <h3 className="font-bold text-lg mb-4">Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold">Senior Architect</p>
                        <p className="text-sm text-muted-foreground">Green Space Architecture • 2020 - Present</p>
                      </div>
                      <div>
                        <p className="font-semibold">Project Architect</p>
                        <p className="text-sm text-muted-foreground">Sustainable Design Studio • 2017 - 2020</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
