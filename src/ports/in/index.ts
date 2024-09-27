import {Cart, CartItem} from "@afirmashop/common-logic";
import * as assert from "assert";

export type CreateCart = (params: CreateCart.Params) => Promise<CreateCart.Response>;

export namespace CreateCart {
  export type Params = CartItem & { userId: string }
  export type Response = Cart
}


export type AddToCart = (params: AddToCart.Params) => Promise<AddToCart.Response>;

export namespace AddToCart {
  export type Params = CartItem & { userId: string }
  export type Response = Cart
}

export type RemoveFromCart = (userId: string, productId: string, quantity: number) => Promise<Cart>;

export type LoadCartByUserId = (userId: string) => Promise<LoadCartByUserId.Response>;

export  namespace LoadCartByUserId {
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
    amount: number
    createdAt: Date;
    updatedAt: Date;
  }
}

export type Validator = (data: any) => null | string[];

export type RecoverStockFromAbandonedCarts = () => Promise<void>;