import type { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Lester Bangs Bangs</h1>
        <p className="app-subtitle">Gonzo music criticism from beyond the grave</p>
      </header>
      <main className="app-main">
        {children}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} BangsBangs - In memory of Lester Bangs</p>
      </footer>
    </div>
  )
}
