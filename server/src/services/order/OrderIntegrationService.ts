import { type IOrderIntegrationService } from "./IOrderIntegrationService.ts"
import { OrderIntegrationServiceDTO } from "./OrderIntegrationServiceDTO.ts"

export class OrderIntegrationService implements IOrderIntegrationService<OrderIntegrationServiceDTO> {
  async sendOrder(item: OrderIntegrationServiceDTO): Promise<any> {
    const response = await fetch('http://wiremock:8080/api/mock', { // Ajuste a URL conforme seu WireMock
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })

    if (!response.ok) {
      throw new Error(`Erro ao fazer transação: ${response.statusText}`);
    }

    const mock = await response.json();

    return await mock
  }
}