"use client"

import { useState, useEffect } from "react"
import { ReelCard } from "@/components/reel-card"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "@/components/icons"

export default function ReelsPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  const reels = [
    {
      id: "1",
      author: {
        name: "Emma Wilson",
        username: "emmawilson",
        avatar: "/architect-woman.png",
      },
      title: "Sketch to 3D Render in 60 Seconds",
      description: "Watch how I transform a hand sketch into a photorealistic render using Rhino and V-Ray",
      videoUrl: "/videos/sketch-to-render.mp4",
      thumbnail: "/architectural-sketch.jpg",
      likes: 1240,
      comments: 89,
    },
    {
      id: "2",
      author: {
        name: "David Kim",
        username: "davidkim",
        avatar: "/architect-man.jpg",
      },
      title: "Site Visit: Brutalist Masterpiece",
      description: "Exploring the iconic Barbican Estate in London. The raw concrete details are incredible.",
      videoUrl: "/videos/site-visit.mp4",
      thumbnail: "/modern-sustainable-building.jpg",
      likes: 2100,
      comments: 156,
    },
    {
      id: "3",
      author: {
        name: "Sofia Martinez",
        username: "sofiamartinez",
        avatar: "/architect-woman-2.jpg",
      },
      title: "Parametric Design Process",
      description: "Creating a complex facade using Grasshopper. The algorithm generates 1000+ unique panels.",
      videoUrl: "/videos/parametric.mp4",
      thumbnail: "/modern-house-rendering.jpg",
      likes: 890,
      comments: 67,
    },
    {
      id: "4",
      author: {
        name: "James Chen",
        username: "jameschen",
        avatar: "/architect-man-2.jpg",
      },
      title: "Construction Timelapse: Week 1-12",
      description: "12 weeks of construction condensed into 60 seconds. Foundation to framing complete.",
      videoUrl: "/videos/construction.mp4",
      thumbnail: "/modern-sustainable-architecture.jpg",
      likes: 3400,
      comments: 234,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newIndex = Math.round(scrollPosition / windowHeight)
      setActiveIndex(newIndex)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold text-white">Reels</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <SearchIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Reels Container */}
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {reels.map((reel, index) => (
          <div key={reel.id} className="h-screen w-full">
            <ReelCard {...reel} isActive={index === activeIndex} />
          </div>
        ))}
      </div>

      <MobileNav />
    </div>
  )
}
