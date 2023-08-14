import apiHelper, {NETWORK} from './apiHelper';
import baseURL, {getUrl} from './baseURL';

export default async function api_new_address_book(data: FormData) {
  try {
    const url = await getUrl(baseURL.new_address_book_url);
    const res = await apiHelper(url, data);

    switch (res?.code) {
      case NETWORK.SUCCESS:
        return Promise.resolve(res?.data.data);
      case NETWORK.ERROR403:
        return Promise.reject(res?.message);
    }
  } catch (error) {
    throw error;
  }
  // return await new Promise((resolve, reject) => {
  //   getUrl(baseURL.new_address_book_url).then(url => {
  //     apiHelper(url, data).then(res => {
  //       switch (res?.code) {
  //         case NETWORK.SUCCESS:
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
