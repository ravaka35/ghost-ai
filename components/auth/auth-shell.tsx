import type { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
}

const features = [
  "Shape ideas in a focused workspace",
  "Create faster with AI assistance",
  "Keep every project organized",
];

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="grid min-h-dvh bg-base lg:grid-cols-[minmax(0,1fr)_minmax(32rem,1fr)]">
      <section className="hidden border-r border-surface-border bg-surface px-12 py-10 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-copy-primary">
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-brand"
          />
          Ghost AI
        </div>

        <div className="max-w-md pb-8">
          <p className="text-sm font-medium text-brand">Creative work, uninterrupted.</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-copy-primary">
            Turn your ideas into finished work.
          </h1>
          <p className="mt-4 text-sm leading-6 text-copy-secondary">
            A calm, collaborative editor with the tools you need to move from a
            first thought to a polished result.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-copy-muted">
            {features.map((feature) => (
              <li className="flex items-center gap-3" key={feature}>
                <span aria-hidden="true" className="size-1 rounded-full bg-brand" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-copy-faint">A workspace by Ghost AI</p>
      </section>

      <section className="flex min-h-dvh items-center justify-center px-4 py-8 sm:px-8">
        {children}
      </section>
    </main>
  );
}
