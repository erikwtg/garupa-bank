export interface IService<T> {
  create(item: T): Promise<T[]>
  getAll(): Promise<T[]>
  getById(id: number): Promise<T[]>
  update(id: number, item: T): Promise<void>
}