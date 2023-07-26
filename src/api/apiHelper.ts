import axios from 'axios';

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
    .catch(err => {
      throw new Error(err.message);
    });
}
