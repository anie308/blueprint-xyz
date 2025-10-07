"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {  PlusIcon, XIcon } from "@/components/icons"
import Link from "next/link"

export default function CreateJobPage() {
  const [jobTitle, setJobTitle] = useState("")
  const [company, setCompany] = useState("")
  const [location, setLocation] = useState("")
  const [jobType, setJobType] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [salaryMin, setSalaryMin] = useState("")
  const [salaryMax, setSalaryMax] = useState("")
  const [description, setDescription] = useState("")
  const [responsibilities, setResponsibilities] = useState("")
  const [requirements, setRequirements] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [applicationUrl, setApplicationUrl] = useState("")
  const [applicationEmail, setApplicationEmail] = useState("")

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating job:", {
      jobTitle,
      company,
      location,
      jobType,
      experienceLevel,
      salary: `${salaryMin} - ${salaryMax}`,
      description,
      responsibilities,
      requirements,
      skills,
      applicationUrl,
      applicationEmail,
    })
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-3xl mx-auto p-4 md:p-6">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              {/* <ArrowLeftIcon className="w-4 h-4" /> */}
              Back to Create
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-balance">Post a Job</h1>
              <p className="text-muted-foreground leading-relaxed">
                Connect with talented architects and design professionals looking for their next opportunity
              </p>
            </div>

            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Architect, Architectural Designer"
                    required
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your company or firm name"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Remote, New York, NY, London, UK"
                    required
                  />
                </div>

                {/* Job Type and Experience Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobType">Job Type *</Label>
                    <select
                      id="jobType"
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-sm border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level *</Label>
                    <select
                      id="experience"
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-sm border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select level</option>
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Lead">Lead</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>
                </div>

                {/* Salary Range */}
                <div className="space-y-2">
                  <Label>Salary Range (Optional)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                      placeholder="Min (e.g., $80k)"
                    />
                    <Input
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                      placeholder="Max (e.g., $120k)"
                    />
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide an overview of the role and what the candidate will be doing..."
                    required
                    rows={5}
                  />
                </div>

                {/* Responsibilities */}
                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Key Responsibilities *</Label>
                  <Textarea
                    id="responsibilities"
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    placeholder="List the main responsibilities and duties..."
                    required
                    rows={5}
                  />
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements *</Label>
                  <Textarea
                    id="requirements"
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="List the qualifications, education, and experience required..."
                    required
                    rows={5}
                  />
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddSkill()
                        }
                      }}
                      placeholder="Add a skill and press Enter"
                    />
                    <Button type="button" onClick={handleAddSkill} variant="outline" className="bg-transparent">
                      <PlusIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-sm rounded-sm"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="hover:text-destructive"
                          >
                            <XIcon className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Application Method */}
                <div className="space-y-4">
                  <Label>How to Apply *</Label>
                  <div className="space-y-2">
                    <Label htmlFor="applicationUrl" className="text-sm font-normal">
                      Application URL
                    </Label>
                    <Input
                      id="applicationUrl"
                      type="url"
                      value={applicationUrl}
                      onChange={(e) => setApplicationUrl(e.target.value)}
                      placeholder="https://yourcompany.com/careers/apply"
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground">or</div>
                  <div className="space-y-2">
                    <Label htmlFor="applicationEmail" className="text-sm font-normal">
                      Application Email
                    </Label>
                    <Input
                      id="applicationEmail"
                      type="email"
                      value={applicationEmail}
                      onChange={(e) => setApplicationEmail(e.target.value)}
                      placeholder="careers@yourcompany.com"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Provide at least one application method</p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    Post Job
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/create">Cancel</Link>
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
