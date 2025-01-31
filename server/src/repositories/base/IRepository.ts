export interface IRepository<T> {
  create(item: T): Promise<void>
  getAll(): Promise<T[]>
  getById(id: number): Promise<T[]>
  update(id: number, item: T): Promise<void>
}