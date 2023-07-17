import axios from 'axios'

export const getDomain = () => {
    const options = {
        method: 'GET',
        url: 'https://init.sees.vn/appconfig_v2/api/init?apikey=l0913lkjlkLKDKSAPPlCONFIGS',
    };
    return axios.request(options);
};