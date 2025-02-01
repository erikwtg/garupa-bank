import { type IService } from "./IService.ts"
import { type IRepository } from "../../repositories/base/IRepository.ts"

export abstract class BaseService<T> implements IService<T> {
  private repository: IRepository<T>

  constructor(repository: IRepository<T>) {
    this.repository = repository
  }

  create(item: T): Promise<T[]> {
    try {
      return this.repository.create(item)
    } catch (error) {
      console.log("Erro ao criar transação: ", error)
      throw new Error("Falha ao criar transação")
    }
  }

  getAll(): Promise<T[]> {
    try {
      return this.repository.getAll()
    } catch (error) {
      console.log("Erro ao listar transações: ", error)
      throw new Error("Falha ao listar transações")
    }
  }

  getById(id: number): Promise<T[]> {
    try {
      return this.repository.getById(id)
    } catch (error) {
      console.log("Erro ao listar transação: ", error)
      throw new Error("Falha ao listar transação")
    }
  }

  update(id: number, item: T): Promise<void> {
    try {
      return this.repository.update(id, item)
    } catch (error) {
      console.log("Erro ao atualizar transação: ", error)
      throw new Error("Falha ao atualizar transação")
    }
  }
}