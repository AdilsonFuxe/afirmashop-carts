import {jwtDecryptAdapter, loadAccountByToken, Topics} from "@afirmashop/common-logic";
import {loadAccountByTokenRepository} from "@src/adapters/db/mongoose/repositories/account-repository";
import {addToCart, createCart, loadCartByUserId, loadProductById, removeFromCart, recoverStockFromAbandonedCarts} from "@src/core/usecases";
import {loadProductByIdRepository} from "@src/adapters/db/mongoose/repositories/product-repository";
import {
  addToCartRepository,
  createCartRepository,
  loadCartByUserIdRepository,
  removeFromCartRepository,
  deleteCartByUserIdRepository,
  loadCartsCreatedHoursAgoRepository
} from "@src/adapters/db/mongoose/repositories/carts-repositories";
import {sendEventDecorator} from "@src/adapters/decorators";
import {kafkaSendEventAdapter} from "@src/adapters/message-queue/kafka/kafka-send-event-adapter";

export const makeDbLoadAccountByToken = () => loadAccountByToken({
  decrypt: jwtDecryptAdapter(process.env.JWT_SECRET),
  loadAccountByTokenRepository
});

export const makeDbLoadProductById = () => loadProductById({loadProductByIdRepository});

export const makeDbCreateCart = () => sendEventDecorator(createCart({createCartRepository}), async (req, res) => {
  kafkaSendEventAdapter(Topics.cartsEvents, "add-to-cart", JSON.stringify(req[0]));
  return res;
});

export const makeDbAddToCart = () => sendEventDecorator(addToCart({addToCartRepository}), async (req, res) => {
  kafkaSendEventAdapter(Topics.cartsEvents, "add-to-cart", JSON.stringify(req[0]));
  return res;
});

export const makeDbRemoveFromCart = () => sendEventDecorator(removeFromCart({removeFromCartRepository}), async (req, res) => {
  const userId = req[0];
  const productId = req[1];
  const quantity = req[2];
  kafkaSendEventAdapter(Topics.cartsEvents, "remove-from-cart", JSON.stringify({userId, productId, quantity}));
  return res;
})

export const makeDbLoadCartByUserId = () => loadCartByUserId({loadCartByUserIdRepository})

export const makeDbRecoverStockFromAbandonedCarts = recoverStockFromAbandonedCarts({
  removeFromCart: makeDbRemoveFromCart(),
  deleteCartByUserIdRepository,
  loadCartsCreatedHoursAgoRepository
})