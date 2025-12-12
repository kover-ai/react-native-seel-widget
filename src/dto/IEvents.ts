export enum EventTypeEnum {
  product_page_enter = 'product_page_enter',
  product_page_exit = 'product_page_exit',
  product_share = 'product_share',
  favorite_add = 'favorite_add',
  favorite_remove = 'favorite_remove',
  cart_add = 'cart_add',
  cart_remove = 'cart_remove',
  ra_checked = 'ra_checked',
  ra_unchecked = 'ra_unchecked',
  checkout_begin = 'checkout_begin',
  checkout_complete = 'checkout_complete',
}

export type EventType =
  | EventTypeEnum.product_page_enter
  | EventTypeEnum.product_page_exit
  | EventTypeEnum.product_share
  | EventTypeEnum.favorite_add
  | EventTypeEnum.favorite_remove
  | EventTypeEnum.cart_add
  | EventTypeEnum.cart_remove
  | EventTypeEnum.ra_checked
  | EventTypeEnum.ra_unchecked
  | EventTypeEnum.checkout_begin
  | EventTypeEnum.checkout_complete;

// export type EventType =
//   | 'product_page_enter'
//   | 'product_page_exit'
//   | 'product_share'
//   | 'favorite_add'
//   | 'favorite_remove'
//   | 'cart_add'
//   | 'cart_remove'
//   | 'ra_checked'
//   | 'ra_unchecked'
//   | 'checkout_begin'
//   | 'checkout_complete';

export interface IEventInfo {
  user_email?: string;
  shipping_address?: {
    shipping_address_state: string;
    shipping_address_city: string;
    shipping_address_zipcode: string;
    shipping_address_country: string;
  };
  user_phone_number?: string;
}

export interface IEvents {
  client_ip: string;
  customer_id: string;
  device_id?: string;
  event_id?: string;
  event_info?: IEventInfo;
  event_source: string;
  event_ts: string;
  event_type: EventType;
  session_id: string;
}
