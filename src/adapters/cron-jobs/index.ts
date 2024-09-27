import cron from 'node-cron';
import {makeDbRecoverStockFromAbandonedCarts} from "@src/adapters/factories/usecases";
export const recoveryStockCron = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log("Recovery Stock");
    await makeDbRecoverStockFromAbandonedCarts();
  });
}