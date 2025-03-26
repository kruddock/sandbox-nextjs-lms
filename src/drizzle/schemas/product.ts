import {
  mysqlTable,
  primaryKey,
  int,
  varchar,
  float,
  tinyint
} from 'drizzle-orm/mysql-core'

export const ProductTable = mysqlTable(
  'products',
  {
    id: int().autoincrement().notNull(),
    productName: varchar('product_name', { length: 100 }),
    unitPrice: float('unit_price'),
    discontinue: tinyint('discontinued').default(0)
  },
  (table) => [primaryKey({ columns: [table.id], name: 'products_id' })]
)
