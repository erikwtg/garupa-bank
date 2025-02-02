import amqp from "amqplib"
import { v4 as uuidv4 } from "uuid"
import { config } from "../config/rabbitmq.config.ts"

export async function sendOrder(message) {
  const conn = await amqp.connect(`amqp://garupa:garupa@${config.host}`)
  const channel = await conn.createChannel()

  const replyQueue = await channel.assertQueue('', { exclusive: true, durable: true })
  
  const correlationId = uuidv4();
  
  return new Promise((resolve) => {
    channel.consume(
      replyQueue.queue,
      (msg) => {
        if (msg.properties.correlationId === correlationId) {
          resolve(msg.content.toString())
          setTimeout(() => {
            conn.close()
          }, 500);
        }
      },
      { noAck: true }
    );

    channel.sendToQueue(config.queueName, Buffer.from(JSON.stringify(message)), {
      correlationId,
      replyTo: replyQueue.queue,
    });
  });
}