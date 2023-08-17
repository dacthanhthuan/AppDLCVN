export type ShipAddressType = {
  id: string;
  fullname: string;
  mobile: string;
  address: string;
  ward: string;
  district: string;
  city: string;
};

export type InitialStateType = {
  address: ShipAddressType | undefined;
};

export enum ORDER_ADDRESS {
  update = 'order address update',
  clear = 'order address update',
}
