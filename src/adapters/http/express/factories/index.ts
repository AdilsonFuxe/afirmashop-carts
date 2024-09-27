import {
  addToCartController,
  removeFromCartController,
  loadCartByUserIdController
} from "@src/adapters/http/express/controllers";
import {
  makeDbAddToCart,
  makeDbCreateCart,
  makeDbLoadCartByUserId,
  makeDbLoadProductById, makeDbRemoveFromCart
} from "@src/adapters/factories/usecases";
import {joiValidator} from "@src/adapters/validators/joi-validator";
import {
  addToCartControllerValidatorSchema,
  removeFromCartControllerValidatorSchema
} from "@src/adapters/validators/schemas";


export const makeAddToCartController = () => addToCartController({
  addToCart: makeDbAddToCart(),
  createCart: makeDbCreateCart(),
  loadProductById: makeDbLoadProductById(),
  loadCartByUserId: makeDbLoadCartByUserId(),
  validator: joiValidator(addToCartControllerValidatorSchema)
})

export const makeRemoveFromCartController = () => removeFromCartController({
  loadProductById: makeDbLoadProductById(),
  loadCartByUserId: makeDbLoadCartByUserId(),
  removeFromCart: makeDbRemoveFromCart(),
  validator: joiValidator(removeFromCartControllerValidatorSchema)
})

export const makeLoadCartByUserIDController = () => loadCartByUserIdController({
  loadCartByUserId: makeDbLoadCartByUserId()
})