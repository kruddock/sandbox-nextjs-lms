import { db } from '@/drizzle/db'
import { ProductTable } from '@/drizzle/schema'

export default async function Home() {
  const products = await db.select().from(ProductTable)

  const x = 1

  return (
    <div>
      {products.map((i) => (
        <div className="flex" key={i.id}>
          <div>{i.description}</div>
          <div>{i.priceInDollars}</div>
        </div>
      ))}
    </div>
  )
}
