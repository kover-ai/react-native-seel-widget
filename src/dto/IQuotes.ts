/**
 * Shipping origin address information
 */
export interface IShippingOrigin {
  address_1?: string;
  address_2?: string;
  city?: string;
  country?: string;
  state?: string;
  zipcode?: string;
}

/**
 * Shipping address information
 * Currently has the same structure as IShippingOrigin
 * Using type alias to avoid unnecessary interface extension
 */
export type IShippingAddress = IShippingOrigin;
