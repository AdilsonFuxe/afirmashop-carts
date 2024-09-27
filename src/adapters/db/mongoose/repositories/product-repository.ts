
import {
  findAllRepository,
  findByIdAndUpdateRepository,
  findByIdRepository,
  saveDataRepository,
  Status,
  CreateProductRepository,
  LoadProductsRepository,
  LoadProductByIdRepository,
  DeleteProductByIdRepository,
  UpdateProductByIdRepository
} from "@afirmashop/common-logic"
import ProductModel from "@src/adapters/db/mongoose/models/product-model";

export const createProductRepository: CreateProductRepository = async(params) => await saveDataRepository(params, ProductModel)
export const loadProductsRepository: LoadProductsRepository = async () => await findAllRepository({status: Status.active}, ProductModel);
export const loadProductByIdRepository: LoadProductByIdRepository = async (id) => await findByIdRepository(id, ProductModel);
export const deleteProductByIdRepository: DeleteProductByIdRepository = async (id) => await findByIdAndUpdateRepository(id, {status: Status.deleted}, ProductModel);
export const updateProductByIdRepository: UpdateProductByIdRepository = async (id, data) => await findByIdAndUpdateRepository(id, data, ProductModel);
export const increaseProductStockRepository = async (id, quantity) => await findByIdAndUpdateRepository(id, {$inc: {count: quantity}}, ProductModel);
export const decreaseProductStockRepository = async (id, quantity) => await findByIdAndUpdateRepository(id, {$inc: {count: -quantity}}, ProductModel);