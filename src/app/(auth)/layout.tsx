type AuthLayoutProps = {
  children: Readonly<React.ReactNode>
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  )
}
