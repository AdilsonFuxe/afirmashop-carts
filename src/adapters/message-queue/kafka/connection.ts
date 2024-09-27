import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'category-svc',
  brokers: ['localhost:9092'],
});

export default kafka;
