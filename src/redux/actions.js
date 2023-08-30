
import { FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILED, CLEAR_USERS, REGISTER_USERS, REGISTER_USERS_SUCCESS, REGISTER_USERS_FAILED, PRODUCT_HOME, PRODUCT_HOME_SUCCESS, CLEAR_PRODUCT_HOME, PRODUCT_WAREHOUSE, PRODUCT_WAREHOUSE_SUCCESS, PRODUCT_WAREHOUSE_FAILED, CLEAR_PRODUCT_WAREHOUSE, PRODUCT_HOME_FAILED, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CLEAR_CART, LOAD_CART_FROM_LOCAL_STORAGE, CLEAR_CART_POINT, LOAD_CART_FROM_LOCAL_STORAGE_POINT, UPDATE_CART_QUANTITY_POINT, REMOVE_FROM_CART_POINT, ADD_TO_CART_POINT, SET_API_DATA, CLEAR_DELIVERY_ADDRESS } from './actionTypes';

export const setApiData = (data) => ({
    type: SET_API_DATA,
    payload: data,
});

export const fetchUsers = (username, password) => ({
    type: FETCH_USERS,
    payload: { username, password },
});

export const fetchUsersSuc = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
});

export const fetchUsersFai = (error) => ({
    type: FETCH_USERS_FAILED,
    payload: error,
});
export const registerUser = (fullname, email, number, password, repeatPassword, referralBy) => ({
    type: REGISTER_USERS,
    payload: { fullname, email, number, password, repeatPassword, referralBy },
});

export const registerUsersSuc = (users) => ({
    type: REGISTER_USERS_SUCCESS,
    payload: users,
});

export const registerUsersFai = (error) => ({
    type: REGISTER_USERS_FAILED,
    payload: error,
});

export const clearUsers = () => ({
    type: CLEAR_USERS,
});

export const productHome = (page, token, for_point) => ({
    type: PRODUCT_HOME,
    payload: { page, token, for_point },
});


export const productHomeSuccess = (listProduct) => ({
    type: PRODUCT_HOME_SUCCESS,
    payload: listProduct,
});

export const productHomeFailed = (error) => ({
    type: PRODUCT_HOME_FAILED,
    payload: error,
});

export const clearproductHome = () => ({
    type: CLEAR_PRODUCT_HOME,
});

export const productWarehouse = (page, token, for_point) => ({
    type: PRODUCT_WAREHOUSE,
    payload: { page, token, for_point },
});

export const productWarehouseSuccess = (listWarehouse) => ({
    type: PRODUCT_WAREHOUSE_SUCCESS,
    payload: listWarehouse,
});

export const productWarehouseFailed = (error) => ({
    type: PRODUCT_WAREHOUSE_FAILED,
    payload: error,
});

export const clearproductWarehouse = () => ({
    type: CLEAR_PRODUCT_WAREHOUSE,
});

export const addToCart = (productData, quantity) => ({
    type: ADD_TO_CART,
    payload: { productData, quantity }
});

export const removeFromCart = (productId) => ({
    type: REMOVE_FROM_CART,
    payload: productId,
});

export const updateCartQuantity = (productId, newQuantity) => ({
    type: UPDATE_CART_QUANTITY,
    payload: { productId, newQuantity },
});

export const loadCartFromLocalStorage = (cartItems) => ({
    type: LOAD_CART_FROM_LOCAL_STORAGE,
    payload: cartItems,
});

export const clearCart = () => ({
    type: CLEAR_CART,
});

export const addToCartPoint = (productData, quantity) => ({
    type: ADD_TO_CART_POINT,
    payload: { productData, quantity }
});

export const removeFromCartPoint = (productId) => ({
    type: REMOVE_FROM_CART_POINT,
    payload: productId,
});

export const updateCartQuantityPoint = (productId, newQuantity) => ({
    type: UPDATE_CART_QUANTITY_POINT,
    payload: { productId, newQuantity },
});

export const loadCartFromLocalStoragePoint = (cartItemsPoint) => ({
    type: LOAD_CART_FROM_LOCAL_STORAGE_POINT,
    payload: cartItemsPoint,
});

export const clearCartPoint = () => ({
    type: CLEAR_CART_POINT,
});

export const deliveryAddress = (dataAddress) => ({
    type: CLEAR_CART_POINT,
    payload: dataAddress
});
export const cleardeliveryAddress = () => ({
    type: CLEAR_DELIVERY_ADDRESS,
});

