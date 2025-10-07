import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { StudioCard } from "@/components/studio-card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StudiosPage() {
  const studios = [
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
    {
      name: "Commercial Projects",
      slug: "commercial-projects",
      description: "Office buildings, retail spaces, and commercial architecture",
      members: 9200,
      posts: 1800,
      icon: "🏢",
    },
    {
      name: "Urban Planning",
      slug: "urban-planning",
      description: "City design, public spaces, and urban development strategies",
      members: 11300,
      posts: 2600,
      icon: "🌆",
    },
    {
      name: "Historic Preservation",
      slug: "historic-preservation",
      description: "Restoring and maintaining architectural heritage",
      members: 6700,
      posts: 1400,
      icon: "🏰",
    },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-balance">Explore Studios</h1>
              <p className="text-muted-foreground leading-relaxed">
                Join communities around specific architectural topics and connect with like-minded professionals
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="search" placeholder="Search studios..." className="pl-10 bg-secondary border-border" />
              </div>
              <Button variant="outline" className="rounded-sm bg-transparent">
                Filter
              </Button>
              <Button asChild>
                <Link href="/create/studio">Create Studio</Link>
              </Button>
            </div>

            {/* Studios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studios.map((studio) => (
                <StudioCard key={studio.slug} {...studio} />
              ))}
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
