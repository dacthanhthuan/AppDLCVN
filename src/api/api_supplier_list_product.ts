import apiHelper, {NETWORK} from './apiHelper';
import baseURL, {getUrl} from './baseURL';

export default async function api_supplier_list_product(data: FormData) {
  try {
    const url = await getUrl(baseURL.supplier_list_product);
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
}