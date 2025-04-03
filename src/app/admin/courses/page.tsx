import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { CourseTable } from '@/features/courses/components/CourseTable'
import Link from 'next/link'

const CoursesPage = async () => {
  return (
    <div className="">
      <PageHeader title="Courses">
        <Button asChild>
          <Link href="/admin/courses/new">New Course</Link>
        </Button>
      </PageHeader>

      <CourseTable />
    </div>
  )
}

export default CoursesPage
