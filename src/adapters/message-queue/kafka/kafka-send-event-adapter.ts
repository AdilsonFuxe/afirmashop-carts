import kafka from "@src/adapters/message-queue/kafka/connection";
import {SendEvent} from "@afirmashop/common-logic";

export const kafkaSendEventAdapter: SendEvent = async (topic, key, data) => {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic,
    messages: [
      {key, value: data},
    ],
  });

  await producer.disconnect();
}