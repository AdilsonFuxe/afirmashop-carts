import {AddToCartRepository} from "@src/ports/out";
import {AddToCart} from "@src/ports/in";

type Dependencies = {
  addToCartRepository: AddToCartRepository
}

type BuildAddToCart = (dependencies: Dependencies) => AddToCart;

export const addToCart: BuildAddToCart = ({addToCartRepository}) => async (params) => await addToCartRepository(params)