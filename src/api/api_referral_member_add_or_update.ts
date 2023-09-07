import apiHelper, {NETWORK} from './apiHelper';
import baseURL, {getUrl} from './baseURL';

export default async function api_referral_member_add_or_update(
  data: FormData,
) {
  try {
    const url = await getUrl(baseURL.referral_member_add_or_update);
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
