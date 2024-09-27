import {Application, Router} from 'express';
import {auth} from "@src/adapters/http/express/auth-middleware";
import {
  makeRemoveFromCartController,
  makeLoadCartByUserIDController,
  makeAddToCartController
} from "@src/adapters/http/express/factories";

export default (app: Application) => {
  const router = Router();

  router.get('/carts', auth([]), makeLoadCartByUserIDController())
  router.post('/carts', auth([]), makeAddToCartController())
  router.delete('/carts/:productId/:quantity', auth([]), makeRemoveFromCartController())


  app.use('/api/v1', router);
}