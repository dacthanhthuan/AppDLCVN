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
