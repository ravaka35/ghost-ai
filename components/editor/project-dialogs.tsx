import { useRef } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { useProjectActions } from "@/hooks/use-project-actions"

interface ProjectDialogsProps {
  actions: ReturnType<typeof useProjectActions>
}

export function ProjectDialogs({ actions }: ProjectDialogsProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const { dialog, name, setName, slug, isLoading, closeDialog, submit } = actions
  const isDelete = dialog?.type === "delete"
  const title = isDelete ? "Delete Project" : dialog?.type === "rename" ? "Rename Project" : "Create Project"

  return (
    <Dialog open={dialog !== null} onOpenChange={(open) => { if (!open) closeDialog() }}>
      <DialogContent
        className="rounded-3xl border border-surface-border bg-surface text-copy-primary"
        initialFocus={isDelete ? cancelRef : inputRef}
        showCloseButton={!isLoading}
      >
        <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); submit() }} aria-busy={isLoading}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="break-words text-copy-muted">
              {dialog?.type === "delete"
                ? `Delete “${dialog.project.name}”? This action cannot be undone.`
                : dialog?.type === "rename"
                  ? `Rename “${dialog.project.name}”.`
                  : "Give your architecture workspace a name."}
            </DialogDescription>
          </DialogHeader>
          {!isDelete && (
            <div className="grid gap-2">
              <label htmlFor="project-name" className="text-sm text-copy-secondary">Project name</label>
              <Input
                ref={inputRef}
                id="project-name"
                name="projectName"
                className="rounded-xl"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isLoading}
                required
                aria-describedby={dialog?.type === "create" ? "project-slug" : undefined}
              />
              {dialog?.type === "create" && (
                <p id="project-slug" className="break-all text-xs text-copy-muted" aria-live="polite">
                  Slug: <span className="font-mono text-copy-secondary">{slug || "—"}</span>
                </p>
              )}
            </div>
          )}
          <DialogFooter className="rounded-b-3xl border-surface-border bg-elevated">
            <Button ref={cancelRef} type="button" className="rounded-xl" variant="outline" disabled={isLoading} onClick={closeDialog}>Cancel</Button>
            <Button type="submit" className="rounded-xl" variant={isDelete ? "destructive" : "default"} disabled={isLoading || (!isDelete && !name.trim())}>
              {isLoading ? "Saving…" : title}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
