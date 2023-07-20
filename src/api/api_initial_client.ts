import {multiStoreData} from '../storage';
import apiHelper, {NETWORK} from './apiHelper';
import baseURL from './baseURL';

export default async function api_initial_client(data: FormData) {
  return await new Promise((resolve, reject) => {
    apiHelper(baseURL.base_url, data).then(res => {
      switch (res?.code) {
        case NETWORK.SUCCESS:
          //Store data and call to getdomain and api in callback
          multiStoreData([
            ['main_domain', res.data.main_domain],
            ['apikey', res.data.apikey],
          ]);

          resolve(res?.data);
        case NETWORK.ERROR403:
          reject(res?.message);
      }
    });
  });
}
