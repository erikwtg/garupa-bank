export class UserEntity {
  id?: number
  name: string
  email: string
  password: string
  createdAt?: string
  updatedAt?: string

  constructor({
    id,
    name,
    email,
    password,
    createdAt,
    updatedAt
  }: {
    id?: number
    name: string
    email: string
    password: string
    createdAt?: string
    updatedAt?: string
  }) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
