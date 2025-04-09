import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/PageHeader'
import { CourseTable } from '@/features/courses/components/CourseTable'

const CoursesPage = async () => {
  return (
    <div className="">
      <PageHeader title="Courses">
        <Button asChild>
          <Link href="/admin/courses/create">New Course</Link>
        </Button>
      </PageHeader>

      <CourseTable />
    </div>
  )
}

export default CoursesPage
