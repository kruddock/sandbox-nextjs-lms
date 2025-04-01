import { cn } from '@/lib/utils'
import { AsteriskIcon } from 'lucide-react'
import { ComponentPropsWithRef } from 'react'

export const RequiredFieldIndicator = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof AsteriskIcon>) => {
  const mainCss = 'text-destructive inline size-4 align-top'

  return <AsteriskIcon {...props} className={cn(mainCss, className)} />
}
