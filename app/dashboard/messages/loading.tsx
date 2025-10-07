import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"

export default function MessagesLoading() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="mb-6">
              <div className="h-9 w-48 bg-secondary rounded-sm animate-pulse mb-2" />
              <div className="h-5 w-64 bg-secondary rounded-sm animate-pulse" />
            </div>

            <div className="h-10 bg-secondary rounded-sm animate-pulse mb-4" />

            <div className="border border-border rounded-sm bg-card overflow-hidden">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-3 p-4 border-b border-border">
                  <div className="w-12 h-12 bg-secondary rounded-sm animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-32 bg-secondary rounded-sm animate-pulse" />
                    <div className="h-4 w-full bg-secondary rounded-sm animate-pulse" />
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
