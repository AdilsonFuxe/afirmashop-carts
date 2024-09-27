import {CreateCartRepository} from "@src/ports/out";
import {CreateCart} from "@src/ports/in";

type Dependencies = {
  createCartRepository: CreateCartRepository
}

type BuildCreateCart = (dependencies: Dependencies) => CreateCart;

export const createCart: BuildCreateCart = ({createCartRepository}) => async (params) => await createCartRepository(params)