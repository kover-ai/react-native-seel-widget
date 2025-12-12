import type { IShippingOrigin, IShippingAddress } from './IQuotes';

type QuoteStatus = 'accepted' | 'rejected';

namespace QuotesResponseNamespace {
  export interface IQuoteExtraInfo {
    coverage_details_text?: string[];
    display_widget_text?: string[];
    opt_out_warning_text?: string;
    privacy_policy_url?: string;
    shipping_fee?: number;
    terms_url?: string;
    widget_title?: string;
  }
  export interface ILineItem {
    allocated_discounts?: number;
    brand_name?: string;
    category_1?: string;
    category_2?: string;
    category_3?: string;
    category_4?: string;
    condition?: string;
    currency?: string;
    extra_info?: any;
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
}

export default interface IQuotesResponse {
  device_category: string;
  created_ts: string;
  type: string;
  currency: string;
  line_items?: QuotesResponseNamespace.ILineItem[];
  extra_info?: QuotesResponseNamespace.IQuoteExtraInfo;
  cart_id: string;
  price: number;
  device_id: string;
  status: QuoteStatus;
  customer?: {
    customer_id: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  shipping_address?: IShippingAddress;
  merchant_id: string;
  is_default_on: boolean;
  quote_id: string;
  device_platform: string;
  session_id: string;
}
