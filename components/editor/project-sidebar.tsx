"use client"

import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  onNewProject?: () => void
}

interface EmptyProjectsProps {
  message: string
}

function EmptyProjects({ message }: EmptyProjectsProps) {
  return (
    <div className="flex h-full min-h-48 items-center justify-center rounded-2xl border border-dashed border-surface-border px-6 text-center">
      <p className="text-sm text-copy-muted">{message}</p>
    </div>
  )
}

export function ProjectSidebar({
  isOpen,
  onClose,
  onNewProject,
}: ProjectSidebarProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      aria-label="Projects"
      className="fixed top-14 bottom-0 left-0 z-40 flex w-80 flex-col border-r border-surface-border bg-surface/95 shadow-2xl backdrop-blur transition-transform duration-200 ease-out"
      data-state={isOpen ? "open" : "closed"}
      inert={!isOpen}
      style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-surface-border px-4">
        <h2 className="font-heading text-base font-semibold text-copy-primary">
          Projects
        </h2>
        <Button
          aria-label="Close project sidebar"
          onClick={onClose}
          size="icon"
          variant="ghost"
        >
          <X className="size-5" />
        </Button>
      </div>

      <Tabs className="min-h-0 flex-1 gap-4 p-4" defaultValue="my-projects">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        <TabsContent className="min-h-0" value="my-projects">
          <EmptyProjects message="Your projects will appear here." />
        </TabsContent>
        <TabsContent className="min-h-0" value="shared">
          <EmptyProjects message="Projects shared with you will appear here." />
        </TabsContent>
      </Tabs>

      <div className="shrink-0 border-t border-surface-border p-4">
        <Button className="w-full" onClick={onNewProject}>
          <Plus data-icon="inline-start" />
          New Project
        </Button>
      </div>
    </aside>
  )
}
