import apiHelper, {NETWORK} from './apiHelper';
import baseURL, {getUrl} from './baseURL';

export default async function api_set_default_address_book(data: FormData) {
  return await new Promise((resolve, reject) => {
    getUrl(baseURL.set_default_address_book_url).then(url => {
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
