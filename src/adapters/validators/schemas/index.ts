import Joi from "joi";

export const addToCartControllerValidatorSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().required().min(1)
})

export const removeFromCartControllerValidatorSchema = Joi.object({
  quantity: Joi.number().integer().min(1)
})