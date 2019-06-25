import { AuthStore } from './Auth';
import { ProductsStore } from './Products';
import { ShoppingCartStore } from './ShoppingCart';
import { ProductModel } from '../models/Product';
import { productImgs } from '../constants/images';

const authStore = AuthStore.create();
const shoppingCartStore = ShoppingCartStore.create({ products: [] });
const productsStore = ProductsStore.create({
  data: [
    ProductModel.create({
      id: '1',
      name: 'Ba lô',
      imageUrl: productImgs.balo,
      unityPrice: 25.5,
    }),
    ProductModel.create({
      id: '2',
      name: 'Đồng hồ',
      imageUrl: productImgs.dongho,
      unityPrice: 1000,
    }),
    ProductModel.create({
      id: '3',
      name: 'Áo ngực',
      imageUrl: productImgs.aolot,
      unityPrice: 6.9,
    }),
    ProductModel.create({
      id: '4',
      name: 'Giày',
      imageUrl: productImgs.giay,
      unityPrice: 220.59,
    }),
    ProductModel.create({
      id: '5',
      name: 'Mắt kính',
      imageUrl: productImgs.matkinh,
      unityPrice: 150.99,
    }),
    ProductModel.create({
      id: '6',
      name: 'Quần dài',
      imageUrl: productImgs.quandai,
      unityPrice: 50.99,
    }),
    ProductModel.create({
      id: '7',
      name: 'Quần short',
      imageUrl: productImgs.quandui,
      unityPrice: 30.25,
    }),
    ProductModel.create({
      id: '8',
      name: 'Áo khoát Jean',
      imageUrl: productImgs.aokhoat,
      unityPrice: 180.5,
    }),
  ],
});

export const store = {
  authStore,
  shoppingCartStore,
  productsStore,
};

window.MobxStore = store;
