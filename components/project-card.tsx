import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  id: string
  title: string
  category: string
  thumbnail: string
  likes: number
  views: number
}

export function ProjectCard({ id, title, category, thumbnail, likes, views }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="group block">
      <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-border bg-secondary">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white font-semibold text-sm mb-1">{title}</p>
          <p className="text-white/80 text-xs">{category}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground font-mono">
        <span>{likes} likes</span>
        <span>•</span>
        <span>{views} views</span>
      </div>
    </Link>
  )
}
