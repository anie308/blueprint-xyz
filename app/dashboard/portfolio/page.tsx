import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { LinkIcon, MapPinIcon, BriefcaseIcon, GlobeIcon } from "@/components/icons"
import Image from "next/image"

export default function PortfolioPage() {
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
    {
      id: "5",
      title: "Adaptive Reuse Project",
      category: "Historic Preservation",
      thumbnail: "/solar-panels-architecture.jpg",
      likes: 345,
      views: 2100,
    },
    {
      id: "6",
      title: "Coastal Villa Design",
      category: "Residential",
      thumbnail: "/architectural-sketch.jpg",
      likes: 890,
      views: 5200,
    },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
              {/* Left Column - User Profile Info */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <div className="border border-border rounded-sm p-6 bg-card">
                  {/* Profile Picture */}
                  <div className="mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image src="/architect-woman.png" alt="Profile" fill className="rounded-sm object-cover" />
                    </div>
                    <h2 className="text-xl font-bold text-center mb-1">Sarah Chen</h2>
                    <p className="text-sm text-muted-foreground text-center">@sarahchen</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                    <div className="text-center">
                      <div className="font-bold text-lg">24</div>
                      <div className="text-xs text-muted-foreground">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">3.2K</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">892</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <h3 className="text-sm font-semibold mb-2">About</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Sustainable architecture & urban design. Creating spaces that inspire and endure.
                    </p>
                  </div>

                  {/* Location */}
                  <div className="mb-4 flex items-start gap-3">
                    <MapPinIcon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">San Francisco, CA</div>
                    </div>
                  </div>

                  {/* Specialization */}
                  <div className="mb-4 flex items-start gap-3">
                    <BriefcaseIcon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Specialization</div>
                      <div className="text-sm text-muted-foreground">Sustainable Design, Urban Planning</div>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="mb-4 flex items-start gap-3">
                    <GlobeIcon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Website</div>
                      <a href="#" className="text-sm text-primary hover:underline">
                        sarahchen.design
                      </a>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mb-6 pb-6 border-b border-border flex items-start gap-3">
                    <LinkIcon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-2">Links</div>
                      <div className="space-y-1">
                        <a href="#" className="text-sm text-primary hover:underline block">
                          Instagram
                        </a>
                        <a href="#" className="text-sm text-primary hover:underline block">
                          LinkedIn
                        </a>
                        <a href="#" className="text-sm text-primary hover:underline block">
                          Behance
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button className="w-full rounded-sm">Follow</Button>
                    <Button variant="outline" className="w-full rounded-sm bg-transparent">
                      Message
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Projects Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Projects</h1>
                  <Button className="rounded-sm">Add Project</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                  ))}
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
