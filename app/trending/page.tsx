import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { TrendingIcon } from "@/components/icons"

export default function TrendingPage() {
  const trendingPosts = [
    {
      id: "1",
      author: {
        name: "Maya Johnson",
        username: "mayajohnson",
        avatar: "/architect-woman.png",
      },
      studio: "Sustainable Housing",
      title: "The Future of Carbon-Neutral Construction",
      content:
        "After 3 years of research, our team has developed a construction method that achieves true carbon neutrality. Here's how we did it and what it means for the industry...",
      image: "/modern-sustainable-building.jpg",
      appreciations: 3420,
      comments: 567,
      timestamp: "1d ago",
    },
    {
      id: "2",
      author: {
        name: "Carlos Mendez",
        username: "carlosmendez",
        avatar: "/architect-man.jpg",
      },
      studio: "Urban Planning",
      title: "Reimagining Public Spaces Post-Pandemic",
      content:
        "Cities are fundamentally changing. This comprehensive analysis explores how architects can lead the transformation of public spaces for a post-pandemic world.",
      image: "/modern-sustainable-architecture.jpg",
      appreciations: 2890,
      comments: 423,
      timestamp: "2d ago",
    },
    {
      id: "3",
      author: {
        name: "Priya Sharma",
        username: "priyasharma",
        avatar: "/architect-woman-2.jpg",
      },
      studio: "Residential Design",
      title: "Affordable Housing Crisis: An Architect's Perspective",
      content:
        "We need to talk about affordability. Here's my proposal for scalable, beautiful, and truly affordable housing that doesn't compromise on design quality.",
      appreciations: 4120,
      comments: 789,
      timestamp: "3d ago",
    },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="flex items-center gap-3 mb-8">
              <TrendingIcon className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-balance">Trending</h1>
                <p className="text-muted-foreground leading-relaxed">
                  The most appreciated posts from the community this week
                </p>
              </div>
            </div>

            {/* Time Filter */}
            <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
              <Button variant="default" size="sm" className="rounded-sm">
                This Week
              </Button>
              <Button variant="ghost" size="sm">
                This Month
              </Button>
              <Button variant="ghost" size="sm">
                All Time
              </Button>
            </div>

            {/* Trending Posts */}
            <div className="space-y-4">
              {trendingPosts.map((post, index) => (
                <div key={post.id} className="relative">
                  <div className="absolute -left-12 top-4 hidden md:flex items-center justify-center w-8 h-8 rounded-sm bg-accent text-accent-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
