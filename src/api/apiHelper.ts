import axios, {AxiosError} from 'axios';
import {NoInternetError} from '../component/NetworkError/NoInternetError';
import {TimeoutError} from '../component/NetworkError/TimeoutError';

export enum NETWORK {
  SUCCESS,
  ERROR403,
}

export default async function apiHelper(url: string, data: FormData) {
  return await axios
    .post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10000,
    })
    .then(res => {
      if (res.status === 200) {
        switch (res.data.status) {
          case 200:
            return {
              data: res.data,
              code: NETWORK.SUCCESS,
            };
          case 403:
            return {
              message: res.data.message,
              code: NETWORK.ERROR403,
            };
        }
      }
    })
    .catch((err: AxiosError) => {
      if (
        err.code === AxiosError.ECONNABORTED &&
        err.message.includes('timeout')
      ) {
        throw new TimeoutError('Lỗi kết nối, đang thử lại...');
      }

      if (err.code === AxiosError.ERR_NETWORK) {
        throw new NoInternetError('Vấn đề về kết nối internet...');
      }
    });
}
