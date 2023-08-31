export enum INITIAL {
  START = 'client/Initial_API_Start',
  END = 'client/Initial_API_End',
  FAIL = 'client/Initial_API_Fail',
}

export enum LOGIN {
  START = 'client/Login_Start',
  END = 'client/Login_Success',
  FAIL = 'client/Login_Fail',
}

export enum REGISTER {
  START = 'client/Register_Start',
  END = 'client/Register_End',
  FAIL = 'client/Register_Fail',
}

export enum CLEAR {
  USER = 'clear/User_Data',
  APP = 'clear/App_Data',
}

export enum PRODUCT_LIST {
  START = 'client/Product_List_Start',
  END = 'client/Product_List_End',
  FAIL = 'client/Product_List_Fail',
  CLEAR = 'client/Product_List_Clear',
}

export enum CHANGE_POINT_LIST {
  START = 'client/Change_Point_List_Start',
  END = 'client/Change_Point_List_End',
  FAIL = 'client/Change_Point_List_Fail',
  CLEAR = 'client/Change_Point_List_Clear',
}

export enum CART {
  ADD = 'Cart_Add',
  REMOVE = 'Cart_Remove',
  CHANGE_QTY = 'Cart_Change_Quantity',
  MERGE = 'Cart_Merge',
  REMOVE_ALL = 'Cart_Remove_All',
}

export enum SEARCH_RECENT {
  ADD = 'Search_Recent_Add',
  REMOVE = 'Search_Recent_Remove',
  MERGE = 'Search_Recent_Merge',
}

export enum ADDRESS_BOOK {
  LIST_ALL_START = 'List_all_Start',
  LIST_ALL_END = 'List_all_End',
  LIST_ALL_FAIL = 'List_all_Fail',

  NEW_START = 'New_Start',
  NEW_END = 'New_End',
  NEW_FAIL = 'New_Fail',

  UPDATE_START = 'Update_Start',
  UPDATE_END = 'Update_End',
  UPDATE_FAIL = 'Update_Fail',

  SET_DEFAULT_START = 'Set_Default_Start',
  SET_DEFAULT_END = 'Set_Default_End',
  SET_DEFAULT_FAIL = 'Set_Default_Fail',

  ADDRESS_CLEAR = 'Address_Book_Clear',
}

export enum LOCATION {
  LIST_CITY_START = 'List_City_Start',
  LIST_CITY_END = 'List_City_End',
  LIST_CITY_FAIL = 'List_City_Fail',

  LIST_DISTRICT_START = 'List_District_Start',
  LIST_DISTRICT_END = 'List_District_End',
  LIST_DISTRICT_FAIL = 'List_District_Fail',

  LIST_WARD_START = 'List_Ward_Start',
  LIST_WARD_END = 'List_Ward_End',
  LIST_WARD_FAIL = 'List_Ward_Fail',
}

export enum GET_DETAIL {
  USER = 'Get_Detail_User_Start',
  PRODUCT = 'Get_Detail_Product_Start',
}

export enum ORDER {
  NEW_ORDER_START = 'New_Order_Start',
  NEW_ORDER_END = 'New_Order_End',
  NEW_ORDER_FAIL = 'New_Order_Fail',

  LIST_ORDER_START = 'List_Order_Start',
  LIST_ORDER_END = 'List_Order_End',
  LIST_ORDER_FAIL = 'List_Order_Fail',
  LIST_ORDER_CLEAR = 'List_Order_Clear',

  DELETE_ORDER_START = 'Delete_Order_Start',
  DELETE_ORDER_END = 'Delete_Order_End',
  DELETE_ORDER_FAIL = 'Delete_Order_Fail',
}

export enum ERROR {
  NORMAL_RISE = 'ERROR-NORMAL-RISE',
  NORMAL_HIDE = 'ERROR-NORMAL-HIDE',
  NETWORK_RISE = 'ERROR-NETWORK-RISE',
  NETWORK_HIDE = 'ERROR-NETWORK-HIDE',
}

export enum SUPPLIER {
  LIST_SUPPLIER_START = 'List_Supplier_Start',
  LIST_SUPPLIER_END = 'List_Supplier_End',
  LIST_SUPPLIER_FAIL = 'List_Supplier_Fail',
  LIST_SUPPLIER_CLEAR = 'List_Supplier_Clear',

  LIST_PRODUCT_SUPPLIER_START = 'Produdct_List_Supplier_Start',
  LIST_PRODUCT_SUPPLIER_END = 'Product_List_Supplier_End',
  LIST_PRODUCT_SUPPLIER_FAIL = 'Product_List_Supplier_Fail',
  LIST_PRODUCT_SUPPLIER_CLEAR = 'Product_List_Supplier_Clear',
}

export enum WALLET {
  BANK_LIST_START = 'wallet/Bank_List_Start',
  BANK_LIST_END = 'wallet/Bank_List_End',
  BANK_LIST_FAIL = 'wallet/Bank_List_Fail',

  FUND_HISTORY_START = 'wallet/Fund_History_List_Start',
  FUND_HISTORY_END = 'wallet/Fund_History_List_End',
  FUND_HISTORY_FAIL = 'wallet/Fund_History_List_Fail',
  FUND_HISTORY_CLEAR = 'wallet/Fund_History_List_Clear',

  HISTORY_START = 'wallet/History_Wallet_Start',
  HISTORY_END = 'wallet/History_Wallet_End',
  HISTORY_FAIL = 'wallet/History_Wallet_Fail',
  HISTORY_CLEAR = 'wallet/History_Wallet_Clear',

  DEPOSIT_START = 'wallet/Deposit_Start',
  DEPOSIT_END = 'wallet/Deposit_End',
  DEPOSIT_FAIL = 'wallet/Deposit_Fail',

  WITHDRAW_START = 'wallet/Withdraw_Start',
  WITHDRAW_END = 'wallet/Withdraw_End',
  WITHDRAW_FAIL = 'wallet/Withdraw_Fail',

  CANCEL_START = 'wallet/Cancel_Start',
  CANCEL_END = 'wallet/Cancel_End',
  CANCEL_FAIL = 'wallet/Cancel_Fail',

  ADD_BANK_INFOR_START = 'wallet/Add_Bank_Infor_Start',
  ADD_BANK_INFOR_END = 'wallet/Add_Bank_Infor_End',
  ADD_BANK_INFOR_FAIL = 'wallet/Add_Bank_Infor_Fail',

  TRANSFER_START = 'wallet/Transfer_Start',
  TRANSFER_END = 'wallet/Transfer_End',
  TRANSFER_FAIL = 'wallet/Transfer_Fail',

  REFERRAL_LIST_START = 'wallet/Referral_List_Start',
  REFERRAL_LIST_END = 'wallet/Referral_List_End',
  REFERRAL_LIST_FAIL = 'wallet/Referral_List_Fail',
  REFERRAL_LIST_CLEAR = 'wallet/Referral_List_Clear',
}

export enum DETAIL_MEMBER {
  START = 'client/detail_info_start',
  END = 'client/detail_info_end',
  FAIL = 'client/detail_info_fail',
}

export enum REFERRAL_INFO {
  START = 'client/referral_info_start',
  END = 'client/referral_info_end',
  FAIL = 'client/referral_info_fail',
}
