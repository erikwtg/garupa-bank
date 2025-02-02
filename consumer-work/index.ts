import amqp from "amqplib"
import { config } from "./config/rabbitmq.config.ts"

async function iniciarConsumidor() {
  const conn = await amqp.connect(`amqp://garupa:garupa@${config.host}`);
  const channel = await conn.createChannel();

  channel.assertQueue(config.queueName, { durable: false });
  channel.prefetch(1);

  channel.consume(config.queueName, async (msg) => {
    const ordem = JSON.parse(msg.content.toString());

    try {
      const response = await fetch('http://wiremock:8080/api/mock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(ordem)
      })

      if (!response.ok) {
        throw new Error(`Erro ao fazer transação: ${response.statusText}`);
      }

      channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(response)), {
        correlationId: msg.properties.correlationId,
      });

      channel.ack(msg);
    } catch (error) {
      console.error('Erro ao processar ordem no consumidor:', error);

      channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(error)), {
        correlationId: msg.properties.correlationId,
      });

      channel.ack(msg);
    }
  });
}

iniciarConsumidor();