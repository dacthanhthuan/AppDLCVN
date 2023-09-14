import {CART} from './types';

export type AddProduct2CartData = {
  product: {};
  quantity: number;
  pType: string;
};

export type RCProductFromCartData = {
  productId: string;
  quantity: number;
  pType: string;
};

export const addProduct2Cart = (data: AddProduct2CartData) => ({
  type: CART.ADD,
  payload: data,
});

export const mergeProductData = (data: any) => ({
  type: CART.MERGE,
  payload: data,
});

export const rmProductFromCart = (data: RCProductFromCartData) => ({
  type: CART.REMOVE,
  payload: data,
});

export const changeProductQuantity = (data: RCProductFromCartData) => ({
  type: CART.CHANGE_QTY,
  payload: data,
});

export const removeAllCartProduct = {
  type: CART.REMOVE_ALL,
};

type DataCanUpdate = {
  quantity: number;
  priceInCart: number;
  decrementInCart: number;
};

export const updateProductCart = (
  data: DataCanUpdate,
  productId: string,
  pType: string,
) => ({
  type: CART.UPDATE,
  payload: {
    data,
    productId,
    pType,
  },
});
