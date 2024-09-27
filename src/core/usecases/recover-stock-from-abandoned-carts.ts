import {DeleteCartByUserIdRepository, LoadCartsCreatedHoursAgoRepository} from "@src/ports/out";
import {RecoverStockFromAbandonedCarts, RemoveFromCart} from "@src/ports/in";

type Dependencies = {
  loadCartsCreatedHoursAgoRepository: LoadCartsCreatedHoursAgoRepository,
  removeFromCart: RemoveFromCart,
  deleteCartByUserIdRepository: DeleteCartByUserIdRepository
}

type BuildRecoverStockFromAbandonedCarts = (dependencies: Dependencies) => RecoverStockFromAbandonedCarts;

export const recoverStockFromAbandonedCarts: BuildRecoverStockFromAbandonedCarts = ({
                                                                                      loadCartsCreatedHoursAgoRepository,
                                                                                      removeFromCart,
                                                                                      deleteCartByUserIdRepository
                                                                                    }) =>
  async () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const carts = await loadCartsCreatedHoursAgoRepository(date);

    for (const cart of carts) {
      for (const item of cart.items) {
        await removeFromCart(cart.userId, item.productId, item.quantity)
      }
      await deleteCartByUserIdRepository(cart.userId);
    }
  }