import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BellIcon } from "@/components/icons"

export default function NotificationsPage() {
  const notifications = [
    {
      id: "1",
      type: "appreciation",
      user: {
        name: "Marcus Rodriguez",
        username: "marcusrod",
        avatar: "/architect-man.jpg",
      },
      content: "appreciated your post",
      target: "Passive House Design: My Latest Project",
      timestamp: "2h ago",
      read: false,
    },
    {
      id: "2",
      type: "comment",
      user: {
        name: "Aisha Patel",
        username: "aishapatel",
        avatar: "/architect-woman-2.jpg",
      },
      content: "commented on your project",
      target: "Sustainable Community Center",
      timestamp: "5h ago",
      read: false,
    },
    {
      id: "3",
      type: "follow",
      user: {
        name: "James Chen",
        username: "jameschen",
        avatar: "/architect-man-2.jpg",
      },
      content: "started following you",
      timestamp: "1d ago",
      read: true,
    },
    {
      id: "4",
      type: "studio",
      user: {
        name: "Sarah Chen",
        username: "sarahchen",
        avatar: "/architect-woman.png",
      },
      content: "posted in",
      target: "Sustainable Housing",
      timestamp: "2d ago",
      read: true,
    },
  ]

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-3xl mx-auto p-4 md:p-6">
            <div className="flex items-center gap-3 mb-8">
              <BellIcon className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-balance">Notifications</h1>
                <p className="text-muted-foreground leading-relaxed">Stay updated with your community activity</p>
              </div>
            </div>

            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border border-border rounded-sm p-4 transition-colors ${
                    !notification.read ? "bg-primary/5" : "bg-card"
                  }`}
                >
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10 rounded-sm flex-shrink-0">
                      <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="rounded-sm bg-secondary">
                        {notification.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold">{notification.user.name}</span>{" "}
                        <span className="text-muted-foreground">{notification.content}</span>
                        {notification.target && <span className="font-medium"> {notification.target}</span>}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 font-mono">{notification.timestamp}</p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
