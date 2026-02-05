import type { IShippingOrigin, IShippingAddress } from './IQuotes';

/**
 * Customer information for quotes request
 */
export interface IQuotesRequestCustomer {
  /**
   * The unique identifier for the customer
   */
  customer_id: string;
  /**
   * The email address of the customer
   */
  email: string;
  /**
   * The first name of the customer
   */
  first_name?: string;
  /**
   * The last name of the customer
   */
  last_name?: string;
  /**
   * The phone number of the customer
   */
  phone?: string;
}

/**
 * Extra information for quotes request
 */
export interface IQuotesRequestExtraInfo {
  shipping_fee?: number;
  total_discounts: number;
  total_sales_tax: number;
}

/**
 * Product Attributes
 */
export interface IProductAttributes {
  /**
   * The color of the product.
   */
  color?: string;
  /**
   * The size of the product.
   */
  size?: string;
}

/**
 * Line item information for quotes request
 */
export interface IQuotesRequestLineItem {
  /**
   * The allocated discounts of the product.
   */
  allocated_discounts: number;
  /**
   * The brand name of the product.
   */
  brand_name?: string;
  /**
   * The main category of the product.
   */
  category_1: string;
  /**
   * The sub category of the product.
   */
  category_2: string;
  /**
   * The sub category of the product.
   */
  category_3?: string;
  /**
   * The sub category of the product.
   */
  category_4?: string;
  /**
   * The physical condition of the item (e.g. new, used, refurbished)
   */
  condition?: 'new' | 'used' | 'refurbished';
  /**
   * The currency of the price.
   */
  currency: string;
  /**
   * The final price of the product.
   */
  final_price: number | string;
  /**
   * The URLs of the product images.
   */
  image_urls?: string[];
  /**
   * Whether the item is final sale or not.
   * Default: true
   */
  is_final_sale: boolean;
  /**
   * The ID of the item.
   */
  line_item_id: string;
  /**
   * The price of the product.
   */
  price: number;

  product_attributes?: IProductAttributes;
  /**
   * The description of the product.
   */
  product_description?: string;
  /**
   * The ID of the product.
   */
  product_id: string;
  /**
   * The title of the product.
   */
  product_title: string;
  /**
   * The URL of the product.
   */
  product_url?: string;
  /**
   * The quantity of the product.
   */
  quantity: number;
  /**
   * The retail price of the product.
   */
  retail_price?: number;
  /**
   * Whether the item requires shipping or not.
   */
  requires_shipping: boolean;
  /**
   * The sales tax of the product.
   */
  sales_tax: number;
  /**
   * The ID of the seller.
   */
  seller_id?: string;
  /**
   * The name of the seller.
   */
  seller_name?: string;
  /**
   * Shipping origin
   */
  shipping_origin?: IShippingOrigin | null;
  /**
   * The sku of the product variant.
   */
  sku?: string;
  /**
   * The ID of the product variant.
   */
  variant_id?: string;
  /**
   * The title of the product variant.
   */
  variant_title?: string;
}

/**
 * Quotes Request interface
 * Fields are ordered logically: identifiers, configuration, data, metadata
 */
export interface IQuotesRequest {
  /**
   * The ID of a cart.
   */
  cart_id?: string;
  /**
   * The IP address of the client.
   */
  client_ip?: string;
  /**
   * The unique identifier for the merchant within Seel's system.
   */
  merchant_id?: string;
  /**
   * The ID of the shopping session.
   */
  session_id: string;

  /**
   * The type of the quote.
   */
  type: string;
  /**
   * The type of device from which user activity originated.
   */
  device_category: string;
  /**
   * The ID of the client device.
   */
  device_id?: string;
  /**
   * The method by which users accessed your website or application.
   */
  device_platform: string;
  /**
   * The default opt-in setting for the quote
   */
  is_default_on?: boolean;

  /**
   * The list of items included in the quote.
   */
  line_items: IQuotesRequestLineItem[];
  customer: IQuotesRequestCustomer;
  shipping_address: IShippingAddress;
  /**
   * Additional information for the quote
   */
  extra_info: IQuotesRequestExtraInfo;
}

export type IQuotesRequestWithoutExtraInfo = Omit<IQuotesRequest, 'extra_info'>;

export type IQuotesRequestWithOptionalExtraInfo =
  IQuotesRequestWithoutExtraInfo & {
    extra_info?: IQuotesRequestExtraInfo;
  };
