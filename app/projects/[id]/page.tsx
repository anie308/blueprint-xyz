import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { BookmarkIcon } from "@/components/icons"
import Image from "next/image"

export default function ProjectPage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-5xl mx-auto p-4 md:p-6">
            {/* Project Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4 text-balance">Sustainable Community Center</h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 rounded-sm">
                    <AvatarImage src="/architect-woman.png" />
                    <AvatarFallback className="rounded-sm bg-secondary">AR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Alex Rivera</p>
                    <p className="text-sm text-muted-foreground">@alexrivera</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-sm bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                      className="w-5 h-5 mr-2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    456
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-sm bg-transparent">
                    <BookmarkIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Project Images */}
            <div className="space-y-4 mb-8">
              <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-border">
                <Image
                  src="/modern-sustainable-building.jpg"
                  alt="Sustainable Community Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-video rounded-sm overflow-hidden border border-border">
                  <Image src="/solar-panels-architecture.jpg" alt="Detail 1" fill className="object-cover" />
                </div>
                <div className="relative aspect-video rounded-sm overflow-hidden border border-border">
                  <Image src="/modern-sustainable-architecture.jpg" alt="Detail 2" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                  <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                    <p>
                      The Sustainable Community Center represents a new approach to public architecture, combining
                      passive house principles with biophilic design to create a space that serves the community while
                      minimizing environmental impact.
                    </p>
                    <p>
                      Located in Portland, Oregon, this 5,000 square foot facility includes multipurpose rooms,
                      community kitchen, library space, and outdoor gathering areas. The building achieves net-zero
                      energy consumption through a combination of passive design strategies and renewable energy
                      systems.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Design Approach</h3>
                  <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
                    <p>
                      The design prioritizes natural ventilation, daylighting, and connection to the surrounding
                      landscape. Large south-facing windows maximize solar gain in winter, while deep overhangs provide
                      shading in summer. A green roof system manages stormwater and provides additional insulation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="border border-border rounded-sm bg-card p-6">
                  <h3 className="font-bold mb-4">Project Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Category</span>
                      <p className="font-medium">Public Architecture</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Location</span>
                      <p className="font-medium">Portland, OR</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Year</span>
                      <p className="font-medium">2024</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Size</span>
                      <p className="font-medium">5,000 sq ft</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status</span>
                      <p className="font-medium">Under Construction</p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-sm bg-card p-6">
                  <h3 className="font-bold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Sustainable", "Passive House", "Biophilic", "Community", "Net-Zero"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-secondary text-foreground text-xs font-medium rounded-sm border border-border"
                      >
                        {tag}
                      </span>
                    ))}
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
