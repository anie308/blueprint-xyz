"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { ConversationCard } from "@/components/conversation-card"
import { SubscriptionLimitBanner } from "@/components/subscription-limit-banner"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetConversationsQuery } from "@/lib/store/api"
import { ErrorState } from "@/components/dashboard/ErrorStates"
import { EmptyState } from "@/components/dashboard/EmptyStates"
import { MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch conversations from API
  const {
    data: conversationsData,
    isLoading,
    error,
    refetch
  } = useGetConversationsQuery({
    page: 1,
    limit: 50
  }, {
    pollingInterval: 30000, // 30 seconds for real-time updates
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const conversationsList = Array.isArray((conversationsData as any)?.data) 
    ? (conversationsData as any).data 
    : []

  // Transform API conversation data to ConversationCard props
  const conversations = conversationsList.map((conv: any) => {
    // Get the other participant (not current user)
    const otherParticipant = conv.participants?.find((p: any) => {
      // Assuming participants can be objects or IDs
      const participantId = typeof p === 'string' ? p : p._id || p.id
      // You'd need to get current user ID from auth context
      // For now, just take the first participant
      return true
    }) || conv.participants?.[0]

    const participantName = typeof otherParticipant === 'string' 
      ? 'User' 
      : otherParticipant?.fullName || otherParticipant?.name || 'User'
    
    const participantUsername = typeof otherParticipant === 'string'
      ? 'user'
      : otherParticipant?.username || 'user'

    const participantAvatar = typeof otherParticipant === 'string'
      ? undefined
      : otherParticipant?.profilePicture || otherParticipant?.profilePictureUrl || otherParticipant?.avatar

    return {
      id: conv._id || conv.id,
      name: participantName,
      username: participantUsername,
      avatar: participantAvatar,
      lastMessage: conv.lastMessage?.content || "No messages yet",
      timestamp: conv.lastMessage?.createdAt 
        ? formatDistanceToNow(new Date(conv.lastMessage.createdAt), { addSuffix: true })
        : "No messages",
      unread: (conv.unreadCount || 0) > 0,
      online: false // This would come from WebSocket presence
    }
  })

  // Filter conversations by search query
  const filteredConversations = conversations.filter((conv: any) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return conv.name.toLowerCase().includes(query) || 
           conv.username.toLowerCase().includes(query) ||
           conv.lastMessage.toLowerCase().includes(query)
  })

  // Mock subscription data - free tier has 50 messages per month
  // TODO: Get this from user subscription data
  const messagesUsed = 42
  const messagesLimit = 50

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Messages</h1>
              <p className="text-muted-foreground">Connect with architects and designers</p>
            </div>

            <SubscriptionLimitBanner messagesUsed={messagesUsed} messagesLimit={messagesLimit} />

            {/* Search */}
            <div className="relative mb-4">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-10 rounded-sm bg-secondary border-border"
              />
            </div>

            {/* Conversations List */}
            {isLoading ? (
              <div className="border border-border rounded-sm bg-card overflow-hidden">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="p-4 border-b border-border last:border-b-0">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <ErrorState
                title="Unable to load conversations"
                message="We couldn't fetch your conversations. Please try again."
                onRetry={() => refetch()}
              />
            ) : filteredConversations.length > 0 ? (
              <div className="border border-border rounded-sm bg-card overflow-hidden">
                {filteredConversations.map((conversation) => (
                  <ConversationCard key={conversation.id} {...conversation} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={MessageSquare}
                title="No messages yet"
                description="Start a conversation by visiting someone's profile and clicking Message"
              />
            )}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
