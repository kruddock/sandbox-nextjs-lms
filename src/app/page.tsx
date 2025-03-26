import Image from 'next/image'
import { db } from '@/drizzle/db'
import { ProductTable } from '@/drizzle/schema'

export default async function Home() {
  const products = await db.select().from(ProductTable)

  const x = 1

  return (
    <div>
      {products.map((i) => (
        <div key={i.id}>
          <div>{i.productName}</div>
        </div>
      ))}
    </div>
  )
}
