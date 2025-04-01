import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  children?: ReactNode
  className?: string
}

export const PageHeader = ({ title, children, className }: PageHeaderProps) => {
  const mainCss = 'mb-8 flex gap-4 items-center justify-between'

  return (
    <div className={cn(mainCss, className)}>
      <h1 className="text-2xl font-semibold">{title}</h1>
      {children && <div>{children}</div>}
    </div>
  )
}
