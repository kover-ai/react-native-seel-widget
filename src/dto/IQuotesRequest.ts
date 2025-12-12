import type { IShippingOrigin, IShippingAddress } from './IQuotes';

namespace QuotesRequestNamespace {
  export interface IQuoteExtraInfo {
    shipping_fee?: number;
  }
  export interface ILineItem {
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
}

export interface IQuotesRequest {
  cart_id: string;
  device_category: string;
  line_items?: QuotesRequestNamespace.ILineItem[];
  customer?: {
    customer_id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  device_id: string;
  is_default_on: boolean;
  session_id: string;
  type: string;
  extra_info?: QuotesRequestNamespace.IQuoteExtraInfo;
  device_platform: string;
  shipping_address?: IShippingAddress;
  merchant_id: string;
}
