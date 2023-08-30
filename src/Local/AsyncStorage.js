import AsyncStorage from "@react-native-async-storage/async-storage";

export const SAVE_DOMAIN = 'SAVE_DOMAIN';
export const SAVE_APIKEY = 'SAVE_APIKEY';
export const SAVE_DATA = 'SAVE_DATA';
export const SAVE_USERNAME = 'SAVE_USERNAME';
export const SAVE_ISLOGGEDIN = 'SAVE_ISLOGGEDIN';
export const SAVE_PRODUCT_HOME = 'SAVE_PRODUCT_HOME';
export const SAVE_PRODUCT_CART = 'SAVE_PRODUCT_CART';
export const SAVE_PRODUCT_CART_POINT = 'SAVE_PRODUCT_CART_POINT';

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (error) {
        console.log("Error get saving data:", error);
        return error;
    }
}

export const localData = async (data) => {
    try {
        await AsyncStorage.setItem(SAVE_DATA, JSON.stringify(data))
    } catch (error) {
        console.log("Error saving data:", error);
    }
}

export const localUsername = async (username) => {
    try {
        await AsyncStorage.setItem(SAVE_USERNAME, JSON.stringify(username))
    } catch (error) {
        console.log("Error saving username:", error);
    }
}

export const localIsLoggedIn = async (isLoggedIn) => {
    try {
        await AsyncStorage.setItem(SAVE_ISLOGGEDIN, JSON.stringify(isLoggedIn))
    } catch (error) {
        console.log("Error saving isLoggedIn:", error);
    }
}
export const localProductHome = async (productHome) => {
    try {
        await AsyncStorage.setItem(SAVE_PRODUCT_HOME, JSON.stringify(productHome))
    } catch (error) {
        console.log("Error saving productHome:", error);
    }
}

export const localSaveProductCart = async (productCart) => {
    try {
        await AsyncStorage.setItem(SAVE_PRODUCT_CART, JSON.stringify(productCart))
    } catch (error) {
        console.log("Error saving productCart:", error);
    }
}

export const localSaveProductCartPoint = async (productCart) => {
    try {
        await AsyncStorage.setItem(SAVE_PRODUCT_CART_POINT, JSON.stringify(productCart))
    } catch (error) {
        console.log("Error saving productCart:", error);
    }
}

export const getProductCartLocal = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return key != null ? JSON.parse(value) : null;
        // const cartItemsJSON = await AsyncStorage.getItem(key);
        // return key != null ? JSON.parse(cartItemsJSON) : null;
    } catch (error) {
        console.log('Error get product cart items:', error);
    }
}


