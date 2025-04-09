import { PageHeader } from '@/components/PageHeader'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCourse } from '@/features/courses/action'
import { CourseForm } from '@/features/courses/components/CourseForm'
import { notFound } from 'next/navigation'

type EditCoursePageProps = {
  params: Promise<{ courseId: string }>
}

const EditCoursePage = async ({ params }: EditCoursePageProps) => {
  const { courseId } = await params

  const course = await getCourse(courseId)

  if (course == null) return notFound()

  return (
    <div className="container my-6">
      <PageHeader title="New Course" />
      <Tabs defaultValue="lessons">
        <TabsList>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="flex flex-col gap-2">
          <Card>
            <CardHeader>Card Heading</CardHeader>

            <CardContent>Card Content</CardContent>
          </Card>
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
