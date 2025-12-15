/**
 * Shipping origin address information
 */
export interface IShippingOrigin {
  /**
   * The first line of the shipping address
   */
  address_1?: string;
  /**
   * The second line of the shipping address
   */
  address_2?: string;
  /**
   * The city of the shipping address
   */
  city: string;
  /**
   * ISO 3166-1 alpha-2 country code of the shipping address
   */
  country: string;
  /**
   * The state or province code of the shipping address
   */
  state: string;
  /**
   * The zipcode of the shipping address
   */
  zipcode: string;
}

/**
 * Shipping address information
 * Currently has the same structure as IShippingOrigin
 * Using type alias to avoid unnecessary interface extension
 */
export type IShippingAddress = IShippingOrigin;
