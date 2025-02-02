import { type IOrderIntegrationService } from "./IOrderIntegrationService.ts"
import { OrderIntegrationServiceDTO } from "./OrderIntegrationServiceDTO.ts"

import { sendOrder } from "../../producers/orderProducer.ts"

export class OrderIntegrationService implements IOrderIntegrationService<OrderIntegrationServiceDTO> {
  async sendOrder(item: OrderIntegrationServiceDTO): Promise<any> {

    const response = await sendOrder(item)

    if (!response) {
      throw new Error(`Erro ao processar a transação`);
    }

    return response
  }
}