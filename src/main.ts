
process.on('uncaughtException', (error) => {
  console.error('Exceção não capturada:', error);
  // Opções:
  // 1. Log do erro para análise posterior.
  // 2. Encerrar a aplicação, se necessário.
  //process.exit(1); // Use com cuidado.
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Rejeição não tratada:', reason);
  // Log do erro ou ação apropriada
});

import 'module-alias/register';
import 'dotenv/config'

import {subscribe} from "@src/adapters/message-queue/kafka/subscribe";
import {start} from "@src/adapters/http/express/server";
import {recoveryStockCron} from "@src/adapters/cron-jobs";


subscribe()
start();
recoveryStockCron();
