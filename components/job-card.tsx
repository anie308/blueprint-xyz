import Link from "next/link"
import { BriefcaseIcon, MapPinIcon, ClockIcon, BookmarkIcon } from "./icons"
import { Button } from "./ui/button"

interface JobCardProps {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  type: string
  experience: string
  salary?: string
  postedTime: string
  description: string
  skills: string[]
}

export function JobCard({
  id,
  title,
  company,
  companyLogo,
  location,
  type,
  experience,
  salary,
  postedTime,
  description,
  skills,
}: JobCardProps) {
  return (
    <div className="border border-border rounded-sm bg-card p-6 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 flex-1">
          {/* Company Logo */}
          <div className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0">
            {companyLogo ? (
              <img
                src={companyLogo || "/placeholder.svg"}
                alt={company}
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              <BriefcaseIcon className="w-6 h-6 text-muted-foreground" />
            )}
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/jobs/${id}`} className="group">
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
            </Link>
            <p className="text-sm text-foreground font-medium mt-1">{company}</p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPinIcon className="w-4 h-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BriefcaseIcon className="w-4 h-4" />
                <span>{type}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ClockIcon className="w-4 h-4" />
                <span>{postedTime}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-sm border border-primary/20">
                {experience}
              </span>
              {salary && (
                <span className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-sm border border-accent/20">
                  {salary}
                </span>
              )}
              {skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs font-medium bg-secondary text-foreground rounded-sm border border-border"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium text-muted-foreground">+{skills.length - 3} more</span>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <Button variant="ghost" size="icon" className="flex-shrink-0">
          <BookmarkIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
