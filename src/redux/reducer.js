import {
    FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILED, CLEAR_USERS,
    REGISTER_USERS, REGISTER_USERS_SUCCESS, PRODUCT_HOME, PRODUCT_HOME_SUCCESS,
    PRODUCT_HOME_FAILED, CLEAR_PRODUCT_HOME, CLEAR_PRODUCT_WAREHOUSE, PRODUCT_WAREHOUSE,
    PRODUCT_WAREHOUSE_SUCCESS, PRODUCT_WAREHOUSE_FAILED, ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_QUANTITY, CLEAR_CART, LOAD_CART_FROM_LOCAL_STORAGE, ADD_TO_CART_POINT, REMOVE_FROM_CART_POINT, UPDATE_CART_QUANTITY_POINT, LOAD_CART_FROM_LOCAL_STORAGE_POINT, CLEAR_CART_POINT, SET_API_DATA, DELIVERY_ADDRESS, CLEAR_DELIVERY_ADDRESS
} from './actionTypes';

const initialState = {
    apiData: null,
    data: [],
    error: null,
    loading: false,
    isLoggedIn: false,
    home: [],
    warehouse: [],
    nextPage: 1,
    cartItems: [],
    cartItemsPoint: [],
    subAddress: null,
};

function postReducers(state = initialState, action) {
    switch (action.type) {
        case DELIVERY_ADDRESS:
            return {
                ...state,
                subAddress: action.payload,
            };
        case SET_API_DATA:
            return {
                ...state,
                apiData: action.payload,
            };
        case FETCH_USERS:
            return {
                ...state,
                loading: true,
                isLoggedIn: false
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
                isLoggedIn: true,
                nextPage: 1
            };
        case FETCH_USERS_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
                isLoggedIn: false
            };
        case REGISTER_USERS:
            return {
                ...state,
                loading: true,
                isLoggedIn: false

            };
        case REGISTER_USERS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
                isLoggedIn: true
            };
        case CLEAR_USERS:
            return {
                data: [],
                loading: false,
                isLoggedIn: false,
                nextPage: 1
            };
        case PRODUCT_HOME:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_HOME_SUCCESS:
            return {
                ...state,
                home: [...state.home, action.payload],
                loading: false,
                error: null,
                nextPage: state.nextPage + 1,
            };
        case PRODUCT_HOME_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case CLEAR_PRODUCT_HOME:
            return {
                ...state,
                home: [],
                nextPage: 1
            };
        case PRODUCT_WAREHOUSE:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_WAREHOUSE_SUCCESS:
            return {
                ...state,
                warehouse: action.payload,
                loading: false,
                error: null,
            };
        case PRODUCT_WAREHOUSE_FAILED:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case CLEAR_PRODUCT_WAREHOUSE:
            return {
                warehouse: [],
            };
        case ADD_TO_CART:
            // Tìm kiếm xem sản phẩm đã tồn tại trong giỏ hàng chưa bằng cách so sánh id
            const existingItemIndex = state.cartItems.findIndex(
                item => item?.productData?.product_id === action?.payload?.productData?.product_id
            );

            if (existingItemIndex !== -1) {
                // Sản phẩm đã tồn tại, cập nhật số lượng
                const updatedCartItems = state.cartItems.map((item, index) => {
                    if (index === existingItemIndex) {
                        return {
                            ...item,
                            quantity: item?.quantity + action?.payload?.quantity,
                        };
                    }
                    return item;
                });

                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            } else {
                // Sản phẩm không tồn tại, thêm vào giỏ hàng
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                };
            }
        case REMOVE_FROM_CART:
            // Loại bỏ sản phẩm khỏi giỏ hàng bằng cách lọc ra các sản phẩm có id khác với id được gửi lên
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item?.productData?.product_id !== action.payload),
            };
        case UPDATE_CART_QUANTITY:
            // Tìm kiếm sản phẩm cần cập nhật số lượng, sau đó cập nhật số lượng mới
            const productIndex = state.cartItems?.findIndex(item => item?.productData?.product_id === action.payload.productId);
            if (productIndex !== -1) {
                const updatedCartItems = [...state.cartItems];
                updatedCartItems[productIndex].quantity = action.payload.newQuantity;
                // Trả về trạng thái mới với danh sách sản phẩm đã được cập nhật số lượng
                return {
                    ...state,
                    cartItems: updatedCartItems,
                };
            }
        case LOAD_CART_FROM_LOCAL_STORAGE:
            return {
                ...state,
                cartItems: action.payload,
            };
        case CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }
        case ADD_TO_CART_POINT:
            // Tìm kiếm xem sản phẩm đã tồn tại trong giỏ hàng chưa bằng cách so sánh id
            const existingItemIndexPoint = state.cartItemsPoint.findIndex(
                item => item?.productData?.product_id === action?.payload?.productData?.product_id
            );

            if (existingItemIndexPoint !== -1) {
                // Sản phẩm đã tồn tại, cập nhật số lượng
                const updatedCartItems = state.cartItemsPoint.map((item, index) => {
                    if (index === existingItemIndexPoint) {
                        return {
                            ...item,
                            quantity: item?.quantity + action?.payload?.quantity,
                        };
                    }
                    return item;
                });

                return {
                    ...state,
                    cartItemsPoint: updatedCartItems,
                };
            } else {
                // Sản phẩm không tồn tại, thêm vào giỏ hàng
                return {
                    ...state,
                    cartItemsPoint: [...state.cartItemsPoint, action.payload],
                };
            }
        case REMOVE_FROM_CART_POINT:
            // Loại bỏ sản phẩm khỏi giỏ hàng bằng cách lọc ra các sản phẩm có id khác với id được gửi lên
            return {
                ...state,
                cartItemsPoint: state.cartItemsPoint.filter(item => item?.productData?.product_id !== action.payload),
            };
        case UPDATE_CART_QUANTITY_POINT:
            // Tìm kiếm sản phẩm cần cập nhật số lượng, sau đó cập nhật số lượng mới
            const productIndexPoint = state.cartItemsPoint?.findIndex(item => item?.productData?.product_id === action.payload.productId);
            if (productIndexPoint !== -1) {
                const updatedCartItems = [...state.cartItemsPoint];
                updatedCartItems[productIndexPoint].quantity = action.payload.newQuantity;
                // Trả về trạng thái mới với danh sách sản phẩm đã được cập nhật số lượng
                return {
                    ...state,
                    cartItemsPoint: updatedCartItems,
                };
            }
        case LOAD_CART_FROM_LOCAL_STORAGE_POINT:
            return {
                ...state,
                cartItemsPoint: action.payload,
            };
        case CLEAR_CART_POINT:
            return {
                ...state,
                cartItemsPoint: []
            }
        case CLEAR_DELIVERY_ADDRESS:
            return {
                ...state,
                subAddress: null
            }
        default:
            return state;
    }
}

export default postReducers;