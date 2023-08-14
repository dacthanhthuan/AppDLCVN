import {storeData} from '../storage';
import {LOCALSTORAGE} from '../storage/direct';
import apiHelper, {NETWORK} from './apiHelper';
import baseURL, {getUrl} from './baseURL';

export default async function api_get_order_list_all(data: FormData) {
  try {
    const url = await getUrl(baseURL.order_list_all);
    const res = await apiHelper(url, data);
    switch (res?.code) {
      case NETWORK.SUCCESS:
        // get page from form data
        const page: any = data
          .getParts()
          .filter((item: any) => item.fieldName == 'page');

        if (page[0].string == 1) {
          // store order list data
          storeData(LOCALSTORAGE.order_list, res.data);
        }

        return Promise.resolve(res?.data.data);

      case NETWORK.ERROR403:
        return Promise.reject(res?.message);
    }
  } catch (error) {
    throw error;
  }
  // return await new Promise((resolve, reject) => {
  //   getUrl(baseURL.order_list_all).then(url => {
  //     apiHelper(url, data).then(res => {
  //       switch (res?.code) {
  //         case NETWORK.SUCCESS:
  //           // get page from form data
  //           const page: any = data
  //             .getParts()
  //             .filter((item: any) => item.fieldName == 'page');

  //           if (page[0].string == 1) {
  //             // store order list data
  //             storeData(LOCALSTORAGE.order_list, res.data);
  //           }

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
