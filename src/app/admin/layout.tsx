import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ReactNode } from 'react'

type AdminLayoutProps = {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

function Navbar() {
  return (
    <header className="flex h-16 shadow bg-background z-10">
      <nav className="px-4 flex gap-4 container">
        <div className="mr-auto flex items-center gap-2">
          <Link className="text-lg hover:underline" href="/admin">
            <div className="size-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              KR
            </div>
          </Link>
          <Badge>Admin</Badge>
        </div>
      </nav>
    </header>
  )
}
