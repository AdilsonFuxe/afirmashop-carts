import {LoadCartByUserId, RemoveFromCart, Validator} from "@src/ports/in";
import {Request, Response} from "express";
import {LoadProductById} from "@afirmashop/common-logic";

type Dependencies = {
  loadCartByUserId: LoadCartByUserId,
  removeFromCart: RemoveFromCart,
  loadProductById: LoadProductById,
  validator: Validator
}

export const removeFromCartController = (dependencies: Dependencies) => async (req: Request, res: Response) => {
  try {
    const {validator, loadCartByUserId, removeFromCart, loadProductById} = dependencies;
    const {quantity, productId} = req.params;
    const errors = validator({quantity});

    if (errors) {
      return res.status(400).json({name: 'ValidationError', errors});
    }

    const cart = await loadCartByUserId(req.accountId);

    if (!cart) {
      return res.status(404).json({name: 'BusinessError', errors: [`User Without cart`]});
    }

    const product = await loadProductById(productId);

    if (!product) {
      return res.status(404).json({name: 'BusinessError', errors: [`Product with id ${productId} not found`]});
    }

    const result = await removeFromCart(req.accountId, productId, parseInt(quantity));
    return res.status(200).json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).send({error: "Internal server error"});
  }
}