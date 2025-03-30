type AuthLayoutProps = {
  children: Readonly<React.ReactNode>
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {children}
    </div>
  )
}

export default AuthLayout
