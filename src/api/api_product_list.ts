import {storeData} from '../storage';
import apiHelper, {NETWORK} from './apiHelper';
import baseURL, {getUrl} from './baseURL';
import {LOCALSTORAGE} from '../storage/direct';

export default async function api_product_list(data: FormData) {
  try {
    const url = await getUrl(baseURL.product_list_url);
    const res = await apiHelper(url, data);

    switch (res?.code) {
      case NETWORK.SUCCESS:
        // get for_point and page from form data.
        const for_point: any = data
          .getParts()
          .filter((item: any) => item.fieldName == 'for_point');
        const page: any = data
          .getParts()
          .filter((item: any) => item.fieldName == 'page');

        if (for_point[0].string == 0 && page[0].string == 1) {
          //store product list data
          storeData(LOCALSTORAGE.product_list, res.data);
        } else if (for_point[0].string == 1 && page[0].string == 1) {
          //store change point list data
          storeData(LOCALSTORAGE.change_point_list, res.data);
        }

        return Promise.resolve(res?.data);
      case NETWORK.ERROR403:
        return Promise.reject(res?.message);
    }
  } catch (error) {
    throw error;
  }
  // return await new Promise((resolve, reject) => {
  //   getUrl(baseURL.product_list_url).then(url => {
  //     apiHelper(url, data).then(res => {
  //       switch (res?.code) {
  //         case NETWORK.SUCCESS:
  //           // get for_point and page from form data.
  //           const for_point: any = data
  //             .getParts()
  //             .filter((item: any) => item.fieldName == 'for_point');
  //           const page: any = data
  //             .getParts()
  //             .filter((item: any) => item.fieldName == 'page');

  //           if (for_point[0].string == 0 && page[0].string == 1) {
  //             //store product list data
  //             storeData(LOCALSTORAGE.product_list, res.data);
  //           } else if (for_point[0].string == 1 && page[0].string == 1) {
  //             //store change point list data
  //             storeData(LOCALSTORAGE.change_point_list, res.data);
  //           }

  //           resolve(res?.data);
  //           break;
  //         case NETWORK.ERROR403:
  //           reject(res?.message);
  //           break;
  //       }
  //     });
  //   });
  // });
}
