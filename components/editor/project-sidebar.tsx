"use client"

import { Pencil, Plus, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { MockProject } from "@/hooks/use-project-actions"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  onNewProject?: () => void
  projects: MockProject[]
  onRename: (project: MockProject) => void
  onDelete: (project: MockProject) => void
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
  projects,
  onRename,
  onDelete,
}: ProjectSidebarProps) {
  function projectList(owned: boolean) {
    const items = projects.filter((project) => project.owned === owned)
    if (!items.length) {
      return <EmptyProjects message={owned ? "Your projects will appear here." : "Projects shared with you will appear here."} />
    }
    return (
      <ul className="space-y-2">
        {items.map((project) => (
          <li key={project.id} className="flex items-center gap-2 rounded-xl border border-surface-border bg-elevated p-2">
            <span className="min-w-0 flex-1 break-words text-sm text-copy-primary">{project.name}</span>
            {project.owned && (
              <div className="flex shrink-0 gap-1">
                <Button className="rounded-xl" size="icon" variant="ghost" aria-label={`Rename ${project.name}`} onClick={() => onRename(project)}>
                  <Pencil className="size-4" />
                </Button>
                <Button className="rounded-xl" size="icon" variant="destructive" aria-label={`Delete ${project.name}`} onClick={() => onDelete(project)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            )}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close project sidebar backdrop"
          className="fixed inset-x-0 top-14 bottom-0 z-30 bg-base/70 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
    <aside
      aria-hidden={!isOpen}
      aria-label="Projects"
      className="fixed top-14 bottom-0 left-0 z-40 flex w-80 max-w-[calc(100%-2rem)] flex-col border-r border-surface-border bg-surface/95 shadow-2xl backdrop-blur transition-transform duration-200 ease-out"
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
        <TabsContent className="min-h-0 overflow-y-auto" value="my-projects">
          {projectList(true)}
        </TabsContent>
        <TabsContent className="min-h-0 overflow-y-auto" value="shared">
          {projectList(false)}
        </TabsContent>
      </Tabs>

      <div className="shrink-0 border-t border-surface-border p-4">
        <Button className="w-full" onClick={onNewProject}>
          <Plus data-icon="inline-start" />
          New Project
        </Button>
      </div>
    </aside>
    </>
  )
}
