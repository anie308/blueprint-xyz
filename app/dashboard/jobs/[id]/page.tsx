import { Button } from "@/components/ui/button"
import { BriefcaseIcon, MapPinIcon, ClockIcon, BookmarkIcon, LinkIcon } from "@/components/icons"

export default function JobDetailPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="border border-border rounded-sm bg-card p-8 mb-6">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex gap-4 flex-1">
              <div className="w-16 h-16 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0">
                <BriefcaseIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">Senior Architect</h1>
                <p className="text-lg text-foreground font-medium">Foster + Partners</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <BookmarkIcon className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="w-4 h-4" />
              <span>London, UK</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BriefcaseIcon className="w-4 h-4" />
              <span>Full-time</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4" />
              <span>Posted 2 days ago</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-sm border border-primary/20">
              Senior Level
            </span>
            <span className="px-3 py-1.5 text-sm font-medium bg-accent/10 text-accent rounded-sm border border-accent/20">
              $120k - $180k
            </span>
          </div>

          <Button className="w-full sm:w-auto">Apply Now</Button>
        </div>

        {/* Job Description */}
        <div className="border border-border rounded-sm bg-card p-8 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">About the Role</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              We are seeking an experienced Senior Architect to lead major commercial and residential projects. You will
              work with a talented team on innovative sustainable designs that push the boundaries of contemporary
              architecture.
            </p>
            <p>
              As a Senior Architect at Foster + Partners, you will be responsible for overseeing all phases of project
              development, from initial concept through construction documentation. You will collaborate with clients,
              consultants, and internal teams to deliver world-class architectural solutions.
            </p>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="border border-border rounded-sm bg-card p-8 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Key Responsibilities</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Lead design development for large-scale commercial and residential projects</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Manage project teams and coordinate with consultants</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Present design concepts to clients and stakeholders</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Ensure projects meet sustainability and building code requirements</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Mentor junior architects and designers</span>
            </li>
          </ul>
        </div>

        {/* Requirements */}
        <div className="border border-border rounded-sm bg-card p-8 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Requirements</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Professional architecture degree (B.Arch or M.Arch)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Licensed architect with 8+ years of experience</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Expert knowledge of Revit, AutoCAD, and BIM workflows</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Strong portfolio demonstrating sustainable design expertise</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary mt-1">•</span>
              <span>Excellent communication and leadership skills</span>
            </li>
          </ul>
        </div>

        {/* Skills */}
        <div className="border border-border rounded-sm bg-card p-8 mb-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {["Revit", "AutoCAD", "Sustainable Design", "BIM", "Project Management", "LEED", "SketchUp"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm font-medium bg-secondary text-foreground rounded-sm border border-border"
                >
                  {skill}
                </span>
              ),
            )}
          </div>
        </div>

        {/* Company Info */}
        <div className="border border-border rounded-sm bg-card p-8">
          <h2 className="text-xl font-bold text-foreground mb-4">About Foster + Partners</h2>
          <p className="text-muted-foreground mb-4">
            Foster + Partners is a global studio for architecture, urbanism and design, rooted in sustainability. We
            have established an international practice with offices in over 20 countries, working on projects of all
            scales and types around the world.
          </p>
          <Button variant="outline" className="gap-2 bg-transparent">
            <LinkIcon className="w-4 h-4" />
            Visit Company Website
          </Button>
        </div>
      </div>
    </div>
  )
}
