import {RemoveFromCartRepository} from "@src/ports/out";
import {RemoveFromCart} from "@src/ports/in";

type Dependencies = {
  removeFromCartRepository: RemoveFromCartRepository
}

type BuildRemoveFromCart = (dependencies: Dependencies) => RemoveFromCart;

export const removeFromCart: BuildRemoveFromCart = ({removeFromCartRepository}) => async (userId, productId, quantity) => await removeFromCartRepository(userId, productId, quantity);