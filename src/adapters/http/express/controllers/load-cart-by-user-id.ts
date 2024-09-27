import {LoadCartByUserId} from "@src/ports/in";
import {Request, Response} from "express";

type Dependencies = {
  loadCartByUserId: LoadCartByUserId
}

export const loadCartByUserIdController = (dependencies: Dependencies) => async (req: Request, res: Response) => {
  try {
    const {loadCartByUserId} = dependencies;
    const cart = await loadCartByUserId(req.accountId);
    if (!cart) {
      return res.status(404).json({error: `User Without cart`});
    }
    return res.status(200).json(cart);
  } catch (e) {
    console.error(e);
    return res.status(500).send({error: "Internal server error"});
  }
}