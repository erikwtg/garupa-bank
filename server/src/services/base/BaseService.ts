import { type IService } from "./IService.ts"
import { type IRepository } from "../../repositories/base/IRepository.ts"

export abstract class BaseService<T> implements IService<T> {
  private repository: IRepository<T>

  constructor(repository: IRepository<T>) {
    this.repository = repository
  }

  create(item: T): void {
    this.repository.create(item);
  }

  getAll(): Promise<T[]> {
    return this.repository.getAll();
  }

  getById(id: number): Promise<T[]> {
    return this.repository.getById(id)
  }

  update(id: number, item: T): void {
    this.repository.update(id, item);
  }
}