"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BlueprintIcon, ArrowRightIcon, PlayIcon, UsersIcon, GridIcon, MessageIcon, TrendingIcon } from "@/components/icons"
import { useHomeData } from "@/lib/hooks/useHomeData"
import { ProjectGallerySkeleton, TestimonialsSkeleton } from "@/components/home/LoadingStates"
import { ProjectGalleryError, TestimonialsError, ErrorState } from "@/components/home/ErrorStates"
import { ProjectGalleryEmpty, TestimonialsEmpty, TrendingEmpty } from "@/components/home/EmptyStates"
import { Sparkles, Building2, Palette, Users, Zap, Globe } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const { 
    featuredProjects,
    trendingContent,
    featuredStudios,
    isLoading, 
    hasError, 
    errors, 
    isEmpty,
    refetchProjects,
    refetchTrending,
    refetchStudios
  } = useHomeData()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Building2,
      title: "Studios",
      description: "Join topic-based discussions, from Brutalism to Sustainable Design",
      gradient: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-600"
    },
    {
      icon: PlayIcon,
      title: "Reels for Architects",
      description: "Share short project videos or site walkthroughs",
      gradient: "from-orange-500/10 to-orange-600/5",
      iconColor: "text-orange-600"
    },
    {
      icon: GridIcon,
      title: "Portfolio Profiles",
      description: "Showcase your work at blueprint.xyz/username",
      gradient: "from-emerald-500/10 to-emerald-600/5",
      iconColor: "text-emerald-600"
    },
    {
      icon: MessageIcon,
      title: "Collaborative Feedback",
      description: "Peer discussions and professional appreciation",
      gradient: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-600"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Sustainable Architect",
      quote: "Finally, a platform built for architects. The portfolio integration is brilliant.",
      avatar: "/architect-woman.png",
      company: "Studio Chen"
    },
    {
      name: "Marcus Rodriguez",
      role: "Brutalist Designer",
      quote: "The community discussions here are more meaningful than any social media.",
      avatar: "/architect-man.jpg",
      company: "Rodriguez Design"
    },
    {
      name: "Aisha Patel",
      role: "Residential Designer",
      quote: "Blueprint.xyz feels like my digital studio space.",
      avatar: "/architect-woman-2.jpg",
      company: "Patel Architecture"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <BlueprintIcon className="w-9 h-9 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Blueprint
                </span>
                <span className="text-xs text-muted-foreground font-mono tracking-wider">.xyz</span>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost" className="rounded-sm">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="rounded-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/6" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,77,139,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(184,115,51,0.08),transparent_50%)]" />
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px'
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 lg:py-48">
          <div className="text-center max-w-5xl mx-auto">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Built by Architects, for Architects</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                  A Creative Home for{" "}
                </span>
                <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                  Architects
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-6 max-w-3xl mx-auto font-light leading-relaxed">
                Where Ideas, Sketches, and Structures Meet
              </p>
              
              <p className="text-lg sm:text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join the world's first architect-centered community — discuss, share, and showcase your work with peers globally.
              </p>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link href="/auth/signup">
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-6 h-auto rounded-sm shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transition-all duration-300 hover:scale-105"
                >
                  Join the Community
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-10 py-6 h-auto rounded-sm border-2 hover:bg-secondary/50 transition-all duration-300"
                >
                  Explore Portfolios
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className={`mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Architects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">200+</div>
                <div className="text-sm text-muted-foreground">Studios</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Enhanced */}
      <section className="py-32 bg-gradient-to-b from-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Architects need more than social media — they need a{" "}
                  <span className="text-primary">studio space online</span>.
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Blueprint.xyz gives you the tools to share projects, join discussions, and grow your presence in an architecturally designed community. Built by architects, for architects.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  "Share your work with a global community",
                  "Join topic-based studios and discussions",
                  "Build your digital portfolio at blueprint.xyz/username"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-150 transition-transform duration-300" />
                    <span className="text-lg text-foreground flex-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-2xl flex items-center justify-center relative overflow-hidden border border-border/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,77,139,0.1),transparent_70%)]" />
                <div className="relative text-center z-10">
                  <BlueprintIcon className="w-32 h-32 text-primary mx-auto mb-6 opacity-80" />
                  <p className="text-muted-foreground text-lg">3D render / wireframe sketch animation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Everything an Architect Needs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed specifically for the architectural community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Trending Section - Enhanced */}
      <section className="py-32 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4">
              <TrendingIcon className="w-6 h-6 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Trending Now</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              What's Trending Now
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover the most engaging content from our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Card key={index} className="group overflow-hidden border-border/50">
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                        <div className="animate-pulse bg-muted w-full h-full" />
                      </div>
                      <CardContent className="p-6">
                        <div className="animate-pulse bg-muted h-5 w-3/4 mb-3 rounded" />
                        <div className="animate-pulse bg-muted h-4 w-1/2 rounded" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : errors.trending ? (
              <div className="col-span-full">
                <ErrorState
                  title="Unable to load trending content"
                  message="We couldn't fetch the latest trending content. Please try again."
                  onRetry={refetchTrending}
                />
              </div>
            ) : trendingContent.length === 0 ? (
              <div className="col-span-full">
                <TrendingEmpty />
              </div>
            ) : (
              trendingContent.slice(0, 6).map((item) => (
                <Card key={item._id} className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    <img 
                      src={item.images?.[0] || item.thumbnail || "/placeholder.jpg"} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/40 transition-colors duration-500" />
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                        {item.type || 'Post'}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">by {item.author?.fullName || item.author?.username}</p>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {item.likes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageIcon className="w-4 h-4" />
                        {item.comments || 0}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Visual Gallery Section - Enhanced */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              See What Architects Are Building
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover inspiring projects and connect with fellow architects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <ProjectGallerySkeleton />
            ) : errors.projects ? (
              <ProjectGalleryError onRetry={refetchProjects} />
            ) : featuredProjects.length === 0 ? (
              <ProjectGalleryEmpty />
            ) : (
              featuredProjects.map((project, index) => (
                <Card 
                  key={project._id} 
                  className={`group overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    <img 
                      src={project.images?.[0] || "/placeholder.jpg"} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/40 transition-colors duration-500" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">by {project.author?.fullName || project.author?.username}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,77,139,0.1),transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Turn your ideas into a portfolio you can share
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Blueprint.xyz/yourname — your digital studio, always online
          </p>
          <Link href="/auth/signup">
            <Button 
              size="lg" 
              className="text-lg px-12 py-7 h-auto rounded-sm shadow-2xl shadow-primary/30 hover:shadow-3xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
            >
              Create My Portfolio
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Trusted by Architects Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of architects building their digital presence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              <TestimonialsSkeleton />
            ) : (
              testimonials.map((testimonial, index) => (
                <Card key={index} className="text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-primary/10">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <blockquote className="text-lg text-muted-foreground mb-6 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-bold text-lg text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground/70 mt-1">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <BlueprintIcon className="w-9 h-9 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight">Blueprint</span>
                  <span className="text-xs text-muted-foreground font-mono tracking-wider">.xyz</span>
                </div>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Designed for Designers. The world's first architect-centered community platform.
              </p>
              <div className="flex gap-4">
                <Globe className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                <Users className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                <Palette className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-foreground mb-4">Platform</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/auth/signup" className="hover:text-foreground transition-colors">Join Community</Link></li>
                <li><Link href="/auth/login" className="hover:text-foreground transition-colors">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-foreground mb-4">Company</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Blueprint.xyz. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Terms</Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
