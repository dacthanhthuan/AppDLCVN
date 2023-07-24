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

export default {base_url, login_url, register_url};
