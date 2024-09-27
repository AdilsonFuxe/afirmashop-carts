import {LoadCartByUserIdRepository} from "@src/ports/out";
import {LoadCartByUserId} from "@src/ports/in";

type Dependencies = {
  loadCartByUserIdRepository: LoadCartByUserIdRepository
}

type BuildLoadCartByUserId = (dependencies: Dependencies) => LoadCartByUserId;

export const loadCartByUserId: BuildLoadCartByUserId = ({loadCartByUserIdRepository}) => async (userId) => {
  const result = await loadCartByUserIdRepository(userId);
  if(!result) return null;
  const amount = result.items.reduce((prev, {price, quantity}) => prev + (price * quantity), 0);
  return {...result, amount};
}