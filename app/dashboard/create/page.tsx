import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlusIcon, ReelsIcon, GridIcon, BriefcaseIcon } from "@/components/icons"

export default function CreatePage() {
  const createOptions = [
    {
      title: "Create Post",
      description: "Share your thoughts, questions, or discussions with the community",
      icon: PlusIcon,
      href: "/create/post",
    },
    {
      title: "Upload Reel",
      description: "Share a short video showcasing your design process or project",
      icon: ReelsIcon,
      href: "/create/reel",
    },
    {
      title: "Add Project",
      description: "Add a new project to your portfolio with images and details",
      icon: GridIcon,
      href: "/create/project",
    },
    {
      title: "Create Studio",
      description: "Start a new community around a specific architectural topic or interest",
      icon: PlusIcon,
      href: "/create/studio",
    },
    {
      title: "Post Job",
      description: "List a job opportunity for architects and design professionals",
      icon: BriefcaseIcon,
      href: "/create/job",
    },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-balance">Create</h1>
              <p className="text-muted-foreground leading-relaxed">
                Share your work and ideas with the Blueprint community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {createOptions.map((option) => {
                const Icon = option.icon
                return (
                  <Card
                    key={option.title}
                    className="p-6 hover:border-primary/30 transition-colors cursor-pointer group"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-sm bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{option.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
                      </div>
                      <Button className="w-full rounded-sm mt-2">Get Started</Button>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
