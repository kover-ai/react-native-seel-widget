import type { IShippingOrigin, IShippingAddress } from './IQuotes';

/**
 * Customer information for quotes request
 */
export interface IQuotesRequestCustomer {
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

/**
 * Extra information for quotes request
 */
export interface IQuotesRequestExtraInfo {
  shipping_fee?: number;
}

/**
 * Line item information for quotes request
 */
export interface IQuotesRequestLineItem {
  allocated_discounts?: number;
  category_1?: string;
  category_2?: string;
  currency?: string;
  final_price?: string;
  image_urls?: string[];
  is_final_sale?: boolean;
  line_item_id?: string;
  price?: number;
  product_id?: string;
  product_title?: string;
  quantity?: number;
  requires_shipping?: boolean;
  sales_tax?: number;
  shipping_origin?: IShippingOrigin;
  variant_id?: string;
  variant_title?: string;
}

/**
 * Quotes Request interface
 * Fields are ordered logically: identifiers, configuration, data, metadata
 */
export interface IQuotesRequest {
  // Identifiers
  cart_id: string;
  merchant_id: string;
  device_id: string;
  session_id: string;

  // Configuration
  type: string;
  device_category: string;
  device_platform: string;
  is_default_on: boolean;

  // Data
  line_items?: IQuotesRequestLineItem[];
  customer?: IQuotesRequestCustomer;
  shipping_address?: IShippingAddress;
  extra_info?: IQuotesRequestExtraInfo;
}
