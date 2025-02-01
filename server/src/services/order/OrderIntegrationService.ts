import { type IOrderIntegrationService } from "./IOrderIntegrationService.ts"
import { OrderIntegrationServiceDTO } from "./OrderIntegrationServiceDTO.ts"

async function mockApiCall(item): Promise<any> {
  const newId = Math.random().toString(36).substr(2, 6)
  let isSuccess = Math.random() > 0.5

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        console.log("MOCK API LIQUIDACAO SUCESSO: ")
        resolve({
          status: 200,
          message: 'Ordem de transferencia gerada com sucesso!',
          data: {
            order_id: item.orderId
          }
        })
      }

      if (!isSuccess) {
        console.log("MOCK API LIQUIDACAO ERROO: ")
        reject({
          status: 500,
          message: 'Erro ao gerer ordem de transferencia!',
          data: {
            order_id: item.orderI
          }
        })
      }
    }, 2000)
  })
}

export class OrderIntegrationService implements IOrderIntegrationService<OrderIntegrationServiceDTO> {
  async sendOrder(item: OrderIntegrationServiceDTO): Promise<any> {
    // const response = await fetch("").then().finally()
    console.log("MOCK API LIQUIDACAO: ", item)
    return await mockApiCall(item)
  }
}