import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { CreatePost } from "@/components/create-post"
import { PostCard } from "@/components/post-card"
import { StudioCard } from "@/components/studio-card"
import { Button } from "@/components/ui/button"
import { TrendingIcon } from "@/components/icons"

export default function HomePage() {
  // Mock data
  const posts = [
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
        "Just completed the design phase for a 12-unit passive house complex. The challenge was balancing thermal efficiency with the client's desire for large windows. Here's how we solved it...",
      image: "/modern-sustainable-architecture.jpg",
      appreciations: 234,
      comments: 45,
      timestamp: "2h ago",
    },
    {
      id: "2",
      author: {
        name: "Marcus Rodriguez",
        username: "marcusrod",
        avatar: "/architect-man.jpg",
      },
      studio: "Brutalism Lovers",
      title: "Thoughts on Brutalism's Revival in Contemporary Design",
      content:
        "I've noticed a significant shift in how younger architects are approaching brutalist principles. Rather than pure imitation, there's a fascinating reinterpretation happening. What are your thoughts?",
      appreciations: 189,
      comments: 67,
      timestamp: "5h ago",
    },
    {
      id: "3",
      author: {
        name: "Aisha Patel",
        username: "aishapatel",
        avatar: "/architect-woman-2.jpg",
      },
      studio: "Residential Design",
      title: "Small Space Living: 45sqm Apartment Transformation",
      content:
        "Transformed a cramped studio into a functional 1-bedroom with smart storage solutions and flexible furniture. The key was vertical space utilization.",
      image: "/modern-apartment.png",
      appreciations: 456,
      comments: 89,
      timestamp: "8h ago",
    },
  ]

  const featuredStudios = [
    {
      name: "Sustainable Housing",
      slug: "sustainable-housing",
      description: "Discussing eco-friendly design, passive houses, and green building materials",
      members: 12400,
      posts: 3200,
      icon: "🌱",
    },
    {
      name: "Brutalism Lovers",
      slug: "brutalism-lovers",
      description: "Celebrating raw concrete, bold forms, and brutalist architecture",
      members: 8900,
      posts: 2100,
      icon: "🏛️",
    },
    {
      name: "Residential Design",
      slug: "residential-design",
      description: "Home design, interior architecture, and living space innovations",
      members: 15600,
      posts: 4800,
      icon: "🏠",
    },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                <CreatePost />

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 border-b border-border">
                  <Button variant="ghost" className="rounded-none border-b-2 border-primary">
                    <TrendingIcon className="w-4 h-4 mr-2" />
                    Trending
                  </Button>
                  <Button variant="ghost" className="rounded-none">
                    Latest
                  </Button>
                  <Button variant="ghost" className="rounded-none">
                    Following
                  </Button>
                </div>

                {/* Posts */}
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard key={post.id} {...post} />
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Featured Studios */}
                <div className="border border-border rounded-sm bg-card p-4">
                  <h2 className="font-bold text-lg mb-4">Featured Studios</h2>
                  <div className="space-y-4">
                    {featuredStudios.map((studio) => (
                      <StudioCard key={studio.slug} {...studio} />
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="border border-border rounded-sm bg-card p-4">
                  <h2 className="font-bold text-lg mb-4">Community Stats</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Members</span>
                      <span className="font-mono font-semibold">47,892</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active Studios</span>
                      <span className="font-mono font-semibold">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Posts Today</span>
                      <span className="font-mono font-semibold">1,234</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
