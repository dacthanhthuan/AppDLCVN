import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const FORM_DATA_ADD_ADDRESS = ({ toKen, cityId, districtId, wardId, Address, Mobile, fullName }) => {
    const data = new FormData();
    data.append("token", toKen)
    data.append("city_id", cityId)
    data.append("district_id", districtId)
    data.append("ward_id", wardId)
    data.append("address", Address)
    data.append("mobile", Mobile)
    data.append("fullname", fullName)
    return data
}

// GỌI API THÊM ĐỊA CHỈ
export const fetchAddAddress = async ({ toKen, cityId, districtId, wardId, Address, Mobile, fullName }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/location/new?apikey=${apiKey}`, FORM_DATA_ADD_ADDRESS({ toKen, cityId, districtId, wardId, Address, Mobile, fullName }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        // console.log('callAPI:>>', res.data.data);
        return res.data
    });
};

const FORM_DATA_LIST_ADDRESS = ({ toKen }) => {
    const data = new FormData();
    data.append("token", toKen)
    return data
}

// GỌI API DANH SÁCH ĐỊA CHỈ
export const fetchListAddress = async ({ toKen }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/location/list?apikey=${apiKey}`, FORM_DATA_LIST_ADDRESS({ toKen }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        // console.log('callAPI:>>', res.data.data);
        return res.data.data
    });
};

const FORM_DATA_UPDATE_ADDRESS = ({ toKen, ID, cityId, districtId, wardId, Address, Mobile, fullName }) => {
    const data = new FormData();
    data.append("token", toKen)
    data.append("id", ID)
    data.append("city_id", cityId)
    data.append("district_id", districtId)
    data.append("ward_id", wardId)
    data.append("address", Address)
    data.append("mobile", Mobile)
    data.append("fullname", fullName)
    return data
}

// GỌI API SỬA ĐỊA CHỈ
export const fetchUpdateAddress = async ({ toKen, ID, cityId, districtId, wardId, Address, Mobile, fullName }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/location/update?apikey=${apiKey}`, FORM_DATA_UPDATE_ADDRESS({ toKen, ID, cityId, districtId, wardId, Address, Mobile, fullName }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        // console.log('callAPI:>>', res.data.data);
        return res.data;
    });
};

const FORM_DATA_SET_DEFAULT_ADDRESS = ({ toKen, ID }) => {
    const data = new FormData();
    data.append("token", toKen)
    data.append("id", ID)
    return data
}

// GỌI API SET ĐỊA CHỈ MẶC ĐỊNH
export const fetchSetDefaultAddress = async ({ toKen, ID }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/location/default?apikey=${apiKey}`, FORM_DATA_SET_DEFAULT_ADDRESS({ toKen, ID }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        // console.log('callAPIDÈAULR:>>', res.data);
        return res.data
    });
};

const FORM_DATA_CLIENT_DETAIL = ({ toKen }) => {
    const data = new FormData();
    data.append("token", toKen)
    return data
}

// GỌI API DANH SÁCH ĐỊA CHỈ
export const fetchClientDetail = async ({ toKen }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_info/detail?apikey=${apiKey}`, FORM_DATA_CLIENT_DETAIL({ toKen }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data
    });
};

const FORM_DATA_NEW_ORDER = ({ toKen, shipName, shipMobile, shipAddress, shipNote, LItems, shipFee, addressBookId, paymentCashback, paymentCod, paymentWallet }) => {
    const data = new FormData();
    data.append("token", toKen)
    data.append("ship_name", shipName)
    data.append("ship_mobile", shipMobile)
    data.append("ship_address", shipAddress)
    data.append("ship_note", shipNote)
    data.append("lItems", JSON.stringify(LItems))
    data.append("ship_fee", shipFee)
    data.append("address_book_id", addressBookId)
    data.append("payment_cashback", paymentCashback)
    data.append("payment_cod", paymentCod)
    data.append("payment_wallet", paymentWallet)
    return data
}

// GỌI API TẠO ĐƠN HÀNG
export const fetchNewOrder = async ({ toKen, shipName, shipMobile, shipAddress, shipNote, LItems, shipFee, addressBookId, paymentCashback, paymentCod, paymentWallet }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_order/checkout?apikey=${apiKey}`, FORM_DATA_NEW_ORDER({ toKen, shipName, shipMobile, shipAddress, shipNote, LItems, shipFee, addressBookId, paymentCashback, paymentCod, paymentWallet }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_LIST_ALL_ORDER = ({ toKen, PAGE }) => {
    const data = new FormData();
    data.append("token", toKen)
    data.append("page", PAGE)
    return data
}

// GỌI API DANH SÁCH ĐƠN HÀNG
export const fetchListAllOrder = async ({ toKen, PAGE }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_order/history?apikey=${apiKey}`, FORM_DATA_LIST_ALL_ORDER({ toKen, PAGE }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_HISTORY_STEP = ({ TOKEN, TYPE, PAYMENT_TYPE, PAGE }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("type", TYPE)
    data.append("payment_type", PAYMENT_TYPE)
    data.append("page", PAGE)
    return data
}

// GỌI API DANH SÁCH ĐƠN HÀNG
export const fetchHistoryStep = async ({ TOKEN, TYPE, PAYMENT_TYPE, PAGE }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_order/history_steps?apikey=${apiKey}`, FORM_DATA_HISTORY_STEP({ TOKEN, TYPE, PAYMENT_TYPE, PAGE }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_LIST_SUPPLIER = ({ TOKEN, CITYID, KEYWORK, LAT, LNG, TAGID, FIELD, PAGE }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("city_id", CITYID)
    data.append("keyword", KEYWORK)
    data.append("latitude", LAT)
    data.append("longitude", LNG)
    data.append("tag_id", TAGID)
    data.append("field", FIELD)
    data.append("page", PAGE)
    return data
}

// GỌI API DANH SÁCH NHÀ CUNG CẤP
export const fetchListSupplier = async ({ TOKEN, CITYID, KEYWORK, LAT, LNG, TAGID, FIELD, PAGE }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/supplier_tab/list_all?apikey=${apiKey}`, FORM_DATA_LIST_SUPPLIER({ TOKEN, CITYID, KEYWORK, LAT, LNG, TAGID, FIELD, PAGE }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_PRODUCT_SUPPLIER = ({ TOKEN, KEYWORK, SUPPLIERID, PAGE }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("keyword", KEYWORK)
    data.append("supplier_id", SUPPLIERID)
    data.append("page", PAGE)
    return data
}

// GỌI API DANH SÁCH NHÀ CUNG CẤP
export const fetchProductSupplier = async ({ TOKEN, KEYWORK, SUPPLIERID, PAGE }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/supplier_tab/product_list?apikey=${apiKey}`, FORM_DATA_PRODUCT_SUPPLIER({ TOKEN, KEYWORK, SUPPLIERID, PAGE }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_LIST_BANK = ({ TOKEN }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    return data
}

// GỌI API DANH SÁCH NGÂN HÀNG ĐÃ CÓ
export const fetchListBank = async ({ TOKEN }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_wallet/banks?apikey=${apiKey}`, FORM_DATA_LIST_BANK({ TOKEN }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_FUND_HISTORY = ({ TOKEN, TYPE, PAGE }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("type", TYPE)
    data.append("page", PAGE)
    return data
}

// GỌI API LỊCH SỬ NẠP/RÚT
export const fetchFundHistory = async ({ TOKEN, TYPE, PAGE }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_wallet/fund_history?apikey=${apiKey}`, FORM_DATA_FUND_HISTORY({ TOKEN, TYPE, PAGE }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_DEPOSIT = ({ TOKEN, AMOUNT, NOTE, BANK_ID }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("amount", AMOUNT)
    data.append("note", NOTE)
    data.append("bank_id", BANK_ID)
    return data
}

// GỌI API LỊCH SỬ NẠP VÍ
export const fetchDeposit = async ({ TOKEN, AMOUNT, NOTE, BANK_ID }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_wallet/deposit?apikey=${apiKey}`, FORM_DATA_DEPOSIT({ TOKEN, AMOUNT, NOTE, BANK_ID }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_WITHDRAW = ({ TOKEN, AMOUNT, NOTE }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("amount", AMOUNT)
    data.append("note", NOTE)
    return data
}

// GỌI API LỊCH SỬ RÚT VÍ
export const fetchWithDraw = async ({ TOKEN, AMOUNT, NOTE }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_wallet/withdraw?apikey=${apiKey}`, FORM_DATA_WITHDRAW({ TOKEN, AMOUNT, NOTE }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_WALLET_CANCEL = ({ TOKEN, ID, NOTE }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("id", ID)
    data.append("note", NOTE)
    return data
}

// GỌI API XÓA LỊCH SỬ NẠP RÚT KHI ĐANG Ở TRẠNG THÁI ĐANG XỬ LÝ
export const fetchWalletCancel = async ({ TOKEN, ID, NOTE }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_wallet/cancel?apikey=${apiKey}`, FORM_DATA_WALLET_CANCEL({ TOKEN, ID, NOTE }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_WALLET_HISTORY = ({ TOKEN, PAGE, WALLET_ID }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("page", PAGE)
    data.append("wallet_id", WALLET_ID)
    return data
}

// GỌI API GIAO DỊCH GIỮA CÁC VÍ
export const fetchWalletHistory = async ({ TOKEN, PAGE, WALLET_ID }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_wallet/history?apikey=${apiKey}`, FORM_DATA_WALLET_HISTORY({ TOKEN, PAGE, WALLET_ID }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_ADD_BANK = ({ TOKEN, BANK_NAME, BANK_ACCOUNT, BANK_FULLNAME, BANK_BRANCH, BANK_CITY, PASSWORD }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("bank_name", BANK_NAME)
    data.append("bank_account", BANK_ACCOUNT)
    data.append("bank_fullname", BANK_FULLNAME)
    data.append("bank_branch", BANK_BRANCH)
    data.append("bank_city", BANK_CITY)
    data.append("password", PASSWORD)
    return data
}

// GỌI API THÊM NGÂN HÀNG
export const fetchAddBank = async ({ TOKEN, BANK_NAME, BANK_ACCOUNT, BANK_FULLNAME, BANK_BRANCH, BANK_CITY, PASSWORD }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_wallet/bank_info?apikey=${apiKey}`, FORM_DATA_ADD_BANK({ TOKEN, BANK_NAME, BANK_ACCOUNT, BANK_FULLNAME, BANK_BRANCH, BANK_CITY, PASSWORD }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_CLIENT_LIST_BANK = ({ TOKEN }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    return data
}

// GỌI API DANH SÁCH TẤT CẢ NGÂN HÀNG VN
export const fetchClientListBank = async ({ TOKEN }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_bank/list?apikey=${apiKey}`, FORM_DATA_CLIENT_LIST_BANK({ TOKEN }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_TRANSFERS = ({ TOKEN, AMOUNT, NOTE, TO, WALLET_ID, PASSWORD }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("amount", AMOUNT)
    data.append("note", NOTE)
    data.append("to", TO)
    data.append("wallet_id", WALLET_ID)
    data.append("password", PASSWORD)
    return data
}

// GỌI API CHUYỂN TIỀN
export const fetchTransfers = async ({ TOKEN, AMOUNT, NOTE, TO, WALLET_ID, PASSWORD }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_wallet/transfers?apikey=${apiKey}`, FORM_DATA_TRANSFERS({ TOKEN, AMOUNT, NOTE, TO, WALLET_ID, PASSWORD }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'

        }
    }).then(res => {
        return res.data;
    });
};

const FORM_DATA_REFERRAL_LIST = ({ TOKEN, PAGE }) => {
    const data = new FormData();
    data.append("token", TOKEN)
    data.append("page", PAGE)
    return data
}

// GỌI API DANH SÁCH THÀNH VIÊN
export const fetchReferralList = async ({ TOKEN, PAGE }) => {
    // Get Domain && APIKEY dưới Local
    const mainDomain = await AsyncStorage.getItem('domain');
    const apiKey = await AsyncStorage.getItem('apiKey');
    return await axios.post(`${mainDomain}/client_info/referral_list?apikey=${apiKey}`, FORM_DATA_REFERRAL_LIST({ TOKEN, PAGE }), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        return res.data;
    });
};
