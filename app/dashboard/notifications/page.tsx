"use client"

import { useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { BellIcon } from "@/components/icons"
import { useGetNotificationsQuery } from "@/lib/store/api"
import { ErrorState } from "@/components/dashboard/ErrorStates"
import { EmptyState } from "@/components/dashboard/EmptyStates"
import { formatDistanceToNow } from "date-fns"

export default function NotificationsPage() {
  // Fetch notifications from API
  const {
    data: notificationsData,
    isLoading,
    error,
    refetch
  } = useGetNotificationsQuery({
    page: 1,
    limit: 50,
    unreadOnly: false
  }, {
    pollingInterval: 30000, // 30 seconds for real-time updates
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const notificationsList = (notificationsData as any)?.data || []

  // Transform API notification data
  const notifications = useMemo(() => {
    return notificationsList.map((notif: any) => {
      const sender = notif.sender || {}
      const senderName = typeof sender === 'string'
        ? 'User'
        : sender.fullName || sender.name || 'User'
      const senderUsername = typeof sender === 'string'
        ? 'user'
        : sender.username || 'user'
      const senderAvatar = typeof sender === 'string'
        ? undefined
        : sender.profilePicture || sender.profilePictureUrl || sender.avatar

      // Map notification types to display text
      const typeMap: Record<string, { content: string; target?: string }> = {
        like: { content: 'appreciated your', target: notif.entityType?.toLowerCase() || 'item' },
        comment: { content: 'commented on your', target: notif.entityType?.toLowerCase() || 'item' },
        follow: { content: 'started following you' },
        mention: { content: 'mentioned you in a', target: notif.entityType?.toLowerCase() || 'post' },
        job_application: { content: 'applied to your job', target: notif.entityType || 'Job' }
      }

      const typeInfo = typeMap[notif.type] || { content: 'notified you about', target: notif.entityType }

      return {
        id: notif._id || notif.id,
        type: notif.type,
        user: {
          name: senderName,
          username: senderUsername,
          avatar: senderAvatar,
        },
        content: typeInfo.content,
        target: typeInfo.target,
        timestamp: notif.createdAt 
          ? formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })
          : 'Recently',
        read: notif.read || false,
      }
    })
  }, [notificationsList])

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

            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="border border-border rounded-sm p-4 bg-card">
                    <div className="flex gap-3">
                      <Skeleton className="w-10 h-10 rounded-sm" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <ErrorState
                title="Unable to load notifications"
                message="We couldn't fetch your notifications. Please try again."
                onRetry={() => refetch()}
              />
            ) : notifications.length > 0 ? (
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
            ) : (
              <EmptyState
                icon={BellIcon}
                title="No notifications"
                description="You're all caught up! New notifications will appear here."
              />
            )}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
