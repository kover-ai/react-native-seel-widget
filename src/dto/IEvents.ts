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

/**
 * Event type union type
 * Can be simplified to: export type EventType = EventTypeEnum;
 */
export type EventType = EventTypeEnum;

/**
 * Shipping address information for events
 */
export interface IEventShippingAddress {
  shipping_address_state: string;
  shipping_address_city: string;
  shipping_address_zipcode: string;
  shipping_address_country: string;
}

/**
 * Event information object
 * Each event_type has its own unique schema. For specific details, please refer to the custom pixel guide.
 */
export interface IEventInfo {
  user_email?: string;
  shipping_address?: IEventShippingAddress;
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
