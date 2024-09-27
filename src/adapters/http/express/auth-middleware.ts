import {authMiddleWare, Roles} from "@afirmashop/common-logic"
import {makeDbLoadAccountByToken} from "@src/adapters/factories/usecases";

export const auth = (roles?: Roles[]) => authMiddleWare({loadAccountByToken: makeDbLoadAccountByToken(), roles})