export interface IOrderIntegrationService<T> {
  sendOrder(item: T): Promise<any>
}