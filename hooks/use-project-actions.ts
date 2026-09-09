"use client"

import { useState, useTransition } from "react"

export interface MockProject {
  id: string
  name: string
  owned: boolean
}

type ProjectDialog =
  | { type: "create" }
  | { type: "rename" | "delete"; project: MockProject }
  | null

export function useProjectActions() {
  const [projects, setProjects] = useState<MockProject[]>([
    { id: "commerce-platform", name: "Commerce Platform", owned: true },
    { id: "event-pipeline", name: "Event Pipeline", owned: true },
    { id: "shared-workspace", name: "Shared Workspace", owned: false },
  ])
  const [dialog, setDialog] = useState<ProjectDialog>(null)
  const [name, setName] = useState("")
  const [isLoading, startTransition] = useTransition()
  const slug = name.trim().toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")

  function openCreate() {
    setName("")
    setDialog({ type: "create" })
  }

  function openProjectDialog(type: "rename" | "delete", project: MockProject) {
    if (!project.owned) return
    setName(project.name)
    setDialog({ type, project })
  }

  function closeDialog() {
    if (!isLoading) setDialog(null)
  }

  function submit() {
    if (!dialog || isLoading || (dialog.type !== "delete" && !name.trim())) return
    if (dialog.type !== "create" && !dialog.project.owned) return

    const projectId = dialog.type === "create" ? crypto.randomUUID() : dialog.project.id
    startTransition(() => {
      setProjects((current) => {
        if (dialog.type === "create") {
          return [...current, { id: projectId, name: name.trim(), owned: true }]
        }
        if (dialog.type === "delete") {
          return current.filter((project) => project.id !== projectId)
        }
        return current.map((project) => project.id === projectId
          ? { ...project, name: name.trim() } : project)
      })
      setDialog(null)
    })
  }

  return {
    projects, dialog, name, setName, slug, isLoading, openCreate, closeDialog, submit,
    openRename: (project: MockProject) => openProjectDialog("rename", project),
    openDelete: (project: MockProject) => openProjectDialog("delete", project),
  }
}
