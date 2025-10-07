import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { ConversationCard } from "@/components/conversation-card"
import { SubscriptionLimitBanner } from "@/components/subscription-limit-banner"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/components/icons"

export default function MessagesPage() {
  // Mock data - in real app, this would come from a database
  const conversations = [
    {
      id: "1",
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "/architect-woman.png",
      lastMessage: "Thanks for the feedback on the sustainable design proposal!",
      timestamp: "2m ago",
      unread: true,
      online: true,
    },
    {
      id: "2",
      name: "Marcus Johnson",
      username: "marcusj",
      avatar: "/architect-man.jpg",
      lastMessage: "Would love to collaborate on the community center project",
      timestamp: "1h ago",
      unread: true,
      online: false,
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      username: "elenarodriguez",
      avatar: "/architect-woman.png",
      lastMessage: "The renders look amazing! When can we schedule a call?",
      timestamp: "3h ago",
      unread: false,
      online: true,
    },
    {
      id: "4",
      name: "David Kim",
      username: "davidkim",
      avatar: "/architect-man.jpg",
      lastMessage: "I sent over the revised floor plans",
      timestamp: "1d ago",
      unread: false,
      online: false,
    },
    {
      id: "5",
      name: "Priya Patel",
      username: "priyapatel",
      avatar: "/architect-woman.png",
      lastMessage: "Great meeting you at the architecture conference!",
      timestamp: "2d ago",
      unread: false,
      online: false,
    },
  ]

  // Mock subscription data - free tier has 50 messages per month
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
            <div className="border border-border rounded-sm bg-card overflow-hidden">
              {conversations.map((conversation) => (
                <ConversationCard key={conversation.id} {...conversation} />
              ))}
            </div>

            {/* Empty State for no conversations */}
            {conversations.length === 0 && (
              <div className="border border-border rounded-sm bg-card p-12 text-center">
                <p className="text-muted-foreground mb-4">No messages yet</p>
                <p className="text-sm text-muted-foreground">
                  Start a conversation by visiting someone's profile and clicking Message
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
