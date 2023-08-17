import {SUPPLIER} from './types';

type GetSupplierListProps = {
  token?: string;
  keyword?: string;
  page?: string;
};

export const getSupplierListStart = (data: GetSupplierListProps) => {
  const form = new FormData();
  form.append('token', data.token);
  form.append('keyword', data.keyword);
  form.append('page', data.page);

  return {
    type: SUPPLIER.LIST_SUPPLIER_START,
    payload: form,
  };
};

export const getSupplierListEnd = (data: any) => ({
  type: SUPPLIER.LIST_SUPPLIER_END,
  payload: data,
});

export const getSupplierListFail = (msg: string) => ({
  type: SUPPLIER.LIST_SUPPLIER_FAIL,
  payload: msg,
});

export const clearSupplierList = () => ({
  type: SUPPLIER.LIST_SUPPLIER_CLEAR,
});

export const SupplierListActions = {
  start: getSupplierListStart,
  end: getSupplierListEnd,
  fail: getSupplierListFail,
  clear: clearSupplierList,
};

type GetSupplierProductListProps = {
  token?: string;
  keyword?: string;
  supplier_id?: string;
  page?: string;
};

export const getSupplierProductListStart = ({
  token,
  keyword,
  supplier_id,
  page,
}: GetSupplierProductListProps) => {
  const form = new FormData();
  form.append('token', token);
  form.append('keyword', keyword);
  form.append('supplier_id', supplier_id);
  form.append('page', page);

  return {
    type: SUPPLIER.LIST_PRODUCT_SUPPLIER_START,
    payload: form,
  };
};

export const getSupplierProductListEnd = (data: any) => ({
  type: SUPPLIER.LIST_PRODUCT_SUPPLIER_END,
  payload: data,
});

export const getSupplierProductListFail = (msg: string) => ({
  type: SUPPLIER.LIST_PRODUCT_SUPPLIER_FAIL,
  payload: msg,
});

export const clearSupplierProductList = () => ({
  type: SUPPLIER.LIST_PRODUCT_SUPPLIER_CLEAR,
});

export const SupplierProductListActions = {
  start: getSupplierProductListStart,
  end: getSupplierProductListEnd,
  fail: getSupplierProductListFail,
  clear: clearSupplierProductList,
};
