import type { IShippingOrigin, IShippingAddress } from './IQuotes';

/**
 * Quote status type
 */
export type QuoteStatus = 'accepted' | 'rejected';

/**
 * Customer information for quotes response
 */
export interface IQuotesResponseCustomer {
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface II18N {
  lang: string;
  texts: Map<string, string>[];
}

/**
 * Extra information for quotes response
 */
export interface IQuotesResponseExtraInfo {
  coverage_details_text?: string[];
  display_widget_text?: string[];
  opt_out_warning_text?: string;
  privacy_policy_url?: string;
  shipping_fee?: number;
  terms_url?: string;
  widget_title?: string;
  i18n?: II18N;
}

/**
 * Line item extra info (for nested structure)
 */
export interface IQuotesResponseLineItemExtraInfo {
  [key: string]: unknown;
}

/**
 * Line item information for quotes response
 */
export interface IQuotesResponseLineItem {
  allocated_discounts?: number;
  brand_name?: string;
  category_1?: string;
  category_2?: string;
  category_3?: string;
  category_4?: string;
  condition?: string;
  currency?: string;
  extra_info?: IQuotesResponseLineItemExtraInfo;
  final_price?: string;
  image_url?: string;
  is_final_sale?: boolean;
  line_item_id?: string;
  price?: number;
  product_attributes?: string;
  product_description?: string;
  product_id?: string;
  product_title?: string;
  product_url?: string;
  quantity?: number;
  requires_shipping?: boolean;
  retail_price?: number;
  sales_tax?: number;
  seller_id?: string;
  seller_name?: string;
  shipping_fee?: number;
  shipping_origin?: IShippingOrigin;
  sku?: string;
  variant_id?: string;
  variant_title?: string;
}

/**
 * Quotes Response interface
 * Fields are ordered logically: identifiers, metadata, configuration, data, status
 */
export default interface IQuotesResponse {
  // Identifiers
  quote_id: string;
  cart_id: string;
  merchant_id: string;
  device_id: string;
  session_id: string;

  // Metadata
  created_ts: string;
  status: string;

  // Configuration
  type: string;
  device_category: string;
  device_platform: string;
  is_default_on: boolean;

  // Financial data
  currency: string;
  price: number;

  // Data
  line_items?: IQuotesResponseLineItem[];
  customer?: IQuotesResponseCustomer;
  shipping_address?: IShippingAddress;
  extra_info?: IQuotesResponseExtraInfo;
}
