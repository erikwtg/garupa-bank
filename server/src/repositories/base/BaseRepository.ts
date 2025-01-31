import { eq } from "drizzle-orm"
import { db } from "../../database/config.ts"
import { type IRepository } from './IRepository.ts'
import { transactions } from "../../database/schema.ts"

export class BaseRepository<T extends Record<string, any>> implements IRepository<T> {
  private table: any

  constructor(table: any) {
    this.table = table
  }

  async create(item: T): Promise<void> {
    await db.insert(this.table).values(item).returning()
  }

  async getAll(): Promise<T[]> {
    return await db.select().from(this.table)
  }

  async getById(id: number): Promise<T[]> {
    return await db.select().from(this.table).where(eq(this.table.id, id)).limit(1)
  }

  async update(id: number, item: T): Promise<void> {
    await db.update(this.table).set(item).where(eq(transactions.id, id)).returning()
  }
}