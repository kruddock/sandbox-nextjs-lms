'use client'

import { ComponentPropsWithRef, ReactNode, useTransition } from 'react'
import { Button } from './ui/button'
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from './ui/alert-dialog'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'

type ActionButtonProps = {
  action: () => Promise<{ error: boolean; message: string }>
  confirm?: boolean
} & Omit<ComponentPropsWithRef<typeof Button>, 'onClick'>

export const ActionButton = ({
  action,
  confirm,
  ...props
}: ActionButtonProps) => {
  const [isLoading, startTransition] = useTransition()

  const performAction = () => {
    startTransition(async () => {
      const { error, message } = await action()

      error ? toast.error(message) : toast.success(message)
    })
  }

  if (confirm) {
    return (
      <AlertDialog open={isLoading ? true : undefined}>
        <AlertDialogTrigger asChild>
          <Button {...props} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={performAction}>
              <LoadingTextSwap isLoading={isLoading}>Yes</LoadingTextSwap>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Button {...props} disabled={isLoading} onClick={performAction}>
      <LoadingTextSwap isLoading={isLoading}>{props.children}</LoadingTextSwap>
    </Button>
  )
}

const LoadingTextSwap = ({
  isLoading,
  children
}: {
  isLoading: boolean
  children: ReactNode
}) => {
  const mainCss = 'col-start-1 col-end-2 row-start-1 row-end-2'
  const mainCssPlus = `${mainCss} text-center`

  return (
    <div className="grid items-center justify-items-center">
      <div className={cn(mainCss, isLoading ? 'invisible' : 'visible')}>
        {children}
      </div>
      <div className={cn(mainCssPlus, isLoading ? 'visible' : 'invisible')}>
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  )
}
