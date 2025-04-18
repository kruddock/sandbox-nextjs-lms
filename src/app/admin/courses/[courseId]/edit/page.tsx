import { EyeClosed, PlusIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCourse } from '@/features/courses/action'
import { CourseForm } from '@/features/courses/components/CourseForm'
import { SectionFormDialog } from '@/features/courseSections/components/SectionFormDialog'
import { SortableSectionList } from '@/features/courseSections/components/SortableSectionList'
import { SortableLessonList } from '@/features/lessons/components/SortableLessonList'
import { cn } from '@/lib/utils'
import { LessonFormDialog } from '@/features/lessons/components/LessonFormDialog'

type EditCoursePageProps = {
  params: Promise<{ courseId: string }>
}

const EditCoursePage = async ({ params }: EditCoursePageProps) => {
  const { courseId } = await params

  const course = await getCourse(courseId)

  if (course == null) return notFound()

  return (
    <div className="container my-6">
      <PageHeader title={course.name} />
      <Tabs defaultValue="lessons">
        <TabsList>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="flex flex-col gap-2">
          <Card>
            <CardHeader className="flex items-center flex-row justify-between">
              <CardTitle>Sections</CardTitle>
              <SectionFormDialog courseId={course.id}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon /> New Section
                  </Button>
                </DialogTrigger>
              </SectionFormDialog>
            </CardHeader>

            <CardContent>
              <SortableSectionList
                courseId={course.id}
                sections={course.courseSections}
              />
            </CardContent>
          </Card>

          <hr className="my-2" />

          <div className="px-6 space-y-6">
            {course.courseSections.map((section) => (
              <Card key={section.id}>
                <CardHeader className="flex items-center justify-between gap-4">
                  <CardTitle
                    className={cn(
                      'px-4 flex items-center gap-2',
                      section.status === 'private' && 'text-muted-foreground'
                    )}
                  >
                    {section.status === 'private' && <EyeClosed />}{' '}
                    {section.name}
                  </CardTitle>
                  <LessonFormDialog
                    defaultSectionId={section.id}
                    sections={course.courseSections}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <PlusIcon /> New Lesson
                      </Button>
                    </DialogTrigger>
                  </LessonFormDialog>
                </CardHeader>
                <CardContent>
                  <SortableLessonList
                    sections={course.courseSections}
                    lessons={section.lessons}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="flex flex-col gap-2">
          <Card>
            <CardContent>
              <CourseForm course={course} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EditCoursePage
