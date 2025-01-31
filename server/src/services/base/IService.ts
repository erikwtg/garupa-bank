export interface IService<T> {
  create(item: T): void
  getAll(): Promise<T[]>
  getById(id: number): Promise<T[]>
  update(id: number, item: T): void
}