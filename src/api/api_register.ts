import {storeData} from '../storage';
import apiHelper, {NETWORK} from './apiHelper';
import baseURL, {getUrl} from './baseURL';

export default async function api_register(data: FormData) {
  return await new Promise((resolve, reject) => {
    getUrl(baseURL.register_url).then(url => {
      apiHelper(url, data).then(res => {
        switch (res?.code) {
          case NETWORK.SUCCESS:
            //store user data when register success
            storeData('user', res.data);

            resolve(res?.data);
          case NETWORK.ERROR403:
            reject(res?.message);
        }
      });
    });
  });
}
