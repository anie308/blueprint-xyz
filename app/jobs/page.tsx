"use client"

import { useState } from "react"
import { JobCard } from "@/components/job-card"
import { FilterIcon, SearchIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Freelance", "Internship"]
const experienceLevels = ["All", "Entry Level", "Mid Level", "Senior Level", "Lead", "Executive"]
const locations = ["All", "Remote", "On-site", "Hybrid"]

const mockJobs = [
  {
    id: "1",
    title: "Senior Architect",
    company: "Foster + Partners",
    location: "London, UK",
    type: "Full-time",
    experience: "Senior Level",
    salary: "$120k - $180k",
    postedTime: "2 days ago",
    description:
      "We are seeking an experienced Senior Architect to lead major commercial and residential projects. You will work with a talented team on innovative sustainable designs.",
    skills: ["Revit", "AutoCAD", "Sustainable Design", "BIM", "Project Management"],
  },
  {
    id: "2",
    title: "Architectural Designer",
    company: "Zaha Hadid Architects",
    location: "Remote",
    type: "Contract",
    experience: "Mid Level",
    salary: "$80k - $110k",
    postedTime: "1 week ago",
    description:
      "Join our design team to work on cutting-edge parametric architecture projects. Experience with computational design tools is essential.",
    skills: ["Rhino", "Grasshopper", "3D Modeling", "Parametric Design"],
  },
  {
    id: "3",
    title: "Junior Architect",
    company: "Bjarke Ingels Group",
    location: "Copenhagen, Denmark",
    type: "Full-time",
    experience: "Entry Level",
    salary: "$55k - $70k",
    postedTime: "3 days ago",
    description:
      "Exciting opportunity for a recent graduate to join our award-winning team. You'll contribute to residential and mixed-use developments.",
    skills: ["AutoCAD", "SketchUp", "Adobe Suite", "Model Making"],
  },
  {
    id: "4",
    title: "Lead Sustainable Design Architect",
    company: "Perkins&Will",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "Lead",
    salary: "$140k - $200k",
    postedTime: "5 days ago",
    description:
      "Lead our sustainability initiatives and mentor junior architects. LEED AP certification required. Focus on net-zero and regenerative design.",
    skills: ["LEED", "Energy Modeling", "Passive Design", "Green Building", "Leadership"],
  },
  {
    id: "5",
    title: "Freelance Architectural Visualizer",
    company: "MIR",
    location: "Remote",
    type: "Freelance",
    experience: "Mid Level",
    salary: "$60 - $100/hr",
    postedTime: "1 day ago",
    description:
      "Create stunning photorealistic renderings for high-profile architectural projects. Portfolio showcasing residential and commercial work required.",
    skills: ["3ds Max", "V-Ray", "Corona", "Photoshop", "Unreal Engine"],
  },
  {
    id: "6",
    title: "Architecture Intern",
    company: "Gensler",
    location: "New York, NY",
    type: "Internship",
    experience: "Entry Level",
    postedTime: "4 days ago",
    description:
      "Summer internship program for architecture students. Gain hands-on experience across multiple project types and learn from industry leaders.",
    skills: ["Revit", "AutoCAD", "Rendering", "Model Making"],
  },
]

export default function JobsPage() {
  const [selectedType, setSelectedType] = useState("All")
  const [selectedExperience, setSelectedExperience] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredJobs = mockJobs.filter((job) => {
    const matchesType = selectedType === "All" || job.type === selectedType
    const matchesExperience = selectedExperience === "All" || job.experience === selectedExperience
    const matchesLocation =
      selectedLocation === "All" ||
      (selectedLocation === "Remote" && job.location === "Remote") ||
      (selectedLocation === "On-site" && job.location !== "Remote") ||
      (selectedLocation === "Hybrid" && job.location.includes("Hybrid"))
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesType && matchesExperience && matchesLocation && matchesSearch
  })

  return (
    <div className="min-h-screen pb-20 md:pb-8">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Architecture Jobs</h1>
              <p className="text-muted-foreground mt-1">
                {filteredJobs.length} {filteredJobs.length === 1 ? "position" : "positions"} available
              </p>
            </div>
            <Button className="gap-2" asChild>
              <Link href="/create/job">
                <FilterIcon className="w-4 h-4" />
                Post a Job
              </Link>
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Job Type Filter */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <FilterIcon className="w-4 h-4" />
                  Job Type
                </h3>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                        selectedType === type
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level Filter */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Experience Level</h3>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedExperience(level)}
                      className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                        selectedExperience === level
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Location</h3>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                        selectedLocation === location
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedType !== "All" || selectedExperience !== "All" || selectedLocation !== "All") && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSelectedType("All")
                    setSelectedExperience("All")
                    setSelectedLocation("All")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job.id} {...job} />)
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No jobs found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() => {
                    setSelectedType("All")
                    setSelectedExperience("All")
                    setSelectedLocation("All")
                    setSearchQuery("")
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
