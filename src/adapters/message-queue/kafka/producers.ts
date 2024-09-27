import {Producer} from "kafkajs";
import kafka from "@src/adapters/message-queue/kafka/connection";

 const Producer = function () {
  this.producer = null;

  this.getProduce = async function (): Promise<Producer>  {
    if (!this.producer) {
      this.producer = kafka.producer();
      await this.producer.connect();
    }
    return this.producer;
  }
}

export default  new Producer();