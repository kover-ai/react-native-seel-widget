export interface IShippingOrigin {
  address_1?: string;
  address_2?: string;
  city?: string;
  country?: string;
  state?: string;
  zipcode?: string;
}

export interface IShippingAddress extends IShippingOrigin {}
