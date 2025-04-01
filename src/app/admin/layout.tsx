import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/Logo'

type AdminLayoutProps = {
  children: Readonly<React.ReactNode>
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto my-6">{children}</div>
    </>
  )
}

const Navbar = () => {
  return (
    <header className="h-16 shadow bg-background z-10">
      <nav className="p-4 grid grid-cols-[auto_1fr] gap-4 items-center">
        <div className="flex gap-4">
          <Link href="/admin">
            <Logo />
          </Link>

          <Badge>Administrator</Badge>
        </div>

        <div className="flex gap-4">
          <Link className="hover:text-blue-400" href="/admin/courses">
            Courses
          </Link>

          <Link className="hover:text-blue-400" href="/admin/products">
            Products
          </Link>

          <Link className="hover:text-blue-400" href="/admin/sales">
            Sales
          </Link>

          <div className="ml-auto size-10 self-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: { width: '100%', height: '100%' }
                }
              }}
            />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default AdminLayout
