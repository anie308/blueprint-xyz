"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon, ImageIcon, MoreVerticalIcon } from "@/components/icons"
import { SubscriptionLimitBanner } from "@/components/subscription-limit-banner"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function ConversationPage({ params }: { params: { username: string } }) {
  const [message, setMessage] = useState("")

  // Mock data
  const contact = {
    name: "Sarah Chen",
    username: params.username,
    avatar: "/architect-woman.png",
    title: "Senior Architect at Green Space Architecture",
    online: true,
  }

  const messages = [
    {
      id: "1",
      sender: "them",
      content: "Hi! I saw your sustainable housing project. Really impressive work!",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      sender: "me",
      content: "Thank you! I'd love to hear your thoughts on the passive cooling system we implemented.",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      sender: "them",
      content: "The cross-ventilation design is brilliant. Have you considered adding solar chimneys?",
      timestamp: "10:35 AM",
    },
    {
      id: "4",
      sender: "me",
      content: "That's a great idea! We explored it in the initial phase but had budget constraints.",
      timestamp: "10:37 AM",
    },
    {
      id: "5",
      sender: "them",
      content: "Thanks for the feedback on the sustainable design proposal!",
      timestamp: "10:40 AM",
    },
  ]

  // Mock subscription data
  const messagesUsed = 42
  const messagesLimit = 50
  const canSendMessage = messagesUsed < messagesLimit

  const handleSend = () => {
    if (message.trim() && canSendMessage) {
      // Handle sending message
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8 flex flex-col h-[calc(100vh-4rem)]">
          {/* Conversation Header */}
          <div className="border-b border-border bg-card p-4">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <Link href="/messages" className="md:hidden mr-4 text-muted-foreground hover:text-foreground">
                ←
              </Link>
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <Avatar className="w-10 h-10 rounded-sm border border-border">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="rounded-sm bg-secondary text-foreground">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold truncate">{contact.name}</h2>
                  <p className="text-xs text-muted-foreground truncate">{contact.title}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-sm">
                <MoreVerticalIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-4 space-y-4">
              <SubscriptionLimitBanner messagesUsed={messagesUsed} messagesLimit={messagesLimit} />

              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[70%]", msg.sender === "me" ? "items-end" : "items-start")}>
                    <div
                      className={cn(
                        "rounded-sm p-3 mb-1",
                        msg.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground border border-border",
                      )}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono px-1">{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-border bg-card p-4">
            <div className="max-w-4xl mx-auto">
              {!canSendMessage && (
                <div className="mb-3 text-sm text-muted-foreground text-center">
                  You've reached your message limit.{" "}
                  <Link href="/pricing" className="text-accent hover:underline">
                    Upgrade to Pro
                  </Link>{" "}
                  to continue messaging.
                </div>
              )}
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon" className="rounded-sm flex-shrink-0" disabled={!canSendMessage}>
                  <ImageIcon className="w-5 h-5" />
                </Button>
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder={canSendMessage ? "Type a message..." : "Upgrade to send messages"}
                  className="rounded-sm bg-secondary border-border"
                  disabled={!canSendMessage}
                />
                <Button
                  onClick={handleSend}
                  disabled={!message.trim() || !canSendMessage}
                  className="rounded-sm flex-shrink-0"
                >
                  <SendIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
