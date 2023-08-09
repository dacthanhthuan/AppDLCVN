import apiHelper, {NETWORK} from './apiHelper';
import baseURL, {getUrl} from './baseURL';

export default async function api_update_address_book(data: FormData) {
  return await new Promise((resolve, reject) => {
    getUrl(baseURL.update_address_book_url).then(url => {
      apiHelper(url, data).then(res => {
        switch (res?.code) {
          case NETWORK.SUCCESS:
            resolve(res?.data.data);
            break;
          case NETWORK.ERROR403:
            reject(res?.message);
            break;
        }
      });
    });
  });
}
