import kafka from "@src/adapters/message-queue/kafka/connection";
import {
  addAccountRepository, signoutRepository,
  updateAccessTokenRepository
} from "@src/adapters/db/mongoose/repositories/account-repository";
import {Topics} from "@afirmashop/common-logic";
import {
  createCategoryRepository,
  deleteCategoryByIdRepository, updateCategoryByIdRepository
} from "@src/adapters/db/mongoose/repositories/categories-repository";
import {
  createProductRepository, decreaseProductStockRepository,
  deleteProductByIdRepository, increaseProductStockRepository, updateProductByIdRepository
} from "@src/adapters/db/mongoose/repositories/product-repository";

export const subscribe = async () => {
  const authConsumer = kafka.consumer({groupId: 'carts-auth'});
  await authConsumer.subscribe({topics: ['authentication-events'], fromBeginning: true});

  const cartsConsumer = kafka.consumer({groupId: 'carts-carts'});
  await cartsConsumer.subscribe({topics: [Topics.cartsEvents], fromBeginning: true});

  const categoriesConsumer = kafka.consumer({groupId: 'carts-categories'});
  await categoriesConsumer.subscribe({topic: Topics.categoriesEvents, fromBeginning: true});

  const productsConsumer = kafka.consumer({groupId: 'carts-products'});
  await productsConsumer.subscribe({topic: Topics.productsEvents, fromBeginning: true});



  await cartsConsumer.run({
    eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
      const data = JSON.parse(message.value.toString());
      const key = message.key.toString();
      switch (key) {
        case 'add-to-cart':
          decreaseProductStockRepository(data.productId, parseInt(data.quantity));
          break
        case 'remove-from-cart':
          increaseProductStockRepository(data.productId, parseInt(data.quantity));
          break;
      }
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers,
      });
    }
  })

  await productsConsumer.run({
    eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
      const data = JSON.parse(message.value.toString());
      const key = message.key.toString();
      switch (key) {
        case 'create-product':
          data._id = data.id;
          delete data.id;
          createProductRepository(data);
          break
        case 'delete-category':
          deleteProductByIdRepository(data.id);
          break
        case 'update-product':
          updateProductByIdRepository(data.id, data);
          break;
        case 'increase-product':
          increaseProductStockRepository(data.productId, data.quantity);
          break
        case 'decrease-product':
          decreaseProductStockRepository(data.productId, data.quantity);
          break;
      }
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers,
      });
    }
  })

  await categoriesConsumer.run({
    eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
      const data = JSON.parse(message.value.toString());
      const key = message.key.toString();
      switch (key) {
        case 'create-category':
          data._id = data.id;
          delete data.id;
          createCategoryRepository(data);
          break
        case 'delete-category':
          deleteCategoryByIdRepository(data.id);
          break
        case 'update-category':
          updateCategoryByIdRepository(data.id, data);
          break;
      }
      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers,
      });
    }
  })

  await authConsumer.run({
    eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
      const data = JSON.parse(message.value.toString());
      const key = message.key.toString();
      switch (key) {
        case 'sign-up':
          data._id = data.id;
          delete data.id;
          addAccountRepository(data);
          break;
        case 'sign-in':
          updateAccessTokenRepository(data.email, data.accessToken);
          break;
        case 'sign-out':
          signoutRepository(data.accountId, data.accessToken);
          break;
      }

      console.log({
        key: message.key.toString(),
        value: message.value.toString(),
        headers: message.headers,
      });
    },
  });
}