"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BlueprintIcon, ArrowRightIcon, PlayIcon, UsersIcon, GridIcon, MessageIcon, TrendingIcon } from "@/components/icons"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: UsersIcon,
      title: "Studios",
      description: "Join topic-based discussions, from Brutalism to Sustainable Design",
      color: "text-blue-600"
    },
    {
      icon: PlayIcon,
      title: "Reels for Architects",
      description: "Share short project videos or site walkthroughs",
      color: "text-orange-600"
    },
    {
      icon: GridIcon,
      title: "Portfolio Profiles",
      description: "Showcase your work at blueprint.xyz/username",
      color: "text-green-600"
    },
    {
      icon: MessageIcon,
      title: "Collaborative Feedback",
      description: "Peer discussions and professional appreciation",
      color: "text-purple-600"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Sustainable Architect",
      quote: "Finally, a platform built for architects. The portfolio integration is brilliant.",
      avatar: "/architect-woman.png"
    },
    {
      name: "Marcus Rodriguez",
      role: "Brutalist Designer",
      quote: "The community discussions here are more meaningful than any social media.",
      avatar: "/architect-man.jpg"
    },
    {
      name: "Aisha Patel",
      role: "Residential Designer",
      quote: "Blueprint.xyz feels like my digital studio space.",
      avatar: "/architect-woman-2.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <BlueprintIcon className="w-8 h-8 text-primary group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">Blueprint</span>
                <span className="text-xs text-muted-foreground font-mono">.xyz</span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Join Community</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 z-20 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                A Creative Home for{" "}
                <span className="text-primary">Architects</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Where Ideas, Sketches, and Structures Meet
              </p>
              <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                Join the world's first architect-centered community — discuss, share, and showcase your work with peers globally.
              </p>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link href="/auth/signup">
                <Button size="lg" className="text-lg px-8 py-4 h-auto">
                  Join the Community
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto">
                  Explore Portfolios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Architects need more than social media — they need a studio space online.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Blueprint.xyz gives you the tools to share projects, join discussions, and grow your presence in an architecturally designed community. Built by architects, for architects.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Share your work with a global community</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Join topic-based studios and discussions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Build your digital portfolio at blueprint.xyz/username</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <BlueprintIcon className="w-24 h-24 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">3D render / wireframe sketch animation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything an Architect Needs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed specifically for the architectural community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Visual Gallery Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              See What Architects Are Building
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover inspiring projects and connect with fellow architects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Sustainable Housing Complex", author: "Sarah Chen", image: "/modern-sustainable-architecture.jpg" },
              { title: "Brutalist Office Building", author: "Marcus Rodriguez", image: "/modern-house-rendering.jpg" },
              { title: "Modern Apartment Design", author: "Aisha Patel", image: "/modern-apartment.png" }
            ].map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">by {project.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Turn your ideas into a portfolio you can share
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Blueprint.xyz/yourname — your digital studio, always online
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8 py-4 h-auto">
              Create My Portfolio
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by Architects Worldwide
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <blockquote className="text-muted-foreground mb-4 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <BlueprintIcon className="w-8 h-8 text-primary" />
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight">Blueprint</span>
                  <span className="text-sm text-muted-foreground font-mono">.xyz</span>
                </div>
              </Link>
              <p className="text-muted-foreground mb-4 max-w-md">
                Designed for Designers. The world's first architect-centered community platform.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/auth/signup" className="hover:text-foreground transition-colors">Join Community</Link></li>
                <li><Link href="/auth/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Blueprint.xyz. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}