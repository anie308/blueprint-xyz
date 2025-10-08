import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Settings, Briefcase, FolderOpen } from "lucide-react"

interface StudioTabsProps {
  activeTab: 'posts' | 'members' | 'jobs' | 'projects' | 'settings'
  setActiveTab: (tab: 'posts' | 'members' | 'jobs' | 'projects' | 'settings') => void
  isOwner: boolean
}

export function StudioTabs({ activeTab, setActiveTab, isOwner }: StudioTabsProps) {
  const tabs = [
    {
      id: 'posts' as const,
      label: 'Posts',
      icon: MessageSquare,
      count: 0 // This would come from props if needed
    },
    {
      id: 'members' as const,
      label: 'Members',
      icon: Users,
      count: 0 // This would come from props if needed
    },
    {
      id: 'jobs' as const,
      label: 'Jobs',
      icon: Briefcase,
      count: 0 // This would come from props if needed
    },
    {
      id: 'projects' as const,
      label: 'Projects',
      icon: FolderOpen,
      count: 0 // This would come from props if needed
    }
  ]

  if (isOwner) {
    tabs.push({
      id: 'settings' as const,
      label: 'Settings',
      icon: Settings,
      count: 0
    })
  }

  return (
    <div className="flex items-center gap-1 border-b border-border">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => setActiveTab(tab.id)}
            className="gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            <Icon className="w-4 h-4" />
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-secondary rounded-sm">
                {tab.count}
              </span>
            )}
          </Button>
        )
      })}
    </div>
  )
}
