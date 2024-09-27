import {Cart, CartItem} from "@afirmashop/common-logic";

export type CreateCartRepository = (params: CreateCartRepository.Params) => Promise<CreateCartRepository.Response>;

export namespace CreateCartRepository {
  export type Params = CartItem & { userId: string }
  export type Response = Cart
}


export type AddToCartRepository = (params: AddToCartRepository.Params) => Promise<AddToCartRepository.Response>;

export namespace AddToCartRepository {
  export type Params = CartItem & { userId: string }
  export type Response = Cart
}

export type RemoveFromCartRepository = (userId: string, productId: string, quantity: number) => Promise<Cart>;

export type LoadCartByUserIdRepository = (userId: string) => Promise<LoadCartByUserIdRepository.Response>;

export namespace LoadCartByUserIdRepository {
  type Item = {
    id: string,
    name: string,
    price: number,
    quantity: number,
    createdAt: Date,
    updatedAt: Date
  }

  export type Response = {
    id: string;
    userId: string;
    items: Item[];
    createdAt: Date;
    updatedAt: Date;
  }
}


export type LoadCartsCreatedHoursAgoRepository = (date: Date) => Promise<Cart[]>

export type DeleteCartByCartIdRepository = (id: string) => Promise<void>;
export type DeleteCartByUserIdRepository = (userId: string) => Promise<void>;