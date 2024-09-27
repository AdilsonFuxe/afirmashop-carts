import {LoadCartByUserId, CreateCart, AddToCart, Validator} from "@src/ports/in";
import {Request, Response} from "express";
import {LoadProductById} from "@afirmashop/common-logic";

type Dependencies = {
  loadCartByUserId: LoadCartByUserId,
  createCart: CreateCart
  addToCart: AddToCart,
  loadProductById: LoadProductById,
  validator: Validator
}

export const addToCartController = (dependencies: Dependencies) => async (req: Request, res: Response) => {
  try {
    const {validator} = dependencies;

    const errors = validator(req.body);

    if (errors) {
      return res.status(400).json({name: 'ValidationError', errors});
    }

    const {loadCartByUserId, createCart, addToCart, loadProductById} = dependencies;
    const {quantity, productId} = req.body;

    const product = await loadProductById(productId);

    if (!product) {
      return res.status(404).json({name: 'BusinessError', errors: [`Product with id ${productId} not found`]});
    }

    if (quantity > product.count) {
      return res.status(400).json({name: 'BusinessError', error: `Product with id ${productId} without stock`});
    }

    const cart = await loadCartByUserId(req.accountId);

    if (!cart) {
      const result = await createCart({userId: req.accountId, quantity, productId});
      return res.status(200).json(result);
    }
    const result = await addToCart({userId: req.accountId, quantity, productId});
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).send({name: "InternalServerError"});
  }
}