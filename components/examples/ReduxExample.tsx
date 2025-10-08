"use client"

import { useAuth, useUI, useApiError } from "@/lib/store/hooks"
import { useGetProjectsQuery, useCreateProjectMutation } from "@/lib/store/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ReduxExample() {
  // Auth state and actions
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  
  // UI state and actions
  const { sidebarOpen, toggleSidebar, addToast } = useUI()
  
  // API hooks
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useGetProjectsQuery({
    page: 1,
    limit: 5
  })
  
  const [createProject, { isLoading: creatingProject }] = useCreateProjectMutation()
  
  // Error handling
  const { handleError } = useApiError()
  
  const handleCreateProject = async () => {
    try {
      const result = await createProject({
        title: "Sample Project",
        description: "A sample project created with Redux",
        images: [],
        tags: ["sample", "redux", "demo"]
      }).unwrap()
      
      addToast({
        type: "success",
        title: "Project Created",
        description: "Your project has been created successfully!"
      })
    } catch (error) {
      handleError(error, "create project")
    }
  }
  
  const handleToggleSidebar = () => {
    toggleSidebar()
    addToast({
      type: "info",
      title: "Sidebar Toggled",
      description: `Sidebar is now ${sidebarOpen ? "closed" : "open"}`
    })
  }
  
  if (authLoading) {
    return <div>Loading authentication...</div>
  }
  
  if (!isAuthenticated) {
    return <div>Please log in to see this example</div>
  }
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Redux Integration Example</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* User Info */}
          <div>
            <h3 className="font-semibold">Current User:</h3>
            <p>Name: {user?.fullName}</p>
            <p>Email: {user?.email}</p>
            <p>Username: {user?.username}</p>
          </div>
          
          {/* UI State */}
          <div>
            <h3 className="font-semibold">UI State:</h3>
            <p>Sidebar Open: {sidebarOpen ? "Yes" : "No"}</p>
            <Button onClick={handleToggleSidebar} variant="outline" size="sm">
              Toggle Sidebar
            </Button>
          </div>
          
          {/* API Data */}
          <div>
            <h3 className="font-semibold">Projects (from API):</h3>
            {projectsLoading ? (
              <p>Loading projects...</p>
            ) : projectsError ? (
              <p className="text-red-600">Error loading projects</p>
            ) : (
              <div>
                <p>Found {projects?.data?.length || 0} projects</p>
                <Button 
                  onClick={handleCreateProject} 
                  disabled={creatingProject}
                  size="sm"
                  className="mt-2"
                >
                  {creatingProject ? "Creating..." : "Create Sample Project"}
                </Button>
              </div>
            )}
          </div>
          
          {/* Toast Example */}
          <div>
            <h3 className="font-semibold">Toast Notifications:</h3>
            <div className="flex gap-2">
              <Button 
                onClick={() => addToast({ type: "success", title: "Success!", description: "This is a success message" })}
                size="sm"
                variant="outline"
              >
                Success Toast
              </Button>
              <Button 
                onClick={() => addToast({ type: "error", title: "Error!", description: "This is an error message" })}
                size="sm"
                variant="outline"
              >
                Error Toast
              </Button>
              <Button 
                onClick={() => addToast({ type: "info", title: "Info", description: "This is an info message" })}
                size="sm"
                variant="outline"
              >
                Info Toast
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
