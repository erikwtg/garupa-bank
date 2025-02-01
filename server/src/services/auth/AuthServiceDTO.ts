export class AuthServiceDTO {
  userId?: number
  name: string
  email: string
  password: string

  constructor({
    userId,
    name,
    email,
    password
  }: {
    userId?: number
    name: string
    email: string
    password: string
  }) {
    this.userId = userId
    this.name = name
    this.email = email
    this.password = password
  }
}
