import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CoursesPage = async () => {
  return (
    <div className="">
      <PageHeader title="Courses">
        <Button asChild>
          <Link href="/admin/courses/new">New Course</Link>
        </Button>
      </PageHeader>

      <div>Course Table Display</div>
    </div>
  )
}

export default CoursesPage
