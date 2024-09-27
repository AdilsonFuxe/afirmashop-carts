import {
  CreateCartRepository,
  AddToCartRepository,
  RemoveFromCartRepository,
  LoadCartByUserIdRepository,
  LoadCartsCreatedHoursAgoRepository,
  DeleteCartByUserIdRepository
} from '@src/ports/out';
import {Types} from "mongoose";
import {MongoHelper, saveDataRepository} from "@afirmashop/common-logic";
import CartModel from "@src/adapters/db/mongoose/models/cart-model";


export const createCartRepository: CreateCartRepository = async (params) => {
  const _id = new Types.ObjectId();
  return await saveDataRepository({
    _id,
    userId: params.userId,
    items: [{productId: params.productId, quantity: params.quantity}]
  }, CartModel)
}

export const addToCartRepository: AddToCartRepository = async (params) => {
  const cart = await CartModel.findOne({userId: params.userId, 'items.productId': params.productId}).lean();

  if (cart) {
    const result = await CartModel.findOneAndUpdate({
      userId: params.userId,
      'items.productId': params.productId
    }, {$inc: {'items.$.quantity': params.quantity}}, {new: true}).lean();
    return MongoHelper.serialize(result);
  }

  const result = await CartModel.findOneAndUpdate({
    userId: params.userId
  }, {$push: {items: {productId: params.productId, quantity: params.quantity}}}, {new: true}).lean();
  return MongoHelper.serialize(result);
}

export const removeFromCartRepository: RemoveFromCartRepository = async (userId, productId, quantity) => {
  const result = await CartModel.findOneAndUpdate({
    userId,
    'items.productId': productId
  }, {$inc: {'items.$.quantity': -quantity}}, {new: true}).lean();
  return MongoHelper.serialize(result);
}

export const loadCartByUserIdRepository: LoadCartByUserIdRepository = async (userId) => {
  const result = await CartModel.findOne({userId}).populate({
    path: 'items.productId',
    select: 'name price'
  }).lean();

  if (result) {
    const items = result.items.map((item: any) => ({
      id: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    return MongoHelper.serialize({...result, items})
  }

  return MongoHelper.serialize(result);
}

export const loadCartsCreatedHoursAgoRepository: LoadCartsCreatedHoursAgoRepository = async (date) =>
  await CartModel.find({
    createdAt: {$lte: date},
    items: {$exists: true, $not: {$size: 0}},
  })

export const deleteCartByUserIdRepository: DeleteCartByUserIdRepository = async (userId: string) => {
  await CartModel.findOneAndDelete({userId});
}