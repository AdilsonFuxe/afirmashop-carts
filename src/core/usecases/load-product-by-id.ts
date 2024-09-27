import {LoadProductById, LoadProductByIdRepository} from "@afirmashop/common-logic";

type Dependencies = {
  loadProductByIdRepository: LoadProductByIdRepository
}

type BuildLoadProductById = (dependencies: Dependencies) => LoadProductById;

export const loadProductById: BuildLoadProductById = ({loadProductByIdRepository}) => async (id) => await loadProductByIdRepository(id)