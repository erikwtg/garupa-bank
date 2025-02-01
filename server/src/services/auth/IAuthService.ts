export interface IAuthService<T> {
  register(data: T): Promise<{ userId: number | undefined }>
  login(email: string, password: string): Promise<{ token: string, userId: number | undefined}>
}