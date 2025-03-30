import Link from 'next/link'
import { Logo } from '@/components/Logo'

type ConsumerLayoutProps = {
  children: Readonly<React.ReactNode>
}

const ConsumerLayout = ({ children }: ConsumerLayoutProps) => {
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
      <nav className="p-4 grid grid-cols-[auto_1fr] gap-4">
        <Link href="/">
          <Logo />
        </Link>
      </nav>
    </header>
  )
}

export default ConsumerLayout
