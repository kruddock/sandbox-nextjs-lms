import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { Suspense } from 'react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

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
      <nav className="p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex gap-4">
          <Suspense>
            <SignedIn>
              <Link className="hover:text-blue-400" href="/courses">
                My Courses
              </Link>
              <Link className="hover:text-blue-400" href="/purchases">
                Purchase History
              </Link>
            </SignedIn>
          </Suspense>
        </div>

        <Suspense>
          <SignedOut>
            <Button asChild>
              <SignInButton>Sign In</SignInButton>
            </Button>
          </SignedOut>
        </Suspense>
      </nav>
    </header>
  )
}

export default ConsumerLayout
