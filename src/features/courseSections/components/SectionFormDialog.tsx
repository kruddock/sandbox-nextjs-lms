'use client'

import { CourseSectionStatus } from '@/drizzle/schema'
import { ReactNode, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { SectionForm } from './SectionForm'

type SectionFormDialogProps = {
  courseId: string
  children: ReactNode
  section?: {
    id: string
    name: string
    status: CourseSectionStatus
  }
}

export const SectionFormDialog = ({
  courseId,
  children,
  section
}: SectionFormDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {section == null ? 'New Section' : `Edit ${section.name}`}
          </DialogTitle>
        </DialogHeader>

        <div>
          <SectionForm
            section={section}
            courseId={courseId}
            onSuccess={() => setIsOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
