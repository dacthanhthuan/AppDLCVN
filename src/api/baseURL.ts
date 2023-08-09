import {getData, multiGetData} from '../storage';
import {LOCALSTORAGE} from '../storage/direct';

export async function getUrl(path: string) {
  return await multiGetData([
    LOCALSTORAGE.main_domain,
    LOCALSTORAGE.apikey,
  ]).then(res => {
    // res[0][1] = domain, res[1][1 = api]
    return res![0][1] + path + res![1][1];
  });
}

export const base_url =
  'https://init.sees.vn/appconfig_v2/api/init?apikey=l0913lkjlkLKDKSAPPlCONFIGS';
export const login_url = `/client_init/login?apikey=`;
export const register_url = `/client_init/register?apikey=`;
export const product_list_url = '/client_product/list_all?apikey=';
export const list_address_book_url = '/location/list?apikey=';
export const new_address_book_url = '/location/new?apikey=';
export const update_address_book_url = '/location/update?apikey=';
export const set_default_address_book_url = '/location/default?apikey=';
export const list_all_city_url = '/location/city?apikey=';
export const list_district_by_city_id_url = '/location/district?apikey=';
export const list_ward_by_district_id_url = '/location/ward?apikey=';
export const detail_user_url = '/client_info/detail?apikey=';

export default {
  base_url,
  login_url,
  register_url,
  product_list_url,
  list_address_book_url,
  new_address_book_url,
  update_address_book_url,
  set_default_address_book_url,
  list_all_city_url,
  list_district_by_city_id_url,
  list_ward_by_district_id_url,
  detail_user_url,
};
