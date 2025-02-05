export interface IAuthService<T> {
  register(data: T): Promise<{ user: object | undefined }>
  login(email: string, password: string): Promise<{ token: string, user: object | undefined}>
}