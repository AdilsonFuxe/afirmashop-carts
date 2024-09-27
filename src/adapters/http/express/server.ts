import app from "@src/adapters/http/express/app";
import { MongoHelper } from '@afirmashop/common-logic';

const PORT = process.env.PORT;

export const start = async () => {
  await MongoHelper.connect(process.env.MONGO_URL)
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}