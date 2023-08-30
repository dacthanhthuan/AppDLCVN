import { mergeMap, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { fetchUsersSuc, fetchUsersFai, registerUsersSuc, registerUsersFai, productHome, productHomeSuccess, productHomeFailed, productWarehouseSuccess, productWarehouseFailed } from './actions';
import { FETCH_USERS, PRODUCT_HOME, PRODUCT_WAREHOUSE, REGISTER_USERS } from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Tạo FormData cho Login
const FORM_DATA_LOGIN = ({ userName, passWord }) => {
    const data = new FormData();
    data.append('username', userName);
    data.append('password', passWord);
    return data;
};

// Tạo FormData cho Login
const FORM_DATA_REGISTER = ({ fullname, email, password, number, referralBy }) => {
    const data = new FormData()
    data.append("fullname", fullname)
    data.append("email", email)
    data.append("mobile", number)
    data.append("password", password)
    data.append("referral_by", referralBy)
    return data
}

const fetchUsersEpic = action$ =>
    action$.pipe(
        ofType(FETCH_USERS),
        switchMap(async (action) => {
            try {
                // Get Domain && APIKEY dưới Local
                const mainDomain = await AsyncStorage.getItem('domain');
                const apiKey = await AsyncStorage.getItem('apiKey');

                const formData = FORM_DATA_LOGIN({ userName: action.payload?.username, passWord: action.payload?.password });
                const response = await axios.post(`${mainDomain}/client_init/login?apikey=${apiKey}`, formData, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // console.log('epic :>> ', response.data);
                if (response.data.message === 'success') {
                    return fetchUsersSuc(response.data)
                } else {
                    return fetchUsersFai(response.data.message);
                }
            } catch (error) {
                // Handle errors from the axios request
                console.error(error);
            }
        })
    );

// Đăng ký
const registerEpic = action$ =>
    action$.pipe(
        ofType(REGISTER_USERS),
        switchMap(async (action) => {
            try {
                // Get Domain && APIKEY dưới Local
                const mainDomain = await AsyncStorage.getItem('domain');
                const apiKey = await AsyncStorage.getItem('apiKey');

                const formData = FORM_DATA_REGISTER({ fullname: action?.payload?.fullname, email: action?.payload?.email, number: action?.payload?.number, password: action?.payload?.password, referralBy: action?.payload?.referralBy });
                const response = await axios.post(`${mainDomain}/client_init/register?apikey=${apiKey}`, formData, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('epic :>> ', response.data);
                if (response.data.message === 'success') {
                    console.log(response.data);
                    return registerUsersSuc(response.data)
                } else {
                    console.log(response.data.message);
                    return registerUsersFai(response.data.message);
                }
            } catch (error) {
                // Handle errors from the axios request
                console.error(error);
            }
        })
    );

const FORM_DATA_HOME = ({ pageProduct, tokenProduct, for_pointProduct }) => {
    const data = new FormData();
    data.append('page', pageProduct);
    data.append('token', tokenProduct);
    data.append('for_point', for_pointProduct);
    return data;
}

const listProductHome = action$ =>
    action$.pipe(
        ofType(PRODUCT_HOME),
        switchMap(async (action) => {
            try {
                // Get Domain && APIKEY dưới Local
                const mainDomain = await AsyncStorage.getItem('domain');
                const apiKey = await AsyncStorage.getItem('apiKey');
                const formDataHome = FORM_DATA_HOME({ pageProduct: action?.payload?.page, tokenProduct: action?.payload?.token, for_pointProduct: action?.payload?.for_point });
                const response = await axios.post(`${mainDomain}/client_product/list_all?apikey=${apiKey}`, formDataHome, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('formData: >>', JSON.stringify(formDataHome));
                if (response.data.message === 'success') {
                    return productHomeSuccess(response.data)
                } else {
                    return productHomeFailed(response.data)
                }
            } catch (error) {
                // Handle errors from the axios request
                console.error(error);
            }
        })
    );

const listProductWarehouse = action$ =>
    action$.pipe(
        ofType(PRODUCT_WAREHOUSE),
        switchMap(async (action) => {
            try {
                // Get Domain && APIKEY dưới Local
                const mainDomain = await AsyncStorage.getItem('domain');
                const apiKey = await AsyncStorage.getItem('apiKey');
                const formDataHome = FORM_DATA_HOME({ pageProduct: action?.payload?.page, tokenProduct: action?.payload?.token, for_pointProduct: action?.payload?.for_point });
                const response = await axios.post(`${mainDomain}/client_product/list_all?apikey=${apiKey}`, formDataHome, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // console.log(response.data.data.l[0].product_name);
                if (response.data.message === 'success') {
                    return productWarehouseSuccess(response.data)
                } else {
                    return productWarehouseFailed(response.data)
                }
            } catch (error) {
                // Handle errors from the axios request
                console.error(error);
            }
        })
    );

export { fetchUsersEpic, registerEpic, listProductHome, listProductWarehouse };
