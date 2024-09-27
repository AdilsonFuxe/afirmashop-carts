import CategoryModel from "@src/adapters/db/mongoose/models/category-model";
import {
  findAllRepository,
  findByIdAndUpdateRepository,
  findByIdRepository,
  saveDataRepository,
  Status
} from "@afirmashop/common-logic";
import categoryModel from "@src/adapters/db/mongoose/models/category-model";

export const createCategoryRepository = async (params) => await saveDataRepository(params, categoryModel);
export const loadCategoriesRepository = async () => await findAllRepository({status: Status.active}, CategoryModel);

export const loadCategoryByIdRepository = async (id) => findByIdRepository(id, CategoryModel)

export const deleteCategoryByIdRepository = async (id) => await findByIdAndUpdateRepository(id, {status: Status.deleted}, CategoryModel);

export const updateCategoryByIdRepository = async (id, {name}) => await findByIdAndUpdateRepository(id, {name}, CategoryModel);
