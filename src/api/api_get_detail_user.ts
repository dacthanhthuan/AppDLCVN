import {storeData} from '../storage';
import {LOCALSTORAGE} from '../storage/direct';
import apiHelper, {NETWORK} from './apiHelper';
import baseURL, {getUrl} from './baseURL';

export default async function api_get_detail_user(data: FormData) {
  try {
    const url = await getUrl(baseURL.detail_user_url);
    const res = await apiHelper(url, data);
    switch (res?.code) {
      case NETWORK.SUCCESS:
        // store user to local
        storeData(LOCALSTORAGE.user, res.data.data);

        return Promise.resolve(res?.data.data);
      case NETWORK.ERROR403:
        return Promise.reject(res?.message);
    }
  } catch (error) {
    throw error;
  }
  // return await new Promise((resolve, reject) => {
  //   getUrl(baseURL.detail_user_url).then(url => {
  //     apiHelper(url, data).then(res => {
  //       switch (res?.code) {
  //         case NETWORK.SUCCESS:
  //           // store user to local
  //           storeData(LOCALSTORAGE.user, res.data.data);

  //           resolve(res?.data.data);
  //           break;
  //         case NETWORK.ERROR403:
  //           reject(res?.message);
  //           break;
  //       }
  //     });
  //   });
  // });
}
