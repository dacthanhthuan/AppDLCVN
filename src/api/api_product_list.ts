import {storeData} from '../storage';
import apiHelper, {NETWORK} from './apiHelper';
import baseURL, {getUrl} from './baseURL';
import {LOCALSTORAGE} from '../storage/direct';

export default async function api_product_list(data: FormData) {
  return await new Promise((resolve, reject) => {
    getUrl(baseURL.product_list_url).then(url => {
      apiHelper(url, data).then(res => {
        switch (res?.code) {
          case NETWORK.SUCCESS:
            //store user data
            storeData(LOCALSTORAGE.product_list, res.data);

            resolve(res?.data);
            break;
          case NETWORK.ERROR403:
            reject(res?.message);
            break;
        }
      });
    });
  });
}
