'use client'

import { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent
} from '@/components/ui/dialog'
import { LessonStatus } from '@/drizzle/schema'
import { LessonForm } from '@/features/lessons/components/LessonForm'
import { toast } from 'sonner'

type LessonFormDialogProps = {
  children: ReactNode
  sections: { id: string; name: string }[]
  defaultSectionId?: string
  lesson?: {
    id: string
    name: string
    status: LessonStatus
    youtubeVideoId: string
    description: string | null
    sectionId: string
  }
}

export const LessonFormDialog = ({
  sections,
  defaultSectionId,
  lesson,
  children
}: LessonFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const onComplete = (e: {
    error: boolean
    message: string
    entityId?: string
  }) => {
    const { error, message } = e

    if (error) {
      toast.error(message)
    }

    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {lesson == null ? 'New Lesson' : `Edit ${lesson.name}`}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <LessonForm
            sections={sections}
            onComplete={onComplete}
            lesson={lesson}
            defaultSectionId={defaultSectionId}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
