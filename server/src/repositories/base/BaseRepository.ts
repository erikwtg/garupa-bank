import { eq } from "drizzle-orm"
import { db } from "../../database/config.ts"
import { type IRepository } from './IRepository.ts'

export class BaseRepository<T extends Record<string, any>> implements IRepository<T> {
  private table: any

  constructor(table: any) {
    this.table = table
  }

  async create(item: T): Promise<T[]> {
    try {
      const result = await db.insert(this.table).values(item).returning()
      return result as T[]
    } catch(error) {
      console.log("Falha ao criar no banco de dados: ", error)
      throw new Error("Falha ao criar no banco de dados.")
    }
  }

  async getAll(): Promise<T[]> {
    try {
      return await db.select().from(this.table)
    } catch(error) {
      console.log("Falha ao listar do banco de dados: ", error)
      throw new Error("Falha ao listar do banco de dados.")
    }
  }

  async getById(id: number): Promise<T[]> {
    try {
      return await db.select().from(this.table).where(eq(this.table.id, id)).limit(1)
    } catch(error) {
      console.log("Falha ao listar do banco de dados: ", error)
      throw new Error("Falha ao listar do banco de dados.")
    }
  }

  async update(id: number, item: T): Promise<void> {
    try {
      await db.update(this.table).set(item).where(eq(this.table.id, id)).returning()
    } catch(error) {
      console.log("Falha ao atualizar no banco de dados: ", error)
      throw new Error("Falha ao atualizar no banco de dados.")
    }
  }
}